let express = require('express');
let router = express.Router();

/* GET tjudge page. */
router.get('/', function(req, res, next) {
    res.render('tjudge', { title: 'tjudge'});
});

module.exports = router;