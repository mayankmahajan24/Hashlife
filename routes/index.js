var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Hello World' });
 	res.send({"0": "Hello World"});
});

module.exports = router;
