const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv").config();
const users = require('./routes/Users')
const documents = require('./routes/Documents')
const offices = require('./routes/Offices')
const security = require('./routes/Security')
const config = require('./config/db');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");

// CORS 
app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "DELETE", "PUT"],
	credentials: true
}))

// DB CONNECTION
let conn = config.connection
//

// SET SESSION STORE
var sessionStore = new MySQLStore({
	expiration: 1000 * 60 * 60 * 24,
	createDatabaseTable: true,
	schema: {
		tableName: 'sessiontbl',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
}, conn)


// app.set('trust proxy', 1)

// SET SESSION
app.use(session({
	key: "keyin",
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false, //true
	saveUninitialized: false, //true
	cookie: {
		httpOnly: false, // true
		secure: false,
		maxAge: 1000 * 60 * 60 * 24,
		sameSite: true
	}
}));

// Persist Session
app.use((req, res, next)=>{
	const session = req.session
	if(session){
		next()
	}
})

// PORT LISTEN
app.listen(process.env.PORT || 5000, () => {
	console.log('Server is listening on port ' + process.env.PORT);
});

// CHECK IF USER SESSION EXIST
app.get('/login', (req, res) => {
	if (req.session.user) {
		res.json({ loggedIn: true})
	} else {
		res.json({ loggedIn: false })
	}
})

// ADMIN LOGIN
app.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (email || password) {
		conn.query(
			"SELECT * FROM users WHERE email = ?;",
			email,
			(err, result) => {
				if (err) {
					res.send({ err: err });
				}

				if (result.length > 0) {
					const role = "admin"
					if (result[0].role !== role ) {
						res.json({ message: "Invalid email or password" })
					} else { 
						bcrypt.compare(password, result[0].password, (error, response) => {

							if (response) {
								req.session.user = result[0];
								// const name = result[0].name;
								// const userEmail = result[0].email;
								// const userOffice = result[0].office_id;
								// const userData = {name, userEmail, userOffice};
								// req.session.user = userData;

								res.json({ loggedIn: true, user: req.session.user})
							} else {
								res.json({ loggedIn: false, message: "Invalid email or password" });
							}
						});
					}
				} else {
					res.json({ loggedIn: false, message: "Invalid email or password" });
				}
			});
	} else {
		res.json({ loggedIn: false, message: "Invalid email or password" })
	}
});

// LOGOUT
app.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy((error) => {
			if (error) {
				res.send(error)
			} {
				res.clearCookie("keyin", { domain: "localhost", path: "/" });
				res.redirect('http://localhost:3000/login')
			}
		});
		req.session = null 
	}
})

// Route Middlewares
app.use('/users', users)
app.use('/documents', documents)
app.use('/offices', offices)
app.use('/security', security)

