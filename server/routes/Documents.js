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
//

// Get all document
router.get('/', async (req, res) => {
    // const docName = req.body.name
    // const description = req.body.description
    // const office = req.body.office

    conn.query("SELECT d.id, u.name, dt.name, d.description, d.datetime, c.office_name currentOffice, de.office_name destinationOffice, d.remarks, d.action, d.status FROM documents d INNER JOIN doctypes dt ON d.doctype_id = dt.id INNER JOIN offices c ON d.current_office = c.id INNER JOIN offices de ON d.destination_office = de.id INNER JOIN users u ON d.user_id = u.id ORDER BY d.id", 
    (error, result) => {
        if(result) {
            res.status(200).send(result)
        }
        if(error) {
            res.send(error)
        }
    })
})

// Get document types

router.get('/type', async (req, res) => {

    conn.query("SELECT * FROM `doctypes`", 
    (error, result) => {
        if(result) {
            res.status(200).json(result)
        }
        if(error) {
            res.status(400).send(error)
        }
    })
})



// Add Document
router.post('/add-document', async (req, res) => {

    const userId = req.body.userId
    const docType = req.body.docType
    const description = req.body.description
    const currentOffice = req.body.currentOffice
    const destOffice = req.body.destOffice
    const remark = req.body.remarks

    conn.query("INSERT INTO `documents`(`user_id`, `doctype_id`, `description`, `current_office`, `destination_office`, `remarks`) VALUES (?,?,?,?,?,?)",
    [userId, docType, description, currentOffice, destOffice, remark],
    (error, result) => {
        if(result) {
            res.status(200).send({message: "Added Document"})
        }

        if(error) {
            console.log(error)
        }
    })

})









module.exports = router