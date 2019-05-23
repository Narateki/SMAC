let express = require('express');
let router = express.Router();


const db = require('../lib/db');

async function doQuery(text, values) {
    let client;
    let err = null;
    let result = null;
    try {
        client = await db.pool.connect();
        let r = await client.query({
            text: text,
            values: values
        });
        if ( r.rowCount > 0 ) {
            result = JSON.stringify(r.rows);
        } else {
            result = "[]";
        }
        return result;
    }
    catch (e) {
        err = e;
    } finally {
        await client.release();
    }
}

/* GET kat page. */
router.get('/', async function(req, res, next) {
    let result = await doQuery('SELECT first_name, last_name, num_cab FROM judge', []);
    result = JSON.parse(result)
    console.log(result[0]);
    let resultForPUG = {
            title: "Kat",
            first_names: [],
            last_names: [],
            num_cab: []
    };
    for (let i = 0; i < result.length; i++) {
        resultForPUG.first_names.push(result[i].first_name);
        resultForPUG.last_names.push(result[i].last_name);
        resultForPUG.num_cab.push(result[i].num_cab);
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
    let result = await doQuery('INSERT INTO judge VALUES (3, $1, $2, $2)', [params.cabinet, params.name]);
    let code = {code: "x2z6p9p2"};
    res.json(code); // отправляем ответ обратно
});

module.exports = router;
