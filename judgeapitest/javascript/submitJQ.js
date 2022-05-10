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
    let result = JSON.parse(xhr.response);
    button.style.visibility = "visible";
    if (result.stderr) {
      memoryContainer.innerHTML = "<h3>Error :(</h3>";
      timeContainer.innerHTML = "<h3>Error :(</h3>";
      let temp = result.stderr.split("\n").map((e) => `<p>${e}</p>`); //Javascript does not render \n so this process is used to render.
      res.innerHTML = temp.join("");
    } else {
      memoryContainer.innerHTML = `<h3>Memory: ${result.memory}</h3>`;
      timeContainer.innerHTML = `<h3>Time: ${result.time}</h3>`;
      let temp = result.stdout.split("\n").map((e) => `<p>${e}</p>`); //Javascript does not render \n so this process is used to render.
      res.innerHTML = temp.join("");
    }
  };
});