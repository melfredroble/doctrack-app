const express = require("express");
const config = require("../config/db");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;

// connection
let conn = config.connection;

// Protecting routes from unauthorized users
const requireAuth = (req, res, next) => {
  const userSession = req.session.user;
  const sessionId = req.session.id;
  if (!userSession) {
    res.send("Unauthorized");
  } else {
    conn.query(
      "SELECT * FROM `sessiontbl` WHERE session_id = ?",
      sessionId,
      (err, result) => {
        if (result.length > 0) {
          next();
        }
        if (err) {
          res.send(err);
        }
      }
    );
  }
};

router.get("/trackingId", requireAuth, (req, res) => {
  const sql =
    "SELECT FLOOR(RAND() * 99999) AS random_num FROM documents WHERE 'random_num' NOT IN (SELECT tracking_id FROM documents) LIMIT 1";
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth() + 1;
  const currDay = date.getDate();
  const currMins = date.getMinutes();
  const currHours = date.getHours();
  var seconds = date.getSeconds();
  var milliSeconds = date.getMilliseconds();
  conn.query(sql, (error, result) => {
    if (result) {
      const randomNum = result[0].random_num;
      conn.query(
        "select id from documents order by id desc limit 1",
        (error, row) => {
          const lastId = row[0].id + 2;
          if (row) {
            res.json({
              trackingId:
                currYear + "-" + randomNum + "-" + currMonth + currDay  + "-" + currMins + milliSeconds,
            });
          }
        }
      );
    }
  });
});

// Get document types

router.get("/types", requireAuth, (req, res) => {
  conn.query("SELECT * FROM `doctypes`", (error, result) => {
    if (result) {
      res.json(result);
    }
    if (error) {
      res.json(error.message);
    }
  });
});

// Get document types

router.get("/type/:id", requireAuth, (req, res) => {
  const id = req.params.id;
  conn.query("SELECT * FROM `doctypes` WHERE id = ?", id, (error, result) => {
    if (result) {
      res.json(result);
    }
    if (error) {
      res.json(error.message);
    }
  });
});

// Add document type
router.post("/addDocType", requireAuth, (req, res) => {
  const doctype = req.body.doctype;

  conn.query(
    "INSERT INTO `doctypes`(`name`) VALUES (?)",
    doctype,
    (error, result) => {
      if (result) {
        res.send({ message: "Added succesfully!", status: "success" });
      }
      if (error) {
        res.status(401).json(error.message);
      }
    }
  );
});

// Delete document type
router.delete("/delete/:id", requireAuth, (req, res) => {
  const id = req.params.id;
  conn.query("DELETE FROM `doctypes` WHERE id = ?", id, (error, result) => {
    if (error) {
      res.status(401).json(error);
    } else {
      res
        .status(201)
        .json({ deleted: true, message: "User successfully deleted!" });
    }
  });
});

// Update Document Type
router.put("/type/update", requireAuth, (req, res) => {
  const id = req.body.id;
  const doctype = req.body.doctype;
  conn.query(
    "UPDATE `doctypes` SET `name` = ? WHERE id = ?",
    [doctype, id],
    (error, result) => {
      if (error) {
        res.json(error);
      }
      if (result) {
        res.json({ updated: true, message: "User updated" });
      }
    }
  );
});

// Get all document
// router.get("/", requireAuth, (req, res) => {
//   conn.query(
//     "SELECT d.id, u.name userFullName, dt.name documentName, d.description, d.datetime, c.office_name currentOffice, de.office_name destinationOffice, d.remarks, d.action, d.status FROM documents d INNER JOIN doctypes dt ON d.doctype_id = dt.id INNER JOIN offices c ON d.current_office = c.id INNER JOIN offices de ON d.destination_office = de.id INNER JOIN users u ON d.user_id = u.id ORDER BY d.id",
//     (error, result) => {
//       if (result) {
//         res.status(201).json(result);
//       }
//       if (error) {
//         res.send(error);
//       }
//     }
//   );
// });

// Get documents of a certain user
router.get("/:id", requireAuth, (req, res) => {
  const userId = req.params.id;

  conn.query(
    "SELECT d.id, d.tracking_id, u.name, d.owner, d.doctype, d.datetime_created, d.originating_office, d.remarks, d.status FROM documents d INNER JOIN users u ON d.sender_id = u.id WHERE d.sender_id = ? ORDER BY d.id DESC",
    userId,
    (error, result) => {
      if (result) {
        res.json(result);
      }
      if (error) {
        res.json(error);
      }
    }
  );
});

