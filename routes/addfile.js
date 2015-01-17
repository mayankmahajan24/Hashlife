var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:filename', function(req, res) {
  //res.render('respond with a resource');
  	N = 256;
 	//s = new Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
 	s = stringGen();
    doc = {name: req.params.filename, password: s};
    });
    connection.collection('passwords').insert(doc, function (err){



});

function stringGen()
{
    var text = " ";

    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 256; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
}

module.exports = router;
