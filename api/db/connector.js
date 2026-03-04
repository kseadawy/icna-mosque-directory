// ============================================================
//  ICNA Mosque API — MS Access ODBC Connector
//  Agent: Technical Architect (7)
//
//  This uses node-adodb which wraps Microsoft Jet/ACE OLEDB.
//  Requirements: 64-bit MS Office / Access Runtime installed
//  Database path set in .env: DB_PATH=d:\ICNA\database\ICNA_MosqueDB.accdb
// ============================================================
require('dotenv').config();
const ADODB = require('node-adodb');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../database/ICNA_MosqueDB.accdb');

// Connection string for 64-bit ACE OLEDB (Access 2010+)
const connStr = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${DB_PATH};Persist Security Info=False;`;

const connection = ADODB.open(connStr, true /* debug: false in prod */);

// ── Wrapper: query returns array of row objects ─────────────
async function query(sql) {
    try {
        const results = await connection.query(sql);
        return results || [];
    } catch (err) {
        console.error('[DB Query Error]', err.message);
        console.error('[SQL]', sql);
        throw Object.assign(new Error('Database query failed'), { status: 500 });
    }
}

// ── Wrapper: execute INSERT/UPDATE/DELETE ───────────────────
async function execute(sql) {
    try {
        await connection.execute(sql);
        return true;
    } catch (err) {
        console.error('[DB Execute Error]', err.message);
        console.error('[SQL]', sql);
        throw Object.assign(new Error('Database operation failed'), { status: 500 });
    }
}

// ── Health ping ─────────────────────────────────────────────
async function ping() {
    try {
        await query('SELECT 1 FROM tblState');
        return true;
    } catch { return false; }
}

module.exports = { query, execute, ping };
