const Code = require('../models/code');
const ChildCode = require('../models/childCode');
require('dotenv').config();

exports.createCode = async function (req, res) {
  try{
    const code = await new Code(req.body).save();
    res.status(201).json({
      result: 'ok'
    });
  } catch(err) {
    console.error(err);
    res.status(500).send({ 
      message: err.message || 'createCode failure.' 
    });
  }
};

exports.findAllCode = async function (req, res) {
  try {
    const code = await Code.find(req.params).sort('-createdAt');
    if (code.length) {
      res.send(code)
    } else {
      res.status(404).json({ error: 'not found code' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findAllCode failure.' 
    });
  }
};

exports.findCode = async function (req, res) {
  try {
    const code = await Code.find(req.params);
    if (code.length) {
      res.send(code)
    } else {
      res.status(404).json({ error: 'not found code' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findCode failure.' 
    });
  }
};

exports.updateCode = async function (req, res) {
  try {
    if(!req.body.updateUserId){
      res.status(400).send({ 
        message: 'updateUserId null.' 
      });
      return;
    }
    const code = await Code.findByIdAndUpdate(req.params, req.body, {useFindAndModify: false});
    if (code) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found code' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'updateCode failure.' 
    });
  }
};

exports.deleteCode = async function (req, res, next) {
  try {
    const code = await Code.deleteOne(req.params);
    if (code) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found code' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'deleteCode failure.' 
    });
  }
};

// childCode 
exports.createChildCode = async function (req, res) {
  try{
    if(!req.body.updateUserId){
      res.status(400).send({ 
        message: 'updateUserId null.' 
      });
      return;
    }
    if(!req.body.createUserId){
      res.status(400).send({ 
        message: 'createUserId null.' 
      });
      return;
    }
    const childCode = new ChildCode(req.body);

    const code = await Code.findOneAndUpdate(req.params, {$push: { childCodes: childCode }})
    if (code) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found code for childCode' });
    }
  } catch(err) {
    console.error(err);
    res.status(500).send({ 
      message: err.message || 'createChildCode failure.' 
    });
  }
};

exports.findAllChildCode = async function (req, res) {
  try {
    const code = await Code.find(req.params).sort('-createdAt');
    if (code.length) {
      res.send(code)
    } else {
      res.status(404).json({ error: 'not found code' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'findAllChildCode failure.' 
    });
  }
};

exports.updateChildCode = async function (req, res) {
  try {
    const code = await Code.updateOne(
      {
        _id: req.params._id, 
        'childCodes._id': req.params.childCode_id
      },
      {
        $set: {
          "childCodes.$.updateUserId": req.body.updateUserId,
          "childCodes.$.codename": req.body.codename,
          "childCodes.$.useYN": req.body.useYN,
          "childCodes.$.language": req.body.language,
        }
      })
    if (code) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found code' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'updateChildCode failure.' 
    });
  }
};

exports.deleteChildCode = async function (req, res, next) {
  try {
    const code = await Code.update(
      {
        _id: req.params._id, 
        'childCodes._id': req.params.childCode_id
      },
      {
        $pull: {
          childCodes: {
            _id: req.params.childCode_id
          }
        }
      })
    if (code) {
      res.send({
        result: 'ok'
      })
    } else {
      res.status(404).json({ error: 'not found code' });
    }
  } catch (err) {
    res.status(500).send({ 
      message: err.message || 'deleteChildCode failure.' 
    });
  }
};
