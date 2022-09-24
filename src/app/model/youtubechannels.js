const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const youtubechannels = new Schema({
  tenkenh: {type:String},
  motakenh: {type:String},
  soluotdangky: {type:Number},
  taikhoan:{type:String},
  matkhau:{type:String},
  video:[{
      tenvideo:{type:String},
      videoid:{type:String},
      motavideo:{type:String},
      luotxem:{type:Number},
      like:{type:Number},
      dislike:{type:Number},
      binhluat:[{
          id:{type:Number},
          noidung:{type:String},
          like:{type:Number},
          dislike:{type:Number},
      }]
  }],
  binhluat:[{
    id:{type:Number}
  }]
})

module.exports = mongoose.model('youtubechannels', youtubechannels)