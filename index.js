var express = require('express');
var app = express();
var instagram = require('./controllers/instagram');
var lob = require('./controllers/lob');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use('/instagram', instagram);
app.use('/lob', lob);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){

      if(req.cookies.instaToken){
          res.redirect('/#!/new-postcard');
      }else{res.redirect('/#!/')}
});

app.listen(process.env.PORT || 3000)