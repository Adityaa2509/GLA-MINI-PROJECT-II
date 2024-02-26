const express = require('express');
const { updateUser, deleteUser} = require('../controllers/userControllers');
const router = express.Router();
const Authorized = require('../middlewares/Authorized')

router.put('/update/:userId',Authorized,updateUser)
router.delete('/delete/:userId',Authorized,deleteUser)
router.get('/getUser/:userId',Authorized)


module.exports = router