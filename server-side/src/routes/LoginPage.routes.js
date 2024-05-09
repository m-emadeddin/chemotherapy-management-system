const express = require('express');
const router = express.Router();
const UserController = require('../controllers/LoginPage.controllers');
const authMiddleware = require("../middlewares/auth.middlewares");

// Route for user sign-up
router.post('/signup', UserController.UserSignUp);

// Route for user sign-in
router.post('/signin', UserController.UserSignIn);

router.get('/user', authMiddleware, UserController.GetUserData);
router.post('/logout', authMiddleware, UserController.UserLogout);

module.exports = router;

