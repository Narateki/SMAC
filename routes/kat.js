let express = require('express');
let router = express.Router();



const Query = require('../models/query');


/* GET kat page. */
router.get('/', async function(req, res, next) {
    let result = await Query.doQuery('SELECT name, num\n' +
        '\tFROM judge, cabinets\n' +
        '\tWHERE id_cab = cabinets.id', []);
    result = JSON.parse(result);
    let resultForPUG = {
        title: "Kat",
        names: [],
        num_cabs: []
    };
    for (let i = 0; i < result.length; i++) {
        resultForPUG.names.push(result[i].name);
        resultForPUG.num_cabs.push(result[i].num);
    }
    console.log(resultForPUG);
    res.render('kat',  resultForPUG);

});

// создаем парсер для данных в формате json
const jsonParser = express.json();

router.post("/", jsonParser, async function (req, res) {

    console.log(req.body.name, req.body.cabinet);
    if(!req.body) return req.sendStatus(400);
    let params = req.body;

    let result = await doQuery('INSERT INTO judge VALUES (6, $1, $2)', [params.name, params.cabinet]);

    let code = {code: "x2z6p9p2"};
    res.json(code); // отправляем ответ обратно
});

router.get('/game/:cab', async function(req, res, next) {
    let param = [parseInt(req.params["cab"])];
    let result = await Query.doQuery('SELECT id, name\n' +
    '\tFROM command\n' +
    '\tWHERE id_cab = ' +
    '(SELECT id from cabinets WHERE num = $1)', param);
    res.send(result);
    // result = JSON.parse(result);
    // let resultForPUG = {
    //     title: "Kat",
    //     names: [],
    //     num_cabs: []
    // };
    // for (let i = 0; i < result.length; i++) {
    //     resultForPUG.names.push(result[i].name);
    //     resultForPUG.num_cabs.push(result[i].num);
    // }
    // console.log(resultForPUG);
     //res.render('katgame',  {title: "katgame"});

});


module.exports = router;
