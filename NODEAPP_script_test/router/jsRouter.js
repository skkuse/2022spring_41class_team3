const express = require("express");
const router = express.Router();
const {
    resolve
} = require('path')

router.get("/submit/script", (req, res) => {
    let tmp = resolve("./public/js/submitScript.js");
    res.sendFile(tmp);
})

module.exports = {
    router
}