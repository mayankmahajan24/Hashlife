var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  //res.render('respond with a resource');
  res.render("register", {})
});

module.exports = router;
