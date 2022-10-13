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

// Protecting routes to unauthorized users
const requireAuth = (req, res, next) => {
    const { user } = req.session;
    if (!user) {
        return res.status(401).send("Unathorized")
    }
    next()
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


module.exports = router