// View document
router.get("/view/:id", requireAuth, (req, res) => {
  const docId = req.params.id;

  conn.query(
    "SELECT d.id, d.tracking_id, u.name, d.owner, d.doctype, d.remarks, d.datetime_created, d.originating_office, d.status FROM documents d LEFT JOIN users u ON d.sender_id = u.id WHERE d.id = ?",
    docId,
    (error, result) => {
      if (result) {
        res.json(result);
      } else {
        res.json(error);
        console.log(error)
      }
    }
  );
});

// View outgoing document
router.get("/viewOutgoing/:id", requireAuth, (req, res) => {
  const docId = req.params.id;

  conn.query(
    "SELECT d.id, d.tracking_id, u.name, d.owner, d.doctype, d.remarks, d.datetime_created, d.originating_office, d.status FROM documents d LEFT JOIN users u ON d.sender_id = u.id LEFT JOIN transactions t ON d.id = t.document_id WHERE t.id = ?",
    docId,
    (error, result) => {
      if (result) {
        res.json(result);
      } else {
        res.json(error);
        console.log(error)
      }
    }
  );
});

// Adding new documents.
router.post("/addDoc", (req, res, next) => {
  let data = req.body;
  let {
    trackingId,
    sender,
    owner,
    doctype,
    remarks,
    origOffice
  } = data;

  conn.query(
    "SELECT tracking_id FROM documents WHERE tracking_id = ?",
    trackingId,
    (error, result) => {
      if (error) {
        res.json(error);
      }
      if (result.length > 0) {
        res.status(400).send();
      } else {
        let query =
          "INSERT INTO `documents`(`tracking_id`, `sender_id`, `owner`, `doctype`, `remarks`, `originating_office`) VALUES (?,?,?,?,?,?)";

        conn.query(
          query,
          [
            trackingId,
            sender,
            owner,
            doctype,
            remarks,
            origOffice,
          ],
          (error, result) => {
            if (result) {
              res.status(200).send();
            } else {
              res.json(error);
            }
          }
        );
      }
    }
  );
});

// Track Document

router.post("/trackDoc", (req, res) => {
  const trackingId = req.body.trackingId;
  const sql = "SELECT * FROM `documents` WHERE tracking_id = ?";
  conn.query(sql, [trackingId], (error, result) => {
    const datetime =
      "select datetime_created('%Y %D %M %H:%i:%s') from documents";

    if (error) {
      res.json(error);
    }
    if (result) {
      res.json(result);
    }
  });
});

// Getting outgoing documents.
// router.post("/outGoingDoc", (req, res, next) => {
//   let id = req.body.id;
//   let query = `SELECT id, doctype, destination_office, status FROM documents WHERE
//   sender_id = ? AND status LIKE '%pending%'`;

//   conn.query(query, [id], (err, rows, fields) => {
//     if (err) res.json("0");
//     else res.json(rows);
//   });
// });

// Getting outgoing documents.
router.get("/outGoingDoc/:id", (req, res) => {
  const docId = req.params.id;

  conn.query(
    "SELECT * FROM documents d LEFT JOIN transactions t ON d.id = t.document_id WHERE d.sender_id = ? AND t.new_status LIKE '%pending%' ORDER BY d.id DESC;",
    docId,
    (error, result) => {
      if (result) {
        res.json(result);
      }
      if (error) {
        res.json(error);
      }
    }
  );
});


// Getting incoming documents.
router.get("/incomingDoc/:id", (req, res) => {
  const officeId = req.params.id;

  conn.query(
    "SELECT *, t.id transacId FROM transactions t LEFT JOIN documents d ON t.document_id = d.id WHERE t.destination = ? AND t.office <> ? ORDER BY t.id DESC;",
    [officeId, officeId],
    (error, result) => {
      if (result) {
        res.json(result);
      }
      if (error) {
        res.json(error);
      }
    }
  );
});

// INSERT INTO `transactions`(`document_id`, `datetime`, `current_office`, `received_by`) VALUES (43, '2022-11-14 00:14:52', 2, 2);

// Getting Received Documents
router.get("/receivedDoc/:id", (req, res) => {
  const officeId = req.params.id;

  conn.query(
    "SELECT *, t.id transacId FROM transactions t LEFT JOIN documents d ON t.document_id = d.id WHERE t.destination = ? AND t.received_by = ? ORDER BY t.id DESC;",
    [officeId, officeId],
    (error, result) => {
      if (result) {
        res.json(result);
      }
      if (error) {
        res.json(error);
      }
    }
  );
});

