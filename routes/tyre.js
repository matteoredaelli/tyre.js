var express = require('express');
var router = express.Router();

var parser = require('../tyre/parser');

/* GET users listing. */
/* GET users listing. */
router.get('/parse/description', function(req, res, next) {
  var result = {};
  console.log(req.query)
  if (req.query && "q" in req.query) {
    let q = req.query.q
    console.log(q)
    result = parser.parse_description(q)
  }
  res.send(result);

});

module.exports = router;
