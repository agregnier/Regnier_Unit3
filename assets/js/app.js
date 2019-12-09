document.addEventListener('DOMContentLoaded', myAppOnload);

<!-- Form verification -->
let form = document.getElementById("contact")
try {
    form.addEventListener('submit', e => {
        e.preventDefault();

        let firstName = document.getElementById("Name");
        let lastName = document.getElementById("Address");
        let email = document.getElementById("Email");
        let calendar = document.getElementById("Phone");

        if (Name.value == "" || Address.value == "" || Email.value == "" || Phone.value == "") {
            document.getElementById("danger-alert").classList.remove("d-none");

        } else {
            const form = document.getElementById("contact");

            const method = form.getAttribute("method");
            const action = form.getAttribute("action");

            /** I used some code from https://jsfiddle.net/seamusleahy/rxeuaatw/ to help get ajax working and the from submiting*/
            var formEl = document.getElementById('contact');

            var headers = new Headers();
            // Tell the server we want JSON back
            headers.set('Accept', 'application/json');

            var formData = new FormData();
            for (var i = 0; i < formEl.length; ++i) {
                formData.append(formEl[i].name, formEl[i].value);
            }

            formData.append('json', JSON.stringify({example: 'return value'}));

            var url = 'https://formspree.io/xgevpgop';

            var fetchOptions = {
                method: 'POST',
                headers,
                body: formData
            };

            var responsePromise = fetch(url, fetchOptions);

            responsePromise
                .then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        document.getElementById("success-alert").classList.remove("d-none");
                        document.getElementById("danger-alert").classList.add("d-none");
                    } else {
                        document.getElementById("warning-alert").classList.remove("d-none");
                        document.getElementById("success-alert").classList.add("d-none");
                    }
                });
        }
    });

} catch (e) {
    console.log("Something happened");
}

const moment = require('moment');
const pageViewsKeyName = "pageViews";
debugger;
function addPageView() {
    let pageViews = localStorage.getItem(pageViewsKeyName);
    let arr = [];
    if (pageViews && pageViews.length > 0) {
        arr = JSON.parse(pageViews);

    }
    let newPageData = {
        "path": window.location.pathname,
        "timestamp": moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    arr.push(newPageData);

    localStorage.setItem(pageViewsKeyName, JSON.stringify(arr));
}

function listPageViews(array) {
    let table = document.getElementById("pageviewTable");
    let tableBody = document.getElementById("pageviewTableBody");
    array.map(item => {
        let tr = document.createElement("tr");
        let pageURL = document.createElement("td");
        let timeStamp = document.createElement("td");

        pageURL.innerText = item.path;
        timeStamp.innerText = item.timestamp;

        tr.appendChild(pageURL);
        tr.appendChild(timeStamp);

        tableBody.appendChild(tr);
    });
}



window.onload = addPageView;

listPageViews(JSON.parse(localStorage.getItem(pageViewsKeyName)));

// let table_button = document.getElementById('clear_button');
// table_button.addEventListener("click", function () {
//     localStorage.clear();
//     window.location.reload();
//     window.alert("The cache has been cleared!");
// });
