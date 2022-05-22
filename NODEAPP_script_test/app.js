/////
// Module Loading & Basic Setting
// REQUIRED :
// npm install express
// npm install ejs
// npm install cookie
// npm install crypto
// npm install body-parser
// npm install markdown-it
// npm install axios
/////
const path		= require("path");
const express	= require("express");
const cookie	= require("cookie");
const crypto	= require("crypto");
const bodyParser = require("body-parser");
const Markdown = require("markdown-it");
const fs = require("fs");

const {
	spawn
  } = require("child_process")
  
/////
// EJS Directory Setting
/////
var app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/static',express.static('public'))


//
const {
	router: codeRouter
  } = require("./router/codeRouter.js");
  const {
	router: jsRouter
  } = require("./router/jsRouter");
const { escapeRE } = require("markdown-it/lib/common/utils");
app.use("/code", codeRouter);

app.use("/javascript", jsRouter);

/////
// Client Cookie Mapping
/////
function IsCookieExist(request)
{
	console.log(request.header.cookie)
	if(request.header.cookie == undefined)
	{
		return false;
	}
	if(request.header.cookie.session == undefined)
	{
		return false;
	}
	return true;
}

function IsCookieValid(request)
{
	// YOUR CODE HERE
	// THIS FUNCTION SHOULD CHECK THE VALIDITY OF COOKIE USING DATABASE
	return true;
}

function IsCookieAdmin(request)
{
	if (!IsCookieExist(request))
	{
		return false;
	}
	if (!IsCookieValid(request))
	{
		return false;
	}

	// YOUR CODE HERE
	// THIS FUNCTION SHOULD CHECK WHETHER THE COOKIE(SESSION) IS ADMIN OR NOT.
	return true;
}

function AssignCookie(response)
{
	// YOUR CODE HERE
	// THIS FUNCTION SHOULD ASSIGN NEW COOKIE AND GET RID OF ORIGIANL COOKIE OF THE USER (IF EXIST.)
	
	var uuid = crpyto.randomUUID()
	response.cookie(id,uuid)
}


/////
// HTTP Request - Response Mapping
/////
app.get('/', function(req, res){
	if( IsCookieExist(req) && IsCookieValid(req) )
	{
		res.redirect('/class')
	}
	res.redirect('/main')
})

app.get('/main', function(req, res){

	res.render('main')

})

app.get('/register', function(req, res){

	res.render('register')

})

app.get('/class', function(req, res){

	res.render('class')

})

app.get('/lecture', function(req, res){

	// TODO
	// If req.query.no is not integer, it can be path traversal attack: abort it.
	// Change Path into proper environment.

	const targetfile = "./lectures/" + req.query.no + ".md"
	console.log("[+] LECTURE RESOURCE REQUEST :" + req.query.no)
	console.log("[|] READ: " + targetfile);

	fs.readFile(targetfile, 'utf-8', function(err, data){
		var md = Markdown().render(data)
		console.log("[|] Generate MD ... ");
		res.render('lecture', {MDSRC : md, NUMBER : req.query.no})
	})

})

app.get('/admin', function(req, res){

	res.render('admin')

})

app.post('/adduser', function(req, res){
	
	console.log("[+] REGISTER REQUEST POST")
	console.log("[|] INFO1     : " + req.body.info1)
	console.log("[|] INFO2     : " + req.body.info2)
	console.log("[|] USERNAME  : " + req.body.id)
	console.log("[|] PASSWORD1 : " + req.body.pwd1)
	console.log("[|] PASSWORD2 : " + req.body.pwd2)

	// THIS FUNCTION SHOULD DO REGISTER
	// NOTE THAT CLIENT SHOULD SEND PWD IN HASHED.
	
	if(true)
	{
		res.redirect('/main')
	}

})

app.post('/login',function(req, res){

	console.log("[+] LOGIN REQUEST POST")
	console.log("[|] USERNAME : " + req.body.id)
	console.log("[|] PASSWORD : " + req.body.pwd)

	// THIS FUNCTION SHOULD DO LOGIN
	// NOTE THAT CLIENT SHOULD SEND PWD IN HASHED.
	
	var loginSuccess = true;
	if(loginSuccess)
	{
		res.redirect('/class')	
	}
	else
	{
		console.log("LOGIN FAIL")
		res.redirect('/main')
	}
})
/*
app.post('/testing', function(req, res){
	
	console.log("[+] PROBLEM SOLVE REQ POST")
	console.log("[|] PROBLEM NO:  " + req.body.no)
	console.log("[|] USER CODE:  " + req.body.usercode.slice(0,5) + "...")

	// TODO
	// Sesson Control.
	if (false){
	
	if( IsCookieExist() && IsCookieValid() )
	{
		console.log("[|] USER SESSION" + req.header.cookie.id)
	}
	else
	{
		console.log("[|] WITH INVALID SESSION!")
		res.redirect('/main')
	}

	}

	res.redirect('/class')
})
*/

app.get('*',function(req, res){
	res.status(404).send('404 NOT FOUND')
})


/////
// RUN Server
/////
var port = 8080;
function onServerStart(port) {
	console.log("[+] NodeJS Server Online (" + port + ")");
}
app.listen(port, onServerStart(port))
