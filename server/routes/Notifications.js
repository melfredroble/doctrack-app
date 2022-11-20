const express = require("express");
const config = require("../config/db");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// connection
let conn = config.connection;


router.get('/unread/:id', (req,res)=>{
    const user_id = req.params;

    conn.query("SELECT COUNT(*) AS unread_notif FROM `notifications` WHERE user_id = ? AND is_read = 0", 
    [user_id],
    (error, result)=>{
        if(result.length > 0){
            res.send(result[0].length);
        } else {
            res.send(error);
        }
    })
})

router.get('/all/:id', (req, res)=>{
    const user_id = req.params;

    conn.query("SELECT * FROM `notifications` WHERE user_id = ? ORDER BY is_read ASC", 
    [user_id],
    (error, result)=>{
        if(result.length > 0){
            res.send(result[0].length);
        } else {
            res.send(error);
        }
    })
})

// Mark notification as read
router.put('/read', (req, res)=>{
    let data = req.body;
    let { id, user_id } = data;

    conn.query("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?",
    (error, result)=>{
        if(result.length > 0){
            res.send(result[0].length);
        } else {
            res.send(error);
        }
    })
})

router.post('/add-notification', (req, res)=>{
    let data = req.body;
    let {user_id, message} = data;

    conn.query("INSERT INTO notifications (`user_id`, `message`, `is_read`) VALUES(?, ?, ?", 
    [user_id, message],
    (error, result)=>{
        if(result.length > 0){
            res.send(result[0].length);
        } else {
            res.send(error);
        }
    });
})


module.exports = router;