const express = require('express')
const router = express.Router()
const userController= require('../controller/user.controller')

router.post('/register',userController.signUpController)
router.post('/signIn',userController.signInController)
router.get('/user/profile',userController.getUserProfile)


module.exports = router