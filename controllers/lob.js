var express = require('express');
var router = express.Router();
var lobApi = require('lob')(process.env.lob_api_key_test);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/sendcard',function(req,res){
  var images = req.body.test;
  console.log(req.body)
  res.send(images);
});

module.exports = router;