const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000
const router = require('./router')

const methodOverride = require('method-override')

const session = require('express-session')
const db =require('./config/db')
const cookieParser = require('cookie-parser')




//connect to db
db.connect()


//cookie
app.use(cookieParser())


//file tĩnh
app.use(express.static(path.join(__dirname,'public')))

// app like middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(methodOverride('_method'))


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))




//handlebars
app.engine('hbs', handlebars.engine({extname:'.hbs'}))
app.set('view engine', 'hbs')
//app set link views
app.set('views', path.join(__dirname, 'resources','views'))

//tìm 1 phần tử trong arry, aryy trong obj data
var expressHbs =  require('express-handlebars')
var hbs = expressHbs.create({})
    hbs.handlebars.registerHelper('tenvideo', function (video,videoid) {
    for(var i=0;i<video.length;i++){
        if(video[i].videoid==videoid)
            {
                return video[i].tenvideo
            }
    }})
    hbs.handlebars.registerHelper('videoid', function (video,videoid) {
      for(var i=0;i<video.length;i++){
          if(video[i].videoid==videoid)
              {
                  return video[i].videoid
              }
    }})
    hbs.handlebars.registerHelper('motavideo', function (video,videoid) {
      for(var i=0;i<video.length;i++){
            if(video[i].videoid==videoid)
                {
                    return video[i].motavideo
                }
        }})
    hbs.handlebars.registerHelper('sum', function (a,b) {
        return a+b
      })




//tuyến đường
router(app)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})