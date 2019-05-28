let express = require('express');
let router = express.Router();

const jsonParser = express.json();
const League = require('../models/league');
const Command = require('../models/command');

/* GET reg page. */
router.get('/', async function(req, res, next) {
    try {

        let resultForPUG = {
            title: "Регистрация",
            leagues: [],
        };
        let leagues = await League.getAll();
        if (leagues.detail !== undefined) throw leagues;
        let getLeagues = JSON.parse(leagues.result);
        for (let i = 0; i < getLeagues.length; i++) {
            resultForPUG.leagues.push(getLeagues[i].name);
        }
        console.log(resultForPUG);
        res.render('reg', resultForPUG);
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});

router.post("/add", jsonParser, async function (req, res) {
    try {
        if (!req.body) return req.sendStatus(400);
        let params = req.body;
        console.log(params);
        let id_com = await Command.add(params.name, params.school, params.id_league, params.city, params.head, params.phone);
        if (id_com.detail !== undefined) throw id_com;
        let getId_com = JSON.parse(id_com);
        let num_id = getId_com[0].id;
        for (let i = 0; i < params.particips.length; i++) {
            let resAdd = await Command.addPartisip(num_id, params.particips[i].name, params.particips[i].grade);
            if (resAdd.detail !== undefined) throw resAdd;
        }
        let code = await Command.getCode(num_id);
        if (code.detail !== undefined) throw code;
        let getCode = JSON.parse(code);
        let num_code = getCode[0].code;
        res.json({code: num_code}); // отправляем ответ обратно
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});

module.exports = router;