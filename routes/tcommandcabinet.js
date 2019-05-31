let express = require('express');
let router = express.Router();

const Cabinet = require('../models/cabinet');
const Command = require('../models/command');
const jsonParser = express.json();

/* GET tcommandcabinet page. */
router.get('/', async function(req, res, next) {
    try {
        let resultForPUG = {
            title: "Команды и кабинеты",
            commands: {
                name: [],
                cabinet: []
            },
            cabinets: []
        };
        let commands = await Command.getAll();
        if (commands.detail !== undefined) throw commands;
        let getCommands = JSON.parse(commands.result);

        let cabinets = await Cabinet.getAll();
        if (cabinets.detail !== undefined) throw cabinets;
        let getCabinets = JSON.parse(cabinets.result);

        for (let i = 0; i < getCommands.length; i++) {
            resultForPUG.commands.name.push(getCommands[i].name);

            let cabinet = await Command.getCabinetForCommand(getCommands[i].id);
            if (cabinet.detail !== undefined) throw cabinet;
            let getCabinet = JSON.parse(cabinet.result);

            resultForPUG.commands.cabinet.push(getCabinet[0].name);
        }
        for (let i = 0; i < getCabinets.length; i++) {
            resultForPUG.cabinets.push(getCabinets[i].name);
        }
        console.log(resultForPUG);
        res.render('tcommandcabinet', resultForPUG);
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
        let result = await Command.clearComCab();
        if (result.detail !== undefined) throw result;
        params.forEach(async function (item) {
            console.log(item);
            result = await Command.setCommandToCab(item.id_com, item.id_cab)
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