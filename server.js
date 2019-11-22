var express = require('express');
var app = express();
var port = 3000;
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var colors = require('colors');
var fs = require('fs');
var bcrypt = require('bcrypt');

app.use(express.static('./'));

var users = {}; // Stores all user data
var customers = {}; // Stores all customer data
var work_orders = {};
var inventory = {};
var items = {};

// MySQL Config
var config = {
	host: "localhost",
	user: "node",
	password: "node",
	database: "dci_project"
};

// Handling MySQL disconnects
var con;
function handleDisconnect() {
	con = mysql.createConnection(config);
	
	// Connecting to the database
	con.connect(function(err) {
		if (err) {
			log("Error connecting to database. Retrying in 2s...", "red");
			setTimeout(handleDisconnect, 2000);
		} else {
			log("Connected to database!", "green");
			//server.db_conn = true;
		}
	});
	
	// Reconnect on connection lost
	con.on("error", function(err) {
		log("Database "+ err, "red");
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			handleDisconnect();
		} else {
			throw err;
		}
	});
}
handleDisconnect(); // Connect and start disconnect handler





 io.on('connection', function(socket) {

	log("A user has connected.");
	

 });

http.listen(port, () => console.log('Example app listening on port '+ port +'!'));

// Formatted console log function
function log(text, color) {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var ap = "AM";
	if (h > 12) {
		h -= 12;
		var ap = "PM";
	}
	if (m < 10) {
		m = "0" + m;
	}
	time = h + ":" + m + " " + ap;
	
	if (typeof(color) == "undefined") {
		display = colors.grey(time) + ": " + text;
		console.log(display);
	} else {
		console.log(colors.grey(time) + ": " + colors[color](text));
	}
}

// Catching ctrl+c
process.on('SIGINT', exitHandler.bind(null, {exit: true, type: "shutdown"}));

// Graceful shutdown
function exitHandler(options, err) {
	if (options.exit) {
		log("Shutting down server.");
		process.exit();
	}
}