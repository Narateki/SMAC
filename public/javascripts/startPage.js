$(document).ready(function() {
    let comeIn = $("#comeIn");
    comeIn.click(ComeIn);

    let location = $('#location');
    let date = $('#date');
    let time = $('#time');

    let saveDTL = $('#saveDataTimeLocation');
    saveDTL.click(SaveDTL(location, date, time));

    let saveCabinets = $("#saveCab");
    saveCabinets.click(SaveCabinets);

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

    let btnReg = $("#btn-reg");
    btnReg.submit(RegistrationForm);

    let commandTab = $('#commandTab a');
    commandTab.click(chooseCommandTab);

    let loginJ = $('#loginJudge');
    loginJ.click(enterJudges);

    let loginOr = $('#loginOrg');
    loginOr.click(enterOrganizer);

    /*let dateTime = $('#date-time');
    let DateTimeInsert = false;*/

   /* if (!DateTimeInsert) {
        dateTime.click(InsertDateTime);

    }*/

});

function SaveDTL(location, date, time) {
    $('#event-place').append(location);
    $('#event-date').append(date);
    $('#event-time').append(time);
}


function SaveCabinets() {
    alert("Сделать модальное окно");
}


function ComeIn() {
    location.href='/login';
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