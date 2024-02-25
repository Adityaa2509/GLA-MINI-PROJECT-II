const express = require('express')
const { createPost } = require('../controllers/BlogControllers')
const Auth = require('../middlewares/Authorized')
const router = express.Router()

router.post('/create',Auth,createPost)

module.exports = router