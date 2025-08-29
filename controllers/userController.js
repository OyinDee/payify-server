
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Helper to check if email is a school email
function isSchoolEmail(email) {
  return email.endsWith('@fuoye.edu.ng');
}

// Registration controller
exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      jambReg,
      matric_number,
      isFresher,
      full_name,
      faculty_id,
      department_id,
      user_type
    } = req.body;

    // Validation
    if (!email || !password || !full_name || !faculty_id || !department_id) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // 100 level (fresher)
    if (isFresher) {
      if (!jambReg && !matric_number) {
        return res.status(400).json({ error: 'JAMB registration number is required for freshers if no matric number.' });
      }
    } else {
      // 200 level and above
      if (!isSchoolEmail(email)) {
        return res.status(400).json({ error: 'Only school email (@fuoye.edu.ng) allowed for non-freshers.' });
      }
      if (!matric_number && !jambReg) {
        return res.status(400).json({ error: 'Matric number is required for non-freshers if no JAMB reg.' });
      }
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      jambReg,
      matric_number,
      isFresher: !!isFresher,
      full_name,
      faculty_id,
      department_id,
      user_type: user_type || 'student'
    });
    await user.save();
    res.status(201).json({ message: 'Registration successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
