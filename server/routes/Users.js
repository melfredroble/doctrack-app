const express = require('express')
const config = require('../config/db');
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;

// connection
let conn = config.connection


router.get('/', (req, res)=> {
    conn.query("SELECT users.id, users.name, users.email, offices.office_name, users.role FROM users JOIN offices ON users.office_id = offices.id", (err, result)=>{
      if(result) {
        res.status(200).json(result)
      }
      if(err) {
        res.send(err)
        res.status(400)
      }
    })
})

router.post('/add-user', (req,res)=> {
  const fullName = req.body.name
  const email = req.body.email
  const pin = req.body.pin
  const office = req.body.office
  const role = req.body.role

  let newPin = pin.toString();

  conn.query("SELECT * FROM `users` WHERE `email` = ?",
  email,
  (err, result)=>{
		if (err) {
      res.status(400).json(err)
		}

    if(result.length > 0) {
      res.send({message: "Email already exist!", status: "failed"})
    } else {
      bcrypt.hash(newPin, saltRounds, (error, hash)=> {
        if(error) {
          res.status(400).json(error)
        }
    
        conn.query("INSERT INTO `users`(`name`, `email`, `password`, `office_id`, `role`) VALUES (?,?,?,?,?)",
        [fullName, email, hash, office, role], (err, result) =>{
          if(err){
            res.status(400).json(err)
          }
      
          if(result){
            res.status(200)
            res.send({message: "User added succesfully!", status: "success"})
          }
      
        }
        )
    
      })
    }
  })

})


router.delete('/delete/:id', (req, res) =>{
  const id = req.params.id
  conn.query('DELETE FROM `users` WHERE id = ?', id, (error, result) =>{
    if(error){
      res.status(400).json(error)
    } else {
      res.status(200).json({deleted: true, message: "User successfully deleted!"})
    }
  })
})

router.put('/update', (req, res) =>{
  const id = req.body.id
  const name = req.body.name
  const password = req.body.password
  const office = req.body.office
  const role = req.body.role
  conn.query('UPDATE `users` SET `name`= ?,`email`= ?,`password`= ?,`office_id`= ?,`role`= ? WHERE id = ?', [name, password, office, role, id], (error, result) =>{
    if(error){
      console.log(error)
    } else {
      res.send(result)
    }
  })
})


module.exports = router