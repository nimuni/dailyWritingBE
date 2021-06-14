const express = require('express');
const router = express.Router();
const mailAuthController = require('../controllers/mailAuth.controllers');

router.post('/checkMailAuth', mailAuthController.checkMailAuth);
router.post('/sendMailAuth', mailAuthController.sendMailAuth);

module.exports=router;