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


    let inputs = document.querySelectorAll('[id^="leag"]');
    for (let i = 0; i<inputs.length; i++) {
        inputs.item(i).addEventListener("change", function (e) {
            //Вытащить id, тех, которые изменены и по кнопке save их обновить, а те, которые новые добавить в таблицу
            console.log(e.target);
        });
    }

        //.addEventListener("click", function (e) {
        //console.log(inputs);


    document.getElementById('saveLeague').addEventListener("click", function (e) {
        console.log("click save league");
        e.preventDefault();
        // получаем данные формы
        let leagues = document.getElementsByClassName('value-input-league');
        let leaguesObj = [];
        //получаем значения input
        for (let i = 0; i < leagues.length; i++) {
            leaguesObj.push({name: leagues.item(i).value});
        }
        console.log(leaguesObj);
        // сериализуем данные в json
        let insertData = JSON.stringify(leaguesObj);
        console.log(insertData);
        fetch("/tleagueKat",{
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
});