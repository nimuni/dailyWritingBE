const Subject = require('../models/subject');
require('dotenv').config();

exports.createSubject = async function (req, res) {
  try{
    const subject = await new Subject(req.body).save();
    res.status(201).json({
      result: 'ok'
    });
  } catch(err) {
    console.error(err);
    res.status(500).send({ 
      message: err.message || 'createSubject failure.' 
    });
  }
};

exports.findAllSubject = async function (req, res) {
  try {
    const subject = await Subject.find(req.params).sort('-createdAt');
    if (subject.length) {
      res.send(subject)
    } else {
      res.send([])
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findAllSubject failure.' 
    });
  }
};

exports.findSubject = async function (req, res) {
  try {
    // await Subject.findByIdAndUpdate(req.params, {$inc: {view: 1}})
    const subject = await Subject.find(req.params);
    if (subject.length) {
      res.send(subject)
    } else {
      res.status(404).json({ error: 'not found subject' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findSubject failure.' 
    });
  }
};

exports.subjectViewCount = async function (req, res) {
  console.log("subjectViewCount")
  console.log(req.params)
  try {
    await Subject.update(req.params, {$inc: {view: 1}})
    res.send({result: 'ok'})
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findSubject failure.' 
    });
  }
}
exports.subjectUseCount = async function (req, option) {
  console.log("subjectUseCount")
  console.log(req.params)
  try {
    await Subject.update(req.params, {$inc: {useCount: 1}}, option)
  } catch (err) {
    console.error(err)
  }
}

exports.updateSubject = async function (req, res) {
  try {
    if(!req.body.updateUserId){
      res.status(400).send({ 
        message: 'updateUserId null.' 
      });
      return;
    }
    const subject = await Subject.findByIdAndUpdate(req.params, req.body, {useFindAndModify: false});
    if (subject) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found subject' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'updateSubject failure.' 
    });
  }
};

exports.deleteSubject = async function (req, res, next) {
  try {
    const subject = await Subject.deleteOne(req.params);
    if (subject) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found subject' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'deleteSubject failure.' 
    });
  }
};
