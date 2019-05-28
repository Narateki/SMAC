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


function changedContain(id) {
    for (const item of changed) {
        if (item.id === id) {
            return true;
        }
    }
    return false;
}

document.addEventListener("DOMContentLoaded", function(event) {

    let addJudge = $(".add-judge");
    addJudge.click(addJudges);

    let inputs = document.querySelectorAll('[id^="judg"]');
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

    document.getElementById('save-judge').addEventListener("click", function (e) {
        console.log("click save judge");
        e.preventDefault();
        // получаем данные формы
        let judges = document.getElementsByClassName('form-control');
        console.log(judges);
        let judgesObj = [];
        //получаем значения input
        for (let i = 0; i < judges.length; i++) {
            if (judges.item(i).id !== 'new') {
                if (changedContain(i)) {
                    console.log({name: judges.item(i).value, new: false, id: i+1});
                    judgesObj.push({name: judges.item(i).value, new: false, id: i+1});
                }
            }
            else {
                judgesObj.push({name: judges.item(i).value, new: true});
            }

        }
        // сериализуем данные в json
        let data = JSON.stringify(judgesObj);
        fetch("/tjudge/add/",{
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

function addJudges() {
    const $judge = $("<div class='input-judge'><input class='form-control' id='new' type='text' placeholder='Номер кабинета'></div>");
    $('.judge').append($judge, $('.add-judge'));
}