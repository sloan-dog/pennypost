var express = require('express');
var router = express.Router();
var lobApi = require('lob')(process.env.lob_api_key_test);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/sendcard',function(req,res){
  lobApi.postcards.create({
      description: 'Demo Postcard job',
      to: {
          name: 'Joe Smith',
          address_line1: '123 Main Street',
          address_city: 'Mountain View',
          address_state: 'CA',
          address_zip: '94041'
        },
        front: req.body.front,
        message: 'yooooooooooo'
      }, function (err, data) {
        console.log(err,data);
        if (err){
          res.send(err);
        }else{
          res.send(data);
        }
      });
});

module.exports = router;