const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

const { verifyToken } = require('./middlewares/authorization');

// 로그인
router.post('/login', userController.createToken);

// 아이디 찾기, 비밀번호 초기화
router.get('/inquiry/id/:email', userController.inquiryId);        // 아무나
router.post('/inquiry/password', userController.inquiryPassword); // 아무나

// 중복확인
router.get('/checkId/:userId', userController.checkDuplicateUser);
router.get('/checkNickname/:nickname', userController.checkDuplicateUser);
router.get('/checkEmail/:email', userController.checkDuplicateUser);

// 유저 api
router.post('/', userController.createUser);
router.get('/', verifyToken, userController.findAllUser);         // 운영자만
router.get('/:id', verifyToken, userController.findUser);         // 자신, 운영자만
router.put('/:id', verifyToken, userController.updateUser);       // 자신, 운영자만
router.delete('/:id', verifyToken, userController.deleteUser);    // 자신, 운영자만



module.exports = router;
