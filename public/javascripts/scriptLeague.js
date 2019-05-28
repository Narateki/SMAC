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

let changed = [];

function getNumId(strId) {
    for (const item of changed) {
        if (item.id_str === strId) {
            return item.id;
        }
    }
    return null;
}

function changedContain(id) {
    for (const item of changed) {
        if (item.id === id) {
            return true;
        }
    }
    return false;
}

document.addEventListener("DOMContentLoaded", function(event) {

    let addLeague = $(".add-league");
    addLeague.click(addLeagues);

    let inputs = document.querySelectorAll('[id^="leag"]');
    for (let i = 0; i<inputs.length; i++) {
        inputs.item(i).addEventListener("change", function (e) {
            let str = e.target.id;
            let num = parseInt(str.substr(4));
            let chId = {
                id: num,
                id_str: str,
                update: true,
                add: false
            };
            changed.push(chId);
        });
    }

    document.getElementById('save-league').addEventListener("click", function (e) {
        console.log("click save league");
        e.preventDefault();
        // получаем данные формы
        let leagues = document.getElementsByClassName('form-control');
        console.log(leagues);
        let leaguesObj = [];
        //получаем значения input
        for (let i = 0; i < leagues.length; i++) {
            if (leagues.item(i).id !== 'new') {
                if (changedContain(i)) {
                    console.log({name: leagues.item(i).value, new: false, id: i+1});
                    leaguesObj.push({name: leagues.item(i).value, new: false, id: i+1});
                }
            }
            else {
                leaguesObj.push({name: leagues.item(i).value, new: true});
            }

        }
        // сериализуем данные в json
        let data = JSON.stringify(leaguesObj);
        fetch("/tleague/add/",{
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: data
        })
        .then(Query.status)
        .then(Query.json)
        .then(function(data) {
            if (data.error !== null) {
                console.log('error: ', data.error);
            }
            else {
                window.location.reload();
            }
        })
        .catch(function(err) {
            console.log('Fetch Error :', err);
        });

    });
});

function addLeagues() {
    const $league = $("<div class='input-league'><input class='form-control' id='new' type='text' placeholder='Номер лиги'></div>");
    $('.league').append($league, $('.add-league'));
}