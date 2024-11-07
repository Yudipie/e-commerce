const express = require('express')
const {registerUser, loginUser,checkUser} = require('../controller/authController')

const router = express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/check-user',checkUser)


module.exports = router;