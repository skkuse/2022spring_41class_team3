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
const path = require("path");
const express = require("express");
const cookie = require("cookie");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const Markdown = require("markdown-it");
const UserStorage = require("./UserStorage");
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
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use('/static', express.static('public'))


//
const {
	router: codeRouter
} = require("./router/codeRouter.js");
const {
	router: jsRouter
} = require("./router/jsRouter");
const {
	escapeRE
} = require("markdown-it/lib/common/utils");
const {
	router: spawnRouter
} = require("./router/spawnRouter");
app.use("/code", codeRouter);

app.use("/javascript", jsRouter);

app.use("/spawn", spawnRouter);
const mysql = require('mysql');
const req = require("express/lib/request");



///crypto
const createSalt = () =>
	new Promise((resolve, reject) => {
		crypto.randomBytes(64, (err, buf) => {
			if (err) reject(err);
			resolve(buf.toString('base64'));
		});
	});
///
const createHashedPassword = (plainPassword) =>
	new Promise(async (resolve, reject) => {
		const salt = await createSalt();
		crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
			if (err) reject(err);
			resolve({
				password: key.toString('base64'),
				salt
			});
		});
	});
/////
// EJS Directory Setting
/////
const makePasswordHashed = (salt, plainPassword) =>
	new Promise(async (resolve, reject) => {

		crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
			if (err) reject(err);
			resolve(key.toString('base64'));
		});
	});



/////
// Client Cookie Mapping
/////


function IsCookieExist(request) {
	console.log(request.header.cookie)
	if (request.header.cookie == undefined) {
		return false;
	}
	if (request.header.cookie.session == undefined) {
		return false;
	}
	return true;
}


async function IsCookieNew(request) {

	// YOUR CODE HERE
	// THIS FUNCTION SHOULD CHECK THE VALIDITY OF COOKIE USING DATABASE
	const {
		id,
		Email,
		psword,
		admin,
		salt
	} = await UserStorage.getUserInfo(request.body.id);

	if (id === "admin") {
		return true;
	} else {
		console.log("ID already exists");
		return false;
	}

	return true;
}
async function IsCookieValid(request) {

	// YOUR CODE HERE
	// THIS FUNCTION SHOULD CHECK THE VALIDITY OF COOKIE USING DATABASE
	const {
		id,
		Email,
		psword,
		admin,
		salt
	} = await UserStorage.getUserInfo(request.body.id);

	if (id !== "admin") {

		const hashedpassword = await makePasswordHashed(salt, request.body.pwd);
		if (id === request.body.id && psword === hashedpassword) {
			console.log("here");
			return true;
		} else {
			return false;
		}

	} else {
		console.log("Id does not exist");
		return false;
	}
	return true;
}

async function IsCookieAdmin(request) {

	if (!IsCookieValid(request)) {


		return false;
	}

	console.log("admin ");
	// YOUR CODE HERE
	// THIS FUNCTION SHOULD CHECK WHETHER THE COOKIE(SESSION) IS ADMIN OR NOT.
	const {
		id,
		Email,
		psword,
		admin,
		salt
	} = await UserStorage.getUserInfo(request.body.id);

	if (admin) {
		console.log("wht?");
		return true;
	} else {
		return false;
	}
	return true;
}

function AssignCookie(response) {
	// YOUR CODE HERE
	// THIS FUNCTION SHOULD ASSIGN NEW COOKIE AND GET RID OF ORIGIANL COOKIE OF THE USER (IF EXIST.)

	var uuid = crpyto.randomUUID()
	response.cookie(id, uuid)
}



/////
// HTTP Request - Response Mapping
/////
app.get('/', function (req, res) {
	if (IsCookieExist(req) && IsCookieValid(req)) {

		console.log("cookie REQUEST :" + req)
		res.redirect('/class')
	}
	res.redirect('/main')
})

app.get('/main', function (req, res) {

	res.render('main')

})

app.get('/register', function (req, res) {

	res.render('register')

})

app.get('/class', function (req, res) {

	res.render('class')

})

