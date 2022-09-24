const youtubechannels=require('../model/youtubechannels')
const {listMongooseObject,mongooseObject}=require('../../util/mongooes')
const jwt = require("jsonwebtoken")


class VideoController{
    showvideo(req, res, next){
        var vid= req.params.videoid

        const token = req.cookies.token
        
        if(token==undefined){
        Promise.all([youtubechannels.find({}),youtubechannels.find({"video.videoid": req.params.videoid})])
            .then(([youtubechannelsss,youtubechannels])=>res.render('video/showVideo',{youtubechannels:listMongooseObject(youtubechannels),youtubechannelsss: listMongooseObject(youtubechannelsss),vid}))
            .catch(next)
        }
        else{
        const ketqua = jwt.verify(token, 'verySecretValue')
        Promise.all([youtubechannels.find({}),youtubechannels.find({"video.videoid": req.params.videoid}),youtubechannels.findById(ketqua.id)])
            .then(([youtubechannelsss,youtubechannels,tenkenh])=>res.render('video/showVideo',{youtubechannels:listMongooseObject(youtubechannels),youtubechannelsss: listMongooseObject(youtubechannelsss),vid,tenkenh: mongooseObject(tenkenh)}))
            .catch(next)
        }
    }

    // get     /video/Create      
    Createvideo(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        Promise.all([youtubechannels.find({}),youtubechannels.findById(ketqua.id)])
                .then(([youtubechannels,tenkenh])=>res.render('video/createvideo',{youtubechannels:listMongooseObject(youtubechannels),tenkenh: mongooseObject(tenkenh)}))
                .catch(next)
        }
    Storevideo(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.findById(ketqua.id)
            .then(youtubechannels=>{
                const video = youtubechannels.video
                video.push({
                    tenvideo:req.body.tenvideo,
                    videoid:req.body.videoid,
                    motavideo:req.body.motavideo,
                    luotxem:0,
                    like:0,
                    dislike:0
                })
                youtubechannels.save()
                res.redirect('/')
                
            })
            .catch(next)
    }
    // get  /video/fix/:index
    fixvideo(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.findById(ketqua.id)
            .then(tenkenh=>{
                const video = tenkenh.video[req.params.index]
                res.render('video/fixvideo',{video:mongooseObject(video),tenkenh:mongooseObject(tenkenh)})
            })   
    }

    // put    /video/update/:id
    updatevideo(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.findById(ketqua.id)
            .then(youtubechannels=>{
                const video =youtubechannels.video
                video.forEach(e =>{
                    if(e._id==req.params.id)
                    {
                        e.tenvideo=req.body.tenvideo
                        e.videoid=req.body.videoid
                        e.motavideo=req.body.motavideo
                        youtubechannels.save()
                        res.redirect('/me/listvideo')
                    }
                }) 
                // res.json(video)
                // video.updateOne({_id:req.params.id},req.body)
                // 
            })
            .catch(next)

    }

// delete    /video/delete/:id
    deletevideo(req, res, next){
        const token = req.cookies.token
        const ketqua = jwt.verify(token, 'verySecretValue')
        youtubechannels.findById(ketqua.id)
            .then((youtubechannels)=>{
                let video = youtubechannels.video
                video.splice(req.params.index,1)
                // res.json(video)
                youtubechannels.save()
                res.redirect('back')
            })

    }
}


module.exports=new VideoController