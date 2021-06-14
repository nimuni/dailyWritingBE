const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const childCodeSchema = new mongoose.Schema({
  codename: {
    type: String,
    require: true
  },
  useYN: {
    type: String,
    default: "Y"
  },
  language: {
    type: String,
    default: "KOR"
  },
  isChild: {
    type: String,
    default: "Y"
  },
  createUserId: {
    type: String,
    required: true
  },
  modifyUserId: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})
childCodeSchema.plugin(timeZone);
module.exports = mongoose.model('ChildCode', childCodeSchema);