"use strict"
const express = require('express');
const router = express.Router();
require('dotenv').config()
const { verifyToken } = require('./middlewares/authorization');
const subjectController = require('../controllers/subject.controllers');

// code api
router.post('/', verifyToken, subjectController.createSubject);
router.get('/', verifyToken, subjectController.findAllSubject);
router.get('/:_id', verifyToken, subjectController.findSubject);
router.put('/:_id', verifyToken, subjectController.updateSubject);
router.put('/count/:_id', verifyToken, subjectController.subjectViewCount);
router.delete('/:_id', verifyToken, subjectController.deleteSubject);

module.exports = router;