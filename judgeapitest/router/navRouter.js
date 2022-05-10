const express = require("express");
const router = express.Router();
const {resolve} = require('path')

router.get("/submit/jquery", (req, res)=>{
    let tmp = resolve("./views/pages/submitJQ")
    res.render(tmp);
})

module.exports = {router};