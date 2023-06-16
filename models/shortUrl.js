const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new moongose.Schema({
    full : {
        type:String,
        required : true
    },
    short : {
        type : String,
        required : true,
        default : shortId.generate
    },
    visitHistory:[{timestamps : {type:Number}}],
    clicks : {
        type:Number,
        required : true,
        default : 0
    }
},{timestamps:true})
module.exports = mongoose.model('ShortUrl',shortUrlSchema)