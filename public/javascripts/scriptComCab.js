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

    let selects = document.getElementsByTagName('select');
    for (let i = 0; i<selects.length; i++) {
        selects.item(i).addEventListener("change", function (e) {

            for (let i = 0; i < e.target.childNodes.length; i++) {
                let elem = e.target.childNodes[i];
                elem.removeAttribute("selected");
            }
            let elem = e.target.childNodes[e.target.selectedIndex];
            elem.setAttribute("selected", "selected");
            //console.log(e.target.childNodes[e.target.selectedIndex]);
        });
    }

    document.getElementById('saveComCab').addEventListener("click", function (e) {
        console.log("click saveComCab");
        e.preventDefault();
        // получаем данные формы

        let cabs = document.getElementsByClassName('form-control');
        //console.log(tasks);
        let cabsObj = [];
        //получаем значения input
        for (let i = 0; i < cabs.length; i++) {
            let cab = {
                id_com: i+1,
                id_cab: cabs.item(i).selectedIndex+1,
            };
            cabsObj.push(cab);
        }
        console.log(cabsObj);
        let data = JSON.stringify(cabsObj);
        fetch("/tcommandcabinet/add/",{
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