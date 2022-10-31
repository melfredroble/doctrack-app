const express = require("express");
const config = require("../config/db");
const router = express.Router();
const bodyParser = require("body-parser");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { encrypt, decrypt } = require("../controllers/encryption");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// connection
let conn = config.connection;

//* Reset password
router.put("/reset", (req, res) => {
  const pwd = req.body.password;

  bcrypt.hash(pwd, saltRounds, (error, hash) => {
    if (error) {
      res.status(400).json(error);
    } else {
      conn.query(
        "UPDATE `users` SET `password`= ? WHERE role = 'admin'",
        hash,
        (error, result) => {
          if (result) {
            res.status(200).send(result);
          }
          if (error) {
            res.send(error);
          }
        }
      );
    }
  });
});

const decrpytedData = (result, num) => {
  let res = result[num].answer;
  let data = res.substr(0, 32);
  let iv = res.split("_").pop();
  let hash = { encryptedData: data, iv: iv };
  let decrpytedAnswer = decrypt(hash);

  return decrpytedAnswer;
};

const reqOne = (req, res, next) => {
  const questionOne = req.body.ansOne;

  conn.query(
    "SELECT `answer` FROM `questions` WHERE id = 1",
    (error, result) => {
      const decrpytedAnswer = decrpytedData(result, 0);
      if (result.length > 0) {
        if (decrpytedAnswer !== questionOne) {
          res.status(400).send("Invalid answers");
        } else {
          next();
        }
      } else {
        res.status(400).send("Invalid answers");
      }
    }
  );
};

const reqTwo = (req, res, next) => {
  const questionTwo = req.body.ansTwo;

  conn.query(
    "SELECT `answer` FROM `questions` WHERE id = 2",
    (error, result) => {
      const decrpytedAnswer = decrpytedData(result, 0);
      if (result.length > 0) {
        if (decrpytedAnswer !== questionTwo) {
          res.status(400).send("Invalid answers");
        } else {
          next();
        }
      } else {
        res.status(400).send("Invalid answers");
      }
    }
  );
};

const reqThree = (req, res, next) => {
  const questionThree = req.body.ansThree;

  conn.query(
    "SELECT `answer` FROM `questions` WHERE id = 3",
    (error, result) => {
      const decrpytedAnswer = decrpytedData(result, 0);
      if (result.length > 0) {
        if (decrpytedAnswer !== questionThree) {
          res.status(400).send("Invalid answers");
        } else {
          next();
        }
      } else {
        res.status(400).send("Invalid answers");
      }
    }
  );
};

const reqFour = (req, res, next) => {
  const questionFour = req.body.ansFour;

  conn.query(
    "SELECT `answer` FROM `questions` WHERE id = 4",
    (error, result) => {
      const decrpytedAnswer = decrpytedData(result, 0);
      if (result.length > 0) {
        if (decrpytedAnswer !== questionFour) {
          res.status(400).send("Invalid answers");
        } else {
          next();
        }
      } else {
        res.status(400).send("Invalid answers");
      }
    }
  );
};

const reqFive = (req, res, next) => {
  const questionFive = req.body.ansFive;

  conn.query(
    "SELECT `answer` FROM `questions` WHERE id = 5",
    (error, result) => {
      const decrpytedAnswer = decrpytedData(result, 0);
      if (result.length > 0) {
        if (decrpytedAnswer !== questionFive) {
          res.status(400).send("Invalid answers");
        } else {
          next();
        }
      } else {
        res.status(400).send("Invalid answers");
      }
    }
  );
};

//* Answer security questions
router.post(
  "/answer",
  reqOne,
  reqTwo,
  reqThree,
  reqFour,
  reqFive,
  (req, res) => {
    res.status(200).send();
  }
);

//*  functions for updating answers in security questions

const answerOne = (req, res, next) => {
  const qtnOne = req.body.qtnOne;
  const hash = encrypt(Buffer.from(qtnOne, "utf8"));
  const hashedData = hash.encryptedData + "_" + hash.iv;

  if (qtnOne !== "") {
    conn.query(
      "UPDATE `questions` SET `answer`= ? WHERE id = 1",
      hashedData,
      (error, result) => {
        if (result) {
          next();
        }
        if (error) {
          res.status(400).json(error);
        }
      }
    );
  } else {
    next();
  }
};

const answerTwo = (req, res, next) => {
  const qtnTwo = req.body.qtnTwo;
  const hash = encrypt(Buffer.from(qtnTwo, "utf8"));
  const hashedData = hash.encryptedData + "_" + hash.iv;

  if (qtnTwo !== "") {
    conn.query(
      "UPDATE `questions` SET `answer`= ? WHERE id = 2",
      hashedData,
      (error, result) => {
        if (result) {
          next();
        }
        if (error) {
          res.status(400).send();
        }
      }
    );
  } else {
    next();
  }
};

const answerThree = (req, res, next) => {
  const qtnThree = req.body.qtnThree;
  const hash = encrypt(Buffer.from(qtnThree, "utf8"));
  const hashedData = hash.encryptedData + "_" + hash.iv;

  if (qtnThree !== "") {
    conn.query(
      "UPDATE `questions` SET `answer`= ? WHERE id = 3",
      hashedData,
      (error, result) => {
        if (result) {
          next();
        }
        if (error) {
          res.status(400).send();
        }
      }
    );
  } else {
    next();
  }
};

const answerFour = (req, res, next) => {
  const qtnFour = req.body.qtnFour;
  const hash = encrypt(Buffer.from(qtnFour, "utf8"));
  const hashedData = hash.encryptedData + "_" + hash.iv;

  if (qtnFour !== "") {
    conn.query(
      "UPDATE `questions` SET `answer`= ? WHERE id = 4",
      hashedData,
      (error, result) => {
        if (result) {
          next();
        }
        if (error) {
          res.status(400).send();
        }
      }
    );
  } else {
    next();
  }
};

const answerFive = (req, res, next) => {
  const qtnFive = req.body.qtnFive;
  const hash = encrypt(Buffer.from(qtnFive, "utf8"));
  const hashedData = hash.encryptedData + "_" + hash.iv;

  if (qtnFive !== "") {
    conn.query(
      "UPDATE `questions` SET `answer`= ? WHERE id = 5",
      hashedData,
      (error, result) => {
        if (result) {
          next();
        }
        if (error) {
          res.status(400).send();
        }
      }
    );
  } else {
    next();
  }
};

//* Update security question's answers

router.put(
  "/update",
  answerOne,
  answerTwo,
  answerThree,
  answerFour,
  answerFive,
  (req, res) => {
    res.status(200).send({ message: "Changes saved" });
  }
);

router.get("/answers-list", (req, res) => {
  conn.query("SELECT `answer` FROM questions", (error, result) => {
    if (result) {
      const decrpytedAnswerOne = decrpytedData(result, 0);
      const decrpytedAnswerTwo = decrpytedData(result, 1);
      const decrpytedAnswerThree = decrpytedData(result, 2);
      const decrpytedAnswerFour = decrpytedData(result, 3);
      const decrpytedAnswerFive = decrpytedData(result, 4);
      const answers = {
        decrpytedAnswerOne,
        decrpytedAnswerTwo,
        decrpytedAnswerThree,
        decrpytedAnswerFour,
        decrpytedAnswerFive,
      };

      res.json(answers);
    }
    if (error) {
      res.json(error);
    }
  });
});

module.exports = router;
