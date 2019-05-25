let express = require('express');
let router = express.Router();

/* GET reg page. */
router.get('/', function(req, res, next) {
    res.render('reg', { title: 'Регистрация'});
});

module.exports = router;