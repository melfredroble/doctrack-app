const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv").config();
const users = require('./routes/Users')
const documents = require('./routes/Documents')
const offices = require('./routes/Offices')
const config = require('./config/db');
const MySQLStore = require('express-mysql-session')(session);


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "DELETE", "PUT"],
	credentials: true
}))

// connection
let conn = config.connection
//

var sessionStore = new MySQLStore({
	expiration: 10800000,
	createDatabaseTable: true,
	schema: {
		tableName: 'sessiontbl',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
},conn)


app.use(session({
	key: 'keyin',
    secret: process.env.SECRET,
	store: sessionStore,
    resave: false,
    saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 24
	}
}));


app.listen(process.env.PORT || 5000, () => {
    console.log('Server is listening on port 5000');
});


// Route Middlewares

app.use('/users', users)
app.use('/documents', documents)
app.use('/offices', offices)



app.get('/logout', (req, res) => {
	if(req.session.user){
		req.session.destroy((err) => {
			if(!err){
				res.redirect('http://localhost:3000/login')
			}
		})
	}
})



//   app.post("/register", (req, res) => {
// 	const email = req.body.email;
// 	const password = req.body.password;
  
// 	bcrypt.hash(password, saltRounds, (err, hash) => {
// 	  if (err) {
// 		console.log(err);
// 	  }
  
// 	  conn.query(
// 		"INSERT INTO users (email, password) VALUES (?,?)",
// 		[email, hash],
// 		(err, result) => {
// 		  console.log(err);
// 		}
// 	  );
// 	});
//   });
  
  app.get("/login", (req, res) => {
	if (req.session.user) {
	  res.send({ loggedIn: true, user: req.session.user });
	}
  });
  
  app.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
  
	conn.query(
	  "SELECT * FROM users WHERE email = ?;",
	  email,
	  (err, result) => {
		if (err) {
		  res.send({ err: err });
		}
  
		if (result.length > 0) {
		  bcrypt.compare(password, result[0].password, (error, response) => {

			if (response) {
			  req.session.user = result[0];
			  res.send({loggedIn: true, user: req.session.user});
			  res.status(200);
			} else {
			  res.send({ loggedIn: false, message: "Wrong email/password combination!" });
			}
		  });
		} else {
		  res.send({ message: "User doesn't exist" });
		}
	  }
	);
  });
  
