const express = require("express");
const router = express.Router();
const fs = require("fs");
const {
    generate
} = require("../handler/spawnHandler")

let writeFile = (server, client) => {
    return new Promise((res, rej) => {
        fs.writeFile('./server.py', server, (err) => {
            if (err) {
                rej(err);
            }
        })
        fs.writeFile('./client.py', client, (err) => {
            if (err) {
                rej(err);
            }
        })
        res("success")
    })
}

router.post("/socket", (req, res) => {
    // console.log("HI");
    // console.log(req.body)
    data_return = {
        success: false,
        output: null,
        assess: {
            result: "incorrect",
            out: null,
            ans: "hi\r\n",
        }
    }
    console.log("BEGIN SEQUENCE")
    let start = writeFile(req.body.server, req.body.client);
    start.then(() => {
        let tmp = generate("hi\n")
        tmp.then((out) => {
            console.log(out)
            if (out == "hi\r\n") {
                console.log("works")
                data_return["success"] = true
                data_return["output"] = out
                data_return["assess"]["result"] = "correct"
                data_return["assess"]["out"] = out
            } else {
                data_return["success"] = true
                data_return["output"] = out
                data_return["assess"]["result"] = "incorrect"
                data_return["assess"]["out"] = out
            }
            res.send(data_return)
        }, (err) => {
            data_return["output"] = "failed"
            data_return["assess"]["out"] = "error"
            console.log(err)
            res.send(data_return)
        })
    }, (err) => {
        console.log("Error in writeFile function (spawnRouter.js")
        console.log(err)
        res.send("Failure")
    })
})

module.exports = {
    router
}