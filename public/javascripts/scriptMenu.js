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
    document.getElementById('save-DataTimePlace').addEventListener("click", function (e) {
        e.preventDefault();
        // получаем данные формы

        let org = {
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            place: document.getElementById('place').value,
        };

        // сериализуем данные в json
        let data = JSON.stringify(org);
        fetch("/tablesmenu/add/",{
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
                console.log("Data, time and place updates");
                //window.location.reload();
            }
        })
        .catch(function(err) {
            console.log('Fetch Error :', err);
        });

    });
});