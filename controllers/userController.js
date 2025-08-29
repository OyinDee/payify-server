
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');

// Login controller
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validation
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Identifier (email/matric number/JAMB reg) and password are required.' });
    }

    // Find user by email, matric number, or JAMB reg
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { matric_number: identifier },
        { jambReg: identifier }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        userType: user.user_type
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

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
      full_name,
      faculty_name,
      department_name,
      user_type,
      level
    } = req.body;

    // Validation
    if (!email || !password || !full_name) {
      return res.status(400).json({ error: 'Missing required fields. Email, password, and full name are required.' });
    }

    // 100 level
    if (level === 100) {
      if (!jambReg && !matric_number) {
        return res.status(400).json({ error: 'JAMB registration number is required for 100 level if no matric number.' });
      }
    } else {
      // 200 level and above
      if (!isSchoolEmail(email)) {
        return res.status(400).json({ error: 'Only school email (@fuoye.edu.ng) allowed for 200 level and above.' });
      }
      if (!matric_number) {
        return res.status(400).json({ error: 'Matric number is required for 200 level and above.' });
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
      full_name,
      faculty_name,
      department_name,
      user_type: user_type || 'student',
      level
    });
    await user.save();
    res.status(201).json({ message: 'Registration successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
