// function myAppOnload(e) {
//     $('.alert').alert();

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

                //Start for JS code from https://jsfiddle.net/seamusleahy/rxeuaatw/
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
        console.log("There was an error");
    }

const moment = require('moment');
const pageViewsKeyName = "pageViews";

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
    let table = document.getElementById("websiteLogsTable");
    let tableBody = document.getElementById("logTableBody");
    array.map(item => {
        //creates the elements
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

document.addEventListener('DOMContentLoaded', myAppOnload); // notice we do NOT call myAppOnload, we only pass the name of it. The event listener will call it (by using () after the name) when the event is triggered

//Records the page name and time accessed
window.onload = addPageView;

//Access local storage and populate table on table page.
listPageViews(JSON.parse(localStorage.getItem(pageViewsKeyName)));
console.log(localStorage)

//=============== executes table clear and refreshes page ========================//
let table_button = document.getElementById('clear_button');
table_button.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
    window.alert("It is like you were never here...");
    console.log("cache cleared")
});
