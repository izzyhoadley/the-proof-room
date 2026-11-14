/*
 * Tiny template runtime for the site.
 *
 * The page markup lives in template.html (index.html loads it into <script id="app-template">)
 * and uses a small template syntax:
 *   {{ path }}                         dotted lookup into the values returned by renderVals()
 *   <sc-if value="{{ x }}">            render children when x is truthy
 *   <sc-for list="{{ xs }}" as="x">    repeat children; {{ x }} and {{ $index }} in scope
 *   onClick / onInput="{{ fn }}"       event handlers
 *   style-hover="css"                  extra styles applied on :hover
 *   data-tex="tex" [data-display]      typeset with KaTeX
 *   <x-import component-from-global-scope="work-pad" data-key=…>   mounts <work-pad>
 *
 * The template is compiled to Preact vnodes on each render, so Preact diffs the DOM
 * (sliders keep focus while dragging, scroll position is kept, etc).
 */
(function () {
  const { h, Component, render } = window.preact;

  // ---------- parsing ----------
  // Prefix every non-void tag before handing the markup to the HTML parser, so its
  // implicit rules (a <div> closing an open <p>, <sc-for> being hoisted out of a
  // <table>) can't rearrange the template. The prefix is stripped again below.
  const VOID = new Set(["input", "br", "img", "hr", "meta", "link", "source", "wbr"]);
  const PREFIX = "dc-";
  const ATTR_CASE = {
    onclick: "onClick", oninput: "onInput", onchange: "onChange",
    viewbox: "viewBox", preserveaspectratio: "preserveAspectRatio"
  };
  const BOOL_ATTRS = new Set(["controls", "disabled", "checked", "autoplay", "muted", "loop", "hidden", "playsinline"]);

  function parseTemplate(src) {
    const safe = src.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/g, (m, slash, name) =>
      VOID.has(name.toLowerCase()) ? m : "<" + slash + PREFIX + name.toLowerCase());
    const t = document.createElement("template");
    t.innerHTML = safe;
    return Array.from(t.content.childNodes).map(toNode).filter(Boolean);
  }

  const HOLE = /\{\{\s*([^}]*?)\s*\}\}/g;
  const WHOLE = /^\{\{\s*([^}]*?)\s*\}\}$/;

  function compileValue(str) {
    const whole = str.match(WHOLE);
    if (whole) return { kind: "path", path: whole[1] };
    if (!str.includes("{{")) return { kind: "lit", value: str };
    const parts = [];
    let last = 0;
    str.replace(HOLE, (m, p, idx) => {
      if (idx > last) parts.push({ kind: "lit", value: str.slice(last, idx) });
      parts.push({ kind: "path", path: p });
      last = idx + m.length;
    });
    if (last < str.length) parts.push({ kind: "lit", value: str.slice(last) });
    return { kind: "concat", parts };
  }

  function toNode(dom) {
    if (dom.nodeType === 3) {
      let text = dom.nodeValue;
      if (!text.trim()) return { type: "text", value: { kind: "lit", value: " " } };
      text = text.replace(/\s+/g, " ");
      return { type: "text", value: compileValue(text) };
    }
    if (dom.nodeType !== 1) return null;
    let tag = dom.tagName.toLowerCase();
    if (tag.startsWith(PREFIX)) tag = tag.slice(PREFIX.length);
    const attrs = {};
    for (const a of Array.from(dom.attributes)) {
      if (a.name.startsWith("hint-")) continue;
      attrs[ATTR_CASE[a.name] || a.name] = compileValue(a.value);
    }
    return { type: "el", tag, attrs, children: Array.from(dom.childNodes).map(toNode).filter(Boolean) };
  }

  // ---------- evaluation ----------
  function lookup(scope, path) {
    if (path === "true") return true;
    if (path === "false") return false;
    if (path === "null") return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return parseFloat(path);
    const keys = path.split(".");
    let v = scope;
    for (const k of keys) {
      if (v == null) return undefined;
      v = v[k];
    }
    return v;
  }

  function evalValue(val, scope) {
    if (val.kind === "lit") return val.value;
    if (val.kind === "path") return lookup(scope, val.path);
    return val.parts.map(p => {
      const v = evalValue(p, scope);
      return v == null || v === false ? "" : String(v);
    }).join("");
  }

  // style-hover: turn each distinct hover style into a class with an !important rule,
  // so it wins over the element's inline style while hovered.
  const hoverClasses = new Map();
  let hoverSheet = null;
  function hoverClass(css) {
    if (!css) return null;
    if (hoverClasses.has(css)) return hoverClasses.get(css);
    if (!hoverSheet) {
      const el = document.createElement("style");
      el.id = "hover-styles";
      document.head.appendChild(el);
      hoverSheet = el.sheet;
    }
    const cls = "hv" + hoverClasses.size;
    const decls = css.split(";").map(d => d.trim()).filter(Boolean)
      .map(d => d.replace(/\s*!important\s*$/, "") + " !important").join("; ");
    hoverSheet.insertRule("." + cls + ":hover { " + decls + " }", hoverSheet.cssRules.length);
    hoverClasses.set(css, cls);
    return cls;
  }

  // KaTeX-rendered maths gets its own component type, so Preact never recycles a
  // typeset <span> for plain text (or the other way round).
  // Display maths can't wrap, so a formula wider than its box is scaled down to fit
  // (to no less than 65%) instead of making students scroll sideways.
  function fitTex(el) {
    if (!el || !el.isConnected || !("display" in el.dataset)) return;
    el.style.fontSize = "";
    const avail = el.clientWidth, need = el.scrollWidth;
    if (avail && need > avail + 1) el.style.fontSize = Math.max(0.65, avail / need) * 100 + "%";
  }
  let fitQueued = false;
  window.addEventListener("resize", () => {
    if (fitQueued) return;
    fitQueued = true;
    requestAnimationFrame(() => { fitQueued = false; document.querySelectorAll("[data-tex][data-display]").forEach(fitTex); });
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => document.querySelectorAll("[data-tex][data-display]").forEach(fitTex));
  }

  function Tex(props) {
    const { tag, tex, display, attrs } = props;
    let html = "";
    try {
      html = window.katex
        ? window.katex.renderToString(tex || "", { throwOnError: false, displayMode: display })
        : (tex || "");
    } catch (e) { html = tex || ""; }
    return h(tag, Object.assign({}, attrs, {
      dangerouslySetInnerHTML: { __html: html },
      ref: el => { if (el) { el.__tex = tex; requestAnimationFrame(() => fitTex(el)); } }
    }));
  }

  function renderNodes(nodes, scope, out) {
    for (const n of nodes) renderNode(n, scope, out);
    return out;
  }

  function renderNode(n, scope, out) {
    if (n.type === "text") {
      const v = evalValue(n.value, scope);
      if (v == null || v === false || v === true) return;
      // Holes can carry vnodes (the SVG scenes built in app.js) as well as text.
      out.push(typeof v === "object" ? v : String(v));
      return;
    }
    const { tag, attrs, children } = n;

    if (tag === "sc-if") {
      if (evalValue(attrs.value, scope)) renderNodes(children, scope, out);
      return;
    }
    if (tag === "sc-for") {
      const list = evalValue(attrs.list, scope) || [];
      const as = attrs.as ? evalValue(attrs.as, scope) : "item";
      list.forEach((item, i) => {
        const inner = Object.create(scope);
        inner[as] = item;
        inner.$index = i;
        out.push(h(window.preact.Fragment, { key: i }, renderNodes(children, inner, [])));
      });
      return;
    }

    const props = {};
    let hover = null;
    for (const name in attrs) {
      let v = evalValue(attrs[name], scope);
      if (name === "style-hover") { hover = v; continue; }
      if (BOOL_ATTRS.has(name) && v === "") v = true;
      props[name] = v;
    }
    const hc = hoverClass(hover);
    if (hc) props.class = props.class ? props.class + " " + hc : hc;

    if (tag === "x-import") {
      const el = props["component-from-global-scope"];
      const p = {};
      for (const k in props) if (k !== "from" && k !== "component-from-global-scope") p[k] = props[k];
      out.push(h(el, p));
      return;
    }
    if ("data-tex" in props) {
      out.push(h(Tex, { tag, tex: props["data-tex"], display: "data-display" in props, attrs: props }));
      return;
    }
    out.push(h(tag, props, renderNodes(children, scope, [])));
  }

  // ---------- component base ----------
  let compiled = null;

  class DCLogic extends Component {
    renderVals() { return {}; }
    render() {
      if (!compiled) compiled = parseTemplate(document.getElementById("app-template").textContent);
      const vals = this.renderVals() || {};
      const out = renderNodes(compiled, vals, []);
      return out.length === 1 ? out[0] : h(window.preact.Fragment, null, out);
    }
  }

  // Minimal React-compatible surface: the page logic builds its 3D vector scenes
  // with React.createElement / cloneElement. Preact core doesn't translate React's
  // camelCase SVG attribute names (strokeWidth → stroke-width), so do that here.
  const SVG_CAMEL = /^(stroke|fill|font|text|dominant|letter|marker|clip|stop|flood|lighting|color)[A-Z]/;
  const toKebab = n => n.replace(/[A-Z]/g, c => "-" + c.toLowerCase());
  function fixProps(props) {
    if (!props) return props;
    const out = {};
    for (const k in props) out[SVG_CAMEL.test(k) ? toKebab(k) : k] = props[k];
    return out;
  }
  window.React = {
    createElement: (type, props, ...children) => h(type, fixProps(props), ...children),
    cloneElement: (el, props, ...children) => window.preact.cloneElement(el, fixProps(props), ...children),
    Fragment: window.preact.Fragment
  };

  window.DCLogic = DCLogic;
  window.mountApp = function (Comp, root, props) {
    render(h(Comp, props || {}), root);
  };
})();