// Receiving documents.
router.put("/receiveDoc", (req, res) => {
  const data = req.body;

  let {
    received,
    transacId
  } = data;

  conn.query(
    "UPDATE `transactions` SET `received_by`= ? WHERE id = ?",
    [received, transacId],
    (error, result) => {
      if (result) {
        res.status(200).send();
      } else {
        res.json(error);
      }
    }
  );
});

// Releasing Document
router.post("/releaseMyDoc", (req, res) => {
  const data = req.body;

  let {
    docId,
    action,
    destOffice,
    releasedFrom
  } = data;

  conn.query(
    "INSERT INTO `transactions`(`document_id`, `actions`, `destination`, `office`) VALUES (?, ?, ?, ?)",
    [docId, action, destOffice, releasedFrom],
    (error, result) => {
      if (result) {
        res.status(200).send();
      } else {
        res.json(error);
      }
    }
  );
});


// Get transactions of a certain document
router.get('/transactions/:id', (req, res)=>{
  const docId = req.params.id;

  conn.query('SELECT t.id, t.document_id, d.tracking_id, d.doctype, t.new_remarks, t.actions, (SELECT office_name FROM offices WHERE id = t.office) office, t.datetime FROM transactions t LEFT JOIN documents d ON d.id = t.document_id WHERE t.document_id = ?',
  [docId],
  (error, result)=>{
    if(result) {
      res.json(result);
    } else {
      res.json(error);
    }
  })
});




// Add Document
// router.post('/add-document', (req, res) => {

//     const userId = req.body.userId
//     const docType = req.body.docType
//     const description = req.body.description
//     const currentOffice = req.body.currentOffice
//     const destOffice = req.body.destOffice
//     const remark = req.body.remarks

//     conn.query("INSERT INTO `documents`(`user_id`, `doctype_id`, `description`, `current_office`, `destination_office`, `remarks`) VALUES (?,?,?,?,?,?)",
//     [userId, docType, description, currentOffice, destOffice, remark],
//     (error, result) => {
//         if(result) {
//             res.status(201).json({message: "Added Document"})
//         }

//         if(error) {
//             res.status(401).send(error)
//         }
//     })

// })

// // Incoming documents
// router.get('/incoming/:id', (req, res) => {
//     const office_id = req.params.id

//     conn.query("SELECT d.user_id, u.name, dt.name doctype, d.description, d.datetime, o.office_name OriginatingOffice, d.remarks, d.action FROM documents d LEFT JOIN users u ON d.user_id = u.id LEFT JOIN offices o ON u.office_id = o.id LEFT JOIN doctypes dt ON d.doctype_id = dt.id WHERE d.destination_office = ?",
//     office_id,
//     (error, result) => {
//         if(result) {
//             res.status(201).json(result)
//         }
//         if(error) {
//             res.send(error)
//         }
//     })

// })

// // Outgoing documents
// router.get('/outgoing/:id', (req, res) => {
//     const user_id = req.params.id

//     conn.query("SELECT d.id, d.user_id, dt.name documentName, d.description, d.datetime, c.office_name currentOffice, de.office_name destinationOffice, d.remarks, d.action, d.status FROM documents d INNER JOIN doctypes dt ON d.doctype_id = dt.id INNER JOIN offices c ON d.current_office = c.id INNER JOIN offices de ON d.destination_office = de.id INNER JOIN users u ON d.user_id = u.id WHERE d.user_id = ? ORDER BY d.id DESC",
//     user_id,
//     (error, result) => {
//         if(result) {
//             res.status(201).json(result)
//         }else {
//             res.status(401).json(error.message)
//         }
//     })
// })

// // Fetch received doc
// router.get('/received_doc/:id', (req,res) => {
//     const office_id = req.params.id
//     conn.query("SELECT r.id, dt.name doctype, u.name sender, d.description, o.office_name OriginatingOffice, r.received_at, d.remarks latestRemarks, d.action latestAction, d.status FROM received_doc r LEFT JOIN documents d ON r.document_id = d.id LEFT JOIN users u ON d.user_id = u.id LEFT JOIN offices o ON r.received_by = o.id LEFT JOIN doctypes dt ON d.doctype_id = dt.id WHERE received_by = ? ORDER BY r.id DESC",
//     office_id,
//     (error, result)=>{
//         if(result){
//             res.status(201).json(result)
//         } else {
//             res.status(401).json(error.message)
//         }
//     })
// })

module.exports = router;
