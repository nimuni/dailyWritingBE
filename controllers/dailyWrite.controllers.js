const DailyWrite = require('../models/dailyWrite');
const DailyWriteComment = require('../models/dailyWriteComment');
require('dotenv').config();

exports.createDailyWrite = async function (req, res) {
  try{
    let dailyWrite = await new DailyWrite(req.body).save();
    console.log(dailyWrite)
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
    const dailyWrite = await DailyWrite.find(req.params);
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
    const dailyWrite = await DailyWrite.find(req.params);
    if (dailyWrite.length) {
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