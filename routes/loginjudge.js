let express = require('express');
let router = express.Router();

/* GET loginjudge page. */
router.get('/', function(req, res, next) {
    res.render('loginjudge', { title: 'loginjudge'});
});

module.exports = router;