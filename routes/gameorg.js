let express = require('express');
let router = express.Router();

/* GET gameorg page. */
router.get('/', function(req, res, next) {
    res.render('gameorg', { title: 'gameorg'});
});

module.exports = router;