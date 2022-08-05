const mouse = document.querySelector(".cursor-pfp");
const submit = document.querySelector("#submit");
const message = document.querySelector("#message");
const email = document.querySelector("#email");
const name = document.querySelector("#name");

document.querySelector(".top img").addEventListener("mouseover", () => {
    mouse.style.display = "none";
    document.querySelector(".top img").style.webkitFilter = "blur(0)";
});

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://127.0.0.1:8080/v1/data", requestOptions)
    .then(response => response.json())
    .then(result => {
        document.querySelector(".top img").src = result.pfp;
    })
    .catch(error => console.log('error', error));


submit.addEventListener("click", () => {
    if (message.value === "" || email.value === "" || name.value === "") {
        if (name.value === "") {
            name.style.borderColor = "#e03131";
            name.style.borderStyle = "solid";
        } else {
            name.style.borderStyle = "none";
        }
        if (email.value === "") {
            email.style.borderColor = "#e03131";
            email.style.borderStyle = "solid";
        } else {
            email.style.borderStyle = "none";
        }
        if (message.value === "") {
            message.style.borderColor = "#e03131";
            message.style.borderStyle = "solid";
        } else {
            message.style.borderStyle = "none";
        }

    } else {

        if(!email.value.includes("@")) {
            email.style.border = "1px solid #F00";
            return console.log("invalid submition")
        }

        let reqOpt = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://api.ipify.org/?format=json", reqOpt)
            .then(response => response.json())
            .then(result => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "name": name.value,
                    "email": email.value,
                    "message":message.value,
                    "ip": result.ip,
                    "userAgent": navigator.userAgent
                });

                var reqData = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://127.0.0.1:8080/v1/contact", reqData)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));

            })
            .catch(error => console.log('error', error));
    }
});


//  ______    _____
// /      \  |  o | 
// |        |/ ___\| 
// |_________/     
// |_|_| |_|_|
