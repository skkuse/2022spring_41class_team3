const express = require("express");
const router = express.Router();
const apikey = require("../secret");
let axios = require("axios");
const fs = require("fs");
const {
  spawn
} = require("child_process")

router.post("/script", async (req, res) => {

  data_return = {
    success: false,
    output: []
  }

  console.log("Well this works");
  console.log(req.body.source);
  await fs.writeFile('./script.py', req.body.source, (err) => {
    if (err) {
      console.log("Script Error");
      console.warn(err);
    }
  });

  let child = spawn('python', ["./script.py"]);
  child.on('spawn', () => {
    console.log(`${child.pid}: Child has spawned`);
  })

  child.stdout.on('data', (data) => {
    let data_utf8 = data.toString("utf-8");
    console.log(data_utf8);
    data_return.success = true;
    data_return.output.push(data_utf8)
  });

  child.stderr.on('data', (data) => {
    let data_utf8 = data.toString("utf-8");
    console.log(data_utf8);
    data_return.success = false;
    data_return.output.push(data_utf8);
    data_return.output[0] = "ERROR"; //Hide directory but it doesn't work 
  })

  child.on('close', (code) => {
    console.log(`${child.pid} Child has exited with code: ${code}`);
    res.send(data_return);
  })

  child.on('error', (err) => {
    console.log(`${child.pid}: ${err}`)
  })

  process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception : ${err}`)
  })

  // res.send("works")
})

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