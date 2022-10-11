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


// Get document types

router.get('/type', (req, res) => {

    conn.query("SELECT * FROM `doctypes`", 
    (error, result) => {
        if(result) {
            res.status(200).json(result)
        }
        if(error) {
            res.send(error)
        }
    })
})

// Get all document
router.get('/', (req, res) => {

    conn.query("SELECT d.id, u.name userFullName, dt.name documentName, d.description, d.datetime, c.office_name currentOffice, de.office_name destinationOffice, d.remarks, d.action, d.status FROM documents d INNER JOIN doctypes dt ON d.doctype_id = dt.id INNER JOIN offices c ON d.current_office = c.id INNER JOIN offices de ON d.destination_office = de.id INNER JOIN users u ON d.user_id = u.id ORDER BY d.id", 
    (error, result) => {
        if(result) {
            res.status(200).send(result)
        }
        if(error) {
            res.send(error)
        }
    })
})

// Get documents of a certain user
router.get('/:id', (req, res) => {
    const userId = req.params.id

    conn.query("SELECT d.id, u.name userFullName, dt.name documentName, d.description, d.datetime, c.office_name currentOffice, de.office_name destinationOffice, d.remarks, d.action, d.status FROM documents d INNER JOIN doctypes dt ON d.doctype_id = dt.id INNER JOIN offices c ON d.current_office = c.id INNER JOIN offices de ON d.destination_office = de.id INNER JOIN users u ON d.user_id = u.id WHERE user_id = ? ORDER BY d.id", 
    userId,
    (error, result) => {
        if(result) {
            res.status(200).send(result)
        }
        if(error) {
            res.send(error)
        }
    })
})






// Add Document
router.post('/add-document', (req, res) => {

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
            res.status(400).send(error)
        }
    })
 
})

// Incoming documents
router.get('/incoming/:id', (req, res) => {
    const office_id = req.params.id

    conn.query("SELECT d.user_id, u.name, dt.name doctype, d.description, d.datetime, o.office_name OriginatingOffice, d.remarks, d.action FROM documents d LEFT JOIN users u ON d.user_id = u.id LEFT JOIN offices o ON u.office_id = o.id LEFT JOIN doctypes dt ON d.doctype_id = dt.id WHERE d.destination_office = ?", 
    office_id,
    (error, result) => {
        if(result) {
            res.status(200).send(result)
        }
        if(error) {
            res.send(error)
        }
    })

})


// Outgoing documents
router.get('/outgoing/:id', (req, res) => {
    const user_id = req.params.id

    conn.query("SELECT d.id, d.user_id, dt.name documentName, d.description, d.datetime, c.office_name currentOffice, de.office_name destinationOffice, d.remarks, d.action, d.status FROM documents d INNER JOIN doctypes dt ON d.doctype_id = dt.id INNER JOIN offices c ON d.current_office = c.id INNER JOIN offices de ON d.destination_office = de.id INNER JOIN users u ON d.user_id = u.id WHERE d.user_id = ? ORDER BY d.id DESC", 
    user_id,
    (error, result) => {
        if(result) {
            res.status(201).json(result)
        }else {
            res.status(401).json(error.message)
        }
    })
})


// Fetch received doc
router.get('/received_doc/:id', (req,res) => {
    const office_id = req.params.id
    conn.query("SELECT r.id, dt.name doctype, u.name sender, d.description, o.office_name OriginatingOffice, r.received_at, d.remarks latestRemarks, d.action latestAction, d.status FROM received_doc r LEFT JOIN documents d ON r.document_id = d.id LEFT JOIN users u ON d.user_id = u.id LEFT JOIN offices o ON r.received_by = o.id LEFT JOIN doctypes dt ON d.doctype_id = dt.id WHERE received_by = ? ORDER BY r.id DESC",
    office_id,
    (error, result)=>{
        if(result){
            res.status(201).json(result)
        } else {
            res.status(401).json(error.message)
        }
    })
})








module.exports = router