let express = require('express');
let router = express.Router();


const Command = require('../models/command');


/* GET tgeneral page. */
router.get('/', async function(req, res, next) {
    try {
        let resultForPUG = {
            title: "Баллы команд",
            commands: {
                name: [],
                school: [],
                result: [],
                league: []
            },
        };
        let commands = await Command.getAll();
        if (commands.detail !== undefined) throw commands;
        let getCommands = JSON.parse(commands.result);


        for (let i = 0; i < getCommands.length; i++) {
            let result = await Command.getCommandsResultById(getCommands[i].id);
            if (result.detail !== undefined) throw result;
            let getResult = JSON.parse(result.result);
            resultForPUG.commands.league.push(getResult[0].league_name);
            resultForPUG.commands.name.push(getCommands[i].name);
            resultForPUG.commands.school.push(getCommands[i].school);
            //resultForPUG.commands.id_com.push(getCommands[i].id);
            resultForPUG.commands.result.push(Command.countResult(getResult[0].points_start, getResult[0].points_valid));
            //добавить тип задачи
        }
        console.log(resultForPUG);
        res.render('tgeneral', resultForPUG);
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});

module.exports = router;