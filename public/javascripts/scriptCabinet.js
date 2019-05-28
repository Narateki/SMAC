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

    let addCabinet = $(".add-cabinet");
    addCabinet.click(addCabinets);

    let inputs = document.querySelectorAll('[id^="cabi"]');
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

    document.getElementById('save-cabinet').addEventListener("click", function (e) {
        console.log("click save cabinet");
        e.preventDefault();
        // получаем данные формы
        let cabinets = document.getElementsByClassName('form-control');
        console.log(cabinets);
        let cabinetsObj = [];
        //получаем значения input
        for (let i = 0; i < cabinets.length; i++) {
            if (cabinets.item(i).id !== 'new') {
                if (changedContain(i)) {
                    console.log({name: cabinets.item(i).value, new: false, id: i+1});
                    cabinetsObj.push({name: cabinets.item(i).value, new: false, id: i+1});
                }
            }
            else {
                cabinetsObj.push({name: cabinets.item(i).value, new: true});
            }

        }
        // сериализуем данные в json
        let data = JSON.stringify(cabinetsObj);
        fetch("/tcabinet/add/",{
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

function addCabinets() {
    const $cabinet = $("<div class='input-cabinet'><input class='form-control' id='new' type='text' placeholder='Номер кабинета'></div>");
    $('.cabinet').append($cabinet, $('.add-cabinet'));
}