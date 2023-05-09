const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const db = require("../database");
const pool = db();
// const cron = require('node-cron');
const schedule = require("node-schedule")
// router.put("/user/:id", async (req, res) => {
//   const ids = req.params.id;
//   const { username, contact, address, city } = req.body;
//   console.log('req.body',req.body,ids)

//   await pool.getConnection((err, connection) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Fail to connect",
//       });
//     }
//     connection.query(
//       "UPDATE user SET username=?, contact=? , address=?, city=? WHERE id = ?",
//       [username, contact, address, city, ids],
//       (error, response) => {
//         if (error) {
//           return res.status(500).json({
//             message: "error in fetching data",
//           });
//         } else {
//           return res.status(201).json({
//             message: "success",
//             data: response,
//           });
//         }
//       }
//     );
//   });
// });

// router.delete("/user/:id", async (req, res) => {
//   const ids = req.params.id;
//   await pool.getConnection((err, connection) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Fail to connect",
//       });
//     }
//     connection.query(
//       "DELETE FROM user WHERE id = ?",
//       [ids],
//       (error, response) => {
//         if (error) {
//           return res.status(500).json({
//             message: "error in fetching data",
//           });
//         } else {
//           return res.status(201).json({
//             message: "success",
//             data: response,
//           });
//         }
//       }
//     );
//   });
// });

router.post("/signup", async (req, res) => {
  const data = req.body.user;
 const { Name, email, password } = data;
 if (
    !data ||
    !data.Name ||
    !data.email ||
    !data.password ||
    !data.repassword
  ) {
    // console.log(data.Name, data.email, data.password, data.repassword);
    return res.status(500).send({ message: "Not provided required details" });
  }

  await pool.getConnection((err, connection) => {
    if (err) return res.status(500).json(err);
    if (res.length) return res.status(409).json("User already exists!");

    bcrypt.hash(password, saltRounds).then((hash) => {
      connection.query(
        "INSERT INTO signup(name, email, password,role) VALUES(?,?,?,?)",
        [Name, email, hash,"user"],
        (error, response) => {
          connection.release();
          // console.log("error, responsesignup", error, response);
          if (error) {
            return res.status(500).json({
              message: "error in posting data",
            });
          } else {
            return res.status(201).json({
              message: "success",
              data: response,
            });
          }
        }
      );
    });
  });
});

