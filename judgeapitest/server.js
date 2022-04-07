let express = require("express");
let app = express();
let axios = require("axios");

let apikey = process.env.JUDGE_API; //The API Key replace (process.env.JUDGE_API)
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//Can add routers to make overall code more neat.

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/submit", (req, res) => {
  res.render("pages/submit");
});

app.get("/javascript/submit", (req, res) => {
  res.sendFile(__dirname + "/javascript/submit.js");
});

app.post("/abcd", (req, res) => {
  //Should fix to async await (more readable)

  const option = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    headers: {
      "Content-type": "application/json",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": apikey,
    },
    data: JSON.stringify({
      language_id: 71, //Python
      source_code: req.body.source,
    }),
  };
  axios
    .request(option)
    .then((response) => {
      console.log(response.data);
      const option2 = {
        method: "GET",
        url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
        headers: {
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": apikey,
        },
      };
      axios
        .request(option2)
        .then((response2) => {
          console.log(response2.data);
          res.send(response2.data);
        })
        .catch((err) => {
          console.log(err); //should implement send error for error handling
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8080);
console.log("Server is listening on port 8080");
