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
let testcase = (out, qnum) => {
    let temp = [out[0].stdout, out[1].stdout, out[2].stdout]
    let db = {
        result: "incorrect",
        out: temp,
        ans: ans[qnum],
        testcase: 0
    }
    // console.log(out)
    // console.log(qnum);

    // console.log(temp)
    // console.log(ans[qnum])
    for (let i = 0; i < 3; i++) {
        if (temp[i] === ans[qnum][i]) {
            db["testcase"] += 1
        }
    }
    if (db["testcase"] === 3) {
        db["result"] = "correct"
    }
    console.log(db)
    return db;
}

module.exports = {
    assess,
    testcase
}