router.post("/login", async (req, res) => {
  // console.log("req", req.body);
  const { email } = req.body.log;
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to connect",
      });
    }
    connection.query(
      "SELECT * FROM signup WHERE email = ?",
      [email],
      (error, response) => {
        connection.release();
      if (error) {
          return res.status(500).json({
            message: "error in posting data",
          });
        } else {
          if (response.length === 0) {
            return res.status(404).json({
              message: "User not found!",
            });
          } else {
     
            const token = jwt.sign(
              { id: response[0].id, email: response[0].email },
              "jwtkey"
            );
            // console.log("token", token);
            return res.status(201).json({
              message: "success",
              data: response,
              token: token,
            });
          }
        }
      }
    );
  });
});

 
router.post("/assishift/:id", async (req, res) => {
    // const id = req.params.id;
    // console.log("ID", id);
// console.log("body12345", req.body);
  const data = req.body.assig;
  const {shiftid,user} = data;
  // console.log("data", data);

  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to connect",
      });
    }
   
    connection.query(
      "INSERT INTO assingshift(shiftid,user) VALUES(?,?)",
      [shiftid,user],
      (error, response) => {
        //  console.log("error", "response", error, response);
       connection.release();
        if (error) {
          return res.status(500).json({
            message: "error in posting data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});


router.get("/assishiftuser", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    // connection.query("SELECT * FROM assingshift  ", (error, response) => {
    connection.query(
      "SELECT * FROM assingshift INNER JOIN shift ON `shift`.`id`= `assingshift`.`shiftid`",
      (error, response) => {
       connection.release();
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});


router.get("/assishiftuser/:id", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    // connection.query("SELECT * FROM assingshift  ", (error, response) => {
    connection.query(
      "SELECT `shift`.* FROM `shift` JOIN `assingshift` ON `assingshift`.`shiftid` = `shift`.`id` WHERE `assingshift`.`user` = ?",[req.params.id],
      (error, response) => {
       connection.release();
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});


router.get("/shiftuser", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM signup", (error, response) => {
    connection.release();
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});


router.get("/shiftuser/:id", async (req, res) => {
  const ids = req.params.id;
 await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "SELECT * FROM signup WHERE id = ?",
         [ids],
      (error, response) => {
        connection.release();
       
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});


router.get("/getshift", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM shift", (error, response) => {
      connection.release();
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});




router.get("/user", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM attendance", (error, response) => {
      connection.release();
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});

router.get("/user/:id", async (req, res) => {
  const ids = req.params.id;
  // console.log("ids", ids);
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
  
    connection.query(
    
      `SELECT id,date, GROUP_CONCAT(punchin) as 'attendance' FROM attendance WHERE user_id=${ids} group by date`,
      
  
      [ids],
      (error, response) => {
        connection.release();
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  
  });
});

router.post("/punchatten/:id/:punchid", async (req, res) => {
  // const id = req;
  // console.log("body999999999", id);

  const user_id = req.params.id;
  console.log("user_id",user_id);
  const data = req.body;
  const punch_id = req.params.punchid
  console.log("punch_id",punch_id);
  const { punchin } = data;
  console.log("fgdhuuuuuj",data);
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to connect",
      });
    }
    const finddata = `SELECT * FROM attendance WHERE user_id=${user_id}`;
    connection.query(finddata, (error, response) => {
      // console.log("response sonali",response[0].id);
      const a = response[0].id;
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        connection.query(

          `UPDATE attendance SET punchin=?, user_id="${user_id}" WHERE id = "${punch_id}"`,
         // "INSERT INTO attendance(punchin, date, user_id) VALUES(?,?,?)",
          [JSON.stringify(punchin), user_id],
          (error, response) => {
            console.log("error","response5555555",error,response);
            connection.release();

            if (error) {
              return res.status(500).json({
                message: "error in posting data",
              });
            } else {
              return res.status(201).json({
                message: "success",
                data: response,
              });
            }
          }
        );
      }
    });
  });
});

router.post("/addproduct", async (req, res) => {
  const data = req.body.pro;
  const { category, price, size, uploadedfile, quantity } = data;
await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to connect",
      });
    }
    connection.query(
      "INSERT INTO product(category,price,size,uploadedfile,quantity) VALUES(?,?,?,?,?)",
      [category, price, size, uploadedfile, quantity],
      (error, response) => {
        connection.release();
        if (error) {
          return res.status(500).json({
            message: "error in posting data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.get("/product", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM product", (error, response) => {
      connection.release();
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});

router.get("/product/:id", async (req, res) => {
  const ids = req.params.id;
  // console.log("ids", ids);
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "SELECT * FROM product WHERE id = ?",
      [ids],
      (error, response) => {
        connection.release();

        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

// schedule.scheduleJob("*/5 * * * * *", async function() {
//   await pool.getConnection((err, connection) => {
//     if (err) {
//       console.log("err",err)
//     }
//     connection.query("SELECT * FROM signup", (error, response) => {
//       connection.release();
//       if (error) {
//        console.log("error",error);
//       } else {
//         console.log("respoonse", response);
//         response.map((i) => {
//           console.log("i",i.id);
//           connection.query(
//             "INSERT INTO attendance(punchin, date, user_id) VALUES(?,?,?)",["[]",new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}),i.id],(error1,response1)=>{
//               if(error1 ){
//                 console.log("error1",error1);
//               }
//               else if(response1){
//                 console.log("response1",response1)
//               }
//               else{
//                 console.log("do nothing");
//               }
//             }
//           )
//         })
//       }
//     });
//   });
// });


router.get("/holidays", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM holiday", (error, response) => {
      connection.release();
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});
module.exports = router;
