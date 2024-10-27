/*
// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like CSS, JS

// Route to render index.ejs at root URL
app.get('/', (req, res) => {
  res.render('index');
});

// Routes for login, register, and profile pages
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('regs'); // Renders regs.ejs as registration page
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

// User routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

*/


// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cookieParser = require('cookie-parser'); // Make sure this line is included

const app = express();

// Connect to MongoDB
connectDB();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like CSS, JS


// Routes to render EJS pages
app.get('/', (req, res) => res.render('index')); // Main page
app.get('/login', (req, res) => res.render('login')); // Login page
app.get('/register', (req, res) => res.render('regs')); // Register page
app.get('/profile', (req, res) => res.render('profile')); // Profile page
app.get('/quiz', (req, res) => res.render('quiz')); // Quiz page (after successful login)
app.get('/feedback', (req, res) => {
    res.render('feedback'); // This should render your feedback form page
});


// User routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
