const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userGroup: {
    type: String,
    default: "일반회원"
  },
  userGroupCodeId: {
    type: String,
    default: "60c74cc1c5c527601481b9f4"
  },
  email: {
    type: String,
    required: true
  },
  emailVerify: {
    type: String,
    required: true
  },
  useYN: {
    type: String,
    default: "Y"
  },
  startStopDT: { 
    type: Date,
    default: null
  },
  endStopDT: {
    type: Date,
    default: null
  }
},
{
  timestamps: true
})

userSchema.plugin(timeZone);
module.exports = mongoose.model('User', userSchema);