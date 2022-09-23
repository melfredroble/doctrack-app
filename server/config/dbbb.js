






const express = require('express');

const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}); 

let db = {};

db.adminLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE email = ?;",
      email,
      (error, result) => {
        if (error) {
          return reject(error)
        }
              if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
  
        if (response) {
          req.session.user = result;
          res.send({loggedIn: true, users: req.session.user});
          res.status(200);
        } else {
          res.send({ loggedIn: false, message: "Wrong email/password combination!" });
        }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
        return resolve()
      }
    );
  })
}


module.exports = db;




const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv").config();
const users = require('./routes/Users')
const documents = require('./routes/Documents')
const config = require('./config/db');
const MySQLStore = require('express-mysql-session')(session);


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST"],
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


//
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
			  req.session.user = result;
			  res.send({loggedIn: true, users: req.session.user});
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
  



// app.get('/home', function(req, res) {
// 	// If the user is loggedin
// 	if (req.session.loggedin) {
// 		// Output email
// 		res.send('Welcome back, ' + req.session.email + '!');
// 	} else {
// 		// Not logged in
// 		res.send('Please login to view this page!');
// 	}
// 	res.end();
// });
