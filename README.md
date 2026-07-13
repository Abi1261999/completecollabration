# Flower Dashboard

A React + Vite recreation of the Flower admin dashboard, with working client-side routing via React Router.

## Stack
- React 18 + Vite
- React Router v6 (sidebar links are real routes)
- Tailwind CSS (styling)
- Recharts (bar / area / radial charts)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  main.jsx              # React root + BrowserRouter
  App.jsx               # Layout shell + <Routes>
  navConfig.js           # Single source of truth for sidebar links/routes
  components/
    Sidebar.jsx          # Left nav, highlights active route
    Topbar.jsx           # Search / notifications / user menu
    StatCard.jsx         # Top metric cards
    PlaceholderPage.jsx  # Generic "page ready to build" view
  pages/
    Dashboard.jsx        # Full Overview page (matches the reference design)
```

## Routing

Every sidebar item in `navConfig.js` maps to a real route in `App.jsx`:

- `/` → Dashboard (fully built out, matches the screenshot)
- `/task`, `/ecommerce`, `/calendar`, `/mail`, `/chat`, `/projects`, `/file-manager`, `/notes`, `/contacts` → placeholder pages, ready for you to flesh out

To build a new page: create a file in `src/pages/`, then swap the `PlaceholderPage` for it in `App.jsx`'s route list.

## Notes
- Charts use static sample data in `Dashboard.jsx` — swap in real data/API calls whenever you're ready.
- Colors, spacing, and card styles are defined in `tailwind.config.js` under the `brand` / `ink` palette so the whole app stays consistent if you restyle.
