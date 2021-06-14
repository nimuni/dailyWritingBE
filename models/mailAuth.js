const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');
const ttl = require('mongoose-ttl');

const mailAuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  authCode: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  used: {
    type: String,
    default: "N"
  },
},
{
  timestamps: true
})

mailAuthSchema.plugin(timeZone);
mailAuthSchema.plugin(ttl, { ttl: 180 });
module.exports = mongoose.model('mailAuth', mailAuthSchema);