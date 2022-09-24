const youtubechannels=require('../model/youtubechannels')
const {mongooseObject,listMongooseObject}=require('../../util/mongooes')

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const session = require('express-session')

class MeController{
    //get        /me/listvideome
    listVideoMe(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        Promise.all([youtubechannels.find({_id:ketqua.id}),youtubechannels.findById(ketqua.id)])
                .then(([youtubechannels,tenkenh])=>res.render('me/listVideoMe',{youtubechannels:listMongooseObject(youtubechannels),tenkenh: mongooseObject(tenkenh)}))
                .catch(next)
        
    }
    // get      /me/account
    accountMe(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.findById(ketqua.id)
            .then(tenkenh=>res.render('me/accountMe',{tenkenh: mongooseObject(tenkenh)}))
        
    }

    // get      /me/accountMeFix
    accountMeFix(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.findById(ketqua.id)
            .then(tenkenh=>res.render('me/accountMeFix',{tenkenh: mongooseObject(tenkenh)}))
    }

// put      /me/update
    update(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.updateOne({_id:ketqua.id},req.body)
            .then(()=>res.redirect('/me/account'))
            .catch(next)
    }

// get      /me/changePassword
    changePassword(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.findById(ketqua.id)
            .then(tenkenh=>res.render('me/changePassword',{tenkenh: mongooseObject(tenkenh)}))
    }


// put      /me/updatePassword
    updatePassword(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.findById(ketqua.id)
            .then((tenkenh)=>{
                if(req.body.matkhaucu===tenkenh.matkhau){
                    tenkenh.matkhau=req.body.matkhau
                    tenkenh.save()
                    res.render('me/accountMe',{tenkenh: mongooseObject(tenkenh)})
                }
                else{
                    const saimatkhau = 'Mật Khẩu Sai'
                    res.render('me/changePassword',{tenkenh: mongooseObject(tenkenh),saimatkhau})
                }
            })
            .catch(next)
    }
}
module.exports=new MeController