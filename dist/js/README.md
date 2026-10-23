# propstoreauction.js

Customization script for [propstoreauction.com](https://propstoreauction.com/). That site runs on a third-party auction platform (SAM), whose server-rendered pages don't match the Propstore design. This script runs on every SAM page and turns it into a Propstore-styled page: it rebuilds markup, adds the Propstore header and footer, and wires up Materialize components.

## Deploy

1. Edit `dist/js/propstoreauction.js` here (and the styles in `sass/`) with `npm start` running. Test locally on the `propstoreauction-*.html` mock-ups (local copies of real SAM pages, sources in `jade/propstore/content/`).
2. Copy the files to the [vladimirmagic/Propstore](https://github.com/vladimirmagic/Propstore) repo:

   | From (this repo) | To (Propstore repo) | Served at |
   | --- | --- | --- |
   | `dist/js/propstoreauction.js` | `/webapp/public/js/` | `https://content.propstore.com/public/js/propstoreauction.js` |
   | `dist/js/materialize.min.js` | `/webapp/public/js/` | `https://content.propstore.com/public/js/materialize.min.js` |
   | `dist/css/propstore-ui.min.css` | `/webapp/public/css/` | `https://content.propstore.com/public/css/propstore-ui.min.css` |

3. Pushing to that repo deploys automatically.

   `https://content.propstore.com/public-img/` is **not** part of this deploy. The Propstore team updates it manually. It holds the live `public-img/sam-custom/sam-custom.css`, `public-img/sam-custom/sam-custom.js` and the other scripts from Custom Public Footer, and Propstore edits them there. The `dist/css/sam-custom.css` in this repo is an old copy kept for local testing; it is not deployed and may be out of date.
4. In the SAM admin, [Layout and site customization](https://propstoreauction.com/admin/manage-system-parameter/layout-and-site-customization), bump the `?v=` date of the changed files in **Custom Public Header** to bust the cache.

## How it's wired into SAM

**Custom Public Header** (SAM admin) loads, in this order:

```html
<script>let URL_PROPSTORE = 'https://propstore.com/'; const IS_REDIRECT_TO_HOLDING_ROOM = false;</script>
<script src="https://content.propstore.com/public/js/sam-custom.js?v=…"></script>
<link href="https://use.typekit.net/dul3srx.css" rel="stylesheet" data-v2>
<link href="https://content.propstore.com/public/css/propstore-ui.min.css?v=…" rel="stylesheet" data-v2>
<script src="https://content.propstore.com/scripts/moment.min.js"></script>
<script src="https://content.propstore.com/public/js/materialize.min.js"></script>
<script src="https://content.propstore.com/public-img/sam-custom/sam-custom.js?v=…"></script>
<script src="https://content.propstore.com/public/js/propstoreauction.js?v=…"></script>
```

`data-v2` marks our styles. On auth pages and with `#nomaterialize` the script removes everything else or everything with `data-v2`, respectively.

**Custom Public Footer** (SAM admin) holds static Propstore markup that the script uses:

- `footer__inner`: the Propstore footer (menus, social links, copyright)
- `header.auc-header`: the Propstore header and `#sidenav` mobile menu; the script adds Sign In / Sign Out links to it
- `hero.auc__hero`: a hidden hero block that the script fills with auction data (title, date, badge, buttons) and shows
- `loader-block`: the loading overlay
- hidden `dropdown-content` tooltips (reserve price, bids placed, buyer's premium, Buy Now)
- `sam-custom.css`, extra scripts (`sTPItalicsApplier.js`, `upcoming-tag-to-live.js`), reCAPTCHA, Google Tag Manager

When changing classes used by this markup, update the footer HTML in the admin as well.

## What it does

On `DOMContentLoaded`:

1. **Bootstrap.** Loads the SVG sprite from `propstoreauction.com/assets/custom/sprite.defs.svg` and adds `body.loaded` (the page is `opacity: 0` until then). Waits for `M` (Materialize) to be available.
2. **Per-page logic**, chosen by the class SAM puts on `<body>`:

   | `body` class | Page | Main changes |
   | --- | --- | --- |
   | `lot-details-index` | Lot (product) page | Gallery carousel, Viewer.js zoom, bid / Buy Now blocks, offer and shipping-quote modals |
   | `auctions-list` | Auctions list | Auction cards, status badges, currency conversion |
   | `auctions-catalog`, `search-index`, `my-items` | Catalog, search, My items | Lot cards, category badges, filters, prices with buyer's premium |
   | `auctions-bidding-history` | Bid history | Table restyling |
   | `auctions-confirm-bid`, `auctions-confirm-buy` | Bid / buy confirmation | Amount with buyer's premium (`BUYERS_PREMIUM = 1.26`) |
   | `auctions-info` | Auction info | Status (upcoming / in progress / closed), calendar reminders |
   | `auctions-live-sale` | Live sale | `MutationObserver`s on SAM's live-bidding labels (lot, current bid, buttons, messages, upcoming lots) to keep the custom UI in sync |
   | `auctions-registration-required` | Registration required | Redirect to registration on propstore.com |
   | `login`, `signup`, `forgot-password` | Auth pages | Replaced by Propstore SSO (`openSSO`) |

3. **Common to all pages.** Sign In / Register or Sign Out links in the header and sidenav (via propstore.com SSO), sticky header on scroll, initialization of Materialize components (Collapsible, Materialbox, Modal, Tabs, FormSelect, Sidenav, CharacterCounter), reCAPTCHA rendering, a loader overlay for redirects.

## Other contents

- `BADGE_CATEGORY`: SAM category id → badge title and color (Poster, Collectibles, Replica, No Reserve…).
- `getParedAuction()`: finds paired auctions in `PARED_AUCTIONS`, a global defined by the page.
- Calendar helpers at the end of the file: `generateCalendarButton`, `generateICSFileURL`, `generateGoogleCalendarURL` for "Auction Alert" reminders (Outlook / Google / SMS).
- An inlined copy of [Viewer.js](https://fengyuanchen.github.io/viewerjs) 1.10.5 for image zoom.

## Debugging

Add `#nomaterialize` to the URL to disable the script and see the original SAM page:

- with our customization: <https://propstoreauction.com/>
- without it (stock SAM): <https://propstoreauction.com/#nomaterialize>

## sam-custom.css: per-auction tweaks

`sam-custom.css` is for changes that apply to **one auction or one lot**, not to the whole site: header images, copyright lines, date fixes, layout fixes for a specific sale. It's loaded in **Custom Public Footer**, after `propstore-ui.min.css`, so its rules win.

The live file is <https://content.propstore.com/public-img/sam-custom/sam-custom.css>, and **Propstore edits it**. [../css/sam-custom.css](../css/sam-custom.css) here is an old copy for local testing (see [Deploy](#deploy)). The examples below show how the file works.

### Targeting an auction

SAM puts the page type and the auction id on `<body>`:

```html
<body class="lot-details lot-details-index auction550 type-timed-sale">   <!-- lot page -->
<body class="auctions auctions-catalog auction475 type-timed-sale">       <!-- catalog -->
```

So scope rules with `.auction<ID>`, plus the page class if needed:

```css
/* header image for auction 319: catalog and lot page */
.auction319 .hero__image { background-image: url('https://s3.eu-west-1.amazonaws.com/content.propstore.com/auction/…/Catalog.jpg') !important; }
.auction319.lot-details .hero__image { background-image: url('…/Day01.jpg') !important; }
```

Older rules target the catalog form instead: `form[action*="catalog/374/"] …`. The auction id is in the catalog URL (`/auctions/catalog/id/550`).

### Replacing text that SAM renders

SAM's HTML can't be edited, but CSS can hide it and draw new text with a pseudo-element:

```css
/* replace the date shown for auction 322 */
.auction322 .hero__static-date { font-size: 0; }              /* hide the original text */
.auction322 .hero__static-date:after {
  content: " Sep 15 2022";                                       /* new text */
  font-size: 16px;
}

/* add a copyright line under every image in the lot gallery of auction 374 */
form[action*="catalog/374/"] .product__slider > .carousel-item:after {
  content: "© 2023 Sony Pictures Television Inc. All Rights Reserved.";
  display: block;
  font-size: 10.5px;
  text-align: center;
}
```

- **Hide text:** `font-size: 0` on the element, which keeps the layout and lets the `:after` set its own size. To hide a whole block, use `display: none`.
- **New text:** `content: "…"` in `:before` / `:after`. It's plain text only (no links or markup) and can't be selected or copied.
- For anything more than text (links, new blocks), change the markup from JS in `propstoreauction.js` instead.

### Passing settings to propstoreauction.js

Some values are not styles but **settings that `propstoreauction.js` reads from the CSS**. This way Propstore can change a date or a button link for one auction without touching the script.

```css
#customRegisterButton510:before { content: 'https://propstoreauction.com/auctions/catalog/id/508?page=1&view=grid'; }  /* button URL */
#customRegisterButton510:after  { content: 'View Lots & Bid Now'; }                                                   /* button title */
#customDate510:before           { content: 'Jan 27 2026 − Feb 11 2026'; }                                             /* date text */
```

How it works: the script appends an empty `<div id="customDate510">` to a hidden container (`#div-hidden`), reads its `:before` / `:after` `content` with `getComputedStyle`, and uses that value instead of what SAM renders. If there's no rule, SAM's own value is used. The number is the auction id.

| Selector | Value | Where it's used |
| --- | --- | --- |
| `#customRegisterButton<ID>:before` | URL; the button opens it in a new tab | Lot page, auctions list |
| `#customRegisterButton<ID>:after` | Button title (default "Register for auction" / "Sign in to bid") | Lot page, auctions list |
| `#customDate<ID>:before` | Auction date text shown instead of SAM's dates | Auctions list, catalog, live sale |
| `#customDateStart<ID>:before`, `#customDateEnd<ID>:before` | Start / end date; sets the Upcoming / Live / Ended badge | Auctions list |
| `#customLots<ID>:before` | Lots text on the auction card | Auctions list |
| `#customCategories<ID>:before` | Any value (e.g. `'open'`) opens the categories filter | Catalog |

`#customTitle<ID>` still appears in the CSS, but the code that reads it is commented out.

Rules in the file are grouped by comments (`COPYRIGHT FORMAT`, `<Auction> - Header Graphics`…), with the auction name in each comment.

## Related files

- [sass/propstore/_propstoreauction*.scss](../../sass/propstore/): styles for these pages (part of `propstore-ui.css`)
