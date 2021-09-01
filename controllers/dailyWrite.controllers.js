const DailyWrite = require('../models/dailyWrite');
const DailyWriteComment = require('../models/dailyWriteComment');
require('dotenv').config();
const { subjectUseCount } = require('./subject.controllers')
const { dailySubjectUseCount } = require('./dailySubject.controllers')

exports.createDailyWrite = async function (req, res) {
  const session = await DailyWrite.startSession();
  session.startTransaction();
  try{
    const option = { session }

    let dailyWrite, subject, dailySubject
    const dailyWriteParam = {
      userId: req.body.userId,
      nickname: req.body.nickname,
      title: req.body.title,
      content: req.body.content,
      createUserId: req.body.createUserId,
      updateUserId: req.body.updateUserId,
      subject_id: req.body.subject_id,
      subjectCodename: req.body.subjectCodename,
      dailySubject_id: req.body.dailySubject_id,
      dailySubjectCodename: req.body.dailySubjectCodename,
    }
    dailyWrite = await new DailyWrite(dailyWriteParam).save(option);

    const subjectParam = {
      _id: req.body.subject_id
    }
    subject = await subjectUseCount({params: subjectParam}, option)

    if(req.body.dailySubject_id !== "no_id_of_etc"){
      const dailySubjectParam = {
        _id: req.body.dailySubject_id
      }
      dailySubject = await dailySubjectUseCount({params: dailySubjectParam}, option)
    }

    await session.commitTransaction();
    session.endSession();

    console.log(dailyWrite)
    console.log(subject)
    console.log(dailySubject)

    res.status(201).json({
      result: 'ok'
    });
  } catch(err) {
    console.error(err);
    res.status(500).send({ 
      message: err.message || 'createDailyWrite failure.' 
    });
  }
};

exports.findAllDailyWrite = async function (req, res) {
  try {
    const dailyWrite = await DailyWrite.find(req.params, ["nickname", "title", "comments", "like", "view", "hideYN", "subjectCodename", "dailySubjectCodename"]);
    if (dailyWrite.length) {
      res.send(dailyWrite)
    } else {
      res.status(404).json({ error: 'not found dailyWrite' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findAllDailyWrite failure.' 
    });
  }
};

exports.findDailyWrite = async function (req, res) {
  try {
    const dailyWrite = await DailyWrite.findOne(req.params);
    if (dailyWrite) {
      res.send(dailyWrite)
    } else {
      res.status(404).json({ error: 'not found dailyWrite' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findDailyWrite failure.' 
    });
  }
};

exports.updateDailyWrite = async function (req, res) {
  try {
    const dailyWrite = await DailyWrite.findByIdAndUpdate(req.params, req.body, {useFindAndModify: false});
    if (dailyWrite) {
      res.status({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found dailyWrite' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'updateDailyWrite failure.' 
    });
  }
};

exports.deleteDailyWrite = async function (req, res, next) {
  try {
    const result = await DailyWrite.deleteOne(req.body);
    // const result = await DailyWrite.findByIdAndUpdate(req.params, {useYN: "N"}, {useFindAndModify: false});
    if (result) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found dailyWrite' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'deleteDailyWrite failure.' 
    });
  }
};

// comment
exports.findComment = async function (req, res) {
  try {
    const dailyWriteComment = await DailyWriteComment.find(req.params);
    if (dailyWriteComment.length) {
      res.send(dailyWriteComment)
    } else {
      res.status(404).json({ error: 'not found Comment' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findComment failure.' 
    });
  }
};
exports.createComment = async function (req, res) {
  try{
    let dailyWriteComment = await new DailyWriteComment(req.body).save();
    console.log(dailyWriteComment)
    res.status(201).json({
      result: 'ok'
    });
  } catch(err) {
    console.error(err);
    res.status(500).send({ 
      message: err.message || 'createComment failure.' 
    });
  }
};
exports.updateComment = async function (req, res) {
  try {
    const dailyWriteComment = await DailyWriteComment.findByIdAndUpdate(req.params, req.body, {useFindAndModify: false});
    if (dailyWriteComment) {
      res.status({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found dailyWriteComment' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'updateComment failure.' 
    });
  }
};
exports.deleteComment = async function (req, res, next) {
  try {
    const result = await DailyWriteComment.deleteOne(req.body);
    // const result = await DailyWriteComment.findByIdAndUpdate(req.params, {useYN: "N"}, {useFindAndModify: false});
    if (result) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found dailyWriteComment' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'deleteComment failure.' 
    });
  }
};