$(document).ready(function() {
    let registration = $("#registration");
    registration.click(Registration);

    let organizer = $("#organizer");
    organizer.click(loginOrg);

    let judge = $("#judge");
    judge.click(loginJudge);

    let addCabinet = $(".add-cabinet");
    addCabinet.click(addCabinets);

    let addLeague = $(".add-league");
    addLeague.click(addLeagues);

    let btnReg = $("#btnReg");
    btnReg.click(RegistrationForm);

    let commandTab = $('#commandTab a');
    commandTab.click(chooseCommandTab);

    let loginJ = $('#loginJudge');
    loginJ.click(enterJudges);

    let loginOr = $('#loginOrg');
    loginOr.click(enterOrganizer);

    let cabinets =  $('#cabinets');
    cabinets.click(goCabinets);

    let league =  $('#league');
    league.click(goLeague);

    let tasks =  $('#tasks');
    tasks.click(goTasks);

    let participants =  $('#participants');
    participants.click(goParticipants);

    let judges=  $('#judges');
    judges.click(goJudges);
});

function goCabinets() {
    location.href='/tcabinets';
}

function goLeague() {
    location.href='/tleague';
}

function goTasks() {
    location.href='/ttask';
}

function goParticipants() {
    location.href='/tparticip';
}

function goJudges() {
    location.href='/tjudge';
}

function enterJudges() {
    location.href='/game';
}

function enterOrganizer() {
    location.href='/tablesmenu';
}
function chooseCommandTab(e) {
    e.preventDefault();
    $(this).show();
}

function addCabinets(){
    const $cab = $("<div class='cab'></div>");
    const $cabinet = $("<input id='cabinet-number' type='text' placeholder='Номер кабинета'>" +
        " <input id='judge' type='text' placeholder='Имя судьи'>");
    const $table = $("<h5>Добавить столы</h5><div class='spicok'>Список комманд<div class='add-table'>----</div></div>");
    $cab.append($cabinet, $table);
    $('.cabinet').append($cab, $('.add-cabinet'));
    let addTable = $(".cab");
    addTable.click(addTables);
}

function addLeagues() {
    const $league = $("<div class='input-league'><input id='cabinet-number' type='text' placeholder='Номер лиги'></div>");
    $('.league').append($league, $('.add-league'));
}


function addTables(){
    const $command = $("<div class='command'>Комманда</div>");
    alert("kek");
    $(".add-table").prepend($command);
}

function loginJudge(){
    location.href='/loginjudge';
}

function loginOrg(){
    location.href='/loginorg';
}

function Registration(){
    location.href='/reg';
}

function RegistrationForm(){
    alert("kek");
}