var express = require('express')
var router = express.Router()

const meController =require('../app/controllers/meController')
const middlewareController =require('../app/middleware/middlewareController')


router.get('/listvideo',middlewareController.varifyToken,meController.listVideoMe)

router.get('/account',middlewareController.varifyToken,meController.accountMe)

router.get('/accountMeFix',middlewareController.varifyToken,meController.accountMeFix)

router.get('/changePassword',middlewareController.varifyToken,meController.changePassword)

router.put('/update',middlewareController.varifyToken,meController.update)

router.put('/updatePassword',middlewareController.varifyToken,meController.updatePassword)



module.exports=router