let express = require('express');
let router = express.Router();

const Organization = require('../models/organization');
const jsonParser = express.json();

/* GET tablesmenu page. */
router.get('/', async function(req, res, next) {
    try {
        let result = await Organization.getAll();
        if (result.detail !== undefined) throw result;

        let getResult = JSON.parse(result.result);
        let resultForPUG = {
            title: "Меню",
            date: getResult[0].dates,
            time: getResult[0].times,
            place: getResult[0].place
        };
        res.render('tablesmenu', resultForPUG);
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
        let result = Organization.update(params.date, params.time, params.place);
        if (result.detail !== undefined) throw result;
        let answer = {error: null};
        res.json(answer); // отправляем ответ обратно
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});

module.exports = router;

