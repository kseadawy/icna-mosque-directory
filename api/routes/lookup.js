// ============================================================
//  ICNA Mosque API — /api/v1/lookup
//  Agent: Technical Architect (7)
// ============================================================
const express = require('express');
const router = express.Router();
const db = require('../db/connector');

router.get('/states', async (req, res, next) => {
    try { res.json({ status: 'success', data: await db.query('SELECT StateID, StateCode, StateName FROM tblState ORDER BY StateName') }); }
    catch (err) { next(err); }
});

router.get('/counties', async (req, res, next) => {
    try {
        const where = req.query.stateId ? `WHERE StateID = ${parseInt(req.query.stateId)}` : '';
        res.json({ status: 'success', data: await db.query(`SELECT CountyID, CountyCode, CountyName, StateID FROM tblCounty ${where} ORDER BY CountyName`) });
    } catch (err) { next(err); }
});

router.get('/cities', async (req, res, next) => {
    try {
        const conds = [];
        if (req.query.stateId) conds.push(`StateID = ${parseInt(req.query.stateId)}`);
        if (req.query.countyId) conds.push(`CountyID = ${parseInt(req.query.countyId)}`);
        const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
        res.json({ status: 'success', data: await db.query(`SELECT CityID, CityCode, CityName, StateID, CountyID FROM tblCity ${where} ORDER BY CityName`) });
    } catch (err) { next(err); }
});

router.get('/titles', async (req, res, next) => {
    try { res.json({ status: 'success', data: await db.query('SELECT TitleID, TitleCode, TitleName FROM tblBoardTitle ORDER BY TitleName') }); }
    catch (err) { next(err); }
});

module.exports = router;
