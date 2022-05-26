const express = require("express");
const router = express.Router();
const {
    resolve
} = require('path')

router.get("/submit/script", (req, res) => {
    let tmp = resolve("./public/js/submitScript.js");
    res.sendFile(tmp);
})
router.get("/submit/scriptq", (req, res) => {
    let tmp = resolve("./public/js/submit_question.js");
    res.sendFile(tmp);
})
router.get("/submit/scriptsock", (req, res) => {
    let tmp = resolve("./public/js/submit_socket.js");
    res.sendFile(tmp);
})

module.exports = {
    router
}