let express = require('express');
let router = express.Router();

const Command = require('../models/command');
const Task = require('../models/task');

/* GET game page. */
router.get('/:cab', async function(req, res, next) {
    let param = req.params["cab"];
    try {
        let resultForPUG = {
            title: "Игра",
            commands: {
                name: [],
                tasks_num: [],
                answers: []
            },
        };
        let commands = await Command.getCommandsInCab(param);
        if (commands.detail !== undefined) throw commands;
        let getCommands = JSON.parse(commands.result);

        for (let i = 0; i < getCommands.length; i++) {
            let tasks = await Task.getTasksForCommand(getCommands[i].id);
            if (tasks.detail !== undefined) throw tasks;
            let getTasks = JSON.parse(tasks.result);
            let arrayTasks_num = [];
            let arrayAnswers = [];
            for (let j = 0; j < getTasks.length; j++) {
                let task_num = getTasks[j].num;
                let answer = getTasks[j].answer;
                // let particip = {
                //     name: getParticips[j].name,
                //     //grade: getParticips[j].grade
                // };
                arrayTasks_num.push(task_num);
                arrayAnswers.push(answer);
            }
            resultForPUG.commands.tasks_num.push(arrayTasks_num);
            resultForPUG.commands.answers.push(arrayAnswers);
            resultForPUG.commands.name.push(getCommands[i].name);
        }
        console.log(resultForPUG);
        res.render('game', resultForPUG);
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});

module.exports = router;