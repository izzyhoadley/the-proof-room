(() => {
  if (customElements.get('work-pad')) return;
  const UNIT = 1000; // stroke coords stored in units of width/1000 so ink scales with the pad
  const COLORS = [['Ink', '#201e1d'], ['Coral', '#f2542d'], ['Teal', '#1fa38a'], ['Violet', '#7b5cff']];
  const ICON = {
    pen: '<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/>',
    hl: '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>',
    eraser: '<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    grid: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
    dl: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    full: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>'
  };
  const svg = (k) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;

  class WorkPad extends HTMLElement {
    constructor() {
      super();
      this.strokes = []; this.h = 380; this.grid = true;
      this.tool = 'pen'; this.color = COLORS[0][1]; this.dirty = false; this.savedAt = null; this.cur = null;
      const r = this.attachShadow({ mode: 'open' });
      r.innerHTML = `<style>
        :host { display: block; font-family: var(--font-body, Figtree, sans-serif); }
        .wrap { border-radius: 20px; background: #fff; border: 2px solid #eee7db; overflow: hidden; }
        .wrap:fullscreen { border: 0; border-radius: 0; overflow: auto; display: flex; flex-direction: column; }
        .bar { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 10px; background: #f9f4ed; border-bottom: 2px solid #eee7db; position: sticky; top: 0; z-index: 2; }
        button { all: unset; box-sizing: border-box; height: 40px; min-width: 40px; padding: 0 10px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; color: #474238; font-size: 14px; font-weight: 700; }
        button:hover { background: #eee7db; }
        button:focus-visible { outline: 2px solid #c67139; outline-offset: 2px; }
        button.on { background: #201e1d; color: #fff; }
        .sw { width: 22px; height: 22px; border-radius: 999px; box-shadow: inset 0 0 0 2px rgba(0,0,0,0.08); }
        button.swb.on { background: #eee7db; box-shadow: inset 0 0 0 2px #201e1d; }
        .sep { width: 2px; height: 24px; background: #e5dccd; margin: 0 4px; border-radius: 2px; }
        .grow { flex: 1; }
        .status { font-size: 13px; font-weight: 600; color: #645c50; padding: 0 6px; white-space: nowrap; }
        .status.dirty { color: #b2622d; }
        .save { background: #f2542d; color: #fff; padding: 0 16px; }
        .save:hover { background: #d9431e; }
        .stage { position: relative; touch-action: none; cursor: crosshair; }
        canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .label { display: none; }
        @media (min-width: 560px) { .label { display: inline; } }
      </style>
      <div class="wrap">
        <div class="bar">
          <button data-tool="pen" title="Pen">${svg('pen')}</button>
          <button data-tool="hl" title="Highlighter">${svg('hl')}</button>
          <button data-tool="eraser" title="Eraser">${svg('eraser')}</button>
          <span class="sep"></span>
          ${COLORS.map(c => `<button class="swb" data-color="${c[1]}" title="${c[0]}"><span class="sw" style="background:${c[1]}"></span></button>`).join('')}
          <span class="sep"></span>
          <button data-act="undo" title="Undo">${svg('undo')}</button>
          <button data-act="clear" title="Clear page">${svg('trash')}</button>
          <button data-act="grid" title="Toggle grid">${svg('grid')}</button>
          <button data-act="more" title="Add more space">${svg('plus')}<span class="label">Space</span></button>
          <span class="grow"></span>
          <span class="status"></span>
          <button data-act="dl" title="Download as image">${svg('dl')}</button>
          <button data-act="full" title="Present full screen">${svg('full')}</button>
          <button class="save" data-act="save" title="Save working">${svg('save')}<span class="label">Save</span></button>
        </div>
        <div class="stage"><canvas class="bg"></canvas><canvas class="ink"></canvas></div>
      </div>`;
      this.$ = (s) => r.querySelector(s);
      this.wrap = this.$('.wrap'); this.stage = this.$('.stage');
      this.bg = this.$('.bg'); this.ink = this.$('.ink'); this.statusEl = this.$('.status');
      r.querySelectorAll('[data-tool]').forEach(b => b.onclick = () => { this.tool = b.dataset.tool; this.syncBar(); });
      r.querySelectorAll('[data-color]').forEach(b => b.onclick = () => { this.color = b.dataset.color; if (this.tool === 'eraser') this.tool = 'pen'; this.syncBar(); });
      r.querySelectorAll('[data-act]').forEach(b => b.onclick = () => this.act(b.dataset.act));
      this.stage.addEventListener('pointerdown', (e) => this.down(e));
      this.stage.addEventListener('pointermove', (e) => this.move(e));
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => this.stage.addEventListener(t, () => this.up()));
      this.ro = new ResizeObserver(() => this.layout());
    }
    get key() { return 'workpad:' + (this.dataset.key || this.getAttribute('storage-key') || this._k || 'default'); }
    set storageKey(v) { this._k = v; this.load(); }
    static get observedAttributes() { return ['data-key', 'storage-key']; }
    attributeChangedCallback(n, o, v) { if (o !== v && this.isConnected) { this.cur = null; this.load(); } }
    connectedCallback() { this.ro.observe(this.stage); this.load(); this.syncBar(); }
    disconnectedCallback() { this.ro.disconnect(); }
    load() {
      try {
        const d = JSON.parse(localStorage.getItem(this.key) || 'null');
        if (d) { this.strokes = d.strokes || []; this.h = d.h || 380; this.grid = d.grid !== false; this.savedAt = d.savedAt || null; }
      } catch (e) {}
      this.dirty = false; this.layout(); this.syncBar();
    }
    get scale() { return (this.stage.clientWidth || UNIT) / UNIT; }
    layout() {
      const w = this.stage.clientWidth; if (!w) return;
      const hpx = Math.round(this.h * this.scale);
      this.stage.style.height = hpx + 'px';
      const dpr = window.devicePixelRatio || 1;
      [this.bg, this.ink].forEach(c => { c.width = Math.round(w * dpr); c.height = Math.round(hpx * dpr); });
      this.drawBg(); this.redraw();
    }
    drawBg() {
      const c = this.bg, g = c.getContext('2d'), dpr = window.devicePixelRatio || 1;
      g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, c.width, c.height);
      if (!this.grid) return;
      const step = 25 * this.scale * dpr;
      g.lineWidth = 1; 
      for (let i = 1, x = step; x < c.width; x += step, i++) { g.strokeStyle = i % 4 ? '#f1ebe1' : '#e3d9c8'; g.beginPath(); g.moveTo(Math.round(x) + 0.5, 0); g.lineTo(Math.round(x) + 0.5, c.height); g.stroke(); }
      for (let i = 1, y = step; y < c.height; y += step, i++) { g.strokeStyle = i % 4 ? '#f1ebe1' : '#e3d9c8'; g.beginPath(); g.moveTo(0, Math.round(y) + 0.5); g.lineTo(c.width, Math.round(y) + 0.5); g.stroke(); }
    }
    stroke(g, s) {
      const k = this.scale * (window.devicePixelRatio || 1), p = s.points;
      if (!p.length) return;
      g.save();
      g.lineCap = 'round'; g.lineJoin = 'round';
      if (s.tool === 'eraser') { g.globalCompositeOperation = 'destination-out'; g.strokeStyle = '#000'; }
      else { g.strokeStyle = s.color; if (s.tool === 'hl') g.globalAlpha = 0.3; }
      const base = s.tool === 'hl' ? 18 : s.tool === 'eraser' ? 28 : 3;
      if (p.length === 1) {
        g.fillStyle = g.strokeStyle; g.beginPath(); g.arc(p[0][0] * k, p[0][1] * k, base * k / 2, 0, 7); g.fill();
      } else if (s.tool === 'pen') {
        for (let i = 1; i < p.length; i++) {
          const a = p[i - 1], b = p[i];
          g.lineWidth = base * k * (0.55 + (b[2] ?? 0.5) * 0.9);
          g.beginPath(); g.moveTo(a[0] * k, a[1] * k); g.lineTo(b[0] * k, b[1] * k); g.stroke();
        }
      } else {
        g.lineWidth = base * k; g.beginPath(); g.moveTo(p[0][0] * k, p[0][1] * k);
        for (let i = 1; i < p.length; i++) g.lineTo(p[i][0] * k, p[i][1] * k);
        g.stroke();
      }
      g.restore();
    }
    redraw() {
      const c = this.ink, g = c.getContext('2d');
      g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, c.width, c.height);
      this.strokes.forEach(s => this.stroke(g, s));
    }
    pt(e) {
      const r = this.stage.getBoundingClientRect(), k = this.scale;
      const pr = e.pointerType === 'pen' ? (e.pressure || 0.5) : 0.5;
      return [(e.clientX - r.left) / k, (e.clientY - r.top) / k, pr];
    }
    down(e) {
      if (e.button > 0) return;
      if (e.pointerType === 'pen') this.penSeen = true;
      if (e.pointerType === 'touch' && this.penSeen) return; // palm rejection once a stylus is in use
      this.stage.setPointerCapture(e.pointerId);
      this.cur = { tool: this.tool, color: this.color, points: [this.pt(e)] };
      this.strokes.push(this.cur); this.redraw();
    }
    move(e) {
      if (!this.cur) return;
      const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      evs.forEach(ev => this.cur.points.push(this.pt(ev)));
      const g = this.ink.getContext('2d'), p = this.cur.points;
      if (this.cur.tool === 'pen') this.stroke(g, { ...this.cur, points: p.slice(-evs.length - 1) });
      else this.redraw();
    }
    up() {
      if (!this.cur) return;
      this.cur.points = this.cur.points.map(q => [Math.round(q[0] * 10) / 10, Math.round(q[1] * 10) / 10, Math.round(q[2] * 100) / 100]);
      this.cur = null; this.dirty = true; this.syncBar();
    }
    act(a) {
      if (a === 'undo') { this.strokes.pop(); this.dirty = true; this.redraw(); }
      if (a === 'clear') { if (this.strokes.length && confirm('Clear all working on this example?')) { this.strokes = []; this.dirty = true; this.redraw(); } }
      if (a === 'grid') { this.grid = !this.grid; this.dirty = true; this.drawBg(); }
      if (a === 'more') { this.h += 250; this.dirty = true; this.layout(); }
      if (a === 'save') {
        this.savedAt = Date.now();
        try { localStorage.setItem(this.key, JSON.stringify({ strokes: this.strokes, h: this.h, grid: this.grid, savedAt: this.savedAt })); this.dirty = false; }
        catch (e) { alert('Could not save — browser storage is full.'); }
      }
      if (a === 'dl') {
        const c = document.createElement('canvas'); c.width = this.ink.width; c.height = this.ink.height;
        const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
        g.drawImage(this.bg, 0, 0); g.drawImage(this.ink, 0, 0);
        const link = document.createElement('a'); link.download = (this.dataset.key || 'working') + '.png'; link.href = c.toDataURL('image/png'); link.click();
      }
      if (a === 'full') {
        if (document.fullscreenElement) document.exitFullscreen(); else this.wrap.requestFullscreen && this.wrap.requestFullscreen();
      }
      this.syncBar();
    }
    syncBar() {
      const r = this.shadowRoot;
      r.querySelectorAll('[data-tool]').forEach(b => b.classList.toggle('on', b.dataset.tool === this.tool));
      r.querySelectorAll('[data-color]').forEach(b => b.classList.toggle('on', b.dataset.color === this.color && this.tool !== 'eraser'));
      const s = this.statusEl;
      s.classList.toggle('dirty', this.dirty);
      s.textContent = this.dirty ? 'Unsaved changes' : this.savedAt ? 'Saved ' + new Date(this.savedAt).toLocaleString([], { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : '';
    }
  }
  customElements.define('work-pad', WorkPad);
})();
