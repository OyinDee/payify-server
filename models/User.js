const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  matric_number: {
    type: String,
    sparse: true,
    trim: true
  },
  jambReg: {
    type: String,
    trim: true,
    default: null
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
  level: {
    type: Number,
    required: true
  },
  user_type: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  university_id: {
    type: String,
    default: 'UNIV-2025-XYZ123'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// unique matric number per university
userSchema.index({ matric_number: 1, university_id: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('User', userSchema);
