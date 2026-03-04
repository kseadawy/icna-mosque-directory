// ============================================================
//  ICNA Mosque API — /api/v1/mosques
//  Agent: Technical Architect (7) + Security Pentester (8)
// ============================================================
const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../db/connector');

// ── Validation helper ──────────────────────────────────────
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

// ── GET /mosques ───────────────────────────────────────────
// Query params: ?state=IL&city=Chicago&county=Cook&q=search&page=1&limit=10&sort=name&dir=asc
router.get('/', [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 500 }).toInt(),
    query('sort').optional().isIn(['name', 'city', 'county', 'state', 'code']),
    query('dir').optional().isIn(['asc', 'desc']),
    query('state').optional().isLength({ max: 2 }).trim().escape(),
    query('city').optional().isLength({ max: 100 }).trim().escape(),
    query('county').optional().isLength({ max: 100 }).trim().escape(),
    query('q').optional().isLength({ max: 200 }).trim().escape()
], validate, async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 25;
        const sort = req.query.sort || 'MosqueName';
        const dir = req.query.dir || 'asc';
        const offset = (page - 1) * limit;

        // Build WHERE clause
        const conditions = ['1=1'];
        if (req.query.state) conditions.push(`st.StateCode = '${req.query.state}'`);
        if (req.query.city) conditions.push(`ci.CityName = '${req.query.city}'`);
        if (req.query.county) conditions.push(`co.CountyName = '${req.query.county}'`);
        if (req.query.q) {
            const q = req.query.q;
            conditions.push(`(m.MosqueName LIKE '%${q}%' OR ci.CityName LIKE '%${q}%' OR m.MosqueCode LIKE '%${q}%')`);
        }
        const where = conditions.join(' AND ');

        const sortMap = { name: 'm.MosqueName', city: 'ci.CityName', county: 'co.CountyName', state: 'st.StateCode', code: 'm.MosqueCode' };
        const orderBy = `${sortMap[sort] || 'm.MosqueName'} ${dir.toUpperCase()}`;

        const sql = `
      SELECT TOP ${limit}
        m.MosqueID, m.MosqueCode, m.MosqueName,
        ci.CityName, ci.CityID,
        co.CountyName, co.CountyID,
        st.StateCode, st.StateID, st.StateName,
        m.LocationURL, m.WebsiteURL,
        m.Latitude, m.Longitude, m.DateAdded
      FROM ((tblMosque AS m
        INNER JOIN tblCity   AS ci ON m.CityID   = ci.CityID)
        INNER JOIN tblCounty AS co ON m.CountyID = co.CountyID)
        INNER JOIN tblState  AS st ON m.StateID  = st.StateID
      WHERE ${where}
      ORDER BY ${orderBy}`;

        const rows = await db.query(sql);

        // Attach board members per mosque
        const ids = rows.map(r => r.MosqueID).join(',');
        let members = [];
        if (ids) {
            members = await db.query(`
        SELECT bm.MosqueID, bm.FullName, bt.TitleCode, bt.TitleName, bm.Email, bm.Phone, bm.IsActive
        FROM tblBoardMember AS bm
          INNER JOIN tblBoardTitle AS bt ON bm.TitleID = bt.TitleID
        WHERE bm.MosqueID IN (${ids}) AND bm.IsActive = True
        ORDER BY bm.MosqueID, bm.BoardMemberID`);
        }

        const memberMap = {};
        members.forEach(m => {
            if (!memberMap[m.MosqueID]) memberMap[m.MosqueID] = [];
            memberMap[m.MosqueID].push({ name: m.FullName, title: m.TitleName, titleCode: m.TitleCode, email: m.Email, phone: m.Phone });
        });

        const data = rows.map(r => ({
            mosqueId: r.MosqueID,
            mosqueCode: r.MosqueCode,
            mosqueName: r.MosqueName,
            city: { id: r.CityID, name: r.CityName },
            county: { id: r.CountyID, name: r.CountyName },
            state: { id: r.StateID, code: r.StateCode, name: r.StateName },
            locationUrl: r.LocationURL,
            websiteUrl: r.WebsiteURL,
            latitude: r.Latitude,
            longitude: r.Longitude,
            dateAdded: r.DateAdded,
            boardMembers: memberMap[r.MosqueID] || []
        }));

        res.json({ status: 'success', count: data.length, page, data });
    } catch (err) { next(err); }
});

