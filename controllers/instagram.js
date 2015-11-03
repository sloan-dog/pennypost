var express = require('express');
var router = express.Router();
var instaApi = require('instagram-node').instagram();


instaApi.use({
  client_id: process.env.instagram_client_id,
  client_secret: process.env.instagram_client_secret
});

var redirect_uri = 'http://localhost:3000/handleauth';

router.get('/authorize-user', function (req, res){
  res.redirect(instaApi.get_authorization_url(redirect_uri));
});

router.get('/handleauth', function (req, res){
  instaApi.authorize_user(req.query.code, redirect_uri, function(err, result){
    if (err) {
      res.send(err.body);
    }else{
      res.send(result);
      // res.redirect('/#!/new-postcard');
    }
  })
})

module.exports = router;