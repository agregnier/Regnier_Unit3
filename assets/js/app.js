// Form verification
let form = document.getElementById("contact")
try {
    form.addEventListener('submit', e => {
        e.preventDefault();

        let Name = document.getElementById("Name");
        let Address = document.getElementById("Address");
        let Email = document.getElementById("Email");
        let Phone = document.getElementById("Phone");

        if (Name.value == "" || Address.value == "" || Email.value == "" || Phone.value == "") {
            document.getElementById("danger-alert").classList.remove("d-none");

        } else {
            const form = document.getElementById("contact");
            const method = form.getAttribute("method");
            const action = form.getAttribute("action");
            let formEl = document.getElementById('contact');
            let headers = new Headers();

            headers.set('Accept', 'application/json');

            var formData = new FormData();
            for (var i = 0; i < formEl.length; ++i) {
                formData.append(formEl[i].name, formEl[i].value);
            }
            formData.append('json', JSON.stringify({example: 'return value'}));
            let url = 'https://formspree.io/xgevpgop';
            let fetchOptions = {
                method: 'POST',
                headers,
                body: formData
            };

            let responsePromise = fetch(url, fetchOptions);
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
}

//localstorage/pageview js

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

// let bodyClasses = document.getElementsByClassName("body")[0].classList;
// if ("subscribe" in bodyClasses) {
//     listenForModal()
// } else if ("buns" in bodyClasses) {
    listPageViews(JSON.parse(localStorage.getItem(pageViewsKeyName)));
// }

let table_button = document.getElementById('clear_button');
table_button.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
    window.alert("It is like you were never here ;)");
});

//modal js

function listenForModal() {
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("myBtn");
    let span = document.getElementsByClassName("close")[0];
    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}