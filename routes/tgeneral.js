let express = require('express');
let router = express.Router();

/* GET tgeneral page. */
router.get('/', function(req, res, next) {
    res.render('tgeneral', { title: 'tgeneral'});
});

module.exports = router;