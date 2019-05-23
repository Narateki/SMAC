let express = require('express');
let router = express.Router();

/* GET loginorg page. */
router.get('/', function(req, res, next) {
    res.render('loginorg', { title: 'loginorg'});
});

module.exports = router;