# Blushora

A modern, animated beauty & personal-care storefront built with React.

Beauty, curated — slowly. An editorial-style demo storefront covering five
houses (Skincare, Makeup, Haircare, Fragrance, Bath & Body) with search,
category filters, sort, wishlist and cart.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS 3**
- **Framer Motion 12** for scroll reveals, drawer physics, marquee and
  staggered grid entries
- **Lucide React** for icons
- **Fraunces** (display serif) + **DM Sans** (body) + **JetBrains Mono**
  (meta captions) via Google Fonts

Requires **Node 20.19+** (works with 22 and 24).

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Structure

```
src/
  App.jsx                  — composes the page
  main.jsx                 — React mount + StoreProvider
  index.css                — design tokens, grain overlay, keyframes, utilities
  data/products.js         — sample catalogue + editorial + testimonials
  context/StoreContext.jsx — cart / wishlist / search / sort / filter state
  components/
    Navbar.jsx             — sticky nav, slide-out search, mobile menu
    Hero.jsx               — asymmetric 12-col hero with spinning seal
    Marquee.jsx            — ingredient ribbon on burgundy
    Categories.jsx         — grid-breaking category tiles
    ProductSection.jsx     — pills, sort, animated grid, empty state
    ProductCard.jsx        — hover reveal CTA, wishlist, rating
    Editorial.jsx          — journal cards with vertical offset
    Testimonials.jsx       — auto-rotating quotes on burgundy
    Newsletter.jsx         — gradient CTA with inline validation
    Footer.jsx             — four-column with meta strip
    CartDrawer.jsx         — right-side drawer with qty controls
    WishlistDrawer.jsx     — right-side drawer with add-to-bag
```

## Design notes

- Warm cream `#F5EDE4` background with a fixed grain overlay — no stark white.
- Palette: deep wine `#4A0E26`, honey `#E9A95C`, blush `#D97A6C`.
- Fraunces italic is used as an editorial accent on headlines.
- Everything stateful (cart, wishlist, filters) lives in `StoreContext`;
  nothing persists across refreshes — add `localStorage` later if desired.

## PRD alignment

Covers every FR in the PRD (`Blushora_PRD-4.docx`):

| PRD | Where |
|---|---|
| FR-01 Home with brand + hero + categories + products | `Hero`, `Categories`, `ProductSection` |
| FR-02 Category navigation | nav links + category pills |
| FR-03 Product search with empty state | nav search + `ProductSection` empty branch |
| FR-04 Sorting by featured / price / name | sort `<select>` in `ProductSection` |
| FR-05 Card with name, category, price, desc, rating | `ProductCard` |
| FR-06 Wishlist toggle | heart on card + `WishlistDrawer` |
| FR-07 Cart with qty + subtotal | `CartDrawer` |
| FR-08 Responsive | tested at 390 / 768 / 1280+ |
| FR-09 Newsletter validation | `Newsletter` |
| FR-10 Demo copy on checkout + newsletter | both drawers / forms call it out |
