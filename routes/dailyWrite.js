"use strict"
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require("underscore");
const bodyParser = require('body-parser');
const e = require('express');
const { deleteHTMLTag } = require("../js/common.util.js");
require('dotenv').config()

const DailyWrite = require('../models/dailyWrite');
const { result } = require('underscore');

let data = 
[
  {
    "user": {
      "userId": "kym9788",
      "nickname": "nimuni"
    },
    "title": "글 제목",
    "content": "글 내용",
    "comments": []
  },
  {
    "user": {
      "userId": "kym9788",
      "nickname": "nimuni"
    },
    "title": "글 제목2",
    "content": "글 내용2",
    "comments": []
  },
];

// 글 목록 조회
router.get('/', (req, res, next)=> {
  console.log("글 목록 조회")
  res.send(data)
});

// 글 생성
router.post('/', (req, res)=>{
  const findTitle = function(content){
    const START_PAD_LENGTH = 3
    const START_PARAGRAPH_STRING = "<p>"
    const END_PARAGRAPH_STRING = "<p>"
    console.log(content)
    console.log(typeof content) // 왜 인덱스를 못찾냐
    console.log(content.indexOf(START_PARAGRAPH_STRING, 0))
    /* let startTitlePos = content.indexOf(START_PARAGRAPH_STRING, 0)
    let endTitlePos = content.indexOf(END_PARAGRAPH_STRING, 0) */
    let startTitlePos = content.indexOf(START_PARAGRAPH_STRING, 0)
    let endTitlePos = content.indexOf(END_PARAGRAPH_STRING, 0)
    // 태그 지우기
    let title = content.slice(startTitlePos+START_PAD_LENGTH, endTitlePos)
    
    title = deleteHTMLTag(title)
    return title;
  }

  let tempModel = {
    "user": {
      "userId": "kym9788",
      "nickname": "nimuni"
    },
    "title": _.escape(findTitle(_.unescape(req.body.content))),
    "content": _.escape(req.body.content),
    "comments": []
  };
  
  

  /* DailyWrite.create(tempModel)
    .then(() => {
      console.log("성공")
      res.sendStatus(200)
    })
    .catch(err => {
      console.error(err)
    }) */
  
  res.send()
})

// 해당 글 조회
router.get('/:id', (req, res, next)=> {
  console.log("해당 글 조회")
  res.send("해당 글 조회"+req.params.id)
});

// 해당 글 수정
router.patch('/:id', (req, res)=>{
  console.log("해당 글 수정")
  res.send("해당 글 수정"+req.params.id)
})

// 해당 글 삭제
router.delete('/:id', (req, res)=>{
  console.log("해당 글 삭제")
  res.send("해당 글 삭제"+req.params.id)
})
module.exports = router;