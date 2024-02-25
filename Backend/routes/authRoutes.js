const express = require('express');
const { signinController, signupController, signoutController } = require('../controllers/authControllers');
const router = express.Router();

router.post('/signup',signupController);

router.post('/signin',signinController)

router.post('/signout',signoutController)

module.exports = router