var express = require('express')
var router = express.Router()
const siteController =require('../app/controllers/siteController')
const middlewareController =require('../app/middleware/middlewareController')

router.get('/',siteController.home)

module.exports=router