const siteRouter = require('./site')
const videoRouter = require('./video')
const registerLoginRouter = require('./registerLogin')
const meRouter = require('./me')

function router(app){
    app.use('/video',videoRouter)

    app.use('/RegisterLogin',registerLoginRouter)

    app.use('/me',meRouter)
    
    app.use('/',siteRouter)
}
module.exports=router