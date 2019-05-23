let express = require('express');
let router = express.Router();

/* GET ttask page. */
router.get('/', function(req, res, next) {
    res.render('ttask', { title: 'ttask'});
});

module.exports = router;