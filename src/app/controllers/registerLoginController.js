const youtubechannels=require('../model/youtubechannels')
const {mongooseObject,listMongooseObject}=require('../../util/mongooes')

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const session = require('express-session')



class RegisterLoginController{
    //get        /RegisterLogin/Login
    login(req, res, next){
        res.render('registerlogin/login')
    }
    //post           /RegisterLogin/signin
    signin(req, res, next){
        const taikhoan = req.body.taikhoan.toLowerCase()
	    const matkhau = req.body.matkhau
        youtubechannels.findOne({taikhoan:taikhoan,matkhau:matkhau})
            .then(youtubechannels=>{
                let token=jwt.sign({id:youtubechannels._id},'verySecretValue',{expiresIn:'365d'})
                res.cookie("token",token,{
                    httpOnly:true,
                    secure:false,
                    path:'/',
                    sameSite:"strict",
                })
                // req.session.loggedin=true
                // res.json(token)
                res.redirect('/')
            })
            .catch(next)
        }

        //post           /RegisterLogin/refreshToken
    refreshToken(req, res, next){

    }
    logout(req, res, next){
        res.clearCookie("token")
        res.redirect('/')
    }



    register(req, res, next){
        res.render('registerlogin/register')
    }


    registera(req, res, next){
        youtubechannels.findOne({taikhoan:req.body.taikhoan})
            .then((youtubechannel)=>{
                if(youtubechannel==null){
                    const channels = new youtubechannels(req.body)
                    channels.save()
                    const ko = "Đang Ký Thành Công, Mời Đăng Nhập"
                    res.render('registerlogin/login',{ko})
                }
                else{
                    const ko = "Tài Khoản Bị Trùng, Đăng Ký Không Thành Công"
                    res.render('registerlogin/register',{ko})
                }
        })
    }

}
module.exports=new RegisterLoginController