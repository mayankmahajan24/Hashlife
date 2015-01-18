var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

 	res.write({"0": "Hello World"});
 	res.render("index", {});

});

module.exports = router;
