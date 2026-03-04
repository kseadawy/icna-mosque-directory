// ============================================================
//  ICNA Mosque Directory — app.js
//  Sprint 4 — Integrated Localization & Admin CRUD
// ============================================================
'use strict';

// ── Password toggle icons ───────────────────────────────────
const SVG_EYE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const SVG_EYE_OFF = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

// ── State ──────────────────────────────────────────────────
const state = {
    data: [],
    filtered: [],
    sortCol: 'name',
    sortDir: 'asc',
    searchTerm: '',
    filterState: '',
    filterCity: '',
    filterCounty: '',
    filterMemberSearch: '',
    filterTitle: '',
    page: 1,
    perPage: 10,
    adminSearchTerm: '',
    adminFilterState: '',
    adminSubTab: 'mosques',
    expandedRows: new Set(),
    currentView: 'table',
    mapInitialized: false,
    leafletMap: null,
    markerCluster: null,
    userMarker: null
};

const $ = id => document.getElementById(id);

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    state.data = [...MOSQUES_DATA];
    state.filtered = [...MOSQUES_DATA];

    restoreLanguage();
    restoreTheme();
    restoreSession();

    populateLookupDropdowns();
    attachEventListeners();
    applyFilters();
    updateStats();
});

// ── Lookups & Localization ──────────────────────────────────
function getStateName(code) {
    const s = LOOKUP_STATES.find(s => s.code === code);
    if (!s) return code;
    return (s.names && s.names[currentLang]) ? s.names[currentLang] : s.name;
}

function getMemberName(member) {
    if (!member) return '';
    if (member.names && member.names[currentLang]) return member.names[currentLang];
    return member.name;
}

function getMemberTitle(member) {
    if (!member) return '';
    if (member.titles && member.titles[currentLang]) return member.titles[currentLang];
    return member.title;
}

function getCityName(nameOrId) {
    const c = typeof nameOrId === 'number' ? LOOKUP_CITIES.find(x => x.id === nameOrId) : LOOKUP_CITIES.find(x => x.name === nameOrId);
    if (!c) return nameOrId;
    return (c.names && c.names[currentLang]) ? c.names[currentLang] : c.name;
}

function getCountyName(nameOrId) {
    const c = typeof nameOrId === 'number' ? LOOKUP_COUNTIES.find(x => x.id === nameOrId) : LOOKUP_COUNTIES.find(x => x.name === nameOrId);
    if (!c) return nameOrId;
    return (c.names && c.names[currentLang]) ? c.names[currentLang] : c.name;
}

function getMosqueName(mosque) {
    return (mosque.names && mosque.names[currentLang]) ? mosque.names[currentLang] : mosque.name;
}

function populateLookupDropdowns() {
    const stateSelect = $('filter-state');
    if (!stateSelect) return;
    stateSelect.innerHTML = `<option value="" id="opt-all-states">${t('allStates')}</option>`;

    const uniqueStates = [...new Map(
        state.data.map(m => [m.state, { code: m.state, name: getStateName(m.state) }])
    ).values()].sort((a, b) => a.name.localeCompare(b.name));

    uniqueStates.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.code;
        opt.textContent = `${s.name} (${s.code})`;
        stateSelect.appendChild(opt);
    });

    populateCityDropdown();
    populateCountyDropdown();
    populateTitleDropdown();
}

