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


// Get all document
router.get('/', async (req, res) => {
    // const docName = req.body.name
    // const description = req.body.description
    // const office = req.body.offices

    conn.query("SELECT  * FROM `offices`", 
    (error, result) => {
        if(result) {
            res.status(200).json(result)
        }
        if(error) {
            res.send(error)
            res.status(400)
        }
    })
})








module.exports = router

