const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');
const ChildCode = require("./childCode").schema;

const codeSchema = new mongoose.Schema({
  codename: {
    type: String,
    required: true
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
    default: "N"
  },
  childCodes: {
    type: [ChildCode]
  },
  createUserId: {
    type: String,
    required: true
  },
  updateUserId: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})


codeSchema.plugin(timeZone);
module.exports = mongoose.model('Code', codeSchema);