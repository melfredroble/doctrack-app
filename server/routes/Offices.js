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

// Protecting routes from unauthorized users
const requireAuth = (req, res, next) => {
    const userSession = req.session.user
    const sessionId = req.session.id
    if(!userSession){
        res.send("Unauthorized")
    } else {
        conn.query("SELECT * FROM `sessiontbl` WHERE session_id = ?", 
        sessionId,
        (err, result)=>{
            if(result.length > 0){
                next()
            }
            if(err){
                res.send(err)
            }
        })
    }
}


// GET OFFICES LIST
router.get('/', requireAuth, (req, res) => {
    conn.query("SELECT  * FROM `offices`", 
    (error, result) => {
        if(result) {
            res.status(201).json(result)
        } else {
            res.status(401).json(error)
        }
    })
})

// Get Office
router.get('/:id', requireAuth,(req, res) => {
    const id = req.params.id
    conn.query("SELECT * FROM `offices` WHERE id = ?",
    id , 
    (error, result) => {
        if(result) {
            res.json(result)
        }
        if(error) {
            res.json(error.message)
        }
    })
})


// Add office

router.post('/add', requireAuth, (req, res) => {
        const office = req.body.office

        conn.query("SELECT  * FROM `offices` WHERE office_name = ?",
        office,
        (error, result)=>{
            if(error) {
                res.status(401).json(error)
            } 
            if(result.length > 0){
                res.json({ message: "Office already exist!", status: "failed" })
            } else {
                conn.query("INSERT INTO `offices`(`office_name`) VALUES (?)",
                office,
                (error, result)=>{
                    if(result) {
                        res.json({ message: "Office added succesfully!", status: "success" })
                    } 
                    if(error) {
                        res.status(401).json(error)
                    }
                })
            }
        })
})

// Update office

router.put('/', requireAuth, (req, res) => {
    const id = req.body.id
    const office = req.body.office
    conn.query('UPDATE `offices` SET `office_name` = ? WHERE id = ?', [office, id], (error, result) => {
        if (error) {
            res.json(error)
        } 
        if(result){
            res.json({updated: true, message: "User updated"})
        }
    })
})

// Delete document type
router.delete('/delete/:id', requireAuth, (req, res) => {
    const id = req.params.id
    conn.query('DELETE FROM `offices` WHERE id = ?', id, (error, result) => {
    if (error) {
        res.status(401).json(error)
    } 
    if(result) {
        res.status(201).json({ deleted: true })
    }
    })
})


module.exports = router