// ── GET /mosques/:id ───────────────────────────────────────
router.get('/:id', [
    param('id').isInt({ min: 1 }).toInt()
], validate, async (req, res, next) => {
    try {
        const rows = await db.query(`
      SELECT m.*, ci.CityName, ci.CityID, co.CountyName, co.CountyID,
             st.StateCode, st.StateID, st.StateName
      FROM ((tblMosque AS m
        INNER JOIN tblCity   AS ci ON m.CityID   = ci.CityID)
        INNER JOIN tblCounty AS co ON m.CountyID = co.CountyID)
        INNER JOIN tblState  AS st ON m.StateID  = st.StateID
      WHERE m.MosqueID = ${req.params.id}`);

        if (!rows.length) return res.status(404).json({ error: 'Mosque not found' });
        const r = rows[0];

        const members = await db.query(`
      SELECT bm.*, bt.TitleCode, bt.TitleName
      FROM tblBoardMember AS bm
        INNER JOIN tblBoardTitle AS bt ON bm.TitleID = bt.TitleID
      WHERE bm.MosqueID = ${req.params.id}
      ORDER BY bm.IsActive DESC, bm.BoardMemberID`);

        res.json({
            status: 'success', data: {
                mosqueId: r.MosqueID, mosqueCode: r.MosqueCode, mosqueName: r.MosqueName,
                city: { id: r.CityID, name: r.CityName },
                county: { id: r.CountyID, name: r.CountyName },
                state: { id: r.StateID, code: r.StateCode, name: r.StateName },
                locationUrl: r.LocationURL, websiteUrl: r.WebsiteURL,
                latitude: r.Latitude, longitude: r.Longitude,
                notes: r.Notes, dateAdded: r.DateAdded,
                boardMembers: members.map(m => ({
                    id: m.BoardMemberID, name: m.FullName, title: m.TitleName,
                    titleCode: m.TitleCode, email: m.Email, phone: m.Phone,
                    termStart: m.TermStart, termEnd: m.TermEnd, isActive: m.IsActive
                }))
            }
        });
    } catch (err) { next(err); }
});

// ── POST /mosques ──────────────────────────────────────────
router.post('/', [
    body('mosqueCode').trim().escape().notEmpty().isLength({ max: 10 }),
    body('mosqueName').trim().escape().notEmpty().isLength({ max: 200 }),
    body('cityId').isInt({ min: 1 }).toInt(),
    body('countyId').isInt({ min: 1 }).toInt(),
    body('stateId').isInt({ min: 1 }).toInt(),
    body('locationUrl').optional().trim().isURL(),
    body('websiteUrl').optional().trim().isURL(),
    body('latitude').optional().isFloat({ min: -90, max: 90 }).toFloat(),
    body('longitude').optional().isFloat({ min: -180, max: 180 }).toFloat()
], validate, async (req, res, next) => {
    try {
        const { mosqueCode, mosqueName, cityId, countyId, stateId, locationUrl, websiteUrl, latitude, longitude, notes } = req.body;
        const sql = `INSERT INTO tblMosque (MosqueCode, MosqueName, CityID, CountyID, StateID, LocationURL, WebsiteURL, Latitude, Longitude, Notes, DateAdded)
                 VALUES ('${mosqueCode}', '${mosqueName}', ${cityId}, ${countyId}, ${stateId},
                 '${locationUrl || ''}', '${websiteUrl || ''}', ${latitude || 0}, ${longitude || 0},
                 '${notes || ''}', #${new Date().toLocaleDateString('en-US')}#)`;
        await db.execute(sql);
        res.status(201).json({ status: 'success', message: 'Mosque created' });
    } catch (err) { next(err); }
});

