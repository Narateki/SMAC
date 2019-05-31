let express = require('express');
let router = express.Router();

/* GET tcabinetjudge page. */
const Cabinet = require('../models/cabinet');
const Judge = require('../models/judge');
const jsonParser = express.json();

/* GET tcabinetjudge page. */
router.get('/', async function(req, res, next) {
    try {
        let resultForPUG = {
            title: "Судьи и кабинеты",
            judges: {
                name: [],
                cabinet: []
            },
            cabinets: []
        };
        let judges = await Judge.getAll();
        if (judges.detail !== undefined) throw judges;
        let getJudges = JSON.parse(judges.result);

        let cabinets = await Cabinet.getAll();
        if (cabinets.detail !== undefined) throw cabinets;
        let getCabinets = JSON.parse(cabinets.result);

        for (let i = 0; i < getJudges.length; i++) {
            resultForPUG.judges.name.push(getJudges[i].name);

            let cabinet = await Judge.getCabinetForJudge(getJudges[i].id);
            if (cabinet.detail !== undefined) throw cabinet;
            let getCabinet = JSON.parse(cabinet.result);

            resultForPUG.judges.cabinet.push(getCabinet[0].name);
        }
        for (let i = 0; i < getCabinets.length; i++) {
            resultForPUG.cabinets.push(getCabinets[i].name);
        }
        console.log(resultForPUG);
        res.render('tcabinetjudge', resultForPUG);
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
        let result = await Judge.clearJudgeCab();
        if (result.detail !== undefined) throw result;
        params.forEach(async function (item) {
            console.log(item);
            result = await Judge.setJudgeToCab(item.id_com, item.id_cab)
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