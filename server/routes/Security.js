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

// router.put('/update', requireAuth, (req,res)=>{
//     const questionOne = req.body.qtnOne;
//     const questionTwo = req.body.qtnTwo;
//     const questionThree = req.body.qtnThree;
//     const questionFour = req.body.qtnFour;
//     const questionFive = req.body.qtnFive;
//     const questionSix = req.body.qtnSix;

//     const hashedQtnOne = questionOne.toString()
//     const hashedQtnTwo = questionTwo.toString()
//     const hashedQtnThree = questionThree.toString()
//     const hashedQtnFour = questionFour.toString()
//     const hashedQtnFive = questionFive.toString()
//     const hashedQtnSix = questionSix.toString()

//     conn.query('UPDATE `questions` SET `id`=[value-1],`question`=[value-2],`answer`=[value-3] WHERE 1')
// })

// router.get('/', (req,res)=>{
//     conn.query('SELECT * FROM `questions`',
//     (error, result)=>{
//         if(error){
//             res.send(error)
//         }

//         if(result){
//             res.json(result)
//         }
//     })
// })

const validateAnswer = async (req, res, next) =>{
    const questionOne = req.body.ansOne;
    const questionTwo = req.body.ansTwo;
    const questionThree = req.body.ansThree;
    const questionFour = req.body.ansFour;
    const questionFive = req.body.ansFive;
    // const questionSix = req.body.qtnSix;

    let yey = false

    const req_one = conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 1",
    questionOne,
    (error, result)=>{
        if(result.length > 0){
            // res.json({qtnTwo: true})
            yey = true
        }else {
            return false
        }
    });

    const req_two = conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 2",
    questionTwo,
    (error, result)=>{
        if(result){
            // res.json({qtnTwo: true})
            return true
        }else {
            return false
        }
    });

    const req_three = conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 3",
    questionThree,
    (error, result)=>{
        if(result){
            // res.json({qtnTwo: true})
            return true
        }else {
            return false
        }
    });

    const req_four = conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 4",
    questionFour,
    (error, result)=>{
        if(result){
            return true
        }else {
            return false
        }
    });

    const req_five = conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 5",
    questionFive,
    (error, result)=>{
        if(result){
            return true
        } else {
            return false
        }
    });

    // const req_six = conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 2",
    // questionSix,
    // (error, result)=>{
    //     if(error){
    //         res.send(error)
    //     }
    //     if(result){
    //         return true
    //     }
    // });


    if(req_one){
        next()
    } else {
        req.session.validate = false
        res.json({validate: false})
    }

    
}


// Answer security questions
router.post('/answer', validateAnswer, (req,res)=>{
    req.session.validate = true
    res.status(201).json({validate: req.session.validate})
})

router.get('/', (req,res)=>{
    const {validate} = req.session

    if(validate) {
        res.json({isValidate: true})
    } else {
        res.json({isValidate: false})
    }
})


module.exports = router