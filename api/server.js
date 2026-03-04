// ============================================================
//  ICNA Mosque Directory — Phase 2 API Server
//  Agent: Technical Architect (7) + Security Pentester (8)
//  Run: npm run dev
//  URL: http://localhost:3001/api/v1
// ============================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mosqueroutes = require('./routes/mosques');
const lookupRoutes = require('./routes/lookup');

const app = express();
const PORT = process.env.PORT || 3001;

// ── 🔐 Security Agent: Helmet headers ──────────────────────
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://*.openstreetmap.org"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"]
        }
    },
    xFrameOptions: { action: 'deny' },
    xContentTypeOptions: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// ── 🔐 Security Agent: Rate Limiting ───────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    max: 300,                    // 300 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' }
});
app.use('/api/', limiter);

// ── CORS ───────────────────────────────────────────────────
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5500').split(',');
app.use(cors({
    origin: (origin, cb) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
        cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ── 🏗️ Arch Agent: Request Logger ─────────────────────────
app.use((req, res, next) => {
    const ts = new Date().toISOString();
    console.log(`[${ts}] ${req.method} ${req.path}`);
    next();
});

// ── Routes ─────────────────────────────────────────────────
app.use('/api/v1/mosques', mosqueroutes);
app.use('/api/v1/lookup', lookupRoutes);

// ── Health check ───────────────────────────────────────────
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', version: '2.0.0', timestamp: new Date().toISOString() });
});

// ── 404 handler ────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

// ── Global error handler ───────────────────────────────────
app.use((err, req, res, next) => {
    console.error('[ERROR]', err.message);
    const status = err.status || 500;
    res.status(status).json({
        error: status === 500 ? 'Internal server error' : err.message
    });
});

app.listen(PORT, () => {
    console.log(`
  ╔══════════════════════════════════════╗
  ║  ICNA Mosque API — Phase 2          ║
  ║  http://localhost:${PORT}/api/v1       ║
  ╚══════════════════════════════════════╝
  `);
});

module.exports = app;
