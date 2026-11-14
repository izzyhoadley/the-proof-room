# The Proof Room — Mathematics Interactive

A static site. No build step: upload this folder to any web host and open `index.html`.
It does need to be served over http(s) (it loads `data/*.json`), so for local testing run:

```bash
python3 -m http.server 8000
```

then open http://localhost:8000.

## Where things live

| What | File |
| --- | --- |
| Page markup (all screens) | `index.html`, inside `<script id="app-template">` |
| Course list, topics, exam-watch questions, vectors lessons, page logic | `js/app.js` |
| Notes for the other topics | `data/course-content.json` |
| "Check yourself" quizzes for the other topics | `data/quizzes.json` |
| Diagrams in the notes | `figures/` + `data/figures.json` |
| Colours, fonts, buttons (Organic design system) | `css/organic.css`; site extras in `css/site.css` |
| Handwriting pad on example questions | `js/work-pad.js` (saves to the student's own browser) |
| Template runtime (`{{ }}`, `sc-if`, `sc-for`) | `js/runtime.js` |
| KaTeX and Preact, bundled so no CDN is needed | `vendor/` |

## Page addresses

Every page has its own address, so Back/Forward, refresh and bookmarks work, and you can
link students straight to a lesson:

| Page | Address |
| --- | --- |
| Home | `index.html#/` |
| Specialist Maths | `#/specialist` |
| A topic | `#/specialist/vec3d` (topic ids are in `TOPICS` in `js/app.js`) |
| A lesson | `#/specialist/vec3d/3` |
| A lesson on a given tab | `#/specialist/vec3d/3/practice` (or `/video`) |

Switching tabs updates the address but doesn't add a Back step. Bad addresses fall back to
the nearest page that exists.

## Common jobs

- **Add a diagram:** put the image in `figures/`, then add `"<slot id>": "figures/<file>"` to
  `data/figures.json`. Slot ids follow the pattern `vec-l1-fig9` (topic, lesson, block number).
  Slots without a diagram are hidden.
- **Add lesson videos:** the Video tab looks for `lessons/<topic>/lesson-<n>.mp4`
  (Vectors lesson 3 uses `lessons/vectors/scalar-product.mp4`).
- **Change the home grid columns, opening tab, or instant quiz feedback:** the settings at the
  bottom of `js/app.js`.