// ── Title Storage (localStorage-backed, seeds from LOOKUP_TITLES) ──
function loadTitles() {
    try {
        const raw = localStorage.getItem('icna-titles');
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    saveTitles(LOOKUP_TITLES);
    return LOOKUP_TITLES.map(t => ({ ...t }));
}

function saveTitles(titles) {
    try { localStorage.setItem('icna-titles', JSON.stringify(titles)); } catch (e) {}
}

function populateTitleDropdown() {
    const sel = $('filter-title');
    if (!sel) return;
    const currentVal = sel.value;
    sel.innerHTML = `<option value="">${t('allTitles')}</option>`;
    loadTitles().forEach(title => {
        const opt = document.createElement('option');
        opt.value = title.value;
        opt.textContent = title.names[currentLang] || title.names.en;
        if (title.value === currentVal) opt.selected = true;
        sel.appendChild(opt);
    });
}

function populateCityDropdown(stateCode = '') {
    const sel = $('filter-city');
    if (!sel) return;
    sel.innerHTML = `<option value="" id="opt-all-cities">${t('allCities')}</option>`;
    let src = stateCode ? state.data.filter(m => m.state === stateCode) : state.data;
    [...new Set(src.map(m => m.city))].sort().forEach(name => {
        const opt = document.createElement('option');
        opt.value = name; opt.textContent = getCityName(name);
        sel.appendChild(opt);
    });
}

function populateCountyDropdown(stateCode = '', cityName = '') {
    const sel = $('filter-county');
    if (!sel) return;
    sel.innerHTML = `<option value="" id="opt-all-counties">${t('allCounties')}</option>`;
    let src = state.data;
    if (stateCode) src = src.filter(m => m.state === stateCode);
    if (cityName) src = src.filter(m => m.city === cityName);
    [...new Set(src.map(m => m.county))].sort().forEach(name => {
        const opt = document.createElement('option');
        opt.value = name; opt.textContent = getCountyName(name);
        sel.appendChild(opt);
    });
}

// ── Events ─────────────────────────────────────────────────
function attachEventListeners() {
    let debounce;
    $('search-input')?.addEventListener('input', e => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            state.searchTerm = e.target.value.trim().toLowerCase();
            state.page = 1;
            applyFilters();
        }, 250);
    });

    $('filter-state')?.addEventListener('change', e => {
        state.filterState = e.target.value;
        state.filterCity = state.filterCounty = '';
        populateCityDropdown(state.filterState);
        populateCountyDropdown(state.filterState);
        state.page = 1; applyFilters();
    });

    $('filter-city')?.addEventListener('change', e => {
        state.filterCity = e.target.value;
        state.filterCounty = '';
        populateCountyDropdown(state.filterState, state.filterCity);
        state.page = 1; applyFilters();
    });

    $('filter-county')?.addEventListener('change', e => {
        state.filterCounty = e.target.value;
        state.page = 1; applyFilters();
    });

    $('per-page')?.addEventListener('change', e => {
        state.perPage = parseInt(e.target.value, 10);
        state.page = 1;
        renderTable(); renderPagination(); renderResultsBar();
    });

    $('btn-clear')?.addEventListener('click', clearFilters);
    $('btn-export')?.addEventListener('click', exportCSV);

    $('search-members')?.addEventListener('input', e => {
        state.filterMemberSearch = e.target.value.trim().toLowerCase();
        state.page = 1; applyFilters();
    });

    $('filter-title')?.addEventListener('change', e => {
        state.filterTitle = e.target.value;
        state.page = 1; applyFilters();
    });

    // CSP Compliant Listeners
    $('theme-select')?.addEventListener('change', e => changeTheme(e.target.value));

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    document.querySelectorAll('.view-tab').forEach(tab => {
        const view = tab.id.replace('tab-', '');
        tab.addEventListener('click', () => switchView(view));
    });

    $('btn-login-open')?.addEventListener('click', openLoginModal);
    $('btn-login-close')?.addEventListener('click', closeLoginModal);
    $('btn-logout')?.addEventListener('click', logout);
    $('btn-login-submit')?.addEventListener('click', submitLogin);
    $('btn-near-me')?.addEventListener('click', findNearMe);
    $('btn-add-mosque')?.addEventListener('click', openAddMosqueModal);
    $('btn-print-table')?.addEventListener('click', () => window.print());
    $('btn-modal-close')?.addEventListener('click', closeModal);
    $('btn-mosque-form-close')?.addEventListener('click', closeMosqueForm);
    $('btn-mosque-form-cancel')?.addEventListener('click', closeMosqueForm);
    $('btn-add-member')?.addEventListener('click', () => addMemberToForm());
    $('mosque-form')?.addEventListener('submit', e => { e.preventDefault(); saveMosque(); });

    // Title dropdown auto-fill: selecting a title fills AR/UR/ES fields from LOOKUP_TITLES
    $('form-members-container')?.addEventListener('change', e => {
        const sel = e.target.closest('[data-action="title-autofill"]');
        if (!sel) return;
        const opt = sel.options[sel.selectedIndex];
        const card = sel.closest('.form-member-card');
        if (!card || !opt.value) return;
        card.querySelector('.mbr-title-ar').value = opt.dataset.ar || '';
        card.querySelector('.mbr-title-ur').value = opt.dataset.ur || '';
        card.querySelector('.mbr-title-es').value = opt.dataset.es || '';
    });

    // Password show/hide toggle
    $('btn-toggle-password')?.addEventListener('click', () => {
        const input = $('login-password');
        const btn = $('btn-toggle-password');
        const willShow = input.type === 'password';
        input.type = willShow ? 'text' : 'password';
        btn.innerHTML = willShow ? SVG_EYE_OFF : SVG_EYE;
        btn.classList.toggle('is-visible', willShow);
        btn.setAttribute('aria-label', willShow ? 'Hide password' : 'Show password');
        input.focus();
    });

    // User management
    $('btn-add-user')?.addEventListener('click', openAddUserModal);
    $('btn-user-form-close')?.addEventListener('click', closeUserForm);
    $('btn-user-form-cancel')?.addEventListener('click', closeUserForm);
    $('user-form')?.addEventListener('submit', e => { e.preventDefault(); saveUser(); });
    $('user-form-overlay')?.addEventListener('click', e => { if (e.target === $('user-form-overlay')) closeUserForm(); });

    $('btn-add-title')?.addEventListener('click', openAddTitleModal);
    $('btn-title-form-close')?.addEventListener('click', closeTitleForm);
    $('btn-title-form-cancel')?.addEventListener('click', closeTitleForm);
    $('title-form')?.addEventListener('submit', e => { e.preventDefault(); saveTitle(); });
    $('title-form-overlay')?.addEventListener('click', e => { if (e.target === $('title-form-overlay')) closeTitleForm(); });

    // Board member management
    $('btn-add-board-member')?.addEventListener('click', openAddBoardMemberModal);
    $('btn-bm-form-close')?.addEventListener('click', closeBoardMemberForm);
    $('btn-bm-form-cancel')?.addEventListener('click', closeBoardMemberForm);
    $('bm-form')?.addEventListener('submit', e => { e.preventDefault(); saveBoardMember(); });
    $('bm-form-overlay')?.addEventListener('click', e => { if (e.target === $('bm-form-overlay')) closeBoardMemberForm(); });
    $('bm-form')?.addEventListener('change', e => {
        const sel = e.target.closest('[data-action="bm-title-autofill"]');
        if (!sel) return;
        const opt = sel.options[sel.selectedIndex];
        if (!opt.value) return;
        $('form-bm-title-ar').value = opt.dataset.ar || '';
        $('form-bm-title-ur').value = opt.dataset.ur || '';
        $('form-bm-title-es').value = opt.dataset.es || '';
    });

    // Admin sub-tabs
    ['mosques', 'members', 'titles', 'users'].forEach(tab => {
        $(`admin-tab-${tab}`)?.addEventListener('click', () => switchAdminTab(tab));
    });

    // Delegated click handler for dynamically created rows
    document.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const id = parseInt(btn.dataset.id);

        if (action === 'view-mosque') showModal(id);
        if (action === 'toggle-detail') toggleDetail(id);
        if (action === 'fly-to') flyToMosque(id);
        if (action === 'edit-mosque') openEditMosqueModal(id);
        if (action === 'delete-mosque') deleteMosque(id);
        if (action === 'remove-member') btn.closest('.form-member-card').remove();
        if (action === 'edit-user') openEditUserModal(btn.dataset.uid);
        if (action === 'delete-user') deleteUserFromUI(btn.dataset.uid);
        if (action === 'edit-title') openEditTitleModal(parseInt(btn.dataset.tid, 10));
        if (action === 'delete-title') deleteTitleById(parseInt(btn.dataset.tid, 10));
        if (action === 'edit-board-member') openEditBoardMemberModal(parseInt(btn.dataset.mid), parseInt(btn.dataset.bidx));
        if (action === 'delete-board-member') deleteBoardMember(parseInt(btn.dataset.mid), parseInt(btn.dataset.bidx));
    });

    $('admin-search-input')?.addEventListener('input', e => {
        state.adminSearchTerm = e.target.value.trim().toLowerCase();
        renderAdminView();
    });

    $('admin-filter-state')?.addEventListener('change', e => {
        state.adminFilterState = e.target.value;
        renderAdminView();
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeMosqueForm(); } });
    $('modal-overlay')?.addEventListener('click', e => { if (e.target === $('modal-overlay')) closeModal(); });
    $('mosque-form-overlay')?.addEventListener('click', e => { if (e.target === $('mosque-form-overlay')) closeMosqueForm(); });
}

// ── View Switch ─────────────────────────────────────────────
function switchView(view) {
    state.currentView = view;
    ['table', 'map', 'stats', 'admin'].forEach(v => {
        const panel = $(`view-${v}`);
        const tab = $(`tab-${v}`);
        if (!panel || !tab) return;
        panel.style.display = v === view ? '' : 'none';
        tab.classList.toggle('active', v === view);
        tab.setAttribute('aria-selected', v === view);
    });

    if (view === 'map') {
        if (!state.mapInitialized) initMap(); else updateMapMarkers();
    }
    if (view === 'stats') renderStatsView();
    if (view === 'admin') renderAdminView();
}

