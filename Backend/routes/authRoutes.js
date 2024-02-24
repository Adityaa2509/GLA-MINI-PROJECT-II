const express = require('express');
const { signinController, signupController } = require('../controllers/authControllers');
const router = express.Router();

router.post('/signup',signupController);

router.post('/signin',signinController)

module.exports = router