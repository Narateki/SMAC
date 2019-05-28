let changed = [];
let leagues = [];

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

function changedContain(id) {
    for (const item of changed) {
        if (item.id === id) {
            return true;
        }
    }
    return false;
}


function getLeagues() {
    fetch("/ttask/getLeagues/",{
        method: 'get',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(Query.status)
        .then(Query.json)
        .then(function(data) {
            if (data.error !== null && data.error !== undefined) {
                console.log('error: ', data.error);
            }
            else {
                leagues = data.leagues;
                let addTask = $('.add-task');
                addTask.click(AddTask);
            }
        })
        .catch(function(err) {
            console.log('Fetch Error :', err);
        });
}


function AddTask() {
    let stringTask = "<tr><th scope='row'><input class='form-control' type='text' placeholder='Введите номер' autocomplete='off' id='new'></th><td>" +
        "<select class='form-control' id='new' required>";
    for(let i = 0; i < leagues.length; i++) {
        stringTask+= "<option value="+i+">"+leagues[i]+"</option>";
    }
    stringTask = stringTask +
        "<td><select class='form-control' id='new' required><option value='1'>Исходный</option><option value='2'>Зачётный</option></select></td>" +
        "<td ><input class='form-control' type='text' placeholder='Введите условие' autocomplete='off' id='new'></td>" +
        "<td ><input class='form-control' type='text' placeholder='Введите ответ' autocomplete='off' id='new'></td>" ;
    const $task = $(stringTask);
    $('.task').append($task, $('.add-task'));
}

document.addEventListener("DOMContentLoaded", function(event) {


    getLeagues();

    let selects = document.getElementsByTagName('select');
    for (let i = 0; i<selects.length; i++) {
        selects.item(i).addEventListener("change", function (e) {

            for (let i = 0; i < e.target.childNodes.length; i++) {
                let elem = e.target.childNodes[i];
                elem.removeAttribute("selected");
            }
            let elem = e.target.childNodes[e.target.selectedIndex];
            elem.setAttribute("selected", "selected");
            console.log(e.target.childNodes[e.target.selectedIndex]);
        });
    }

    let inputs = document.querySelectorAll('[id^="tr"]');
    for (let i = 0; i<inputs.length; i++) {
        inputs.item(i).addEventListener("change", function (e) {
            let str = e.target.id;
            let num = parseInt(str.substr(4));
            if (!changedContain(num)) {
                let chId = {
                    id: num,
                    update: true,
                    add: false
                };
                changed.push(chId);
            }
            console.log(changed);

        });
    }

    document.getElementById('save-task').addEventListener("click", function (e) {
        console.log("click save task");
        e.preventDefault();
        // получаем данные формы

        let tasks = document.getElementsByClassName('form-control');
        //console.log(tasks);
        let tasksObj = [];
        //получаем значения input
        for (let i = 0; i < tasks.length; i+=5) {
            let task = {
                num: tasks.item(i).value,
                id_league: tasks.item(i+1).selectedIndex+1,
                type: tasks.item(i+2).selectedIndex+1,
                condition: tasks.item(i+3).value,
                answer: tasks.item(i+4).value,
                new: false,
                id: i/5+1
            };

            if (tasks.item(i).id !== 'new') {
                console.log(i/5, changed);
                if (changedContain(i/5)) {
                    tasksObj.push(task);
                }
            }
            else {
                task.new = true;
                tasksObj.push(task);
            }
            console.log(i, task);

        }
        console.log(tasksObj);
        let data = JSON.stringify(tasksObj);
        fetch("/ttask/add/",{
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