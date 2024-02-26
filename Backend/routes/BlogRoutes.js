const express = require('express')
const { createPost, updatePost, deletePost } = require('../controllers/BlogControllers')
const Auth = require('../middlewares/Authorized')
const router = express.Router()

router.post('/create',Auth,createPost)
router.put('/update/:id',Auth,updatePost)
router.delete('/delete/:id',Auth,deletePost)


module.exports = router