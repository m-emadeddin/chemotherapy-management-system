const express = require('express');
const router = express.Router();
const UserController = require('../controllers/SignPage.controllers');
const authMiddleware = require("../middlewares/auth.middlewares");

router.post('/signup', UserController.UserSignUp);
router.post('/signin', UserController.UserSignIn);
router.get('/user', authMiddleware, UserController.GetUserData);
router.post('/logout', authMiddleware, UserController.UserLogout);

module.exports = router;

