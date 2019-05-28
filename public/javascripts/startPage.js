$(document).ready(function() {
    let comeIn = $("#comeIn");
    comeIn.click(ComeIn);

    let location = $('#location');
    let date = $('#date');
    let time = $('#time');

    let SaveDTL = $('#save-DataTimeLocation');
    SaveDTL.submit(saveDTL(location, date, time));

    let saveCabinets = $("#save-cabinet");
    saveCabinets.submit(SaveCabinets);

    let registration = $("#registration");
    registration.click(Registration);

    let organizer = $("#organizer");
    organizer.click(loginOrg);

    let judge = $("#judge");
    judge.click(loginJudge);

    //let addCabinet = $(".add-cabinet");
    //addCabinet.click(addCabinets);

    // let addLeague = $(".add-league");
    // addLeague.click(addLeagues);

    let btnReg = $("#btn-reg");
    btnReg.submit(RegistrationForm);

    let commandTab = $('#commandTab a');
    commandTab.click(chooseCommandTab);

    let loginJ = $('#loginJudge');
    loginJ.submit(enterJudges);

    let loginOr = $('#loginOrg');
    loginOr.click(enterOrganizer);

    // let addJudge = $('.add-judge');
    // addJudge.click(AddJudge);

    // let addTask = $('.add-task');
    // addTask.click(AddTask);

    let addParticip = $('.add-particip');
    addParticip.click(AddParticip);

    let addCommand = $('.add-command');
    addCommand.click(AddCommand);


});

function AddCommand() {
   const $command = $("<table class='table table-striped'>" +
        "<thead class='thead-dark'>" +
        "<th scope='col' contenteditable>Введите название комманды</th>" +
        "<th scope='col' contenteditable>Введите кабинет</th>" +
        "</thead>" +
        "<tbody class='particip'>" +
        "<tr><th class='add-particip' scope='row' contenteditable colspan='2'>Введите имя участника</th></tr>" +
        "</tbody></table>");
    $('.command').append($command, $('.add-command'));
}

function AddParticip(){
    const $particip = $("<tr><th scope='row' contenteditable colspan='2'>Введите имя</th></tr>");
    $('.particip').append($particip, $('.add-particip'));

}

// function AddTask() {
//     const $task = $("<tr><th scope='row' contenteditable>#</th><td>" +
//         "<select class='form-control' required><option>1</option><option>2</option></select></td>" +
//         "<td><select class='form-control' required><option>1</option><option>2</option></select></td>" +
//         "<td contenteditable><input class='form-control' type='text' placeholder='Введите условие' autocomplete='off' id='new'></td>" +
//         "<td contenteditable><input class='form-control' type='text' placeholder='Введите ответ' autocomplete='off' id='new'></td>" +
//         "<td contenteditable><input class='form-control' type='text' placeholder='Введите номер' autocomplete='off' id='new'></td></tr>");
//     $('.task').append($task, $('.add-task'));
// }

// function AddJudge() {
//     const $judge = $("<tr><th scope='row' contenteditable>Введите имя</th><th scope='row' contenteditable>Введите номер кабинета</th></tr>");
//     $('.judge').append($judge, $('.add-judge'));
// }

function saveDTL(location, date, time) {
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

// function addCabinets(){
//     const $cab = $("<div class='cab'></div>");
//     const $cabinet = $("<input class='cabinet-number' type='text' placeholder='Номер кабинета'>" +
//         " <input class='judge' type='text' placeholder='Имя судьи'>");
//     const $table = $("<div class='spicok'>Список комманд<div class='add-table'>----</div></div>");
//     $cab.append($cabinet, $table);
//     $('.cabinet').append($cab, $('.add-cabinet'));
//     let addTable = $(".cab");
//     addTable.click(addTables);
// }

// function addLeagues() {
//     const $league = $("<div class='input-league'><input class='form-control' id='new' type='text' placeholder='Номер лиги'></div>");
//     $('.league').append($league, $('.add-league'));
// }


function addTables(){
    const $command = $("<div class='command'>Комманда</div>");
    alert("kek");
    $(".add-table").prepend($command);
}

function loginJudge() {
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