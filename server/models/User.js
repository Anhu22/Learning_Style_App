const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  schoolname: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
