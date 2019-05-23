let express = require('express');
let router = express.Router();

/* GET game page. */
router.get('/', function(req, res, next) {
    res.render('game', { title: 'game'});
});

module.exports = router;