var express = require('express')
var router = express.Router()

const videoController =require('../app/controllers/videoController')
const middlewareController =require('../app/middleware/middlewareController')

router.post('/Store',middlewareController.varifyToken,videoController.Storevideo)

router.get('/Create',middlewareController.varifyToken,videoController.Createvideo)

router.get('/fix/:index',middlewareController.varifyToken,videoController.fixvideo)

router.put('/update/:id',middlewareController.varifyToken,videoController.updatevideo)

router.delete('/delete/:index',middlewareController.varifyToken,videoController.deletevideo)

router.get('/:videoid',videoController.showvideo)

module.exports=router