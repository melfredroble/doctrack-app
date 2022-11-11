const express = require("express");
const config = require("../config/db");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;

// connection
let conn = config.connection;

// Protecting routes from unauthorized users
const requireAuth = (req, res, next) => {
  const userSession = req.session.user;
  const sessionId = req.session.id;
  if (!userSession) {
    res.send("Unauthorized");
  } else {
    conn.query(
      "SELECT * FROM `sessiontbl` WHERE session_id = ?",
      sessionId,
      (err, result) => {
        if (result.length > 0) {
          next();
        }
        if (err) {
          res.send(err);
        }
      }
    );
  }
};

// Getting the email address of the logged in user.
router.post("/userLogin", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const emailQuery = `SELECT * FROM users WHERE email = ?`;

  conn.query(emailQuery, email, (error, result) => {
    if (error) {
      res.json(error);
    }
    if (result.length > 0) {
      const encryptedPwd = result[0].password;
      bcrypt.compare(password, encryptedPwd, (error, response) => {
        if (response) {
          req.session.user = result[0];
          res.json({ loggedIn: true, user: req.session.user });
        } else {
          res.json({
            loggedIn: false,
            message: "Invalid email or password",
          });
        }
      });
    } else {
      res.json({ loggedIn: false, message: "Invalid email or password" });
    }
  });
});

// Getting document types.
router.get("/getDoc", (req, res, next) => {
  conn.query("SELECT name as label, id as value FROM doctypes", (err, rows) => {
    if (err) res.json("0");
    else res.json(rows);
  });
});

// Getting offices.
router.get("/getOffice", (req, res, next) => {
  conn.query(
    "SELECT office_name as label, id as value FROM offices",
    (err, rows) => {
      if (err) res.json("0");
      else res.json(rows);
    }
  );
});

module.exports = router;
