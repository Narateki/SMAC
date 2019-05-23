let express = require('express');
let router = express.Router();

/* GET tparticip page. */
router.get('/', function(req, res, next) {
    res.render('tparticip', { title: 'tparticip'});
});

module.exports = router;