let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let katRouter = require('./routes/kat');
let katGameRouter = require('./routes/katgame');
let tleagueKatRouter = require('./routes/tleagueKat');
let regRouter = require('./routes/reg');
let loginjudgeRouter = require('./routes/loginjudge');
let loginorgRouter = require('./routes/loginorg');
let tablesmenuRouter = require('./routes/tablesmenu');
let tcabinetRouter = require('./routes/tcabinet');
let tleagueRouter = require('./routes/tleague');
let ttaskRouter = require('./routes/ttask');
let tjudgeRouter = require('./routes/tjudge');
let tparticipRouter = require('./routes/tparticip');
let tgeneralRouter = require('./routes/tgeneral');
let gameRouter = require('./routes/game');
let gameRouterCab = require('./routes/game');
let gametableRouter = require('./routes/gametable');
let gameorgRouter = require('./routes/gameorg');
let loginRouter = require('./routes/login');



let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kat', katRouter);
app.use('/katGame', katGameRouter);
app.use('/tleagueKat', tleagueKatRouter);
app.use('/reg', regRouter);
app.use('/loginjudge', loginjudgeRouter);
app.use('/loginorg', loginorgRouter);
app.use('/tablesmenu', tablesmenuRouter);
app.use('/tcabinet', tcabinetRouter);
app.use('/tleague', tleagueRouter);
app.use('/ttask', ttaskRouter);
app.use('/tjudge', tjudgeRouter);
app.use('/tparticip', tparticipRouter);
app.use('/tgeneral', tgeneralRouter);
app.use('/game', gameRouter);
app.use('/game/loginjudge/:cab', gameRouterCab);
app.use('/gametable', gametableRouter);
app.use('/gameorg', gameorgRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
