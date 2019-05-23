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
});


