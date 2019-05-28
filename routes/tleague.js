let express = require('express');
let router = express.Router();

const League = require('../models/league');
const jsonParser = express.json();

/* GET tleagueKat page. */
router.get('/', async function(req, res, next) {
    try {
        let result = await League.getAll();
        if (result.detail !== undefined) throw result;
        let resultForPUG = {
            title: "Лиги",
            names: [],
        };
        let getResult = JSON.parse(result.result);
        for (let i = 0; i < getResult.length; i++) {
            resultForPUG.names.push(getResult[i].name);
        }
        res.render('tleague', resultForPUG);
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
        params.forEach(async function (item) {
            console.log(item);
            let result;
            if (item.new) {
                result = await League.add(item.name);
            }
            else {
                result = await League.update(item.id, item.name);
            }
            if (result.detail !== undefined) throw result;
        });
        let answer = {error: null};
        res.json(answer); // отправляем ответ обратно
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});



module.exports = router;

