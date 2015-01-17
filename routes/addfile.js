var express = require('express');
var crypto = require('crypto');
var router = express.Router();

/* GET users listing. */
router.get('/:filename', function(req, res) {
  //res.render('respond with a resource');
  	N = 256;
 	s = randomValueBase64(16);
    doc = {name: req.params.filename, password: s, token: req.query.token, author: req.query.author};
    });
    connection.collection('passwords').insert(doc, function (err){
});



function randomValueBase64 (len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}


module.exports = router;
