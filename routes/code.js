"use strict"
const express = require('express');
const router = express.Router();
require('dotenv').config()
const { verifyToken } = require('./middlewares/authorization');
const codeController = require('../controllers/code.controllers');

// code api
router.post('/', verifyToken, codeController.createCode);
router.get('/', verifyToken, codeController.findAllCode);
router.get('/:_id', verifyToken, codeController.findCode);
router.put('/:_id', verifyToken, codeController.updateCode);
router.delete('/:_id', verifyToken, codeController.deleteCode);

// childCode api
router.post('/:_id/childCode', verifyToken, codeController.createChildCode);
router.get('/:_id/childCode', verifyToken, codeController.findAllChildCode);
router.put('/:_id/childCode/:childCode_id', verifyToken, codeController.updateChildCode);
router.delete('/:_id/childCode/:childCode_id', verifyToken, codeController.deleteChildCode);

module.exports = router;