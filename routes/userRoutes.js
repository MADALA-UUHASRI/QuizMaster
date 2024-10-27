
/*// routes/userRoutes.js
const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', register);

module.exports = router;
*/

const express = require('express');
const { register, loginUser } = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', loginUser); // This should be present

module.exports = router;

