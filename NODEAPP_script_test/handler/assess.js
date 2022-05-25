let ans = require("./answer")
let assess = (out, qnum) => {
    // console.log(`out=${out} and qnum=${qnum}`)
    // console.log(ans[qnum])
    let db = {
        result: "incorrect",
        out: out,
        ans: ans[qnum]
    }
    if (ans[qnum] === out) {
        // console.log("Correct")
        db["result"] = "correct"
    } else {
        db["result"] = "incorrect"
    }
    // console.log(db);
    return db
}

module.exports = {
    assess
}