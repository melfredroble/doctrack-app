const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config({path: './.env'});
const usersRoute = require("./routes/Users");
const login = require("./routes/Login");
const documents = require("./routes/Documents");
const offices = require("./routes/Offices");
const security = require("./routes/Security");
const notifications = require("./routes/Notifications");
const config = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const { sessionMiddleware, wrap, corsConfig } = require("./controllers/session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");

// DB CONNECTION
let conn = config.connection;

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// SET SESSION
app.use(sessionMiddleware);

io.use(wrap(sessionMiddleware));

// Persist Session
app.use((req, res, next) => {
  const session = req.session;
  if (session) {
    next();
  }
});

// PORT LISTEN
server.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port " + process.env.PORT);
});

// Route Middlewares
app.use("/app", login);
app.use("/users", usersRoute);
app.use("/documents", documents);
app.use("/offices", offices);
app.use("/security", security);
app.use("/notifications", notifications)

// users
let users = [];

io.on("connection", (socket) => {
  socket.on("connected", (myId) => {
    users[myId] = socket.id;
    console.log(myId);
  });
});



// CHECK IF USER SESSION EXIST
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// ADMIN LOGIN
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email || password) {
    conn.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        const role = "admin";
        if (result[0].role !== role) {
          res.json({ message: "Invalid email or password" });
        } else {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = result[0];
              // const name = result[0].name;
              // const userEmail = result[0].email;
              // const userOffice = result[0].office_id;
              // const userData = {name, userEmail, userOffice};
              // req.session.user = userData;

              res.json({ loggedIn: true, user: req.session.user });
            } else {
              res.json({
                loggedIn: false,
                message: "Invalid email or password",
              });
            }
          });
        }
      } else {
        res.json({ loggedIn: false, message: "Invalid email or password" });
      }
    });
  } else {
    res.json({ loggedIn: false, message: "Invalid email or password" });
  }
});

// LOGOUT
app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.send(error);
      } else {
        res.clearCookie("keyin", { domain: "localhost", path: "/" });
        res.json(0);
      }
    });
    req.session = null;
  }
});

