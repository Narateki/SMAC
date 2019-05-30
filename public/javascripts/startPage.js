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

    let btnReg = $("#btn-reg");
    btnReg.submit(RegistrationForm);

    let commandTab = $('#commandTab a');
    commandTab.click(chooseCommandTab);

    let loginJ = $('#loginJudge');
    loginJ.submit(enterJudges);

    let loginOr = $('#loginOrg');
    loginOr.click(enterOrganizer);

    let addParticip = $('.add-particip');
    addParticip.click(AddParticip);

    let addCommand = $('.add-command');
    addCommand.click(AddCommand);

    let cancelTask = $ ('#cancel-task');
    cancelTask.click(CancelTask);

    let cancelParticip = $ ('#cancel-particip');
    cancelParticip.click(CancelParticip);

    let cancelLeague = $ ('#cancel-league');
    cancelLeague.click(CancelLeague);

    let cancelJudge = $ ('#cancel-judge');
    cancelJudge.click(CancelJudge);

    let cancelDTP = $ ('#cancel-DataTimePlace');
    cancelDTP.click(CancelDTP);

    let cancelCabinet = $ ('#cancel-cabinet');
    cancelCabinet.click(CancelCabinet);

    let cancelReg = $ ('#cancel-reg');
    cancelReg.click(CancelReg);

    let resaltInRealTime = $ ('#resaltInRealTime');
    resaltInRealTime.click(ResaltInRealTime);

    let answer = $('.answer');
    answer.click(Answer);

});
function Answer(){


}
function ResaltInRealTime() {
    location.href='/tgeneral';
}

function CancelReg() {
    location.href='/reg';
}

function CancelDTP() {
    location.href='/tablesmenu';
}

function CancelCabinet() {
    location.href='/tcabinet';
}

function CancelJudge() {
    location.href='/tjudge';
}

function CancelTask() {
    location.href='/tleague';
}

function CancelParticip() {
    location.href='/tparticip';
}


function CancelLeague() {
    location.href='/tleague';
}

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