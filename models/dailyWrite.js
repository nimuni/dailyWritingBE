const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const dailyWriteSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  nickname: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    default: []
  },
  like: {
    type: Number,
    default: 0
  },
  view: {
    type: Number,
    default: 0
  },
  hideYN: {
    type: String,
    default: 'N'
  },
  createUserId: {
    type: String,
    required: true
  },
  updateUserId: {
    type: String,
    required: true
  },
  subject_id: {
    type: String,
    required: true
  },
  subjectCodename: {
    type: String,
    required: true
  },
  dailySubject_id: {
    type: String,
    required: true
  },
  dailySubjectCodename: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

dailyWriteSchema.plugin(timeZone);
module.exports = mongoose.model('DailyWrite', dailyWriteSchema);