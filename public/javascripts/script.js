class Query {
    static status(response) {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText))
        }
        return Promise.resolve(response);
    };

    static json(response) {
        return response.json()
    };
}
document.addEventListener("DOMContentLoaded", function(event) {
    // document.getElementById('submit').addEventListener("click", function (e) {
    //     console.log("click");
    //         e.preventDefault();
    //         // получаем данные формы
    //         let registerForm = document.forms["registerForm"];
    //         let name = registerForm.elements["name"].value;
    //         let cabinet = registerForm.elements["cabinet"].value;
    //         // сериализуем данные в json
    //         let user = JSON.stringify({name: name, cabinet: cabinet});
    //         let request = new XMLHttpRequest();
    //         // посылаем запрос на адрес "/user"
    //         request.open("POST", "/kat", true);
    //         request.setRequestHeader("Content-Type", "application/json");
    //         request.addEventListener("load", function () {
    //             // получаем и парсим ответ сервера
    //             let receivedUser = JSON.parse(request.response);
    //             console.log(name, "-", cabinet, "-", receivedUser.code);   // смотрим ответ сервера
    //         });
    // });



    document.getElementById('send').addEventListener("click", function (e) {
        console.log("click send");
        e.preventDefault();
        // получаем данные формы
        let registerForm = document.forms["registerForm"];
        let name = registerForm.elements["name"].value;
        let cabinet = registerForm.elements["cabinet"].value;
        // сериализуем данные в json
        let insertData = JSON.stringify({name: name, cabinet: cabinet});
        fetch("/kat",{
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: insertData
        })
        .then(Query.status)
        .then(Query.json)
        .then(function(data) {
            if (data.error !== null) {
                console.log('error: ', data.error);
            }
            else {
                console.log('data: ', data);
            }
        })
        .catch(function(err) {
            console.log('Fetch Error :', err);
        });
    });



    document.getElementById('getGame').addEventListener("click", function (e) {
        console.log("click getGame");
        e.preventDefault();
        // получаем данные формы
        let judgeLoginForm = document.forms["judgeLoginForm"];
        let cabinet = judgeLoginForm.elements["cabinet"].value;
        fetch("/kat/game/"+cabinet,{
            method: 'get',
        })
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            document.location.href = response.url;
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
        // let user = JSON.stringify({cabinet: cabinet});
        // let request = new XMLHttpRequest();
        // // посылаем запрос на адрес "/user"
        // request.open("GET", "/kat/game/"+cabinet, true);
        // request.setRequestHeader("Content-Type", "application/json");
        // request.addEventListener("load", function () {
        //     // получаем и парсим ответ сервера
        //     document.location.href = request.responseURL;
        //     //let receivedUser = JSON.parse(request.response);
        //     //console.log(cabinet, "-", receivedUser.cab);   // смотрим ответ сервера
        // });
    });


});


