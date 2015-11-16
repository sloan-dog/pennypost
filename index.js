var express = require('express');
var app = express();
var instagram = require('./controllers/instagram');
var cookieParser = require('cookie-parser');
var url0,url1,idx = 0;

app.use(express.static(__dirname));
app.use(function(req,res,next) {

  console.log('og url:',req.originalUrl,'dest url:',req.url,'method:',req.method);
  next();
})
app.use('/instagram', instagram);
app.use(cookieParser());

app.get('/',function(req,res){

      if(req.cookies.instaToken){
          res.redirect('/#!/new-postcard');
      }else{res.redirect('/#!/')}
});

app.listen(process.env.PORT || 3000)