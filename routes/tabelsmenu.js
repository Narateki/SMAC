let express = require('express');
let router = express.Router();

/* GET tablesmenu page. */
router.get('/', function(req, res, next) {
    res.render('tablesmenu', { title: 'tablesmenu'});
});

module.exports = router;