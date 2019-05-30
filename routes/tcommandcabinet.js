let express = require('express');
let router = express.Router();

/* GET tcommandcabinet page. */
router.get('/', function(req, res, next) {
    res.render('tcommandcabinet', { title: 'tcommandcabinet'});
});

module.exports = router;