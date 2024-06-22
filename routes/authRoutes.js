const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// POST route for user signup
router.post('/signup', authController.signup);

router.post('/login', authController.login, (req, res) => {
    res.send('Login successful');
});

router.get('/logout', authController.logout);
module.exports = router;
