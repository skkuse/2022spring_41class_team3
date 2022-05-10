const express = require("express");
const router = express.Router();
const apikey = require("../secret");
let axios = require("axios");

router.post("/jquery", (req,res)=>{

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

module.exports = {router};