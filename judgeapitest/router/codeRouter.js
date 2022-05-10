const express = require("express");
const router = express.Router();
const apikey = require("../secret");
let axios = require("axios");

router.post("/jquery", async (req, res) => {

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


  try {
    const respFromJquery = await axios.request(option);
    // console.log(respFromJquery.data);
    const option2 = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${respFromJquery.data.token}`,
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": apikey,
      },
    };
    const respToFront = await axios.request(option2);
    // console.log(respToFront.data);
    res.send(respToFront.data);
  } catch (err) {
    console.log("Error in respFromJquery section");
    console.log(err);
  }
});

module.exports = {
  router
};