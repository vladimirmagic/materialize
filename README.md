# Propstore UI (Materialize fork)

Propstore's CSS framework: a fork of [Materialize 1.0](https://materializecss.com/) with the Propstore design layer on top (typography, colors, buttons, icons, site sections).

## Contents

- [Install](#install)
- [Run locally](#run-locally)
- [Bundles](#bundles)
- [Using it on a page](#using-it-on-a-page)
- [Layout and grid](#layout-and-grid)
- [Typography](#typography)
- [Colors](#colors)
- [Components](#components)
- [JavaScript components](#javascript-components)
- [Customizing](#customizing)
- [Gotchas](#gotchas)

## Install

Requires **Node.js 10–14**. The build uses `node-sass` 4.14.1, which fails on newer Node versions with `Node Sass does not yet support your current environment`.

```bash
git clone <repo-url> materialize
cd materialize
git checkout v1-dev
nvm use 14        # or any Node 10–14
npm install
```

## Run locally

```bash
npm start         # = grunt monitor
```

This one command builds everything, watches `sass/`, `js/` and `jade/`, rebuilds on change and serves the repo root with BrowserSync at <http://localhost:8000>. It produces:

- `dist/css/propstore-ui(.min).css` and `lp/css/propstore-lp(.min).css` from `sass/`
- `dist/js/materialize.js` from `js/`
- the `*.html` pages in the repo root from `jade/`

`npm start` is all you need day to day. Separate one-off builds, if you need them:

| Command | Output |
| --- | --- |
| `npx grunt sass_compile` | CSS only |
| `npx grunt js_compile` | `dist/js/materialize.js` only |
| `npx grunt jade_compile` | `*.html` pages only |
| `npx grunt uglify:dist` | `dist/js/materialize.min.js` from `dist/js/materialize.js` (`npm start` doesn't minify JS) |

Build config: [Gruntfile.js](Gruntfile.js).

What you see at <http://localhost:8000>:

- **The top of the left menu** (Getting started, CSS, Components, JavaScript…) is the **original Materialize documentation**, inherited from upstream. It's useful as a reference for the grid, helpers and JS component options, but it's styled as stock Materialize, not Propstore.
- **The Propstore and PropstoreAuction groups at the bottom of the menu** are **our customization**:
  - **Propstore** → **Propstore UI** ([propstore-ui.html](http://localhost:8000/propstore-ui.html)) is the Propstore UI kit (typography, buttons, badges, icons, forms, modals). The other items are full mock-ups of propstore.com pages (Home, Product, Checkout, Account…, **Landing**). They open in a new tab.
  - **PropstoreAuction** contains mock-ups of propstoreauction.com pages. Compare the live site [with our customization](https://propstoreauction.com/) and [without it](https://propstoreauction.com/#nomaterialize) (stock SAM). How it works: [dist/js/README.md](dist/js/README.md).

The menu itself is defined in [jade/_navbar.jade](jade/_navbar.jade).

The `*.html` pages in the repo root are generated from [jade/](jade/) (page list in the `jade` task of [Gruntfile.js](Gruntfile.js)) and are git-ignored. They appear after `npm start`. Edit the sources in `jade/`, not the generated pages. Links to pages below point to their `jade/` sources.

## Bundles

There are two ready-made CSS bundles. Pick **one** per page.

| Bundle | Source | Contents | Use for |
| --- | --- | --- | --- |
| `propstore-lp.min.css` | [sass/propstore-lp.scss](sass/propstore-lp.scss) | Colors, normalize, Propstore typography, landing blocks `lp__*`, `.btn`. No JS. | Lightweight dark promo landing, like [propstore.com/landing](https://propstore.com/landing) |
| `propstore-ui.min.css` | [sass/propstore-ui.scss](sass/propstore-ui.scss) | Full Materialize (grid, forms, modals, carousel, dropdowns…) + all Propstore site styles ([sass/propstore/](sass/propstore/)) | Pages that need forms, modals, carousels, site header/footer |

Start with `propstore-lp`. Switch to `propstore-ui` as soon as you need any [JavaScript component](#javascript-components) or the grid.

Reference pages in this repo:

- [propstore-ui.html](jade/page-contents/propstore_ui_content.html) — UI kit: typography, buttons, badges, icons, forms, modals
- [landing.html](jade/propstore/landing.jade) — landing page on the LP bundle, live at <https://propstore.com/landing>
- [landing-posters.html](jade/propstore/landing-posters.jade), [home.html](jade/propstore/home.jade) — pages on the UI bundle

## Using it on a page

| Asset | Location |
| --- | --- |
| LP CSS | `lp/css/propstore-lp.min.css` |
| UI CSS | `dist/css/propstore-ui.min.css` — prod: `https://content.propstore.com/public/css/propstore-ui.min.css` |
| JS | `dist/js/materialize.min.js` — prod: `https://content.propstore.com/public/js/materialize.min.js` |
| jQuery 3.2.1 | `https://content.propstore.com/public/vendors/jquery-3.2.1.min.js` |
| Font (acumin-pro) | `https://use.typekit.net/dul3srx.css` |
| SVG icon sprite | `dist/defs/svg/sprite.defs.svg` |

**LP bundle** — see the `<head>` and the end of `<body>` in [landing.html](jade/propstore/landing.jade). Put `class="lp"` on `<body>`, hide it with an inline `.lp{opacity:0}` and load the CSS at the end of `<body>`; the stylesheet makes the page visible.

**UI bundle** — see the scripts block at the end of [home.html](jade/propstore/home.jade). `body` is `opacity: 0` until it gets the `loaded` class, which the script adds after it injects the SVG sprite. Without that script the page stays blank.

## Layout and grid

- Page container: `.content` (60px side padding, smaller on mobile). Materialize's `.container` is disabled — don't use it.
- **UI bundle**: standard 12-column Materialize grid — `.row > .col.s12.m6.l4`, offsets `offset-m2` etc. Breakpoints: `s` < 601px, `m` ≥ 601px, `l` ≥ 993px, `xl` ≥ 1201px. Source: [sass/components/_grid.scss](sass/components/_grid.scss).
- **LP bundle**: no grid. Pages are built from `lp__section` blocks with an image + text two-column flex layout (stacks below 680px). Modifiers `lp__section--1…5` set the line color and image, `lp__section--left` mirrors the lines. Other blocks: `lp__text`, `lp__collectibles`, `lp__sell`, `lp__footer-cta`, `lp__footer`. Markup: [landing.html](jade/propstore/landing.jade), styles: [sass/propstore-lp/_lp.scss](sass/propstore-lp/_lp.scss).

## Typography

Font: acumin-pro, 16px / 300 base. Size is set by class, not by tag — pick the tag for semantics and the class for looks: `<h2 class="h2">`, `<p class="p-r">`.

| Class | Use | Size, px (desktop / ≤ 600px) |
| --- | --- | --- |
| `.h1` | Page title | 52 / 36 |
| `.h2` | Section title | 40 / 28 |
| `.h3` | Subtitle | 36 / 28 |
| `.h4` | Small title | 24 |
| `.h5`, `.h6` | Uppercase labels | 14, 12 |
| `.p-l` | Lead paragraph | 28 / 24 |
| `.p-r` | Body text | 20 / 18 |
| `.p-s`, `.p-t` | Small, tiny text | 16, 14 |
| `.c-r`, `.c-s` | Captions | 20, 16 |

The LP bundle overrides `.h1` / `.h2` to 100px / 60px. Source: [sass/propstore/_typography.scss](sass/propstore/_typography.scss).

## Colors

| Color | HEX | SASS variable | Classes (bg / text) |
| --- | --- | --- | --- |
| Navy (base) | `#2D2E41` | `$color-base` | `.blue-grey.darken-4` / `.blue-grey-text.text-darken-4` |
| Purple (primary) | `#764AAF` | `$primary-color` | `.deep-purple` / `.deep-purple-text` |
| Orange | `#FFAA00` | `$color-orange` | `.orange` / `.orange-text` |
| Green | `#19BA5D` | `$color-green` | `.green` / `.green-text` |
| Blue | `#0077E2` | `$color-blue` | `.blue` / `.blue-text` |
| Turquoise | `#11BFC5` | `$color-turquoise` | `.turquoise` / `.turquoise-text` |
| Pink | `#FF96C2` | `$color-pink` | `.pink` / `.pink-text` |
| Red | `#F93838` | `$color-red` | `.red` / `.red-text` |
| Grey | `#C7C7C7` | `$color-grey` | `.grey` / `.grey-text` |

Shades: `.green.darken-1`, `.green-text.text-lighten-2`. Sources: [sass/components/_color-variables.scss](sass/components/_color-variables.scss), [sass/components/_variables.scss](sass/components/_variables.scss).

Utilities (UI bundle): `.left-align`, `.center-align`, `.right-align`, `.hide`, `.hide-on-small-only`, `.hide-on-med-and-down`, `.show-on-small`, `.z-depth-0…5`, `.divider` — see [sass/components/_global.scss](sass/components/_global.scss).

## Components

All of these are rendered in [propstore-ui.html](jade/page-contents/propstore_ui_content.html) — copy markup from there. The LP bundle only has `.btn`, `.icon--arrow-right` and the `.logo-propstore` / `.logo-monogram` logos.

- **Buttons**: `btn`, `btn btn--secondary`, `btn--tertiary`, `btn--quaternary`, `btn-flat`, `btn-flat btn--rounded`, `btn-flat btn--link`, `btn-flat btn--icon`, `btn--facebook`; `disabled` state; ripple via `waves-effect waves-light`. Text + icon: `<span class="btn__title">` + `<i class="icon">`.
- **Icons**: SVG sprite, `<svg width="24" height="24"><use xlink:href="#heart"></use></svg>`. Full list of icon ids in [propstore-ui.html](jade/page-contents/propstore_ui_content.html) (branding, common, payment, social, 96px "big" icons); the sprite is [dist/defs/svg/sprite.defs.svg](dist/defs/svg/sprite.defs.svg).
- **Badges**: `badge`, `badge blue|green|orange|red|turquoise|navy|new` ([sass/components/_badges.scss](sass/components/_badges.scss)). LP equivalent: `lp__section-badge green|blue|turquoise|pink`.
- **Forms**: `input-field` with floating label, `input-field--search`, `checkbox__label` + `filled-in`, radios, `materialize-textarea`, `file-field`, `select`, `datepicker`, `autocomplete`. If you fill inputs from JS, call `M.updateTextFields()`.
- **Site sections** (UI bundle): `hero`, `how`, `landing-cat`, `section-sell`, `faq`, `header`, `footer` — styles in [sass/propstore/](sass/propstore/), markup in [home.html](jade/propstore/home.jade), [landing-posters.html](jade/propstore/landing-posters.jade), [sell.html](jade/propstore/sell.jade), [faq.html](jade/propstore/faq.jade).

## JavaScript components

UI bundle + `materialize.min.js` only. Initialize all at once or one by one with options:

```js
document.addEventListener('DOMContentLoaded', () => {
  M.AutoInit();
  // or: M.Modal.init(document.querySelectorAll('.modal'), { opacity: .75 });
});
```

Add `no-autoinit` to elements you initialize manually.

| Component | Markup | Demo |
| --- | --- | --- |
| Modal | `.modal-trigger[href="#id"]` + `.modal#id` | [modals.html](jade/modals.jade) |
| Carousel | `.carousel > .carousel-item` | [carousel.html](jade/carousel.jade) |
| Dropdown | `.dropdown-trigger[data-target]` + `ul.dropdown-content` | [dropdown.html](jade/dropdown.jade) |
| Collapsible (FAQ) | `ul.collapsible` | [collapsible.html](jade/collapsible.jade) |
| Tabs | `ul.tabs > li.tab` | [tabs.html](jade/tabs.jade) |
| Tooltip | `.tooltipped[data-tooltip]` | [tooltips.html](jade/tooltips.jade) |
| Sidenav | `.sidenav` + `.sidenav-trigger` | [sidenav.html](jade/sidenav.jade) |
| Select / Datepicker / Autocomplete | `select`, `.datepicker`, `.autocomplete` | [select.html](jade/select.jade), [pickers.html](jade/pickers.jade), [autocomplete.html](jade/autocomplete.jade) |
| Toast | `M.toast({ html: '…' })` | [toasts.html](jade/toasts.jade) |

A modal with a carousel inside (gallery) is in [propstore-ui.html](jade/page-contents/propstore_ui_content.html). Sources: [js/](js/).

## Customizing

Don't edit `sass/components/*` or `sass/propstore/*` for a single page — they compile into the main site CSS. Instead create your own entry file that reuses ours:

1. Create `sass/<your-page>.scss`. Use [sass/propstore-lp.scss](sass/propstore-lp.scss) as a template: import color variables, variables, normalize and typography, then only the components you need (the full list is in [sass/materialize.scss](sass/materialize.scss)), then your own partials.
2. Override `!default` variables **before** importing `components/variables`. `$color-base`, `$color-grey`, `$color-pink` are not `!default` and can only be overridden after it.
3. Add the output to the `sass` tasks in [Gruntfile.js](Gruntfile.js), next to `propstore-lp`.

Conventions:

- BEM class names, as in the rest of the code: `promo`, `promo__title`, `promo--dark`. Use a campaign-specific block name to avoid clashes with site classes.
- Colors from variables or `color("green", "darken-1")`, no hard-coded HEX.
- Media queries from variables: `@media #{$small-and-down}`, `$medium-and-down`, `$large-and-up`, `$breakpoint-tablet`.
- Images on `content.propstore.com/public-img/…`, like the existing landing.

## Gotchas

- The LP bundle sets `html { overflow: hidden }` and scrolls `body.lp` (for the parallax background). `window` scroll events don't fire — listen on `document.body`, and check analytics scroll-depth tracking.
- The LP bundle is dark-only (navy background, white text). For light pages use the UI bundle.
- UI bundle: `body` stays invisible until it has the `loaded` class.
- acumin-pro is served from Propstore's Adobe Fonts (Typekit) project `dul3srx`; a new domain may need to be allowed in that project's settings.
- Don't load both bundles on one page — both define `.btn`, `.h1`, `.h2`.
