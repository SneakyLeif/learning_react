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
var uIndex = {};
var customers = []; // Stores all customer data
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

// Loading users
con.query("SELECT * FROM users", function(err, res) {
	if (err) throw err;

	for (var i= 0; i < res.length; i++) {
		users[res[i].id] = createUserObj(res[i]);
		uIndex[res[i].user.toLowerCase()] = res[i].id; // create uIndex reference for user
	}

	log("users loaded!", "green");
});
// Create user object
function createUserObj(res) {
	var user = JSON.parse( JSON.stringify( res ) );
	delete user.id;

	user.online = false;
	
	return user;
}

// Loading customers
con.query("SELECT * FROM customers", function(err, res) {
	if (err) throw err;

	for (var i= 0; i < res.length; i++) {
		customers[i] = res[i];
	}

	log("customers loaded!", "green");
	console.log(customers);
});

io.on('connection', function(socket) {

	log("A user has connected.");
	
	// User Registration
	socket.on('submit-register', function(regData) {
		if (regData != "" && regData != null) {
			var email = {
				valid: false,
				tooLong: false,
				missing: false
			};
			var user = {
				valid: false,
				empty: false,
				taken: false,
				tooShort: false,
				tooLong: false,
				missing: false
			};
			var pass = {
				valid: false,
				empty: false,
				matches: false,
				tooShort: false,
				tooLong: false,
				missing: false,
				missing_confirmation: false
			};
			
			// Email
			if (regData.hasOwnProperty("email")) {
				if (regData.email == "") {
					email.valid = true;
					
				} else {
					if (regData.email.length <= 32) {
						email.valid = true;
						
					} else {
						email.tooLong = true;
						
					}
				}
			} else {
				email.missing = true;
			}
			
			// Username
			if (regData.hasOwnProperty("user")) {
				if (regData.user != "") {
					if (!isUserTaken(regData.user)) {
						if (regData.user.length >= 4) {
							if (regData.user.length <= 18) {
								user.valid = true;
							} else {
								user.tooLong = true;
							}
						} else {
							user.tooShort = true;
						}
					} else {
						user.taken = true;
					}
				} else {
					user.empty = true;
				}
			} else {
				user.missing = true;
			}
			
			// Password
			if (regData.hasOwnProperty("pass1")) {
				if (regData.hasOwnProperty("pass2")) {
					if (regData.pass1 != "") {
						if (regData.pass1.length >= 5) {
							if (regData.pass1.length <= 24) {
								pass.valid = true;
								
								if (regData.pass1 == regData.pass2) {
									pass.matches = true;
									
								}
							} else {
								pass.tooLong = true;
								
							}
						} else {
							pass.tooShort = true;
							
						}
					} else {
						pass.empty = true;
						
					}
				} else {
					pass.missing_confirmation = true;
					
				}
			} else {
				pass.missing = true;
				
			}
			
			if (email.valid && user.valid && pass.valid && pass.matches) {
				console.log("someone tried to make an account with the username: \""+ regData.user +"\"");
				
				// CREATE ACCOUNT HERE!! (post to mysql, update users and uIndex, log user in)
				
				bcrypt.hash(regData.pass1, 10, function(err, hash) {
					var insert = {
						user: regData.user,
						email: regData.email,
						pass: hash
					};

					con.query('INSERT INTO users SET ?', insert, function(err, res) {
						if (err) throw err;
						
						users[res.insertId] = createUserObj(res);
						uIndex[insert.user.toLowerCase()] = res.insertId;
						socket.uId = res.insertId;

						logIn(socket.uId);
					});
				});
				
			} else {
				var err = {err: true};

				for (var key in email) {
					if (email[key]) {
						err.email = key;
					}
				}

				for (var key in user) {
					if (user[key]) {
						err.user = key;
					}
				}

				for (var key in pass) {
					if (pass[key]) {
						err.pass = key;
					}
				}
				if (!pass.matches) {
					err.pass.matches = false;
				}
				
				socket.emit('register-response', err);
			}
		}
	});

	// User Login
	socket.on('submit-login', function(logData) {
		if (logData != "" && logData != null) {
			var user = {
				id: 0,
				valid: false,
				empty: false,
				missing: false
			};
			var pass = {
				valid: false,
				empty: false,
				missing: false
			}
			var thePointOfNoReturn = false;

			if (logData.hasOwnProperty("user")) {
				if (logData.user != "") {
					if (uIndex.hasOwnProperty(logData.user.toLowerCase())) {
						user.valid = true;
						user.id = uIndex[logData.user.toLowerCase()];
						console.log(uIndex);
						
						if (logData.hasOwnProperty("pass")) {
							if (logData.pass != "" && logData.pass != undefined) {
								thePointOfNoReturn = true;

								bcrypt.compare(logData.pass, users[user.id].pass, function(err, res) {
									if (err) throw err;

									if (res) {
										pass.valid = true;
										logIn(user.id);
									}
								});
							} else {
								pass.empty = true;
							}
						} else {
							pass.missing = true;
						}
					}
				} else {
					user.empty = true;
				}
			} else {
				user.missing = true;
			}

			if (!thePointOfNoReturn) {
				if (user.valid && pass.valid) {
					logIn(user.id);
				} else {
					var err = {err: true};

					for (var key in user) {
						if (user[key]) {
							err.user = key;
						}
					}

					for (var key in pass) {
						if (pass[key]) {
							err.pass = key;
						}
					}
					if (!err.hasOwnProperty("pass")) {
						err.pass = "not valid";
					}

					socket.emit('login-response', err);
				}
			}
		}
	});

	function logIn(id) {
		if (users.hasOwnProperty(id)) {
			socket.uId = id;

			io.in("p-"+ id).clients((err, clients) => {
				if (clients.length == 0) {
					socket.join("p-"+ id);
				}
			});

			users[id].online = true;

			data = {
				status: true,
				username: users[socket.uId].user
			};

			socket.emit('login-response', data);

			log (users[id].user +" has logged in!", "green");
		} else {
			log("error logging in :(", "red");
		}
	}
	
	socket.on('disconnect', function() {
		if (socket.hasOwnProperty("uId")) {
			users[socket.uId].online = false;

			users[socket.uId].last_online = Date.now();
			var sql = "UPDATE users SET last_online = '"+ users[socket.uId].last_online +"' WHERE id ='"+ socket.uId +"'";
			con.query(sql, function(err, result) {if (err) throw err});

			log(users[socket.uId].user +" has gone offline :(", "gray");
		} else {
			log("A user has disconnected :(", "gray");
		}
	});
});

function isUserTaken(user) {
	taken = false;

	if (uIndex.hasOwnProperty(user.toLowerCase())) {
		taken = true;
	}
	
	return taken
}

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

objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 