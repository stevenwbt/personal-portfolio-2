# stéwithme — website trial 03

Steven Heng's portfolio landing page. Vite + React + Tailwind v4.

```bash
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## How the landing page is built

The page is a **stage**: one full-viewport container in `src/App.jsx` that the
pieces sit on.

- At `lg` and up each piece is absolutely positioned. Positions live in
  `src/data/stage.js` as percentages (`top` / `left` / `w`) and are applied by
  the `.stage-item` rule in `src/index.css`.
- Below `lg` the same rule stops applying, so everything falls back into normal
  document flow: intro, wordmark, a two-up photo gallery, the colour chips, then
  the Seattle readout.

To move a photo or a chip, edit its percentages in `src/data/stage.js` — no
component changes needed.

## Pages & routing

`src/router.js` is a ~20-line path router — pushState plus a popstate listener,
which is enough for a handful of pages and keeps the back button working.
`App.jsx` maps a pathname to a page component and renders the shared shell
(nav, smooth-scroll wrapper, footer) around it. `components/Link.jsx` is the
internal link; modified clicks fall through so cmd-click still opens a tab.

| Route | Page |
| --- | --- |
| `/` | `pages/Home.jsx` |
| `/work/google-android-security` | `pages/CaseGoogle.jsx` |

Adding a case study is: a page component, an entry in `PAGES`, and an `href` on
that project in `src/data/work.js` (which is what turns its card into a link).

**Deploying:** these are real paths, not hashes, so the host must fall back to
`index.html` for unknown routes or a deep link 404s. On Netlify that's a
`_redirects` line (`/* /index.html 200`); on Vercel a rewrite; on GitHub Pages
you'd need the 404.html trick or hash routing instead.

## Pieces

| File | What it is |
| --- | --- |
| `components/Nav.jsx` | Floating serif pill nav |
| `components/Intro.jsx` | Headline, subhead, prev-at line |
| `components/Wordmark.jsx` | Logo + `[stay with me]` |
| `components/Snapshot.jsx` | One scattered photo (grayscale → colour on hover) |
| `components/ChipField.jsx` | The four colour squares and the clover interaction |
| `components/Clover.jsx` | A stamped clover: the four petals, frozen |
| `components/Footprint.jsx` | Live Seattle clock + coordinates |
| `components/Work.jsx` | The project grid below the landing stage |
| `pages/CaseGoogle.jsx` | The Google Android Security case study |

The case study's spacing is a rhythm system rather than per-element margins:
a section gets `.case-section`, eyebrows `.eyebrow`, and content blocks
(images, stat rows, card lists, callouts) `.case-block`. Gaps then follow from
what sits next to what — 15px eyebrow to heading, 20px heading to body and
between paragraphs, 40px around a block. New content inherits the right
spacing without being told.

The pipeline diagram is an animated GIF. A GIF can't be paused, so it's wrapped
in a `<picture>` whose `<source media="(prefers-reduced-motion: reduce)">`
serves the animation's final frame instead — which is the completed diagram, so
nothing is lost.
| `components/About.jsx` | Bio, crossfading portrait, and the trail box |
| `components/about/Peek.jsx` | A dotted word that pins one snapshot |
| `components/about/TrailBox.jsx` | The dashed box both behaviours draw into |

## Smooth scrolling

`hooks/useSmoothScroll.js` sets up GSAP ScrollSmoother (`smooth: 2`,
`effects: true`) plus the scroll-linked reveals for the work cards and the
about block.

Two things this constrains:

- ScrollSmoother transforms `#smooth-content` to ease the page along, which
  breaks `position: fixed` inside it. `<Nav>` therefore sits **outside** the
  wrapper in `App.jsx` — moving it in will unpin it.
- `effects: true` is what activates the `data-speed` attributes. Put them on
  something *inside* a laid-out box, never on the box itself: on the work cards
  the drift pulled the two cards in a row out of line and overlapped the rows,
  because the grid reserves no space for it. The speed now rides an oversized
  wrapper around each cover, clipped by the card.
- Don't put `data-speed` on the landing-stage photos either: they already
  animate `transform` via `.animate-drift`, and the two would fight.

Under `prefers-reduced-motion` the smoother is never created, so the page keeps
native scrolling and every element renders at its resting state.

## The about section

Ported from `website-trial-02` (`WordPeek` + `PhotoTrail`). The dashed box is a
shared display surface with two ways in:

- **Wander the cursor across it** — snapshots drop in sequence, throttled to one
  per 200ms, each tilted, tinted from `TINTS`, and clamped to stay fully inside
  the box. Each lives 1.4s.
- **Hover a dotted word** — that word's photo is pinned centre-stage instead,
  and the hint text steps aside.

Copy, photos and labels live in `src/data/about.js`; `PEEKS` maps each word to
its image, ratio and fit. The lifecycle is a CSS animation (`trail-pop`) rather
than the chain of imperative transitions the original used, so a card cleans
itself up on one timer.

Hidden below 900px and under `hover: none` — it's a pointer-only flourish, and
the bio reads fine without it.

## The work grid

A pinwheel on a five-column grid: row one runs wide | narrow (3 + 2), row two
narrow | wide (2 + 3). Each project's share is its `span` in
`src/data/work.js`; the `.work-card` rule in `index.css` applies it only at
`sm` and up, since below that the list is a single column.

Cards carry a hairline ring — several covers are light UI screenshots that
would otherwise bleed into the white page.

## The clover

Sweep the pointer over a square and it morphs into a circle, trailing behind
the cursor in a chain. Collect all four and each circle morphs again into one
lobe of the clover. Every petal keeps its square’s colour and takes the lobe
its pick-up order earned, so the clover records the order
you collected them in. Press
(or, on touch, lift your finger) and the clover stamps itself onto the page as
a sticker — then the four squares reappear and it starts over. Stickers
accumulate, oldest dropped past 20, and are stored as fractions of the stage so
they hold position through a resize.

The first round uses the layout from the comp. Every round after that scatters
the squares to random spots, chosen by rejection sampling so they clear the
text blocks, the photos, the clovers already stamped, and each other — see
`TEXT_ZONES` and `scatterHomes()`.

### The morph

Squares are real SVG paths, and GSAP's MorphSVG tweens each one from square to
circle the instant it's picked up — the change of shape is the feedback that
it's in hand. Shapes live in `src/data/shapes.js`, all drawn in the same
`0 0 88 88` viewBox — the clover.svg frame — so MorphSVG has a like-for-like
frame to interpolate in.

Once all four are in hand there's a second morph, circle to petal. The petals
come from `assets/images/clover.svg`, which is a single path of twelve cubics —
three per lobe, running top, left, bottom, right around an inner square. Each
`PETAL` entry is one lobe's three cubics closed back to the centre, so the four
together redraw the supplied art exactly.

Because every petal is drawn in the full clover frame, the four chip boxes
**converge on one spot and grow** rather than tiling into quadrants — the art
itself places each lobe. `CLOVER_GROWTH` is how much bigger that shared frame
is than one chip.

This clover's lobes sit at 12 / 3 / 6 / 9 o'clock rather than on the diagonals,
so pick-up order runs top first, then clockwise.

Positions are written straight to `transform` inside a `requestAnimationFrame`
loop, so dragging costs no React re-renders. Tuning knobs sit at the top of
`ChipField.jsx`: `GRAB_RADIUS` for how close the pointer must pass, and the
lerp factors inside `frame()` for how tightly the chain follows.

Desktop only (`lg` and up) — that's where the scattered layout exists. Phones
keep the four squares as a static row.

## Type & colour

- **Helvetica Neue** for body and headlines — a system face on Apple platforms,
  so it costs no request. **Inter** sits behind it in the stack as the closest
  webfont for everyone else, and only downloads if Helvetica Neue is missing.
- **Recoleta** for every serif — nav, headings, stat figures — with
  **Newsreader** behind it as the fallback (see below; Recoleta is local-only
  until the webfont licence lands). **DM Mono** for the footer's bottom row,
  the eyebrow labels and the intro's "prev. at" line.
- "thanks for sté-ing" is an SVG wordmark, not set type — see
  `assets/images/thanks-for-steing.svg`.

### Recoleta

One token, `--font-serif`, drives every serif on the site — nav, page and
section headings, stat figures, card titles. `--font-nav` just reads from it,
so swapping the face is a one-line change.

**Right now: local preview only.** `local/Recoleta-Regular.otf` is served by the
`localFontPreview` plugin in `vite.config.js`, so every serif renders in
Recoleta at `localhost:5173`. The plugin is `apply: 'serve'`, which keeps it out of `vite
build` entirely — the font cannot reach `dist/`, and production falls back to
Newsreader. `local/` and all `.otf`/`.ttf` files are gitignored.

This split exists because the purchased licence
(`~/Downloads/myfonts_order_7523332391082`) is **Desktop**: it lists "Install
the Font Software on any server" under *You may not*, and both a web host and a
git remote are servers. Desktop covers Figma, decks, static exports — and
previewing on your own machine, which is what the plugin does.

**To actually ship it**, buy the separate **Web** licence from MyFonts (it ships
`.woff2`). Then:

1. Put `Recoleta-Regular.woff2` in `src/assets/fonts/`.
2. In `src/index.css`, above `@theme`:

   ```css
   @font-face {
     font-family: 'Recoleta';
     src: url('./assets/fonts/Recoleta-Regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }
   ```

3. Put it at the front of the token:
   `--font-serif: 'Recoleta', 'Newsreader', ui-serif, Georgia, serif;`

Newsreader stays behind it as the fallback, so nothing breaks while the file is
missing. Keep the licence PDF out of the repo, and don't commit the `.otf` —
`src/assets/fonts/` should only ever hold web-licensed formats.

- Colours are Tailwind v4 theme tokens in `src/index.css` (`--color-acid`,
  `--color-blush`, the four `--color-chip-*` values).

## Still to do

- `#work` now resolves; `#about`, `#playground` and `#resume` don't exist yet —
  add routes (e.g. React Router) or sections with those ids.
- Work cards are `<article>`s, not links. Once case-study pages exist, wrap each
  in an anchor so the whole card is clickable.
- Photos come from `website-trial-02/images`. Swap them in
  `src/assets/images/` and update the `alt` and `caption` text in
  `src/data/stage.js`.

Motion (the drift, the halo, the load-in) is disabled under
`prefers-reduced-motion`.
