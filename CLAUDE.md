# ICNA Mosque Directory — Claude Code Notes

## Project Overview
Vanilla JS single-page application (no framework) for browsing Islamic centers and mosques across the United States.

## Stack
- **Frontend**: Plain HTML + CSS + vanilla JS (no build step required)
- **Backend**: Express.js API in `api/` directory
- **Data**: Static JS arrays in `data/mosques.js`
- **i18n**: `i18n/translations.js` — supports EN, AR, UR, ES

## Key Files
| File | Purpose |
|------|---------|
| `index.html` | Main SPA shell |
| `app.js` | All application logic, views, state |
| `styles.css` | All styling including multi-theme CSS custom properties |
| `data/mosques.js` | Mosque dataset + lookup tables |
| `i18n/translations.js` | Translation strings for all 4 languages |
| `api/` | Express.js backend |

## Data Structure (mosques.js)
```js
{
  id: 110, code: "NY-001",
  name: "...",
  names: { ar: "...", ur: "...", es: "..." },
  city: "...", cityId: 85,
  county: "...", countyId: 59,
  state: "NY", stateId: 34,
  locationUrl: "https://maps.google.com/?q=...",
  websiteUrl: "https://...",
  latitude: 40.xxxx, longitude: -73.xxxx,
  boardMembers: [
    { name: "...", title: "Imam" }
  ]
}
```

## Lookup Tables in mosques.js
- `LOOKUP_STATES` — US states with i18n names
- `LOOKUP_CITIES` — city lookup (last id: 84)
- `LOOKUP_COUNTIES` — county lookup (last id: 58)
- `LOOKUP_TITLES` — board member title lookup

## Current Dataset Stats (as of Sprint 4)
- **109 mosques** across 25+ states
- Last mosque ID: 109 | Last cityId: 84 | Last countyId: 58
- State IDs: NY=34, NJ=30, PA=39, TX=44, IL=14

## Theming System
Themes toggled via `body[data-theme="..."]` attribute:
- `light` — Classic Light
- `dark` — Dark (default)
- `dark-navy` — Dark Navy & Gold
- `ocean-teal` — Ocean Teal

CSS custom properties defined per theme block in `styles.css`.

## i18n System
- `t(key)` — returns translated string for current language
- `setLanguage(lang)` — switches language, calls `applyTranslations()`
- `applyTranslations()` — re-renders all dynamic content; also calls `renderStatsView()` when on stats tab

## Stats Tab
- `renderStatsView()` → calls `renderStateChart()`, `renderMemberBreakdown()`, `renderCoverageMetrics()`, `updateStats()`
- `getMosqueName(m)` — returns localized mosque name

## Deployment
- **GitHub Pages**: push to `gh-pages` branch (static frontend only)
- **Vercel / Render**: supports Express.js backend in `api/`
