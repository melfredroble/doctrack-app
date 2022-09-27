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
},conn)


// app.set('trust proxy', 1)
app.use(session({
	key: "keyin",
    secret: process.env.SESSION_SECRET,
	store: sessionStore,
    resave: false, //true
    saveUninitialized: false, //true
	cookie: {
		httpOnly: true,
		secure: false,
		maxAge: 1000 * 60 * 60 * 24,
		sameSite: true
	}
}));


// app.use((req, res, next)=>{
// 	console.log(req.session);
// 	next()
// })

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is listening on port 5000');
});

app.get('/login', (req, res)=> {
	const {user} = req.session;
	if(user){
		res.json({loggedIn: true, user: user})
	}
})

	
	app.post("/login", (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
	
		if(email || password) {
			conn.query(
				"SELECT * FROM users WHERE email = ?;",
				email,
				(err, result) => {
					if (err) {
					res.send({ err: err });
					}
					const role = result.role;
		
					if(result.role !== role) {
						res.send({message: "User doesn't exist"})
					} else {
						if (result.length > 0) {
						bcrypt.compare(password, result[0].password, (error, response) => {
			
							if (response) {
								req.session.user = result;
								res.send(result)
								// res.end()
							} else {
								res.send({ message: "Wrong email/password combination!" });
							}
							
						});
					} else {
						res.send({ message: "User doesn't exist" });
					}
				}
			});
		} else {
			res.send({message: "Email and password required."})
		}
	});



app.get('/logout', (req, res) => {
	if(req.session){
		req.session.destroy((error)=>{
			if(error){
				res.send(error)
			}{
				res.clearCookie("keyin", { domain: "localhost",path: "/" });
				res.redirect('http://localhost:3000/login')
			}
		});
		
	}
})


// Route Middlewares

app.use('/users', users)
app.use('/documents', documents)
app.use('/offices', offices)