// ── Filter & Sort ───────────────────────────────────────────
function applyFilters() {
    let result = [...state.data];

    if (state.searchTerm) {
        result = result.filter(m =>
            m.name.toLowerCase().includes(state.searchTerm) ||
            m.city.toLowerCase().includes(state.searchTerm) ||
            m.county.toLowerCase().includes(state.searchTerm) ||
            m.state.toLowerCase().includes(state.searchTerm) ||
            m.code.toLowerCase().includes(state.searchTerm) ||
            (m.names?.ar && m.names.ar.includes(state.searchTerm)) ||
            (m.names?.ur && m.names.ur.includes(state.searchTerm)) ||
            (m.names?.es && m.names.es.toLowerCase().includes(state.searchTerm))
        );
    }

    if (state.filterState) result = result.filter(m => m.state === state.filterState);
    if (state.filterCity) result = result.filter(m => m.city === state.filterCity);
    if (state.filterCounty) result = result.filter(m => m.county === state.filterCounty);

    if (state.filterMemberSearch) {
        result = result.filter(m => m.boardMembers.some(bm =>
            bm.name.toLowerCase().includes(state.filterMemberSearch) ||
            bm.title.toLowerCase().includes(state.filterMemberSearch)
        ));
    }
    if (state.filterTitle) {
        result = result.filter(m => m.boardMembers.some(bm => bm.title === state.filterTitle));
    }

    result.sort((a, b) => {
        let vA = a[state.sortCol], vB = b[state.sortCol];
        if (state.sortCol === 'name') { vA = getMosqueName(a); vB = getMosqueName(b); }
        const res = String(vA || '').localeCompare(String(vB || ''), undefined, { numeric: true, sensitivity: 'base' });
        return state.sortDir === 'asc' ? res : -res;
    });

    state.filtered = result;

    // Paging boundary check
    const totalPages = Math.ceil(result.length / state.perPage);
    if (state.page > totalPages) state.page = totalPages || 1;
    if (state.page < 1) state.page = 1;

    renderTable(); renderPagination(); renderResultsBar(); renderFilterTags(); updateSortHeaders();
    if (state.mapInitialized && state.leafletMap) {
        updateMapMarkers();
        state.leafletMap.invalidateSize();
    }
}

// ── Render Table ─────────────────────────────────────────────
function renderTable() {
    const tbody = $('mosque-tbody');
    if (!tbody) return;

    // Update header for column accessibility and translation
    const thead = tbody.closest('table').querySelector('thead tr');
    if (thead) {
        thead.innerHTML = `
            <th class="sortable" data-col="code">${t('colCode')}</th>
            <th class="sortable" data-col="name">${t('colName')}</th>
            <th class="sortable" data-col="city">${t('colCity')}</th>
            <th class="sortable" data-col="county">${t('colCounty')}</th>
            <th class="sortable" data-col="state">${t('colState')}</th>
            <th class="no-print">${t('colLocation')}</th>
            <th class="no-print">${t('colWebsite')}</th>
            <th class="no-print">${t('colDetails')}</th>
        `;
        if (can('canEditMosque') || can('canDeleteMosque')) {
            const th = document.createElement('th');
            th.className = 'col-admin-actions no-print';
            th.textContent = t('adminActions');
            thead.appendChild(th);
        }
    }

    if (state.filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted);">${t('noResults')}</td></tr>`;
        return;
    }

    const start = (state.page - 1) * state.perPage;
    const paginated = state.filtered.slice(start, start + state.perPage);

    tbody.innerHTML = paginated.map(m => `
        <tr data-id="${m.id}" class="${state.expandedRows.has(m.id) ? 'expanded' : ''}">
            <td>${escHtml(m.code)}</td>
            <td class="col-name" data-action="view-mosque" data-id="${m.id}" style="cursor:pointer">${escHtml(getMosqueName(m))}</td>
            <td>${escHtml(getCityName(m.city))}</td>
            <td>${escHtml(getCountyName(m.county))}</td>
            <td>${escHtml(getStateName(m.state))}</td>
            <td class="col-actions">
                <a href="${m.locationUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="${t('viewMap')}">🗺️</a>
            </td>
            <td class="col-actions">
                ${m.websiteUrl ? `<a href="${m.websiteUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="${t('viewWebsite')}">🌐</a>` : '—'}
            </td>
            <td style="text-align:center;" class="no-print">
                <button class="btn-icon row-detail-btn ${state.expandedRows.has(m.id) ? 'open' : ''}" data-action="toggle-detail" data-id="${m.id}" aria-label="Toggle details">
                    🔽
                </button>
            </td>
            ${(can('canEditMosque') || can('canDeleteMosque')) ? `
                <td class="col-actions no-print">
                    <div class="admin-row-actions">
                        ${can('canEditMosque') ? `<button class="btn-icon" data-action="edit-mosque" data-id="${m.id}" title="${t('colActionEdit')}">✏️</button>` : ''}
                        ${can('canDeleteMosque') ? `<button class="btn-icon btn-danger-text" data-action="delete-mosque" data-id="${m.id}" title="${t('colActionDelete')}">🗑️</button>` : ''}
                    </div>
                </td>
            ` : ''}
        </tr>
        ${state.expandedRows.has(m.id) ? renderDetailRow(m) : ''}
    `).join('');
}

function renderDetailRow(mosque) {
    const colCount = (can('canEditMosque') || can('canDeleteMosque')) ? 9 : 8;
    return `
        <tr class="detail-row no-print" id="detail-${mosque.id}">
            <td colspan="${colCount}">
                <div class="detail-content">
                    <div class="detail-item">
                        <span class="detail-label">${t('fieldId')} / ${t('fieldCode')}</span>
                        <span class="detail-value">#${mosque.id} — ${escHtml(mosque.code)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">${t('fieldCoords')}</span>
                        <span class="detail-value">${mosque.latitude.toFixed(4)}°N, ${Math.abs(mosque.longitude).toFixed(4)}°W
                            <br><a href="#" data-action="fly-to" data-id="${mosque.id}"
                                class="web-link" style="font-size:.72rem;">🗺 ${t('showOnMap')}</a></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">${t('fieldMembers')} (${mosque.boardMembers.length})</span>
                        <div class="board-members-list">
                            ${mosque.boardMembers.length
            ? mosque.boardMembers.map(bm =>
                `<span class="board-member">${escHtml(getMemberName(bm))} <span class="member-title">${escHtml(getMemberTitle(bm))}</span></span>`).join('')
            : `<span style="color:var(--clr-slate-500);font-size:.8rem">${t('noMembers')}</span>`}
                        </div>
                    </div>
                    <div class="detail-item" style="align-self:center;">
                        <button class="btn btn-outline" style="font-size:.78rem;padding:6px 14px;"
                                data-action="view-mosque" data-id="${mosque.id}">${t('viewFull')}</button>
                    </div>
                </div>
            </td>
        </tr>`;
}

// ── Modal ────────────────────────────────────────────────────
function showModal(id) {
    const m = state.data.find(x => x.id === id);
    if (!m) return;
    const body = $('modal-body');
    $('modal-title').textContent = getMosqueName(m);
    body.innerHTML = `
        <div class="modal-info-grid">
            <div class="modal-info-item">
                <span class="info-label">${t('colCode')}</span>
                <span class="info-value">${escHtml(m.code)}</span>
            </div>
            <div class="modal-info-item">
                <span class="info-label">${t('colState')}</span>
                <span class="info-value">${escHtml(getStateName(m.state))}</span>
            </div>
            <div class="modal-info-item">
                <span class="info-label">${t('colCity')}</span>
                <span class="info-value">${escHtml(getCityName(m.city))}</span>
            </div>
            <div class="modal-info-item">
                <span class="info-label">${t('colCounty')}</span>
                <span class="info-value">${escHtml(getCountyName(m.county))}</span>
            </div>
        </div>
        <div class="modal-board-section">
            <h3>👥 ${t('fieldMembers')}</h3>
            <div class="board-members-grid">
                ${m.boardMembers.map(bm => `
                    <div class="member-card">
                        <strong>${escHtml(getMemberName(bm))}</strong>
                        <span>${escHtml(getMemberTitle(bm))}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="modal-actions-footer">
             <a href="${m.locationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${t('viewMap')}</a>
             ${m.websiteUrl ? `<a href="${m.websiteUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">${t('viewWebsite')}</a>` : ''}
        </div>
    `;
    $('modal-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    $('modal-overlay').style.display = 'none';
    document.body.style.overflow = '';
}

function toggleDetail(id) {
    if (state.expandedRows.has(id)) state.expandedRows.delete(id);
    else state.expandedRows.add(id);
    renderTable();
}

// ── Map ──────────────────────────────────────────────────────
function initMap() {
    if (state.mapInitialized || !window.L) return;
    const map = L.map('leaflet-map', { center: [38.8, -97.5], zoom: 4 });

    // Choose tile layer based on language
    const tileUrl = getTileUrl(currentLang); // Use currentLang for initial load
    state.tileLayer = L.tileLayer(tileUrl, {
        attribution: '© OpenStreetMap | © Wikimedia contributors'
    }).addTo(map);

    state.leafletMap = map;
    state.markerCluster = L.markerClusterGroup({ chunkedLoading: true, maxClusterRadius: 60 });
    map.addLayer(state.markerCluster);
    state.mapInitialized = true;
    updateMapMarkers();
    setTimeout(() => map.invalidateSize(), 300);
}

function getTileUrl(lang) {
    // Always use standard OSM tiles — allowed by CSP and works for all languages.
    // (Wikimedia tile server was discontinued Feb 2023 and is CSP-blocked.)
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
}

function updateMapTileLayer(lang) {
    if (!state.mapInitialized || !state.tileLayer) return;
    const newUrl = getTileUrl(lang);
    state.tileLayer.setUrl(newUrl);
}

function updateMapMarkers() {
    if (!state.mapInitialized || !state.markerCluster) return;
    state.markerCluster.clearLayers();
    state.filtered.forEach(m => {
        if (!m.latitude) return;
        const icon = L.divIcon({ className: 'mosque-marker-icon', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] });
        const marker = L.marker([m.latitude, m.longitude], { icon });
        marker.bindPopup(`
            <div class="popup-title">${escHtml(getMosqueName(m))}</div>
            <div class="popup-meta">${escHtml(getCityName(m.city))}, ${escHtml(getCountyName(m.county))}, ${escHtml(getStateName(m.state))}</div>
            <div class="popup-links">
                <a href="${m.locationUrl}" target="_blank" class="popup-link map">${t('showOnMap')}</a>
                ${m.websiteUrl ? `<a href="${m.websiteUrl}" target="_blank" class="popup-link web">${t('viewWebsite')}</a>` : ''}
            </div>
        `);
        state.markerCluster.addLayer(marker);
    });
}

function flyToMosque(id) {
    const m = state.data.find(x => x.id === id);
    if (!m) return;
    switchView('map');
    setTimeout(() => {
        state.leafletMap.flyTo([m.latitude, m.longitude], 14);
        showToast(`${t('flyingTo')} ${getMosqueName(m)}`, '🗺');
    }, 100);
}

function findNearMe() {
    if (!navigator.geolocation) { showToast('Geolocation not supported', '⚠️'); return; }
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude: lat, longitude: lon } = pos.coords;
        switchView('map');
        setTimeout(() => {
            if (state.userMarker) state.userMarker.remove();
            state.userMarker = L.marker([lat, lon], { icon: L.divIcon({ className: 'user-location-pin', html: '📍' }) }).addTo(state.leafletMap);
            state.leafletMap.flyTo([lat, lon], 10);
            showToast(t('locationFound') || 'Location found!', '📍');
        }, 100);
    });
}

