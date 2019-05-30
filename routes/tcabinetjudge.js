let express = require('express');
let router = express.Router();

/* GET tcabinetjudge page. */
router.get('/', function(req, res, next) {
    res.render('tcabinetjudge', { title: 'tcabinetjudge'});
});

module.exports = router;