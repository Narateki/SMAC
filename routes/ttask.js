let express = require('express');
let router = express.Router();

const League = require('../models/league');
const Task = require('../models/task');
const jsonParser = express.json();

/* GET ttask page. */
router.get('/', async function(req, res, next) {
    try {


        let resultForPUG = {
            title: "Задания",
            leagues: [],
            league: [],
            type: [],
            condition: [],
            answer: [],
            num: []
        };
        let leagues = await League.getAll();
        if (leagues.detail !== undefined) throw leagues;
        let getLeagues = JSON.parse(leagues.result);
        for (let i = 0; i < getLeagues.length; i++) {
            resultForPUG.leagues.push(getLeagues[i].name);
        }
        let tasks = await Task.getAll();
        if (tasks.detail !== undefined) throw tasks;
        let getTasks = JSON.parse(tasks.result);
        for (let i = 0; i < getTasks.length; i++) {
            resultForPUG.league.push(getTasks[i].id_league);
            resultForPUG.type.push(getTasks[i].type);
            resultForPUG.condition.push(getTasks[i].condition);
            resultForPUG.answer.push(getTasks[i].answer);
            resultForPUG.num.push(getTasks[i].num);
        }
        console.log(resultForPUG);
        res.render('ttask', resultForPUG);
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }

});

router.get('/getLeagues', async function(req, res, next) {
    try {
        let resultForPUG = {
            leagues: []
        };
        let leagues = await League.getAll();
        if (leagues.detail !== undefined) throw leagues;
        let getLeagues = JSON.parse(leagues.result);
        for (let i = 0; i < getLeagues.length; i++) {
            resultForPUG.leagues.push(getLeagues[i].name);
        }
        console.log(resultForPUG);
        res.json(resultForPUG);
    }
    catch (e) {

        let error = {error: e.detail};
        console.log(error);
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
                result = await Task.add(item.id_league, item.type, item.condition, item.answer, item.num);
            }
            else {
                result = await Task.update(item.id, item.id_league, item.type, item.condition, item.answer, item.num);
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