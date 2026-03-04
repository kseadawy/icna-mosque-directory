# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ICNA Mosque Directory — a vanilla JS SPA for browsing US Islamic centers and mosques. No build step for the frontend. The backend is a separate Express.js API that connects to a Microsoft Access database.

## Running the Project

**Frontend** — open `index.html` directly in a browser, or serve with any static file server (e.g., VS Code Live Server on port 5500).

**Backend API** (optional, requires 64-bit MS Access / ACE OLEDB runtime):
```bash
cd api
cp .env.example .env   # then set DB_PATH to absolute path of ICNA_MosqueDB.accdb
npm install
npm run dev            # nodemon, restarts on change — http://localhost:3001/api/v1
npm start              # production
npm test               # jest with coverage
```

The frontend does **not** call the API — it reads directly from `data/mosques.js`. The API (`api/`) is a standalone Phase 2 service that reads from the Access database (`database/ICNA_MosqueDB.accdb`).

## Architecture

### Frontend (`index.html` + `app.js` + `styles.css`)

Single global `state` object in `app.js` holds all runtime state (filtered data, current view, pagination, sort, auth session, map references). No reactive framework — mutations go through explicit render calls.

**View system** — `switchView(view)` sets `state.currentView` and shows/hides the four main panels:
- `table` → `renderTable()` + `renderPagination()`
- `map` → `initMap()` / `updateMapMarkers()` (Leaflet + MarkerClusterGroup via CDN)
- `stats` → `renderStatsView()` → `renderStateChart()`, `renderMemberBreakdown()`, `renderCoverageMetrics()`, `updateStats()`
- `admin` → `renderAdminView()` → sub-tabs: mosques, boardmembers, users, titles

**Data flow**: `applyFilters()` recomputes `state.filtered` from `state.data`, then calls `renderTable()`. All filter/sort/search inputs funnel through `applyFilters()`.

**Auth** — `auth/auth.js` handles login/logout using `localStorage`. Roles: `admin` (full CRUD), `editor` (no delete, no user management). Admin CRUD in `app.js` mutates `state.data` in-memory only — no API calls. Session restored via `restoreSession()` on load.

### i18n (`i18n/translations.js`)

`currentLang` global (en/ar/ur/es). `t(key)` looks up `TRANSLATIONS[currentLang][key]`. `setLanguage(lang)` stores to `localStorage` and calls `applyTranslations()`, which re-renders all dynamic content. When on the stats view, `applyTranslations()` also calls `renderStatsView()` to re-render translated chart labels.

Localized name helpers: `getMosqueName(m)`, `getMemberName(m)`, `getMemberTitle(m)`, `getCityName(id)`, `getCountyName(id)`, `getStateName(code)` — all fall back to English if the current language key is missing.

**Adding a translation key**: add to all 4 language objects in `TRANSLATIONS` in `i18n/translations.js`, then call `t('yourKey')` in `app.js`.

### Theming (`styles.css`)

Theme set via `body[data-theme="..."]` attribute (persisted in `localStorage`). Four themes: `dark-navy` (default), `dark`, `light`, `ocean-teal`. Each theme block overrides CSS custom properties (`--clr-*`, `--bg-*`, etc.) and may add component-specific overrides below. The `dark-navy` body background uses a multi-stop `radial-gradient` on `body::before` to simulate warm amber mosque-architecture corners.

### Data (`data/mosques.js`)

All arrays are plain `const` globals loaded via `<script>` tag:
- `MOSQUES_DATA` — 131 entries; last id: **131**
- `LOOKUP_CITIES` — last id: **104**
- `LOOKUP_COUNTIES` — last id: **76**
- `LOOKUP_STATES`, `LOOKUP_TITLES`

**Mosque entry shape:**
```js
{
  id: 131, code: "PA-006",
  name: "...", names: { ar: "...", ur: "...", es: "..." },
  city: "Reading", cityId: 104,
  county: "Berks", countyId: 76,
  state: "PA", stateId: 39,
  locationUrl: "https://maps.google.com/?q=...",
  websiteUrl: "https://...",
  latitude: 40.33, longitude: -75.92,
  boardMembers: [
    { name: "...", title: "Imam" }
    // full i18n shape: { name, names:{ar,ur,es}, title, titles:{ar,ur,es} }
  ]
}
```

State IDs (common): NY=34, NJ=30, PA=39, TX=44, IL=14, CA=5, VA=47.

When adding mosques, always increment the lookup IDs sequentially and add corresponding entries to `LOOKUP_CITIES` and `LOOKUP_COUNTIES`. Reuse existing cityId/countyId when the city/county already exists.

### Backend API (`api/`)

Express.js REST API backed by MS Access via `node-adodb` (Windows only — requires ACE OLEDB 12.0 driver).

| Route | Description |
|-------|-------------|
| `GET /api/v1/mosques` | List with filters: `?state=NY&city=...&q=...&page=1&limit=25&sort=name&dir=asc` |
| `GET /api/v1/mosques/:id` | Single mosque with board members |
| `POST /api/v1/mosques` | Create mosque |
| `PUT /api/v1/mosques/:id` | Update mosque fields |
| `DELETE /api/v1/mosques/:id` | Delete mosque |
| `GET /api/v1/mosques/:id/members` | Board members for a mosque |
| `GET /api/v1/mosques/export/csv` | CSV export |
| `GET /api/v1/lookup/states\|counties\|cities\|titles` | Lookup tables |
| `GET /api/v1/health` | Health check |

DB tables: `tblMosque`, `tblCity`, `tblCounty`, `tblState`, `tblBoardMember`, `tblBoardTitle`. All queries go through `api/db/connector.js` (`query()` / `execute()` / `ping()`).

### Database (`database/`)

- `ICNA_MosqueDB.accdb` — MS Access 2010+ database (source of truth for the API)
- `CreateDB.bas` — VBA macro that creates the schema
- `database/seed/mosques_seed.csv` — seed data

## Key Patterns

- **XSS safety**: always use `escHtml(str)` before injecting user-visible strings into `innerHTML`
- **Toast notifications**: `showToast(msg, icon)` for non-blocking feedback
- **Modal pattern**: `showModal(id)` / `closeModal()` toggle a single shared `#modal-overlay`
- **Admin overlay forms**: separate overlays `#mosque-form-overlay` and `#bm-form-overlay` with their own open/close/save functions
- **Pagination**: `renderPagination()` reads `state.page` and `state.perPage`; call after any filter change
