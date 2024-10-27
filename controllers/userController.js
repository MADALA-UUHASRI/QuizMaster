/*
// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send success message
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};
*/



// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register function (existing code)
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send success message
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
    console.log("Request body:", req.body); // Add this line to log the request body
    const { username, password } = req.body;
  
    console.log("Attempting to log in with username:", username); // Debug log
  
    try {
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        console.log("User not found in the database."); // Debug log
        return res.redirect('/regs'); // Redirect to registration if user not found
      }
  
      console.log("User found:", user); // Debug log
  
      // Compare the entered password with the hashed password in DB
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Invalid password, but user exists."); // Debug log
        return res.render('login', { errorMessage: 'Username is correct, but the password is incorrect. Please try again.' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Set token as a cookie and redirect to quiz page
      res.cookie('token', token, { httpOnly: true });
      console.log("Login successful, redirecting to quiz"); // Debug log
      res.redirect('/quiz'); // Redirect to quiz page on successful login
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  