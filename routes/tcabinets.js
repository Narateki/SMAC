let express = require('express');
let router = express.Router();

/* GET tcabinets page. */
router.get('/', function(req, res, next) {
    res.render('tcabinets', { title: 'Кабинеты'});
});

module.exports = router;