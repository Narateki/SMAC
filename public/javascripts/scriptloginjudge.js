let cabinets = [];

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

    document.getElementById('login-judge').addEventListener("click", function (e) {
        e.preventDefault();
        // получаем данные формы
        let login = document.getElementsByClassName('form-control');
        //console.log(login);
        let loginObj = [];
        //получаем значения input
        for (let i = 0; i < login.length; i += 2) {
            let log = {
                code: login.item(i+1).value,
                id_cabinet: login.item(i).selectedIndex + 1
            };
            loginObj.push(log);
        }
        if (loginObj[0].code === "") {
            console.log("Code is empty");
        }
        else {
            let data = JSON.stringify(loginObj);
            fetch("/loginjudge/login/", {
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body: data
            })
                .then(Query.status)
                .then(Query.json)
                .then(function (data) {
                    if (data.error !== null && data.error !== undefined) {
                        console.log('error: ', data.error);
                    } else {
                        let cabinet = data.name;
                        if (cabinet.length > 0) {
                            console.log(cabinet[0].name);
                            fetch("/loginjudge/game/" + cabinet[0].name, {
                                method: 'get',
                            })
                                .then(Query.status)
                                .then(function (data) {
                                    if (data.error !== null && data.error !== undefined) {
                                        console.log('error: ', data.error);
                                    } else {
                                        document.location.href = data.url;
                                    }
                                })
                                .catch(function (err) {
                                    console.log('Fetch Error :', err);
                                });
                        } else {
                            console.log("Wrong code!");
                        }

                    }
                })
                .catch(function (err) {
                    console.log('Fetch Error :', err);
                });
        }
    });
});