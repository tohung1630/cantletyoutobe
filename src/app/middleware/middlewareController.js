const jwt = require("jsonwebtoken")

const middlewareController={
    varifyToken:(req,res,next)=>{
        try {
            const token = req.cookies.token
            const ketqua = jwt.verify(token, 'verySecretValue')
            if(ketqua){
                next()
            }
        } catch (error) {
            res.render('registerlogin/login')
        }

    },
    myVarifyToken:(req,res,next)=>{
        middlewareController.varifyToken(req,res, ()=>{
            if(req.user.id===req.params.id||req.user.admin){
                next()
            }
            else{
                res.status(403).json('Bạn không có quyền')
            }
        })

    }
}
module.exports=middlewareController