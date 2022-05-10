const express = require("express");
const router = express.Router();
const {
    resolve
} = require('path')

router.get("/submit/jquery", (req, res) => {
    let tmp = resolve("./javascript/submitJQ.js");
    res.sendFile(tmp);
})
router.get("/submit/script", (req, res) => {
    let tmp = resolve("./javascript/submitScript.js");
    res.sendFile(tmp);
})

module.exports = {
    router
}