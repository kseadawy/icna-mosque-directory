// ============================================================
//  ICNA Mosque Directory — Auth Module
//  Agent: Security Pentester (8) + Technical Architect (7) — Sprint 4
//  Roles: admin · editor
//  Phase 1: localStorage-based (Phase 2: JWT+API)
// ============================================================
'use strict';

/* ── Permissions per role ──────────────────────────────────── */
const ROLE_PERMISSIONS = {
    admin: {
        canAddMosque: true,
        canEditMosque: true,
        canDeleteMosque: true,
        canManageUsers: true,
        canExport: true,
        canViewAdmin: true
    },
    editor: {
        canAddMosque: true,
        canEditMosque: true,
        canDeleteMosque: false,
        canManageUsers: false,
        canExport: true,
        canViewAdmin: true
    }
};

/* ── Auth State ────────────────────────────────────────────── */
const authState = {
    currentUser: null,
    isAuthenticated: false
};

/* ── Default seed users ────────────────────────────────────── */
const DEFAULT_USERS = [
    {
        id: 'u001',
        username: 'admin',
        displayName: 'ICNA National Admin',
        email: 'admin@icna.org',
        role: 'admin',
        passwordHash: btoa('Admin@ICNA2024!'),
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        lastLogin: null
    },
    {
        id: 'u002',
        username: 'editor',
        displayName: 'Mosque Data Editor',
        email: 'editor@icna.org',
        role: 'editor',
        passwordHash: btoa('Editor@ICNA2024!'),
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        lastLogin: null
    },
    {
        id: 'u003',
        username: 'manager',
        displayName: 'Regional Manager',
        email: 'manager@icna.org',
        role: 'editor',
        passwordHash: btoa('Manager@ICNA2024!'),
        isActive: true,
        createdAt: '2024-01-15T00:00:00Z',
        lastLogin: null
    }
];

/* ── User Storage ──────────────────────────────────────────── */
function loadUsers() {
    try {
        const raw = localStorage.getItem('icna-users');
        if (raw) return JSON.parse(raw);
    } catch (e) { }
    // First run — seed defaults
    saveUsers(DEFAULT_USERS);
    return DEFAULT_USERS;
}

function saveUsers(users) {
    try { localStorage.setItem('icna-users', JSON.stringify(users)); } catch (e) { }
}

function getUsers() { return loadUsers(); }

function getUserById(id) { return loadUsers().find(u => u.id === id) || null; }

function generateUserId() { return 'u' + Date.now().toString(36); }

function addUser(userData) {
    const users = loadUsers();
    if (users.some(u => u.username === userData.username)) {
        return { ok: false, error: 'Username already exists' };
    }
    const newUser = {
        id: generateUserId(),
        username: userData.username.trim(),
        displayName: userData.displayName.trim(),
        email: userData.email.trim().toLowerCase(),
        role: userData.role,
        passwordHash: btoa(userData.password),
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null
    };
    users.push(newUser);
    saveUsers(users);
    return { ok: true, user: { ...newUser, passwordHash: undefined } };
}

function updateUser(id, updates) {
    const users = loadUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx < 0) return { ok: false, error: 'User not found' };
    if (updates.password) {
        updates.passwordHash = btoa(updates.password);
        delete updates.password;
    }
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    return { ok: true };
}

function deleteUser(id) {
    const users = loadUsers();
    if (id === authState.currentUser?.id) return { ok: false, error: 'Cannot delete yourself' };
    const filtered = users.filter(u => u.id !== id);
    saveUsers(filtered);
    return { ok: true };
}

/* ── Authentication ────────────────────────────────────────── */
function login(username, password) {
    const users = loadUsers();
    const user = users.find(u =>
        u.username === username.trim() &&
        u.passwordHash === btoa(password) &&
        u.isActive
    );
    if (!user) return { ok: false };

    // Update lastLogin
    updateUser(user.id, { lastLogin: new Date().toISOString() });

    const session = {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        loginAt: new Date().toISOString()
    };
    authState.currentUser = session;
    authState.isAuthenticated = true;

    try { localStorage.setItem('icna-session', JSON.stringify(session)); } catch (e) { }
    onAuthChange('login', session);
    return { ok: true, user: session };
}

function logout() {
    authState.currentUser = null;
    authState.isAuthenticated = false;
    try { localStorage.removeItem('icna-session'); } catch (e) { }
    onAuthChange('logout', null);
}

function restoreSession() {
    try {
        const raw = localStorage.getItem('icna-session');
        if (!raw) return;
        const session = JSON.parse(raw);
        // Validate user still exists and is active
        const user = getUserById(session.id);
        if (user && user.isActive) {
            authState.currentUser = session;
            authState.isAuthenticated = true;
            onAuthChange('restore', session);
        } else {
            localStorage.removeItem('icna-session');
        }
    } catch (e) { }
}

/* ── Permission helpers ────────────────────────────────────── */
function can(permission) {
    if (!authState.isAuthenticated) return false;
    return ROLE_PERMISSIONS[authState.currentUser?.role]?.[permission] ?? false;
}

function requireAuth(cb) {
    if (!authState.isAuthenticated) { openLoginModal(); return; }
    cb(authState.currentUser);
}

/* ── UI update hook (called by auth events) ────────────────── */
function onAuthChange(event, user) {
    if (typeof updateAuthUI === 'function') updateAuthUI(event, user);
}

/* ── Open/Close Login Modal ────────────────────────────────── */
function openLoginModal() {
    const modal = document.getElementById('login-modal-overlay');
    if (modal) {
        modal.style.display = 'flex';
        // Reset password field to hidden state each time modal opens
        const pwInput = document.getElementById('login-password');
        const toggleBtn = document.getElementById('btn-toggle-password');
        if (pwInput) pwInput.type = 'password';
        if (toggleBtn) {
            toggleBtn.classList.remove('is-visible');
            toggleBtn.setAttribute('aria-label', 'Show password');
        }
        const userInput = document.getElementById('login-username');
        if (userInput) setTimeout(() => userInput.focus(), 50);
        document.getElementById('login-error')?.classList.add('hidden');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal-overlay');
    if (modal) modal.style.display = 'none';
}

function submitLogin() {
    const username = document.getElementById('login-username')?.value || '';
    const password = document.getElementById('login-password')?.value || '';
    const result = login(username, password);
    if (result.ok) {
        closeLoginModal();
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
    } else {
        const err = document.getElementById('login-error');
        if (err) { err.textContent = t('loginError'); err.classList.remove('hidden'); }
    }
}
