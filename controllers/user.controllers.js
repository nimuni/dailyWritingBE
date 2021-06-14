const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dayjs = require("dayjs");
require('dotenv').config();

const YOUR_SECRET_KEY = process.env.SECRET_KEY;

const validUserCheck = function(useYN, stopStartDT, stopEndDT){
  if(useYN==="N"){
    return false;
  } else if(stopStartDT!==null && stopEndDT!==null){
    // 날짜계산 후 
    const today = dayjs()
    // TODO 날짜계산 필요함
    if(true){
      return true;
    } else {
    }
  } else {
    return true;
  }
}

exports.createToken = async function (req, res, next) {
  try {
    const user = await User.findOne(req.body);
    
    

    if (user) {
      // 정지처리된 사용자인지 검증
      if(user.useYN === "N" ){
        res.status(400).json({ error: 'invalid user' });
      }
      const token = jwt.sign({
          userId: user.userId,
          nickname: user.nickname,
          userGroupCodeId: user.userGroupCodeId,
          userGroup: user.userGroup
        }, 
        YOUR_SECRET_KEY, 
        {
          expiresIn: '12h'
        }
      );
      res.cookie('token', token);
      res.cookie('userId', user.userId);
      res.cookie('nickname', user.nickname);
      res.status(201).json({
        result: 'ok',
        token,
        userId: user.userId,
        nickname: user.nickname
      });
    } else {
      res.status(400).json({ error: 'invalid user' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const resetUserPassword = async function(findData){
  try{
    let randomPassword = Math.random().toString(36).substr(2,11); 
    const user = await User.findOneAndUpdate(findData, {password: randomPassword}, {new: true, useFindAndModify: false});
    if(user){
      return user;
    } else {
      return null;
    }
  } catch(err) {
    throw err
  }
}

exports.inquiryId = async function (req, res) {
  try {
    const user = await User.findOne(req.params);
    if (user) {
      res.send({
        result: 'ok',
        userId: user.userId
      })
    } else {
      res.status(404).json({ error: 'not found data' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'inquiryId failure.' 
    });
  }
};

exports.inquiryPassword = async function (req, res) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  try{
    // 비밀번호 초기화
    let user = await resetUserPassword({email: req.body.email, userId: req.body.userId})

    if(!user){
      res.status(404).json({ error: 'not found data' });
      return;
    }

    let resetPassword = user.password
    let emailTemplete = `
    <div style='border:1px solid #c8c8c8; padding:5px;'>
      <p style='color:black'>DailyWriting 초기화된 비밀번호를 알려드립니다.</p>
      <h2>${resetPassword}</h2>
      <br>
      <p style='color:red; font-size:8pt;'>본 메일은 발신전용입니다.</p>
    </div>
    `;

    // 메일 보내기
    let mailOption = {
      from: `dailyWriting`,
      to: req.body.email,
      subject: `DailyWriting 초기화된 비밀번호 입니다.`,
      html: emailTemplete,
    }

    const sandMailCallback = async function (err, info) {
      if (err) {
        console.error(err);
      }
  
      try {
        res.status(201).json({
          result: 'ok'
        });
      } catch(err) {
        res.status(500).send({ 
          message: err.message || 'inquiryPassword failure.' 
        });
      }
      transporter.close()
    }

    await transporter.sendMail(mailOption, sandMailCallback);
  } catch(err) {
    console.error(err)
  }
};

exports.checkDuplicateUser = async function (req, res) {
  try {
    const user = await User.findOne(req.params);
    if (user) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'checkDuplicateUser failure.' 
    });
  }
};

exports.createUser = async function (req, res) {
  try {
    const user = await new User(req.body).save();
    res.status(201).json({
      result: 'ok',
      user: user
    });
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'createUser failure.' 
    });
  }
};

exports.findAllUser = async function (req, res) {
  try {
    const user = await new User.find(req.body);
    if (user.length) {
      res.send(user)
    } else {
      res.status(404).json({ error: 'not found user' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findAllUser failure.' 
    });
  }
};

exports.findUser = async function (req, res) {
  try {
    const user = await new User.findOne(req.params);
    if (user) {
      res.send(user)
    } else {
      res.status(404).json({ error: 'not found user' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findUser failure.' 
    });
  }
};

exports.updateUser = async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params, req.body, {useFindAndModify: false});
    if (user) {
      res.status({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found user' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'updateUser failure.' 
    });
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    // const result = await new User.deleteOne(req.body);
    const result = await User.findByIdAndUpdate(req.params, {useYN: "N"}, {useFindAndModify: false});
    if (result) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found user' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'deleteUser failure.' 
    });
  }
};