app.get('/lecture', function (req, res) {

	// TODO
	// If req.query.no is not integer, it can be path traversal attack: abort it.
	// Change Path into proper environment.

	const targetfile = "./lectures/" + req.query.no + ".md"
	console.log("[+] LECTURE RESOURCE REQUEST :" + req.query.no)
	console.log("[|] READ: " + targetfile);

	fs.readFile(targetfile, 'utf-8', function (err, data) {
		var md = Markdown().render(data)
		console.log("[|] Generate MD ... ");
		res.render('lecture', {
			MDSRC: md,
			NUMBER: req.query.no
		})
	})

})

app.get('/socket_lecture', function (req, res) {

	// TODO
	// If req.query.no is not integer, it can be path traversal attack: abort it.
	// Change Path into proper environment.

	const targetfile = "./lectures/" + req.query.no + ".md"
	console.log("[+] LECTURE RESOURCE REQUEST :" + req.query.no)
	console.log("[|] READ: " + targetfile);

	fs.readFile(targetfile, 'utf-8', function (err, data) {
		var md = Markdown().render(data)
		console.log("[|] Generate MD ... ");
		res.render('socket_lecture', {
			MDSRC: md,
			NUMBER: req.query.no
		})
	})

})

app.get('/question_lecture', function (req, res) {

	// TODO
	// If req.query.no is not integer, it can be path traversal attack: abort it.
	// Change Path into proper environment.

	const targetfile = "./lectures/" + req.query.no + ".md"
	console.log("[+] LECTURE RESOURCE REQUEST :" + req.query.no)
	console.log("[|] READ: " + targetfile);

	fs.readFile(targetfile, 'utf-8', function (err, data) {
		var md = Markdown().render(data)
		console.log("[|] Generate MD ... ");
		res.render('question_lecture', {
			MDSRC: md,
			NUMBER: req.query.no
		})
	})

})

app.get('/admin', function (req, res) {

	res.render('admin')

})

app.post('/adduser', function (req, res) {

	console.log("[+] REGISTER REQUEST POST")
	console.log("[|] INFO1     : " + req.body.info1)
	console.log("[|] INFO2     : " + req.body.info2)
	console.log("[|] USERNAME  : " + req.body.id)
	console.log("[|] PASSWORD1 : " + req.body.pwd1)
	console.log("[|] PASSWORD2 : " + req.body.pwd2)

	const id = req.body.id;
	const info2 = req.body.info2;
	const admin = 0;
	IsCookieNew(req).then((newone) => {
		if (newone) {

			if (req.body.pwd1 === req.body.pwd2) {

				createHashedPassword(req.body.pwd1).then((ob) => {

					const {
						password,
						salt
					} = ob;
					//console.log(ob);
					//console.log("has : "+password+"\nsat :"+salt);

					UserStorage.save({
						id,
						info2,
						password,
						admin,
						salt
					});
					res.redirect('/main');
				});
			} else {
				res.write("<script>alert('Check password again')</script>")
				res.write("<script>window.location=\"./register\"</script>");
			}
		} else {

			res.write("<script>alert('ID already Exists')</script>")
			res.write("<script>window.location=\"./register\"</script>");
		}
	});

	// THIS FUNCTION SHOULD DO REGISTER
	// NOTE THAT CLIENT SHOULD SEND PWD IN HASHED.
	//insert 2 
})




app.post('/login', function (req, res) {

	console.log("[+] LOGIN REQUEST POST")
	console.log("[|] USERNAME : " + req.body.id)
	console.log("[|] PASSWORD : " + req.body.pwd)

	// THIS FUNCTION SHOULD DO LOGIN
	// NOTE THAT CLIENT SHOULD SEND PWD IN HASHED.
	IsCookieAdmin(req).then((lSuccess) => {
		console.log("here!");
		if (lSuccess) {
			console.log("here!3");
			res.redirect('/admin');
		} else {
			console.log("here!2");
			IsCookieValid(req).then((loginSuccess) => {
				console.log(loginSuccess);
				if (loginSuccess) {
					res.redirect('/class')
				} else {
					console.log("LOGIN FAIL")
					res.write("<script>alert('Login Failed')</script>")
					res.write("<script>window.location=\"./main\"</script>");
				}
			});



		}
	});





})

app.get('*', function (req, res) {
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