/*
 * <domino-demo>: why induction needs BOTH the base case and the inductive step.
 *
 * Three modes:
 *   Both                 domino 1 is pushed and every domino knocks over the next
 *   Base case only       domino 1 falls, but the gaps are too wide for it to reach domino 2
 *   Inductive step only  the dominoes are close enough, but nothing knocks over the first
 */
(() => {
  if (customElements.get("domino-demo")) return;

  const W = 14, H = 84, FLOOR = 150, START = 40;
  const LABELS = ["n = 1", "2", "3", "k", "k + 1", "", ""];
  const MODES = {
    both: {
      label: "Base case + inductive step",
      gap: 62, push: true,
      idle: "Push the first domino.",
      done: "The base case knocks over domino 1. The inductive step guarantees any domino that falls knocks over the next, so 1 knocks 2, 2 knocks 3, and so on. Every domino falls: the statement is true for all n ∈ ℕ."
    },
    base: {
      label: "Base case only",
      gap: 112, push: true,
      idle: "Push the first domino.",
      done: "Domino 1 falls (the statement is true for n = 1), but nothing shows that it reaches domino 2. Checking cases one at a time never covers them all."
    },
    step: {
      label: "Inductive step only",
      gap: 62, push: false,
      idle: "Push the first domino.",
      done: "Every domino would knock over the next one, but nothing starts the chain, so nothing falls. For example, “n = n + 1” passes the inductive step (if k = k + 1 then k + 1 = k + 2) but is never true. Without a base case the proof proves nothing."
    }
  };

  class DominoDemo extends HTMLElement {
    constructor() {
      super();
      this.mode = "both";
      this.timers = [];
      const r = this.attachShadow({ mode: "open" });
      r.innerHTML = `<style>
        :host { display: block; font-family: var(--font-body, Figtree, sans-serif); color: var(--color-text, #201e1d); }
        .card { background: var(--color-neutral-100, #f9f4ed); border-radius: 28px; padding: 24px 26px; box-shadow: var(--shadow-sm, 0 1px 2px rgba(46,43,37,.14)); }
        .kicker { font-size: 13px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--color-accent-700, #8c491a); margin: 0 0 4px; }
        h3 { font-family: var(--font-heading, Caprasimo, serif); font-weight: 400; font-size: 22px; margin: 0 0 14px; }
        .seg { display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: var(--color-neutral-200, #eee7db); border-radius: 999px; margin-bottom: 8px; }
        button { font: inherit; font-size: 14px; font-weight: 700; border: 0; cursor: pointer; border-radius: 999px; padding: 9px 16px; color: var(--color-neutral-800, #474238); background: transparent; }
        .seg button:hover { background: var(--color-accent-200, #ffe1d0); }
        .seg button[aria-pressed="true"] { background: #fff; color: #201e1d; box-shadow: 0 1px 2px rgba(46,43,37,.18); }
        button:focus-visible { outline: 2px solid #c67139; outline-offset: 2px; }
        svg { display: block; width: 100%; height: auto; margin: 6px 0 4px; }
        .dom { transform-box: fill-box; transform-origin: 100% 100%; transition: transform .32s cubic-bezier(.55,0,.9,.6); }
        @media (prefers-reduced-motion: reduce) { .dom { transition: none; } }
        .row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-top: 6px; }
        .go { background: #201e1d; color: #fff; padding: 11px 22px; font-size: 15px; }
        .go:hover { background: #000; }
        .reset { background: var(--color-neutral-200, #eee7db); color: #201e1d; padding: 11px 22px; font-size: 15px; }
        .reset:hover { background: var(--color-neutral-300, #dcd3c4); }
        .cap { font-size: 16px; line-height: 1.65; margin: 14px 0 0; min-height: 3.3em; text-wrap: pretty; }
      </style>
      <div class="card">
        <p class="kicker">Interactive</p>
        <h3>Induction is a row of dominoes</h3>
        <div class="seg" role="group" aria-label="Which parts of the proof are in place"></div>
        <svg viewBox="0 0 820 230" role="img" aria-label="A row of dominoes labelled n equals 1, 2, 3, k, k plus 1, and so on"></svg>
        <div class="row">
          <button class="go" type="button">Push domino 1</button>
          <button class="reset" type="button">Stand them up</button>
        </div>
        <p class="cap" aria-live="polite"></p>
      </div>`;
      this.svg = r.querySelector("svg");
      this.cap = r.querySelector(".cap");
      this.seg = r.querySelector(".seg");
      Object.entries(MODES).forEach(([key, m]) => {
        const b = document.createElement("button");
        b.type = "button"; b.textContent = m.label; b.dataset.mode = key;
        b.addEventListener("click", () => { this.mode = key; this.draw(); });
        this.seg.appendChild(b);
      });
      r.querySelector(".go").addEventListener("click", () => this.push());
      r.querySelector(".reset").addEventListener("click", () => this.draw());
    }

    connectedCallback() { this.draw(); }
    disconnectedCallback() { this.clear(); }
    clear() { this.timers.forEach(clearTimeout); this.timers = []; }

    draw() {
      this.clear();
      const m = MODES[this.mode];
      this.seg.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mode === this.mode)));
      const ns = "http://www.w3.org/2000/svg";
      const el = (tag, attrs, text) => {
        const e = document.createElementNS(ns, tag);
        for (const k in attrs) e.setAttribute(k, attrs[k]);
        if (text != null) e.textContent = text;
        return e;
      };
      this.svg.replaceChildren();
      this.svg.appendChild(el("rect", { x: 10, y: FLOOR, width: 800, height: 6, rx: 3, fill: "#dcd3c4" }));
      this.doms = [];
      LABELS.forEach((label, i) => {
        const x = START + i * m.gap;
        if (x + W > 770) return;
        const colour = i === 0 ? "#f2542d" : (i === 3 || i === 4) ? "#7b5cff" : "#201e1d";
        const g = el("g", { class: "dom" });
        g.appendChild(el("rect", { x, y: FLOOR - H, width: W, height: H, rx: 3, fill: colour }));
        [0.25, 0.5, 0.75].forEach(f => g.appendChild(el("circle", { cx: x + W / 2, cy: FLOOR - H + H * f, r: 2.4, fill: "#f9f4ed" })));
        this.svg.appendChild(g);
        if (label) this.svg.appendChild(el("text", { x: x + W / 2, y: FLOOR + 26, "text-anchor": "middle", "font-size": 15, "font-weight": 700, fill: colour, "font-family": "Figtree, sans-serif" }, label));
        this.doms.push({ g, x });
      });
      const last = this.doms[this.doms.length - 1];
      const dotsX = Math.min(last.x + (m.gap - W < H ? H + 26 : 46), 790);
      this.svg.appendChild(el("text", { x: dotsX, y: FLOOR - 30, "font-size": 26, "font-weight": 700, fill: "#82796a" }, "…"));
      // Braces naming the two parts of the proof.
      const brace = (x1, x2, text, colour) => {
        const y = FLOOR + 40;
        this.svg.appendChild(el("path", { d: `M${x1} ${y} v6 H${x2} v-6`, fill: "none", stroke: colour, "stroke-width": 2, "stroke-linecap": "round" }));
        this.svg.appendChild(el("text", { x: (x1 + x2) / 2, y: y + 24, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: colour, "font-family": "Figtree, sans-serif" }, text));
      };
      brace(START - 10, START + W + 10, "base case", "#c2410c");
      if (this.doms[4]) brace(this.doms[3].x - 8, this.doms[4].x + W + 8, "if k falls, k + 1 falls", "#5b3fd6");
      this.cap.textContent = m.idle;
    }

    push() {
      this.draw();
      const m = MODES[this.mode];
      if (!m.push) {
        // Nobody pushes domino 1: give it a nudge that goes nowhere.
        const g = this.doms[0].g;
        g.style.transform = "rotate(4deg)";
        this.timers.push(setTimeout(() => { g.style.transform = ""; this.cap.textContent = m.done; }, 300));
        return;
      }
      const reach = m.gap - W;                    // distance from one domino's pivot to the next
      const lean = reach < H ? Math.asin(reach / H) * 180 / Math.PI : 84;
      const fall = (i) => {
        const d = this.doms[i];
        if (!d) { this.cap.textContent = m.done; return; }
        const isLast = i === this.doms.length - 1;
        d.g.style.transform = `rotate(${isLast || reach >= H ? 84 : lean}deg)`;
        if (reach >= H) { this.timers.push(setTimeout(() => { this.cap.textContent = m.done; }, 400)); return; }
        this.timers.push(setTimeout(() => fall(i + 1), 230));
      };
      fall(0);
    }
  }

  customElements.define("domino-demo", DominoDemo);
})();
