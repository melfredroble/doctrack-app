const express = require('express')
const config = require('../config/db');
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const bcrypt = require("bcrypt");
const { raw } = require('body-parser');
const saltRounds = 10;

// connection
let conn = config.connection

// Protecting routes from unauthorized users
const requireAuth = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).send("Unathorized")
  }
  next()
}

// Get users list
router.get('/', requireAuth, (req, res) => {
  conn.query("SELECT users.id, users.name, users.email, offices.office_name, users.role FROM users JOIN offices ON users.office_id = offices.id ORDER BY users.id ASC", (err, result) => {
    if (result) {
      res.status(200).json(result)
    }
    if (err) {
      res.send(err)
      res.status(400)
    }
  })
})

// Get user by ID
router.get('/:id', requireAuth, (req, res) => {
  const userId = req.params.id
  conn.query("SELECT users.id, users.name, users.email, users.password, users.office_id, users.role FROM users JOIN offices ON users.office_id = offices.id WHERE users.id = ?",
  userId,
  (err, result) => {
    if (result) {
      res.status(200).json(result)
    }
    if (err) {
      res.send(err)
      res.status(400)
    }
  })
})

// Get LoggedIn User data
router.get('/info',(req, res) => {
  const { user } = req.session
  res.status(201).json(user)
})



// Add user
router.post('/add-user', requireAuth, (req, res) => {
  const fullName = req.body.name
  const email = req.body.email
  const pin = req.body.pin
  const office = req.body.office
  const role = req.body.role

  let newPin = pin.toString();

  conn.query("SELECT * FROM `users` WHERE `email` = ?",
    email,
    (err, result) => {
      if (err) {
        res.status(400).json(err)
      }

      if (result.length > 0) {
        res.send({ message: "Email already exist!", status: "failed" })
      } else {
        bcrypt.hash(newPin, saltRounds, (error, hash) => {
          if (error) {
            res.status(400).json(error)
          }

          conn.query("INSERT INTO `users`(`name`, `email`, `password`, `office_id`, `role`) VALUES (?,?,?,?,?)",
            [fullName, email, hash, office, role], (err, result) => {
              if (err) {
                res.status(400).json(err)
              }

              if (result) {
                res.send({ message: "User added succesfully!", status: "success" })
              }

            }
          )

        })
      }
    })

})


// Update User
router.put('/update', requireAuth, (req, res) => {
  const id = req.body.id
  const fullName = req.body.name
  const email = req.body.email
  const pin = req.body.pin
  const office = req.body.office
  const role = req.body.role

  const hashedPassword = pin.toString()

  if(hashedPassword !== ""){
    bcrypt.hash(hashedPassword, saltRounds, (error, hash) => {
      if (error) {
        res.status(400).json(error)
      } else {
        conn.query('UPDATE `users` SET `name`= ?,`email`= ?,`password`= ?,`office_id`= ?,`role`= ? WHERE id = ?', [fullName, email, hash, office, role, id], (error) => {
          if (error) {
            console.log(error)
          } else {
            res.json({updated: true, message: "User updated"})
          }
        })
      }
    })
  } else {
    conn.query('UPDATE `users` SET `name`= ?,`email`= ?,`office_id`= ?,`role`= ? WHERE id = ?', [fullName, email, office, role, id], (error) => {
      if (error) {
        console.log(error)
      } else {
        res.json({updated: true, message: "User updated"})
      }
    })
  }

})


// Delete user
router.delete('/delete/:id', requireAuth, (req, res) => {
  const id = req.params.id
  conn.query('DELETE FROM `users` WHERE id = ?', id, (error, result) => {
    if (error) {
      res.status(401).json(error)
    } else {
      res.status(201).json({ deleted: true, message: "User successfully deleted!" })
    }
  })
})


module.exports = router