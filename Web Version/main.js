const express		= require('express');
const app			= express();
const bodyParser	= require('body-parser');
const cookieParser 	= require('cookie-parser');
const path 			= require('path');
const fs = require("fs");
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));

var port = process.env.PORT || 4000;	//set port

//Routes for the api
var router = express.Router();		//get an instance of the express router

router.use(function (req, res, next) {
	
	//do logging
	
	next();//make sure we go to the next routes and dont stop here
});

//REGISTER OUR ROUTES ---------------------------------
//all of the routes will be prefixed with /api
//router.route();
app.route('/home').get(function(req, res){
	res.redirect('/');
});
app.route('/about').get(function(req, res){
	res.sendFile(__dirname+'/pages/'+'about.html');
});
app.route('/editor').get(function(req, res){
	res.redirect('/Editor/index.html')
});

app.route('/type%20writer').get(function(req, res){
	res.redirect('/Type-Writer/')
});
app.route('/learn').get(function(req, res){
	res.sendFile(__dirname+'/pages/'+'learn.html');
});

router.route("/export").post(function (req, res){
	//console.log("savedArray/workspace", req.body);
	fs.writeFile("exportedWorkspace.json", JSON.stringify(req.body), 'utf-8', function(err){
		if(err){
			console.log('An error occured while writing your file.');
			return console.log(err);
		} else {
			res.json({redirect:true});
		}
	});
});

router.route("/importFile").post(function (req, res) {	
	if(!req.files || Object.keys(req.files).length === 0){
		return res.status(400).send('No files were imported');
	}
	
	fs.readFile(req.files.importedFile.tempFilePath, function(err, data){
		if (err) throw err;
		let newData = JSON.parse(data);
		res.json(newData);
	});
});

// Download workspace
app.route("/exportedWorkspace.json").get(function(req, res){
	// res.sendFile(__dirname+'/exportedWorkspace.txt');
	res.download(__dirname+'/exportedWorkspace.json');
});

// Download distribution
app.route("/download").get(function(req, res){
	res.download(__dirname+'/alphabet-scriptor-1.0.zip');
});
app.use('/api', router);
app.use(express.static(__dirname + '/public'));

//START THE server
//=====================================================
app.listen(port);
console.log('The API is running on port: ', port);