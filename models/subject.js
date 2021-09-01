const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  codename: {
    type: String,
    required: true
  },
  code_id: {
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
  like: {
    type: Number,
    default: 0
  },
  view: {
    type: Number,
    default: 0
  },
  nickname: {
    type: String,
    required: true
  },
  createUserId: {
    type: String,
    required: true
  },
  updateUserId: {
    type: String,
    required: true
  },
  useCount: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
})


subjectSchema.plugin(timeZone);
module.exports = mongoose.model('Subject', subjectSchema);