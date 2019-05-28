let express = require('express');
let router = express.Router();

const Cabinet = require('../models/cabinet');

/* GET loginjudge page. */
router.get('/', async function(req, res, next) {
    try {

        let resultForPUG = {
            title: "Вход судьи",
            cabinets: [],
        };
        let cabinets = await Cabinet.getAll();
        if (cabinets.detail !== undefined) throw cabinets;
        let getCabinets = JSON.parse(cabinets.result);
        for (let i = 0; i < getCabinets.length; i++) {
            resultForPUG.cabinets.push(getCabinets[i].name);
        }
        console.log(resultForPUG);
        res.render('loginjudge', resultForPUG);
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});

router.post('/login', async function(req, res, next) {
    try {
        let params = req.body;
        console.log(params);
        let cabinet = await Cabinet.isRightCode(params[0].id_cabinet, parseInt(params[0].code));
        if (cabinet.detail !== undefined) throw cabinet;
        let getCabinets = {name: JSON.parse(cabinet)};
        res.json(getCabinets);
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});

router.get('/game/:cab', async function(req, res, next) {
    let param = req.params["cab"];
    //res.json({url: req.url});
    res.render('game',  {title: "Game"});
});

module.exports = router;