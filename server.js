const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')

const app = express()
const port = 3000

app.use(express.urlencoded({extended:false}))
mongoose.connect('mongodb://localhost/urlShortner',{useNewUrlParser:true,useUnifiedTopology:true})
app.set('view engine','ejs')

app.get('/',async (req, res) =>{ 
    const shortUrls = await ShortUrl.find()
    res.render('index',{shortUrls:shortUrls,visitHistory:[]})})

app.post('/shortUrls',async (req,res)=>{
   await ShortUrl.create({full:req.body.fullUrl})
   res.redirect('/')
})

app.get('/:shortUrl',async(req,res)=>{
    var time = new Date();
    const shortUrl = await ShortUrl.findOneAndUpdate({short:req.params.shortUrl},{$push:{visitHistory:{timestamp: time}}})
    if(shortUrl==null){
        return res.sendStatus(404)
    }   
    shortUrl.clicks++;
    shortUrl.save()
    res.redirect(shortUrl.full)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))