// ── Stats ────────────────────────────────────────────────────
function renderStatsView() {
    renderStateChart();
    updateStats();
}

function renderStateChart() {
    const barChart = document.querySelector('.chart-container');
    if (!barChart) return;
    const counts = {};
    state.filtered.forEach(m => { counts[m.state] = (counts[m.state] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const max = sorted[0]?.[1] || 1;

    barChart.innerHTML = '<div class="bar-chart"></div>';
    const chart = barChart.querySelector('.bar-chart');
    sorted.forEach(([code, count]) => {
        const pct = (count / max) * 100;
        const row = document.createElement('div');
        row.className = 'bar-row';
        row.innerHTML = `
            <span class="bar-label">${escHtml(getStateName(code))}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${pct}%"><span class="bar-count">${count}</span></div></div>
        `;
        chart.appendChild(row);
    });
}

function updateStats() {
    if ($('stat-total')) $('stat-total').textContent = state.data.length;
    if ($('stat-states')) $('stat-states').textContent = new Set(state.data.map(m => m.state)).size;
    if ($('stat-members')) $('stat-members').textContent = state.data.reduce((s, m) => s + m.boardMembers.length, 0);
}

// ── Admin CRUD ───────────────────────────────────────────────
function renderAdminView() {
    if (!can('canViewAdmin')) { switchView('table'); return; }

    // Show Users tab only for admin role
    const usersTabBtn = $('admin-tab-users');
    if (usersTabBtn) usersTabBtn.style.display = can('canManageUsers') ? '' : 'none';

    // If on users tab but lost admin rights, fall back to mosques
    if (state.adminSubTab === 'users' && !can('canManageUsers')) state.adminSubTab = 'mosques';

    // Populate state filter dropdown (used by mosque tab)
    const adminStateSel = $('admin-filter-state');
    if (adminStateSel) {
        const currentVal = adminStateSel.value;
        adminStateSel.innerHTML = `<option value="">${t('allStates')}</option>`;
        LOOKUP_STATES.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.code; opt.textContent = getStateName(s.code);
            if (s.code === currentVal) opt.selected = true;
            adminStateSel.appendChild(opt);
        });
    }

    switchAdminTab(state.adminSubTab || 'mosques');
}

function switchAdminTab(tab) {
    state.adminSubTab = tab;
    const panels = ['mosques', 'members', 'titles', 'users'];
    panels.forEach(p => {
        $(`admin-tab-${p}`)?.classList.toggle('active', p === tab);
        const panel = $(`admin-panel-${p}`);
        if (panel) panel.style.display = p === tab ? '' : 'none';
    });
    if (tab === 'mosques') renderAdminMosqueTable();
    if (tab === 'members') renderBoardMembersTable();
    if (tab === 'titles') renderTitlesTable();
    if (tab === 'users') renderUsersTable();
}

function renderAdminMosqueTable() {
    const tbody = $('admin-mosque-tbody');
    if (!tbody) return;

    let filtered = [...state.data];
    if (state.adminSearchTerm) {
        filtered = filtered.filter(m =>
            m.name.toLowerCase().includes(state.adminSearchTerm) ||
            m.code.toLowerCase().includes(state.adminSearchTerm) ||
            m.city.toLowerCase().includes(state.adminSearchTerm) ||
            (m.names?.ar && m.names.ar.includes(state.adminSearchTerm)) ||
            (m.names?.ur && m.names.ur.includes(state.adminSearchTerm)) ||
            (m.names?.es && m.names.es.toLowerCase().includes(state.adminSearchTerm))
        );
    }
    if (state.adminFilterState) {
        filtered = filtered.filter(m => m.state === state.adminFilterState);
    }

    const thead = tbody.closest('table').querySelector('thead tr');
    if (thead) {
        thead.innerHTML = `
            <th>${t('colCode')}</th>
            <th>${t('colName')}</th>
            <th>${t('userColStatus')}</th>
            <th>${t('userColActions')}</th>
        `;
    }

    tbody.innerHTML = filtered.length ? filtered.map(m => `
        <tr>
            <td>${escHtml(m.code)}</td>
            <td>${escHtml(getMosqueName(m))}</td>
            <td><span class="status-badge active">${t('activeStatus')}</span></td>
            <td class="col-actions">
                <button class="btn btn-ghost btn-sm" data-action="edit-mosque" data-id="${m.id}">✏️ ${t('editBtn')}</button>
                ${can('canDeleteMosque') ? `<button class="btn btn-ghost btn-danger btn-sm" data-action="delete-mosque" data-id="${m.id}">🗑️ ${t('deleteBtn')}</button>` : ''}
            </td>
        </tr>
    `).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--clr-text-muted);padding:1rem;">${t('noResults')}</td></tr>`;
}

