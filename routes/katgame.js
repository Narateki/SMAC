let express = require('express');
let router = express.Router();

const Query = require('../models/query');

/* GET katgame page. */
router.get('/', async function(req, res, next) {
    let result = await Query.doQuery('SELECT name, num\n' +
        '\tFROM judge, cabinets\n' +
        '\tWHERE id_cab = cabinets.id', []);
    result = JSON.parse(result);

    let resultForPUG = {
        title: "Katgame",
        names: [],
        num_cabs: []
    };
    for (let i = 0; i < result.length; i++) {
        resultForPUG.names.push(result[i].name);
        resultForPUG.num_cabs.push(result[i].num);
    }
    console.log(resultForPUG);
    res.render('katgame',  resultForPUG);
});

router.post('/', async function(req, res, next) {
    let result = await Query.doQuery('SELECT name, num\n' +
        '\tFROM judge, cabinets\n' +
        '\tWHERE id_cab = cabinets.id', []);
    result = JSON.parse(result);

    let resultForPUG = {
        title: "Katgame",
        names: [],
        num_cabs: []
    };
    for (let i = 0; i < result.length; i++) {
        resultForPUG.names.push(result[i].name);
        resultForPUG.num_cabs.push(result[i].num);
    }
    console.log(resultForPUG);
    res.render('katgame',  resultForPUG);
});


module.exports = router;