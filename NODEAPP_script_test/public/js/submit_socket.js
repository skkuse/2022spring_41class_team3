let button = document.querySelector("#submit");
//let text = document.querySelector("#usercode");
let res = document.querySelector("#result");
let che = document.querySelector("#check");
let form = document.querySelector(".UserCode");
let back = document.querySelector("#back");
// let next = document.querySelector("#next");

back.addEventListener("click", () => {
    window.location.href = "/class"
})

// next.addEventListener("click", () => {
//     const urlParam = new URLSearchParams(window.location.search)
//     window.location.href = `/lecture?no=${parseInt(urlParam.get('no')) + 1}`
// })

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let client = editor.getValue();
    let server = editor2.getValue();
    res.innerHTML = "Processing...";
    button.style.visibility = "hidden";
    let xhr = new XMLHttpRequest();

    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let temp = encodeURIComponent(client);
    let temp2 = encodeURIComponent(server)
    const urlParam = new URLSearchParams(window.location.search)
    xhr.send(`client=${temp}&server=${temp2}&qnum=${urlParam.get('no')}`);
    console.log(temp)
    xhr.onload = () => {
        console.log(xhr.response);

        button.style.visibility = "visible";


        let result = JSON.parse(xhr.response);
        console.log(result.output)

        if (result.assess.result === "correct") {
            che.innerHTML = "정답입니다.";
        } else {
            che.innerHTML = "틀렸습니다.";
        }

        if (result.success) {
            res.innerHTML = "Socket Worked" //Javascript does not render \n so this process is used to render.
        } else {
            res.innerHTML = "Socket Failed"
        }
    };
})