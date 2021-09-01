"use strict"
const express = require('express');
const router = express.Router();
require('dotenv').config()
const { verifyToken } = require('./middlewares/authorization');
const dailySubjectController = require('../controllers/dailySubject.controllers');

// code api
router.get('/', verifyToken, dailySubjectController.findDailySubject);
// dailySubjectController.choiceDailySubject()
module.exports = router;