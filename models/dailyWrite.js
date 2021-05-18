const mongoose = require('mongoose');

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

module.exports = mongoose.model('DailyWrite', dailyWriteSchema);