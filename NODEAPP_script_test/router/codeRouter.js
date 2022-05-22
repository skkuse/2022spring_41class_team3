const express = require("express");
const router = express.Router();
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
  console.log(req.body.usercode);
  await fs.writeFile('./script.py', req.body.usercode, (err) => {
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
    console.log(data);
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
  
})

module.exports = {
  router
};