const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const dailyWriteCommentSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  nickname: {
    type: String
  },
  comment: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  hideYN: {
    type: String,
    default: 'N'
  }
},
{
  timestamps: true
})

dailyWriteCommentSchema.plugin(timeZone);
module.exports = mongoose.model('DailyWriteComment', dailyWriteCommentSchema);