// ── PUT /mosques/:id ───────────────────────────────────────
router.put('/:id', [
    param('id').isInt({ min: 1 }).toInt(),
    body('mosqueName').optional().trim().escape().isLength({ max: 200 }),
    body('locationUrl').optional().trim().isURL(),
    body('websiteUrl').optional().trim().isURL(),
    body('latitude').optional().isFloat({ min: -90, max: 90 }).toFloat(),
    body('longitude').optional().isFloat({ min: -180, max: 180 }).toFloat()
], validate, async (req, res, next) => {
    try {
        const updates = [];
        const allowed = ['MosqueName', 'LocationURL', 'WebsiteURL', 'Latitude', 'Longitude', 'Notes', 'CityID', 'CountyID', 'StateID'];
        const bodyMap = { mosqueName: 'MosqueName', locationUrl: 'LocationURL', websiteUrl: 'WebsiteURL', latitude: 'Latitude', longitude: 'Longitude', notes: 'Notes', cityId: 'CityID', countyId: 'CountyID', stateId: 'StateID' };
        Object.entries(bodyMap).forEach(([k, col]) => {
            if (req.body[k] !== undefined) {
                const val = typeof req.body[k] === 'string' ? `'${req.body[k]}'` : req.body[k];
                updates.push(`${col} = ${val}`);
            }
        });
        if (!updates.length) return res.status(400).json({ error: 'No updatable fields provided' });
        await db.execute(`UPDATE tblMosque SET ${updates.join(', ')} WHERE MosqueID = ${req.params.id}`);
        res.json({ status: 'success', message: 'Mosque updated' });
    } catch (err) { next(err); }
});

// ── DELETE /mosques/:id ────────────────────────────────────
router.delete('/:id', [
    param('id').isInt({ min: 1 }).toInt()
], validate, async (req, res, next) => {
    try {
        await db.execute(`DELETE FROM tblMosque WHERE MosqueID = ${req.params.id}`);
        res.json({ status: 'success', message: 'Mosque deleted' });
    } catch (err) { next(err); }
});

// ── GET /mosques/export/json ───────────────────────────────
router.get('/export/json', async (req, res, next) => {
    try {
        // Reuse list query with limit 9999
        req.query.limit = 9999; req.query.page = 1;
        // ... (delegate to list handler via internal call)
        res.set('Content-Disposition', 'attachment; filename="mosques_export.json"');
        res.json({ status: 'success', note: 'Use GET /mosques?limit=9999 for full export' });
    } catch (err) { next(err); }
});

// ── GET /mosques/export/csv ────────────────────────────────
router.get('/export/csv', async (req, res, next) => {
    try {
        const rows = await db.query(`
      SELECT m.MosqueCode, m.MosqueName, ci.CityName, co.CountyName, st.StateCode,
             m.LocationURL, m.WebsiteURL, m.Latitude, m.Longitude
      FROM ((tblMosque AS m
        INNER JOIN tblCity   AS ci ON m.CityID   = ci.CityID)
        INNER JOIN tblCounty AS co ON m.CountyID = co.CountyID)
        INNER JOIN tblState  AS st ON m.StateID  = st.StateID
      ORDER BY m.MosqueCode`);

        const csv = [
            'Code,Name,City,County,State,Location URL,Website URL,Latitude,Longitude',
            ...rows.map(r => `"${r.MosqueCode}","${r.MosqueName}","${r.CityName}","${r.CountyName}","${r.StateCode}","${r.LocationURL}","${r.WebsiteURL}",${r.Latitude},${r.Longitude}`)
        ].join('\r\n');

        res.set({ 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="mosques.csv"' });
        res.send('\uFEFF' + csv);
    } catch (err) { next(err); }
});

// ── Board Members sub-routes ───────────────────────────────
router.get('/:id/members', [param('id').isInt().toInt()], validate, async (req, res, next) => {
    try {
        const members = await db.query(`
      SELECT bm.BoardMemberID, bm.FullName, bt.TitleCode, bt.TitleName, bm.Email, bm.Phone, bm.IsActive
      FROM tblBoardMember AS bm
        INNER JOIN tblBoardTitle AS bt ON bm.TitleID = bt.TitleID
      WHERE bm.MosqueID = ${req.params.id}
      ORDER BY bm.IsActive DESC, bm.BoardMemberID`);
        res.json({ status: 'success', count: members.length, data: members });
    } catch (err) { next(err); }
});

module.exports = router;
