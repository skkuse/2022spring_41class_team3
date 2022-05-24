let button = document.querySelector("#submit");
//let text = document.querySelector("#usercode");
let res = document.querySelector("#result");
let che = document.querySelector("#check");
let form = document.querySelector(".UserCode");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = editor.getValue();
    res.innerHTML = "Processing...";
    button.style.visibility = "hidden";
    let xhr = new XMLHttpRequest();
    
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let temp = encodeURIComponent(text);
    xhr.send(`usercode=${temp}`);
    console.log(temp)
    xhr.onload = () => {
        console.log(xhr.response);

        button.style.visibility = "visible";


        let result = JSON.parse(xhr.response);
        console.log(result.output)

        if (window.document.location.href == "http://localhost:8080/lecture?no=118")
        {
            if (result.output[0] == "hello! python\r\n"){
            che.innerHTML = "정답입니다.";
            } else {
                che.innerHTML = "틀렸습니다.";
            }
        }
        else if (window.document.location.href == "http://localhost:8080/lecture?no=119"){
            if (result.output[0] == "2 3 4\r\n"){
                che.innerHTML = "정답입니다.";
                } else {
                    che.innerHTML = "틀렸습니다.";
                }
        }
        else if (window.document.location.href == "http://localhost:8080/lecture?no=120")
        {
            if (result.output[0] == "3\r\n312\r\n492\r\n"){
            che.innerHTML = "정답입니다.";
            } else {
                che.innerHTML = "틀렸습니다.";
            }
        }
        else if (window.document.location.href == "http://localhost:8080/lecture?no=121"){
            if (result.output[0] == "[12, 13, 23, 39, 43, 45, 46, 84, 91]\r\n"){
                che.innerHTML = "정답입니다.";
                } else {
                    che.innerHTML = "틀렸습니다.";
                }
        }
        else if (window.document.location.href == "http://localhost:8080/lecture?no=122")
        {
            if (result.output[0] == "1\r\n2\r\n10\r\n12\r\n"){
            che.innerHTML = "정답입니다.";
            } else {
                che.innerHTML = "틀렸습니다.";
            }
        }
        else{
            che.innerHTML = "NOT HERE";
        }

        let temp = ""
        if (result.success) {
            temp = result.output[0].split("\n").map((e) => `<p>${e}</p>`); //Javascript does not render \n so this process is used to render.
        } else {
            temp = result.output
        }

        res.innerHTML = temp.join("");
    };
})