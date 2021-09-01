const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const dailySubjectSchema = new mongoose.Schema({
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
  subject_id: {
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
  nickname: {
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


dailySubjectSchema.plugin(timeZone);
module.exports = mongoose.model('DailySubject', dailySubjectSchema);