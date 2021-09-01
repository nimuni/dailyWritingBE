const Subject = require('../models/subject');
const DailySubject = require('../models/dailySubject');
const Code = require('../models/code');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const mathjs = require('mathjs')
dayjs.extend(utc);
dayjs.extend(timezone);
require('dotenv').config();

exports.findDailySubject = async function (req, res){
  console.log("call findDailySubject")
  try{
    let thisTime = dayjs().tz("Asia/Seoul")
    let startDay = new Date(thisTime.year(), thisTime.month(), thisTime.date());
    let startDayOfNextDay = new Date(thisTime.year(), thisTime.month(), thisTime.date()+1)
    let existDailySubjects = await DailySubject.find({createdAt: {$gte: startDay, $lt: startDayOfNextDay}});
    console.log(existDailySubjects)
    if (existDailySubjects.length) {
      res.send(existDailySubjects)
    } else {
      res.status(404).json({ error: 'not found DailySubject' });
    }
  } catch(err) {
    res.status(500).send({ 
      message: err.message || 'findDailySubject failure.' 
    });
  }
}

exports.dailySubjectViewCount = async function (req, res) {
  console.log("dailySubjectViewCount")
  console.log(req.params)
  try {
    await DailySubject.update(req.params, {$inc: {view: 1}})
    res.send({result: 'ok'})
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findSubject failure.' 
    });
  }
}
exports.dailySubjectUseCount = async function (req, option) {
  console.log("dailySubjectUseCount")
  console.log(req.params)
  try {
    await DailySubject.update(req.params, {$inc: {useCount: 1}}, option)
  } catch (err) {
    console.errer(err)
  }
}

exports.choiceDailySubject = async function (){
  try{
    // 월마다 추첨되지 않은 랜덤 주제 선정
    let testArray = [];

    // 이번달에 추첨된 주제들
    let thisTime = dayjs().tz("Asia/Seoul")
    let startDayOfMonth = new Date(thisTime.year(), thisTime.month(), 1);
    let startDayOfNextMonth = new Date(thisTime.year(), thisTime.month()+1, 1)
    let existDailySubjects = await DailySubject.find({createdAt: {$gte: startDayOfMonth, $lt: startDayOfNextMonth}});

    // 모든 등록된 주제 중 범주별로 하나씩 선정 (선정된것 제외)
    // 글주제 게시판에 등록된 모든 주제
    let allSubjects = await Subject.find();
    

    // 모든 글 주제 중 등록된 주제 제거.
    let noSelectedSubjects = allSubjects.slice();
    noSelectedSubjects.forEach((nValue, nIndex, nArray) => {
      existDailySubjects.some((eValue, eIndex, eArray) => {
        if(nValue._id.toString() === eValue.subject_id.toString()){
          eArray.splice(eIndex, 1);
          nArray.splice(nIndex, 1);
          return true;
        }
      })
    });

    // 등록된 주제들
    let codes = await Code.findOne({_id: "60c7683643467d876489c880"})
    let childCodes = codes.childCodes;
    // 주제에서 기타는 제거
    childCodes = childCodes.filter((value)=> value._id.toString() !== "60c7687843467d876489c887")
    childCodes.forEach(element => {
      // 주제아이디별로 선정
      let result = noSelectedSubjects.filter(e => e.code_id === element._id.toString())
      let randomSelectNumber = mathjs.randomInt(0, result.length)
      let selectedResult = result[randomSelectNumber]

      // 더이상 등록될 것이 없으면 등록하지 않음.
      if(selectedResult){
        testArray.push(selectedResult)
      }
    });
    
    // 선정된 오늘의 주제 저장
    testArray.forEach(async element => {
      const makeDailySubjectObj = function(e){
        return {
          title: e.title,
          content: e.content,
          codename: e.codename,
          code_id: e.code_id,
          subject_id: e._id.toString(),
          useYN: e.useYN,
          language: e.language,
          nickname: e.nickname
        }
      }
      let obj = makeDailySubjectObj(element)
      result = await new DailySubject(obj).save()
    }); 
   
  } catch(err) {
    console.error(err)
  }
}
