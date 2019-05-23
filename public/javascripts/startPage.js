$(document).ready(function() {
    let registration = $("#registration");
    registration.click(Registration);

    let organizer = $("#organizer");
    organizer.click(loginOrg);

    let judge = $("#judge");
    judge.click(loginJudge);
});

function loginJudge(){
    location.href='/loginjudge';
}

function loginOrg(){
    location.href='/loginorg';
}

function Registration(){
    location.href='/reg';
}