// ── Board Members Management ──────────────────────────────────
function renderBoardMembersTable() {
    const tbody = $('board-members-tbody');
    if (!tbody) return;

    const thead = tbody.closest('table').querySelector('thead tr');
    if (thead) {
        thead.innerHTML = `
            <th>${t('bmColMosque')}</th>
            <th>${t('bmColName')}</th>
            <th>${t('bmColTitle')}</th>
            <th>${t('userColActions')}</th>
        `;
    }

    const rows = [];
    state.data.forEach(mosque => {
        (mosque.boardMembers || []).forEach((bm, idx) => rows.push({ mosque, bm, idx }));
    });

    tbody.innerHTML = rows.length ? rows.map(({ mosque, bm, idx }) => `
        <tr>
            <td class="td-name">${escHtml(getMosqueName(mosque))}</td>
            <td><strong>${escHtml(getMemberName(bm))}</strong></td>
            <td>${escHtml(getMemberTitle(bm))}</td>
            <td class="col-actions">
                <button class="btn btn-ghost btn-sm" data-action="edit-board-member" data-mid="${mosque.id}" data-bidx="${idx}">✏️ ${t('editBtn')}</button>
                <button class="btn btn-ghost btn-danger btn-sm" data-action="delete-board-member" data-mid="${mosque.id}" data-bidx="${idx}">🗑️ ${t('deleteBtn')}</button>
            </td>
        </tr>
    `).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--clr-text-muted);padding:1rem;">${t('noResults')}</td></tr>`;
}

