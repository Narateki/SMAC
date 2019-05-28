let express = require('express');
let router = express.Router();

const Organization = require('../models/organization');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let result = await Organization.getAll();
    if (result.detail !== undefined) throw result;

    let getResult = JSON.parse(result.result);
    let resultForPUG = {
      title: "Карусель",
      date: getResult[0].dates,
      time: getResult[0].times,
      place: getResult[0].place
    };
    res.render('index', resultForPUG);
  }
  catch (e) {
    let error = {error: e.detail};
    res.send(error);
  }
});

module.exports = router;