const express = require('express')
const config = require('../config/db');
const router = express.Router()
const bodyParser = require('body-parser');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// connection
let conn = config.connection



const reqOne = (req, res, next)=>{
    const questionOne = req.body.ansOne;

    conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 1",
    questionOne,
    (error, result)=>{
        if(result.length > 0){
            next();
        }else {
            res.status(400).send("Invalid answers");
        }
    });
}

const reqTwo = (req, res, next)=>{
    const questionTwo = req.body.ansTwo;

    conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 2",
    questionTwo,
    (error, result)=>{
        if(result.length > 0){
            next();
        }else {
            res.status(400).send("Invalid answers");
        }
    });
}

const reqThree = (req, res, next)=>{
    const questionThree = req.body.ansThree;

    conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 3",
    questionThree,
    (error, result)=>{
        if(result.length > 0){
            next();
        }else {
            res.status(400).send("Invalid answers");
        }
    });
}

const reqFour = (req, res, next)=>{
    const questionFour = req.body.ansFour;

    conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 4",
    questionFour,
    (error, result)=>{
        if(result.length > 0){
            next();
        }else {
            res.status(400).send("Invalid answers");
        }
    });
}

const reqFive = (req, res, next)=>{
    const questionFive = req.body.ansFive;

    conn.query("SELECT `answer` FROM `questions` WHERE answer = ? AND id = 5",
    questionFive,
    (error, result)=>{
        if(result.length > 0){
            next();
        }else {
            res.status(400).send("Invalid answers");
        }
    });
}



//* Answer security questions
router.post('/answer', reqOne, reqTwo, reqThree, reqFour, reqFive, (req, res)=>{
    
    res.status(200).send();

})

//* Reset password
router.post('/reset',(req,res)=>{
    const pwd = req.body.pwd;

    bcrypt.hash(pwd, saltRounds, (error,hash)=>{
        conn.query("UPDATE `users` SET `password`= ? WHERE role = 'admin'", 
        hash, 
        (error, result)=>{
            if(result){
                res.status(200).send();
            }else {
                res.send(error);
            }
        });
    })

})

//*  functions for updating answers in security questions

const answerOne = (req, res, next)=>{
    const qtnOne = req.body.qtnOne;

    if(qtnOne !== ""){
        conn.query("UPDATE `questions` SET `answer`= ? WHERE id = 1", 
        qtnOne,
        (error, result)=>{
            if(result){
                next();
            } 
            if(error){
                res.status(400).send();
            }
        })
    } else {
        next();
    }
}

const answerTwo = (req, res, next)=>{
    const qtnTwo = req.body.qtnTwo;

    if(qtnTwo !== ""){
        conn.query("UPDATE `questions` SET `answer`= ? WHERE id = 2", 
        qtnTwo,
        (error, result)=>{
            if(result){
                next();
            } 
            if(error){
                res.status(400).send();
            }
        })
    } else {
        next();
    }
}

const answerThree = (req, res, next)=>{
    const qtnThree = req.body.qtnThree;

    if(qtnThree !== ""){
        conn.query("UPDATE `questions` SET `answer`= ? WHERE id = 3", 
        qtnThree,
        (error, result)=>{
            if(result){
                next();
            } 
            if(error){
                res.status(400).send();
            }
        })
    } else {
        next();
    }
}

const answerFour = (req, res, next)=>{
    const qtnFour = req.body.qtnFour;

    if(qtnFour !== ""){
        conn.query("UPDATE `questions` SET `answer`= ? WHERE id = 4", 
        qtnFour,
        (error, result)=>{
            if(result){
                next();
            } 
            if(error){
                res.status(400).send();
            }
        })
    } else {
        next();
    }
}

const answerFive = (req, res, next)=>{
    const qtnFive = req.body.qtnFive;

    if(qtnFive !== ""){
        conn.query("UPDATE `questions` SET `answer`= ? WHERE id = 5", 
        qtnFive,
        (error, result)=>{
            if(result){
                next();
            } 
            if(error){
                res.status(400).send();
            }
        })
    } else {
        next();
    }
}


//* Update security question's answers

router.put('/update', answerOne, answerTwo, answerThree, answerFour, answerFive, (req, res)=>{

    res.status(200).send({message: "Changes saved"})

})


module.exports = router