function populateBmMosqueDropdown(selectedId = null) {
    const sel = $('form-bm-mosque');
    if (!sel) return;
    sel.innerHTML = `<option value="">— ${t('selectMosqueLabel')} —</option>`;
    state.data.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.code} — ${getMosqueName(m)}`;
        if (m.id === selectedId) opt.selected = true;
        sel.appendChild(opt);
    });
}

function populateBmTitleDropdown(selectedValue = '') {
    const sel = $('form-bm-title');
    if (!sel) return;
    sel.innerHTML = `<option value="">— ${t('allTitles')} —</option>`;
    loadTitles().forEach(title => {
        const opt = document.createElement('option');
        opt.value = title.value;
        opt.dataset.ar = title.names.ar;
        opt.dataset.ur = title.names.ur;
        opt.dataset.es = title.names.es;
        opt.textContent = title.names[currentLang] || title.names.en;
        if (title.value === selectedValue) opt.selected = true;
        sel.appendChild(opt);
    });
}

function openAddBoardMemberModal() {
    $('bm-form-heading').textContent = t('addBoardMemberTitle');
    $('form-bm-mosque-id').value = '';
    $('form-bm-idx').value = '-1';
    $('bm-form').reset();
    populateBmMosqueDropdown();
    populateBmTitleDropdown();
    $('bm-form-error')?.classList.add('hidden');
    $('bm-form-overlay').style.display = 'flex';
    setTimeout(() => $('form-bm-name')?.focus(), 50);
}

function openEditBoardMemberModal(mosqueId, idx) {
    const mosque = state.data.find(m => m.id === mosqueId);
    if (!mosque) return;
    const bm = mosque.boardMembers?.[idx];
    if (!bm) return;

    $('bm-form-heading').textContent = t('editBoardMemberTitle');
    $('form-bm-mosque-id').value = String(mosqueId);
    $('form-bm-idx').value = String(idx);
    populateBmMosqueDropdown(mosqueId);
    populateBmTitleDropdown(bm.title);

    $('form-bm-name').value = bm.name;
    $('form-bm-name-ar').value = bm.names?.ar || '';
    $('form-bm-name-ur').value = bm.names?.ur || '';
    $('form-bm-name-es').value = bm.names?.es || '';
    $('form-bm-title-ar').value = bm.titles?.ar || '';
    $('form-bm-title-ur').value = bm.titles?.ur || '';
    $('form-bm-title-es').value = bm.titles?.es || '';

    $('bm-form-error')?.classList.add('hidden');
    $('bm-form-overlay').style.display = 'flex';
    setTimeout(() => $('form-bm-name')?.focus(), 50);
}

function closeBoardMemberForm() { $('bm-form-overlay').style.display = 'none'; }

function showBmErr(msg) {
    const el = $('bm-form-error');
    if (el) { el.textContent = msg; el.classList.remove('hidden'); }
}

function saveBoardMember() {
    const mosqueId = parseInt($('form-bm-mosque').value);
    const idx = parseInt($('form-bm-idx').value);
    const name = $('form-bm-name').value.trim();

    if (!mosqueId) { showBmErr(t('selectMosqueLabel') || 'Select a mosque'); return; }
    if (!name) { showBmErr(t('nameRequired') || 'Name is required'); return; }

    const mosque = state.data.find(m => m.id === mosqueId);
    if (!mosque) return;
    if (!mosque.boardMembers) mosque.boardMembers = [];

    const titleSel = $('form-bm-title');

    const bmObj = {
        name,
        title: titleSel?.value || '',
        names: {
            ar: $('form-bm-name-ar').value.trim(),
            ur: $('form-bm-name-ur').value.trim(),
            es: $('form-bm-name-es').value.trim()
        },
        titles: {
            ar: $('form-bm-title-ar').value.trim(),
            ur: $('form-bm-title-ur').value.trim(),
            es: $('form-bm-title-es').value.trim()
        }
    };

    if (idx >= 0 && idx < mosque.boardMembers.length) {
        mosque.boardMembers[idx] = bmObj;
    } else {
        mosque.boardMembers.push(bmObj);
    }

    closeBoardMemberForm();
    renderBoardMembersTable();
    showToast(t('saveBoardMemberOk'), '✅');
}

function deleteBoardMember(mosqueId, idx) {
    if (!confirm(t('deleteBoardMemberConfirm') || 'Delete this board member?')) return;
    const mosque = state.data.find(m => m.id === mosqueId);
    if (!mosque?.boardMembers) return;
    mosque.boardMembers.splice(idx, 1);
    renderBoardMembersTable();
    showToast(t('boardMemberDeletedOk'), '🗑️');
}

// ── User Management ──────────────────────────────────────────
function renderUsersTable() {
    const tbody = $('users-tbody');
    if (!tbody) return;

    // Update users table headers
    const thead = tbody.closest('table').querySelector('thead tr');
    if (thead) {
        thead.innerHTML = `
            <th>${t('userColName')}</th>
            <th>${t('userColDisplay')}</th>
            <th>${t('userColRole')}</th>
            <th>${t('userColEmail')}</th>
            <th>${t('userColStatus')}</th>
            <th>${t('userColActions')}</th>
        `;
    }

    const users = getUsers();
    tbody.innerHTML = users.map(u => `
        <tr>
            <td><strong>${escHtml(u.username)}</strong></td>
            <td>${escHtml(u.displayName)}</td>
            <td><span class="role-badge role-${escHtml(u.role)}">${t(u.role === 'admin' ? 'roleAdmin' : 'roleEditor')}</span></td>
            <td>${escHtml(u.email || '—')}</td>
            <td><span class="status-badge ${u.isActive ? 'active' : ''}">${u.isActive ? t('activeStatus') : t('inactiveStatus')}</span></td>
            <td class="col-actions">
                <button class="btn btn-ghost btn-sm" data-action="edit-user" data-uid="${escHtml(u.id)}">✏️ ${t('editBtn')}</button>
                <button class="btn btn-ghost btn-danger btn-sm" data-action="delete-user" data-uid="${escHtml(u.id)}">🗑️ ${t('deleteBtn')}</button>
            </td>
        </tr>
    `).join('');
}

function openAddUserModal() {
    $('user-form-title').textContent = t('addUserTitle') || 'Add User';
    $('form-user-id').value = '';
    $('user-form').reset();
    $('lbl-pw-hint').style.display = 'none';
    $('user-form-error')?.classList.add('hidden');
    $('user-form-overlay').style.display = 'flex';
    setTimeout(() => $('form-user-username')?.focus(), 50);
}

function openEditUserModal(uid) {
    const users = getUsers();
    const u = users.find(x => x.id === uid);
    if (!u) return;
    $('user-form-title').textContent = t('editUserTitle') || 'Edit User';
    $('form-user-id').value = u.id;
    $('form-user-username').value = u.username;
    $('form-user-display').value = u.displayName;
    $('form-user-email').value = u.email || '';
    $('form-user-role').value = u.role;
    $('form-user-password').value = '';
    $('form-user-active').value = String(u.isActive);
    $('lbl-pw-hint').style.display = '';
    $('user-form-error')?.classList.add('hidden');
    $('user-form-overlay').style.display = 'flex';
}

function closeUserForm() {
    $('user-form-overlay').style.display = 'none';
}

function saveUser() {
    const uid = $('form-user-id').value;
    const isEdit = !!uid;
    const username = $('form-user-username').value.trim();
    const displayName = $('form-user-display').value.trim();
    const email = $('form-user-email').value.trim();
    const role = $('form-user-role').value;
    const password = $('form-user-password').value;
    const isActive = $('form-user-active').value === 'true';

    const errEl = $('user-form-error');
    const showErr = msg => { if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); } };

    if (!username || !displayName) { showErr('Username and Display Name are required.'); return; }

    if (isEdit) {
        const updates = { displayName, email, role, isActive };
        if (password) updates.password = password;
        const result = updateUser(uid, updates);
        if (!result.ok) { showErr(result.error || 'Update failed.'); return; }
    } else {
        if (!password) { showErr('Password is required for new users.'); return; }
        const result = addUser({ username, displayName, email, role, password });
        if (!result.ok) { showErr(result.error || 'Could not add user.'); return; }
    }

    closeUserForm();
    renderUsersTable();
    showToast(t('saveUserOk') || 'User saved');
}

function deleteUserFromUI(uid) {
    if (!confirm(t('deleteUserConfirm') || 'Delete this user?')) return;
    const result = deleteUser(uid);
    if (!result.ok) { showToast(result.error, '⚠️'); return; }
    renderUsersTable();
    showToast(t('userDeletedOk') || 'User deleted', '🗑️');
}

// ── Title Management CRUD ─────────────────────────────────────
function renderTitlesTable() {
    const tbody = $('titles-tbody');
    if (!tbody) return;

    const thead = tbody.closest('table').querySelector('thead tr');
    if (thead) {
        thead.innerHTML = `
            <th>${t('titleColCode')}</th>
            <th>${t('titleColName')}</th>
            <th>${t('userColActions')}</th>
        `;
    }

    const lang = currentLang;
    const otherLangs = ['en', 'ar', 'ur', 'es'].filter(l => l !== lang);
    const titles = loadTitles();
    tbody.innerHTML = titles.length ? titles.map(title => {
        const mainName = escHtml(title.names[lang] || title.names.en);
        const badges = otherLangs.map(l => {
            const n = title.names[l];
            if (!n) return '';
            const dir = (l === 'ar' || l === 'ur') ? ' dir="rtl"' : '';
            return `<span class="title-lang-badge"${dir}>${escHtml(n)}</span>`;
        }).join('');
        return `
        <tr>
            <td><code class="td-code">${escHtml(title.code)}</code></td>
            <td>
                <strong>${mainName}</strong>
                ${badges ? `<div class="title-lang-badges">${badges}</div>` : ''}
            </td>
            <td class="col-actions">
                <button class="btn btn-ghost btn-sm" data-action="edit-title" data-tid="${title.id}">✏️ ${t('editBtn')}</button>
                <button class="btn btn-ghost btn-danger btn-sm" data-action="delete-title" data-tid="${title.id}">🗑️ ${t('deleteBtn')}</button>
            </td>
        </tr>`;
    }).join('') : `<tr><td colspan="3" style="text-align:center;color:var(--clr-text-muted);padding:1rem;">${t('noResults')}</td></tr>`;
}

function openAddTitleModal() {
    $('title-form-heading').textContent = t('addTitleTitle') || 'Add Title';
    $('form-title-id').value = '';
    $('title-form').reset();
    $('title-form-error')?.classList.add('hidden');
    $('title-form-overlay').style.display = 'flex';
    setTimeout(() => $('form-title-en')?.focus(), 50);
}

function openEditTitleModal(tid) {
    const title = loadTitles().find(x => x.id === tid);
    if (!title) return;
    $('title-form-heading').textContent = t('editTitleTitle') || 'Edit Title';
    $('form-title-id').value = String(title.id);
    $('form-title-code').value = title.code;
    $('form-title-en').value = title.names.en;
    $('form-title-ar').value = title.names.ar;
    $('form-title-ur').value = title.names.ur;
    $('form-title-es').value = title.names.es;
    $('title-form-error')?.classList.add('hidden');
    $('title-form-overlay').style.display = 'flex';
    setTimeout(() => $('form-title-en')?.focus(), 50);
}

function closeTitleForm() {
    $('title-form-overlay').style.display = 'none';
}

function saveTitle() {
    const idVal = $('form-title-id').value;
    const isEdit = !!idVal;
    const en = $('form-title-en').value.trim();
    const ar = $('form-title-ar').value.trim();
    const ur = $('form-title-ur').value.trim();
    const es = $('form-title-es').value.trim();
    const code = ($('form-title-code').value.trim() || en.replace(/\s+/g, '').slice(0, 6)).toUpperCase();

    const errEl = $('title-form-error');
    const showErr = msg => { if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); } };

    if (!en) { showErr('English title is required.'); return; }

    const titles = loadTitles();

    if (isEdit) {
        const id = parseInt(idVal, 10);
        const idx = titles.findIndex(x => x.id === id);
        if (idx < 0) { showErr('Title not found.'); return; }
        titles[idx] = { ...titles[idx], code, value: en, names: { en, ar: ar || en, ur: ur || en, es: es || en } };
    } else {
        const newId = titles.length ? Math.max(...titles.map(x => x.id)) + 1 : 1;
        titles.push({ id: newId, code, value: en, names: { en, ar: ar || en, ur: ur || en, es: es || en } });
    }

    saveTitles(titles);
    closeTitleForm();
    renderTitlesTable();
    populateTitleDropdown();
    showToast(t('saveTitleOk') || 'Title saved', '✅');
}

function deleteTitleById(tid) {
    if (!confirm(t('deleteTitleConfirm') || 'Delete this title?')) return;
    saveTitles(loadTitles().filter(x => x.id !== tid));
    renderTitlesTable();
    populateTitleDropdown();
    showToast(t('titleDeletedOk') || 'Title deleted', '🗑️');
}

function openAddMosqueModal() {
    $('mosque-form-title').textContent = 'Add New Mosque';
    $('form-mosque-id').value = '';
    $('mosque-form').reset();
    $('form-members-container').innerHTML = '';

    const stateSel = $('form-state');
    stateSel.innerHTML = '<option value="">Select State</option>';
    LOOKUP_STATES.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.code; opt.textContent = s.name;
        stateSel.appendChild(opt);
    });
    $('mosque-form-overlay').style.display = 'flex';
}

function openEditMosqueModal(id) {
    const m = state.data.find(x => x.id === id);
    if (!m) return;
    $('mosque-form-title').textContent = 'Edit Mosque';
    $('form-mosque-id').value = m.id;
    $('form-code').value = m.code;
    $('form-name').value = m.name;
    $('form-name-ar').value = m.names?.ar || '';
    $('form-name-ur').value = m.names?.ur || '';
    $('form-name-es').value = m.names?.es || '';

    const stateSel = $('form-state');
    stateSel.innerHTML = '<option value="">Select State</option>';
    LOOKUP_STATES.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.code; opt.textContent = s.name;
        if (s.code === m.state) opt.selected = true;
        stateSel.appendChild(opt);
    });
    $('form-city').value = m.city;
    $('form-county').value = m.county;
    $('form-lat').value = m.latitude;
    $('form-lon').value = m.longitude;
    $('form-location').value = m.locationUrl || '';
    $('form-website').value = m.websiteUrl || '';
    $('form-members-container').innerHTML = '';
    m.boardMembers.forEach(mb => addMemberToForm(mb));
    $('mosque-form-overlay').style.display = 'flex';
}

function closeMosqueForm() { $('mosque-form-overlay').style.display = 'none'; }

function addMemberToForm(member = null) {
    const container = $('form-members-container');
    const div = document.createElement('div');
    div.className = 'form-member-card';

    const m = member || { name: '', title: '', names: { ar: '', ur: '', es: '' }, titles: { ar: '', ur: '', es: '' } };

    // Build title dropdown options from live title list
    const titleOpts = loadTitles().map(t =>
        `<option value="${escHtml(t.value)}"
            data-ar="${escHtml(t.names.ar)}"
            data-ur="${escHtml(t.names.ur)}"
            data-es="${escHtml(t.names.es)}"
            ${m.title === t.value ? 'selected' : ''}
         >${escHtml(t.names.en)}</option>`
    ).join('');

    div.innerHTML = `
        <div class="form-member-header">
            <h4>Board Member</h4>
            <button type="button" class="btn btn-icon btn-danger btn-sm" data-action="remove-member">✕ Remove</button>
        </div>
        <div class="form-member-grid">
            <div class="mbr-field-group">
                <label>Name (EN)</label>
                <input type="text" placeholder="Full Name" class="mbr-name" value="${escHtml(m.name)}" />
            </div>
            <div class="mbr-field-group">
                <label>Title</label>
                <select class="mbr-title" data-action="title-autofill">
                    <option value="">— Select Title —</option>
                    ${titleOpts}
                </select>
            </div>
            <div class="mbr-field-group">
                <label>Name (AR)</label>
                <input type="text" placeholder="الاسم" class="mbr-name-ar" value="${escHtml(m.names?.ar || '')}" />
            </div>
            <div class="mbr-field-group">
                <label>Title (AR)</label>
                <input type="text" placeholder="المنصب" class="mbr-title-ar" value="${escHtml(m.titles?.ar || '')}" readonly />
            </div>
            <div class="mbr-field-group">
                <label>Name (UR)</label>
                <input type="text" placeholder="نام" class="mbr-name-ur" value="${escHtml(m.names?.ur || '')}" />
            </div>
            <div class="mbr-field-group">
                <label>Title (UR)</label>
                <input type="text" placeholder="عہدہ" class="mbr-title-ur" value="${escHtml(m.titles?.ur || '')}" readonly />
            </div>
            <div class="mbr-field-group">
                <label>Name (ES)</label>
                <input type="text" placeholder="Nombre" class="mbr-name-es" value="${escHtml(m.names?.es || '')}" />
            </div>
            <div class="mbr-field-group">
                <label>Title (ES)</label>
                <input type="text" placeholder="Cargo" class="mbr-title-es" value="${escHtml(m.titles?.es || '')}" readonly />
            </div>
        </div>
    `;
    container.appendChild(div);
}

function saveMosque() {
    const id = $('form-mosque-id').value;
    const isEdit = !!id;
    const members = [];
    document.querySelectorAll('.form-member-card').forEach(card => {
        const name = card.querySelector('.mbr-name').value.trim();
        if (!name) return; // Skip if main name is empty

        members.push({
            name: name,
            title: card.querySelector('.mbr-title').value.trim(),
            names: {
                ar: card.querySelector('.mbr-name-ar').value.trim(),
                ur: card.querySelector('.mbr-name-ur').value.trim(),
                es: card.querySelector('.mbr-name-es').value.trim()
            },
            titles: {
                ar: card.querySelector('.mbr-title-ar').value.trim(),
                ur: card.querySelector('.mbr-title-ur').value.trim(),
                es: card.querySelector('.mbr-title-es').value.trim()
            }
        });
    });

    const mosqueData = {
        id: isEdit ? parseInt(id) : Date.now(),
        code: $('form-code').value.trim(),
        name: $('form-name').value.trim(),
        names: { ar: $('form-name-ar').value, ur: $('form-name-ur').value, es: $('form-name-es').value },
        state: $('form-state').value,
        city: $('form-city').value.trim(),
        county: $('form-county').value.trim(),
        latitude: parseFloat($('form-lat').value),
        longitude: parseFloat($('form-lon').value),
        locationUrl: $('form-location').value.trim(),
        websiteUrl: $('form-website').value.trim(),
        boardMembers: members
    };

    if (isEdit) {
        const idx = state.data.findIndex(x => x.id === mosqueData.id);
        if (idx > -1) state.data[idx] = mosqueData;
    } else {
        state.data.unshift(mosqueData);
    }

    applyFilters();
    updateStats();
    if (state.currentView === 'admin') renderAdminView();
    closeMosqueForm();
    showToast(isEdit ? t('savedOk') : t('addedOk'));
}

function deleteMosque(id) {
    if (!confirm(t('deleteConfirm') || 'Delete?')) return;
    state.data = state.data.filter(x => x.id !== id);
    applyFilters();
    renderAdminView();
    showToast(t('deletedOk'), '🗑️');
}

// ── Sprint 4: I18n / Theme / Auth ───────────────────────────
function applyTranslations() {
    // Map element IDs → translation keys (text content)
    const textMap = {
        'txt-app-title': 'appTitle',
        'txt-app-subtitle': 'appSubtitle',
        'lbl-search': 'searchLabel',
        'lbl-state': 'filterState',
        'lbl-city': 'filterCity',
        'lbl-county': 'filterCounty',
        'lbl-members': 'memberSearch',
        'lbl-title': 'titleFilter',
        'btn-clear': 'clearBtn',
        'btn-export': 'exportBtn',
        'btn-near-me': 'nearMe',
        'btn-print-table': 'printTable',
        'txt-stats-states': 'statsByState',
        'txt-stats-members': 'statsMembers',
        'txt-stats-coverage': 'statsCoverage',
        'txt-admin-title': 'adminTitle',
        'btn-add-mosque': 'addMosqueTab',
        'btn-add-member': 'addMemberBtn',
        'txt-login-title': 'loginTitle',
        'lbl-login-username': 'usernameLabel',
        'lbl-login-password': 'passwordLabel',
        'btn-login-submit': 'loginSubmit',
        'btn-login-open': 'loginBtn',
        'btn-logout': 'logoutBtn',
        'txt-titles-tab': 'titlesTab',
        'btn-add-title': 'addTitleBtn',
        'txt-users-tab': 'usersTab',
        'txt-admin-members-tab': 'adminTabMembers',
        'btn-add-board-member': 'addBoardMemberBtn',
        'lbl-stat-mosques': 'statMosques',
        'lbl-stat-states': 'statStates',
        'lbl-stat-members': 'statMembers'
    };
    for (const [id, key] of Object.entries(textMap)) {
        const el = $(id);
        if (el) el.textContent = t(key);
    }

    // Input placeholders
    const placeholderMap = {
        'search-input': 'searchPlaceholder',
        'search-members': 'memberSearchPlaceholder'
    };
    for (const [id, key] of Object.entries(placeholderMap)) {
        const el = $(id);
        if (el) el.placeholder = t(key);
    }

    // Tabs — use translation values which already include icons
    const tabMap = {
        'tab-table': 'tableView',
        'tab-map': 'mapView',
        'tab-stats': 'statsView',
        'tab-admin': 'adminView',
        'admin-tab-mosques': 'adminTabMosques',
        'admin-tab-members': 'adminTabMembers',
        'admin-tab-titles': 'adminTabTitles',
        'admin-tab-users': 'adminTabUsers'
    };
    for (const [id, key] of Object.entries(tabMap)) {
        const el = $(id);
        if (el) el.textContent = t(key);
    }

    populateLookupDropdowns();
    renderTable();
    renderResultsBar();
    updateMapTileLayer(currentLang);
    if (state.currentView === 'admin') renderAdminView();
}

function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const sel = $('theme-select'); if (sel) sel.value = theme;
    localStorage.setItem('icna-theme', theme);
}

function restoreTheme() { changeTheme(localStorage.getItem('icna-theme') || 'dark-navy'); }

function updateAuthUI(event, user) {
    const isAuth = authState.isAuthenticated;
    if (isAuth) {
        $('btn-login-open')?.classList.add('hidden');
        $('user-info')?.classList.remove('hidden');
        if ($('user-display')) $('user-display').textContent = user.displayName;
        $('tab-admin')?.classList.remove('hidden');
    } else {
        $('btn-login-open')?.classList.remove('hidden');
        $('user-info')?.classList.add('hidden');
        $('tab-admin')?.classList.add('hidden');
        if (state.currentView === 'admin') switchView('table');
    }
    renderTable();
}

// ── Utility ──────────────────────────────────────────────────
function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(msg, icon = '✅') {
    const c = $('toast-container'); if (!c) return;
    const t = document.createElement('div'); t.className = 'toast';
    t.innerHTML = `<span>${icon}</span> ${escHtml(msg)}`;
    c.appendChild(t); setTimeout(() => t.remove(), 3000);
}

function exportCSV() {
    const csv = state.filtered.map(m => `"${m.code}","${m.name}","${m.city}","${m.state}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'mosques.csv'; a.click();
}

