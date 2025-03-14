var express = require('express');
var router = express.Router();
var data  = require('../data/data_provider.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  var users = data.findAll()
  res.render('index', { users:users });
});

router.post('/', function(req, res, next) {
  var new_user = { name: req.body.nombre, email: req.body.email, bio:req.body.bio};
  console.log(req.body)
  data.add(new_user);
  res.redirect("/");
});

router.get('/delete/:index', function(req,res,next){
  let index = req.params.index;
  data.removeAt(index);
  res.redirect("/");
});

/* GET map page. */
router.get('/mapa', function(req, res, next) {
  res.render('mapa', {});
});

module.exports = router;
