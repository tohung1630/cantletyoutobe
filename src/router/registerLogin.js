var express = require('express')
var router = express.Router()

const registerLoginController =require('../app/controllers/registerLoginController')
const middlewareController =require('../app/middleware/middlewareController')


router.get('/Login',registerLoginController.login)

router.get('/logout',registerLoginController.logout)

router.get('/register',registerLoginController.register)

router.post('/signin',registerLoginController.signin)

router.post('/register',registerLoginController.registera)

router.post('/refreshToken',registerLoginController.refreshToken)

module.exports=router