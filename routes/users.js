var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// создаем парсер для данных в формате json
const jsonParser = express.json();

router.post("/", jsonParser, function (request, response) {
  console.log(request.body);
  if(!request.body) return response.sendStatus(400);

  response.json(request.body); // отправляем пришедший ответ обратно
});

module.exports = router;