function renderPagination() {
    const pages = Math.ceil(state.filtered.length / state.perPage);
    const pg = $('pagination-controls'); if (!pg) return;
    const canPrev = state.page > 1;
    const canNext = state.page < pages;

    pg.innerHTML = `
        <button class="page-btn" ${!canPrev ? 'disabled' : ''} data-dir="prev">‹</button>
        <span class="page-info">${state.page} / ${pages || 1}</span>
        <button class="page-btn" ${!canNext ? 'disabled' : ''} data-dir="next">›</button>
    `;

    // Add event listeners to pagination buttons instead of inline onclick for CSP
    pg.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.dir === 'prev' && canPrev) {
                state.page--;
                applyFilters();
            } else if (btn.dataset.dir === 'next' && canNext) {
                state.page++;
                applyFilters();
            }
        });
    });
}

function renderResultsBar() {
    const info = $('results-info');
    if (info) info.innerHTML = `${t('showing')} <strong>${state.filtered.length}</strong> ${t('mosquesSuffix')}`;
}

function renderFilterTags() { /* Optional tags logic */ }
function updateSortHeaders() { /* Optional sort header logic */ }
function clearFilters() {
    state.searchTerm = state.filterState = state.filterCity = state.filterCounty = '';
    $('search-input').value = ''; $('filter-state').value = '';
    populateCityDropdown(); populateCountyDropdown(); applyFilters();
}

