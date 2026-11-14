/*
 * <image-slot id="vec-l1-fig9" shape="rounded" radius="24" fit="contain">
 *
 * Shows the diagram registered for its id in data/figures.json.
 * To add a diagram: save it in figures/ and add "<id>": "figures/<file>" to data/figures.json.
 * Slots with no diagram yet render nothing, so students don't see an empty box.
 */
(() => {
  if (customElements.get("image-slot")) return;

  let figures = null;
  const ready = fetch("data/figures.json", { cache: "no-cache" })
    .then(r => r.json())
    .catch(() => ({}))
    .then(m => { figures = m; document.querySelectorAll("image-slot").forEach(el => el.update()); });

  class ImageSlot extends HTMLElement {
    static get observedAttributes() { return ["id", "radius", "fit", "shape"]; }
    connectedCallback() { this.update(); }
    attributeChangedCallback() { this.update(); }
    update() {
      if (!figures) { ready; return; }
      const src = figures[this.id];
      // Hide the slot (and its sized wrapper) when there's no diagram for it.
      const wrap = this.parentElement;
      if (!src) {
        this.style.display = "none";
        if (wrap && wrap.children.length === 1) wrap.style.display = "none";
        this.replaceChildren();
        return;
      }
      this.style.display = "block";
      this.style.width = "100%";
      this.style.height = "100%";
      if (wrap) wrap.style.display = "";
      const radius = this.getAttribute("shape") === "rounded" ? (this.getAttribute("radius") || 16) + "px" : "0";
      let img = this.querySelector("img");
      if (!img) { img = document.createElement("img"); this.replaceChildren(img); }
      img.src = src;
      img.alt = "Diagram from the notes";
      img.style.cssText = `width:100%;height:100%;object-fit:${this.getAttribute("fit") || "contain"};object-position:left center;border-radius:${radius};display:block;`;
    }
  }
  customElements.define("image-slot", ImageSlot);
})();
