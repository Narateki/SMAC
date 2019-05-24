$(document).ready(function() {
    let registration = $("#registration");
    registration.click(Registration);

    let organizer = $("#organizer");
    organizer.click(loginOrg);

    let judge = $("#judge");
    judge.click(loginJudge);

    let addCabinet = $(".add-cabinet");
    addCabinet.click(addCabinets);


});


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