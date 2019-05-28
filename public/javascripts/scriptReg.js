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


    document.getElementById('btn-reg').addEventListener("click", function (e) {
        console.log("click reg");
        e.preventDefault();
        // получаем данные формы

        let command = {
            city: document.getElementById('city').value,
            school: document.getElementById('school').value,
            head: document.getElementById('head').value,
            phone: document.getElementById('phone').value,
            name: document.getElementById('name').value,
            id_league: document.getElementById('league').selectedIndex + 1,
            particips: []
        };
        let particips = document.getElementsByClassName('particip');
        let grades = document.getElementsByClassName('grade');
        for (let i = 0; i < particips.length; i++) {
            let particip = {
                name: particips[i].value,
                grade: grades[i].value
            };
            command.particips.push(particip);
        }
        console.log(command);
        // сериализуем данные в json
        let data = JSON.stringify(command);
        fetch("/reg/add/",{
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: data
        })
        .then(Query.status)
        .then(Query.json)
        .then(function(data) {
            if (data.error !== null && data.error !== undefined) {
                console.log('error: ', data.error);
            }
            else {

                console.log("Ваш код:", data.code);
                alert("Ваш код: " + data.code);
            }
        })
        .catch(function(err) {
            console.log('Fetch Error :', err);
        });

    });
});
