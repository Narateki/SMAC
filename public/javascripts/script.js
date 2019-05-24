document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('submit').addEventListener("click", function (e) {
        console.log("click");
            e.preventDefault();
            // получаем данные формы
            let registerForm = document.forms["registerForm"];
            let name = registerForm.elements["name"].value;
            let cabinet = registerForm.elements["cabinet"].value;
            // сериализуем данные в json
            let user = JSON.stringify({name: name, cabinet: cabinet});
            let request = new XMLHttpRequest();
            // посылаем запрос на адрес "/user"
            request.open("POST", "/kat", true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function () {
                // получаем и парсим ответ сервера
                let receivedUser = JSON.parse(request.response);
                console.log(name, "-", cabinet, "-", receivedUser.code);   // смотрим ответ сервера
            });
            request.send(user);
    });

    document.getElementById('send').addEventListener("click", function (e) {
        console.log("click send");
        e.preventDefault();
        // получаем данные формы
        let registerForm = document.forms["registerForm"];
        let name = registerForm.elements["name"].value;
        let cabinet = registerForm.elements["cabinet"].value;
        // сериализуем данные в json
        let user = JSON.stringify({name: name, cabinet: cabinet});
        let request = new XMLHttpRequest();
        // посылаем запрос на адрес "/user"
        request.open("POST", "/kat", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
            // получаем и парсим ответ сервера
            let receivedUser = JSON.parse(request.response);
            console.log(name, "-", cabinet, "-", receivedUser.code);   // смотрим ответ сервера
        });
        request.send(user);
    });



    document.getElementById('getGame').addEventListener("click", function (e) {
        console.log("click getGame");
        e.preventDefault();
        // получаем данные формы
        let judgeLoginForm = document.forms["judgeLoginForm"];
        let cabinet = judgeLoginForm.elements["cabinet"].value;
        // сериализуем данные в json
        let user = JSON.stringify({cabinet: cabinet});
        let request = new XMLHttpRequest();
        // посылаем запрос на адрес "/user"
        request.open("GET", "/kat/game/"+cabinet, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
            // получаем и парсим ответ сервера
            document.location.href = request.responseURL;
            //let receivedUser = JSON.parse(request.response);
            //console.log(cabinet, "-", receivedUser.cab);   // смотрим ответ сервера
        });
        request.send(user);
    });
});


