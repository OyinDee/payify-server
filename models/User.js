const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  matric_number: {
    type: String,
    unique: true,
    sparse: true, 
    trim: true
  },
  jambReg: {
    type: String,
    trim: true,
    default: null
  },
  isFresher: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  faculty_id: {
    type: Number,
    required: true
  },
  department_id: {
    type: Number,
    required: true
  },
  user_type: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
