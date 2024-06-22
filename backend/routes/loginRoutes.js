const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.postLoginUser);

router.post('/register', userController.postRegisterUser);

router.post('/profile', userController.postSaveProfile);

module.exports = router;