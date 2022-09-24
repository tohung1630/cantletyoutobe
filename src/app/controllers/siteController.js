const youtubechannels=require('../model/youtubechannels')
const {listMongooseObject,mongooseObject}=require('../../util/mongooes')
const jwt = require("jsonwebtoken")

class SiteController{
    home(req, res, next){

        const token = req.cookies.token
        var tg = (new Date().getTime())/1000

        if(token==undefined){   
        youtubechannels.find({})
            .then(youtubechannels=>res.render('home',{youtubechannels: listMongooseObject(youtubechannels)}))
            .catch(next)
        }
        else{
            const ketqua = jwt.verify(token, 'verySecretValue')
            Promise.all([youtubechannels.find({}),youtubechannels.findById(ketqua.id)])
                .then(([youtubechannels,tenkenh])=>res.render('home',{youtubechannels:listMongooseObject(youtubechannels),tenkenh: mongooseObject(tenkenh)}))
                .catch(next) 
        }
    }
}
module.exports=new SiteController