var express = require('express');
var app = express();
var instagram = require('./controllers/instagram');
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname));
app.use('/instagram', instagram);
app.use(cookieParser());

app.get('/',function(req,res){

      if(req.cookies.instaToken){
          res.redirect('/#!/new-postcard');
      }else{res.redirect('/#!/')}
});

app.listen(process.env.PORT || 3000)