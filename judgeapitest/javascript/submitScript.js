let button = document.querySelector(".submit");
let text = document.querySelector("#source");
let res = document.querySelector("#result");
let form = document.querySelector(".myform");
let memoryContainer = document.querySelector("#memory");
let timeContainer = document.querySelector("#time");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    res.innerHTML = "Processing...";
    button.style.visibility = "hidden";
    let xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`source=${text.value}`);
    xhr.onload = () => {
        console.log(xhr.response);

        button.style.visibility = "visible";

        let result = JSON.parse(xhr.response);
        console.log(result.output)
        let temp = ""
        if (result.success) {
            temp = result.output[0].split("\n").map((e) => `<p>${e}</p>`); //Javascript does not render \n so this process is used to render.
        } else {
            temp = result.output
        }

        res.innerHTML = temp.join("");
    };
})