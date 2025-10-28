const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

{/*// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { schoolname, rollno, password } = req.body;

    if (!schoolname || !rollno || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate rollno is a number
    if (isNaN(rollno)) {
      return res.status(400).json({ message: 'Roll number must be a number' });
    }

    // Check if the user already exists in the same school
    const existingUser = await User.findOne({ schoolname, rollno });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      schoolname,
      rollno: Number(rollno),
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});*/}
// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { schoolname, rollno, password } = req.body;

    if (!schoolname || !rollno || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (isNaN(rollno)) {
      return res.status(400).json({ message: 'Roll number must be a number' });
    }

    const existingUser = await User.findOne({ schoolname, rollno });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      schoolname,
      rollno: Number(rollno),
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);

    // 👇 Handle duplicate key error from MongoDB
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Roll number already exists for this school' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
router.post('/', async (req, res) => {
  try {
    const { schoolname, rollno, password } = req.body;

    const user = await User.findOne({ schoolname, rollno });
    if (!user) {
      return res.status(401).json({ message: 'Invalid school name, roll number or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid school name, roll number or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
