# AGENTS.md

## Cursor Cloud specific instructions

**Product:** `flower-dashboard` — a frontend-only React SPA (Vite + React Router + Tailwind + Recharts). All data is hardcoded in components; there is no backend, database, auth, or environment variables.

**Services:** Single Vite dev server. Standard commands live in `package.json`:
- Dev server: `npm run dev` — serves on the fixed port **5173** (set in `vite.config.js`, no auto-fallback, so free the port first if it's taken).
- Build: `npm run build` (outputs to `dist/`). Preview a build with `npm run preview` (port 4173).

**Notes:**
- There is no lint script and no test suite in this repo.
- The build emits a harmless "chunks larger than 500 kB" warning; this is expected, not an error.
- Routes: `/` (Dashboard), `/arttemplate` (profile page), and various sidebar links that render a placeholder page.
- Gotcha: `node_modules/` is committed to the repo but with Windows-only native binaries (esbuild/rollup). On Linux you must run `npm install` (the update script does this) to fetch the correct platform binaries, or `npm run dev`/`npm run build` will fail. This reinstall produces a large `node_modules` working-tree diff — do NOT commit it.
