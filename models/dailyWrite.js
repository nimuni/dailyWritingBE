const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const dailyWriteSchema = new mongoose.Schema({
  user: {
    userId: {
      type: String
    },
    nickname: {
      type: String
    }
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: []
},
{
  timestamps: true
})

dailyWriteSchema.plugin(timeZone);
module.exports = mongoose.model('DailyWrite', dailyWriteSchema);