// ── Globals ──────────────────────────────────────────────────
window.switchView = switchView; window.toggleDetail = toggleDetail; window.showModal = showModal;
window.closeModal = closeModal; window.flyToMosque = flyToMosque; window.findNearMe = findNearMe;
window.changeTheme = changeTheme; window.setLanguage = setLanguage; window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal; window.submitLogin = submitLogin; window.logout = logout;
window.applyTranslations = applyTranslations; window.updateAuthUI = updateAuthUI;
window.openAddMosqueModal = openAddMosqueModal; window.openEditMosqueModal = openEditMosqueModal;
window.closeMosqueForm = closeMosqueForm; window.addMemberToForm = addMemberToForm;
window.saveMosque = saveMosque; window.deleteMosque = deleteMosque;
window.openAddUserModal = openAddUserModal; window.openEditUserModal = openEditUserModal;
window.closeUserForm = closeUserForm; window.saveUser = saveUser; window.deleteUserFromUI = deleteUserFromUI;
window.openAddTitleModal = openAddTitleModal; window.openEditTitleModal = openEditTitleModal;
window.closeTitleForm = closeTitleForm; window.saveTitle = saveTitle; window.deleteTitleById = deleteTitleById;
window.switchAdminTab = switchAdminTab;
window.openAddBoardMemberModal = openAddBoardMemberModal; window.openEditBoardMemberModal = openEditBoardMemberModal;
window.closeBoardMemberForm = closeBoardMemberForm; window.saveBoardMember = saveBoardMember;
window.deleteBoardMember = deleteBoardMember;
