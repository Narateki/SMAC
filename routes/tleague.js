let express = require('express');
let router = express.Router();

/* GET tleague page. */
router.get('/', function(req, res, next) {
    res.render('tleague', { title: 'tleague'});
});

module.exports = router;

