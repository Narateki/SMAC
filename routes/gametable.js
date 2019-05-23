let express = require('express');
let router = express.Router();

/* GET gametable page. */
router.get('/', function(req, res, next) {
    res.render('gametable', { title: 'gametable'});
});

module.exports = router;