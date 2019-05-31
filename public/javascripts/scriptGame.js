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

let chosenCom = 0;
let chosenTask = 0;
let chosenTd;

document.addEventListener("DOMContentLoaded", function(event) {
    let answer = $(".answer");
    answer.on("click", function (event) {
        let ans = $("#ans");
        chosenTd = event.target;
        console.log(event.target);
        chosenCom = parseInt(event.target.id);
        chosenTask = event.target.cellIndex;
        ans.text(event.target.textContent);
    });

    let right = $("#right");
    right.on("click", function (event) {
        chosenTd.classList.add('table-success');
        let ansObj = {
            id_com: chosenCom,
            num_task: chosenTask,
            right: 1
        };
        let data = JSON.stringify(ansObj);
        fetch(document.location.pathname,{
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: data
        })
        .then(Query.status)
        .then(Query.json)
        .then(function(data) {
            window.location.reload();
            if (data.error !== null || data.error !== undefined) {
                //console.log('error: ', data.error);
            }
            else {
                window.location.reload();
            }
        })
        .catch(function(err) {
            console.log('Fetch Error :', err);
        });
    });
    let wrong = $("#wrong");
    wrong.on("click", function () {
        chosenTd.classList.add('table-danger');
        let ansObj = {
            id_com: chosenCom,
            num_task: chosenTask,
            right: 0
        };
        let data = JSON.stringify(ansObj);
        fetch(document.location.pathname,{
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: data
        })
            .then(Query.status)
            .then(Query.json)
            .then(function(data) {
                window.location.reload();
                if (data.error !== null || data.error !== undefined) {
                    window.location.reload();
                    //console.log('error: ', data.error);
                }
                else {
                    window.location.reload();
                }
            })
            .catch(function(err) {

                console.log('Fetch Error :', err);
            });
    })
});