"use strict"
const express = require('express');
const router = express.Router();
const _ = require("underscore");
require('dotenv').config()

const dailyWriteController = require('../controllers/dailyWrite.controllers');


const { verifyToken } = require('./middlewares/authorization');

// dailyWrite api
router.post('/', dailyWriteController.createDailyWrite);
router.get('/', verifyToken, dailyWriteController.findAllDailyWrite);
router.get('/:_id', verifyToken, dailyWriteController.findDailyWrite);
router.put('/:_id', verifyToken, dailyWriteController.updateDailyWrite);
router.delete('/:_id', verifyToken, dailyWriteController.deleteDailyWrite);

router.get('/:_id/comment', verifyToken, dailyWriteController.findComment);
router.post('/:_id/comment', verifyToken, dailyWriteController.createComment);
router.put('/:_id/comment/:commentId', verifyToken, dailyWriteController.updateComment);
router.delete('/:_id/comment/:commentId', verifyToken, dailyWriteController.deleteComment);





module.exports = router;