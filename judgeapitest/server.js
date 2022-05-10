let express = require("express");
let app = express();


const {router:codeRouter} = require("./router/codeRouter.js");
const {router:jsRouter} = require("./router/jsRouter");
const {router:navRouter} = require("./router/navRouter");
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//Can add routers to make overall code more neat.

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.use("/code", codeRouter);

app.use("/nav", navRouter);

app.use("/javascript", jsRouter);


app.listen(8080);
console.log("Server is listening on port 8080");
