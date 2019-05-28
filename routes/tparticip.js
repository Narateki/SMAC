let express = require('express');
let router = express.Router();

//const Cabinet = require('../models/cabinet');
const Command = require('../models/command');

/* GET tparticip page. */
router.get('/', async function(req, res, next) {
    try {

        let resultForPUG = {
            title: "Вход судьи",
            commands: {
                particips: [],
                name: [],
                cabinet: []
            },
        };
        let commands = await Command.getAll();
        if (commands.detail !== undefined) throw commands;
        let getCommands = JSON.parse(commands.result);

        for (let i = 0; i < getCommands.length; i++) {
            let particips = await Command.getAllParticips(i+1);
            if (particips.detail !== undefined) throw particips;
            let getParticips = JSON.parse(particips.result);
            let arrayParticips = [];
            for (let j = 0; j < getParticips.length; j++) {
                let particip = getParticips[j].name;
                // let particip = {
                //     name: getParticips[j].name,
                //     //grade: getParticips[j].grade
                // };
                arrayParticips.push(particip);
            }
            resultForPUG.commands.particips.push(arrayParticips);
            resultForPUG.commands.name.push(getCommands[i].name);
            resultForPUG.commands.cabinet.push(getCommands[i].id_cab);
        }
        console.log(resultForPUG);
        res.render('tparticip', resultForPUG);
    }
    catch (e) {
        let error = {error: e.detail};
        res.send(error);
    }
});

module.exports = router;