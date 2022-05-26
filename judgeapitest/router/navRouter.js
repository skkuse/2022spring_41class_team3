const express = require("express");
const router = express.Router();

const {
    resolve
} = require('path')

router.get("/submit/jquery", (req, res) => {
    let tmp = resolve("./views/pages/submitJQ");
    res.render(tmp);
})
router.get("/submit/script", (req, res) => {
    let tmp = resolve("./views/pages/submitScript");
    res.render(tmp);
})
router.get("/submit/multi", (req, res) => {
    let tmp = resolve("./views/pages/multi");
    res.render(tmp)
})
module.exports = {
    router
};