var express = require('express');
var app = express();
var instagram = require('./controllers/instagram');

app.use(express.static(__dirname));
app.use('/instagram', instagram)

app.get('/',function(req,res){
	res.render('index.html');
});

app.listen(process.env.PORT || 3000)