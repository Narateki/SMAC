let express = require('express');
let router = express.Router();

/* GET kat page. */
router.get('/', function(req, res, next) {
    res.render('kat', { title: 'Express' ,
                        message: 'hi'});
});

module.exports = router;
