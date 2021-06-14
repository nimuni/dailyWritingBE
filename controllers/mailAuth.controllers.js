const MailAuth = require('../models/mailAuth');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.checkMailAuth = async function (req, res) {
  try {
    const mailAuth = await MailAuth.findOneAndUpdate({email:req.body.email, authCode:req.body.authCode, type:req.body.type, used: 'N'}, {used: 'Y'}, {returnOriginal: false});
    if (mailAuth) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found data' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'checkMailAuth failure.' 
    });
  }
};

exports.sendMailAuth = async function(req, res) {
  let authNum = Math.random().toString().substr(2,6);
  let typeStr;
  switch (req.body.type) {
    case "register":
      typeStr = "회원가입"
      break;
    case "findId":
      typeStr = "아이디 찾기"
      break;
    case "register":
      typeStr = "비밀번호 찾기"
      break;
    default:
      typeStr = "메일 인증"
      break;
  }
  let emailTemplete = `
  <div style='border:1px solid #c8c8c8; padding:5px;'>
    <p style='color:black'>DailyWriting ${typeStr}을/를 위한 인증번호 입니다.</p>
    <p style='color:black'>아래의 인증 번호를 입력하여 인증을 완료해주세요.</p>
    <h2>${authNum}</h2>
    <br>
    <p style='color:red; font-size:8pt;'>본 메일은 발신전용입니다.</p>
  </div>
  `;

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

  const saveAuthData = async function(){
    let model = {email: req.body.email, authCode: authNum, type: req.body.type, used: 'N'}
    try{
      return await new MailAuth(model).save();
    } catch(err){
      throw err
    }
  }

  try{
    let mailOption = {
      from: `dailyWriting`,
      to: req.body.email,
      subject: `DailyWriting ${typeStr} 인증번호를 입력해주세요.`,
      html: emailTemplete,
    }
    
    const sandMailCallback = async function (err, info) {
      if (err) {
        console.error(err);
      }
  
      try {
        await saveAuthData()
        res.status(201).json({
          result: 'ok'
        });
      } catch(err) {
        res.status(500).send({ 
          message: err.message || 'saveAuthData failure.' 
        });
      }
      transporter.close()
    }

    await transporter.sendMail(mailOption, sandMailCallback);
  } catch(err) {
    console.error(err)
  }
}
