const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const db = require("../database");

const pool = db();

// router.get("/user", async (req, res) => {
//   await pool.getConnection((err, connection) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Fail to connect",
//       });
//     }
//     connection.query("SELECT * FROM user", (error, response) => {
//       if (error) {
//         return res.status(500).json({
//           message: "error in fetching data",
//         });
//       } else {
//         return res.status(201).json({
//           message: "success",
//           data: response,
//         });
//       }
//     });
//   });
// });

// router.get("/user/:id", async (req, res) => {
//   const ids = req.params.id;
//   await pool.getConnection((err, connection) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Fail to connect",
//       });
//     }
//     connection.query(
//       "SELECT * FROM user WHERE id = ?",
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
  console.log("ghhhhhhhh", data);

  if (
    !data ||
    !data.Name ||
    !data.email ||
    !data.password ||
    !data.repassword
  ) {
    console.log(data.Name, data.email, data.password, data.repassword);
    return res.status(500).send({ message: "Not provided required details" });
  }

  await pool.getConnection((err, connection) => {
    if (err) return res.status(500).json(err);
    if (res.length) return res.status(409).json("User already exists!");

    bcrypt.hash(password, saltRounds).then((hash) => {
      connection.query(
        "INSERT INTO signup(name, email, password) VALUES(?,?,?)",
        [Name, email, hash],
        (error, response) => {
          connection.release();
          console.log("error, response", error, response);
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

router.get("/user", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM attendance", (error, response) => {
      // console.log("error", error);
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
  console.log("ids", ids);
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "SELECT * FROM attendance WHERE signup_user_id= ?",
      [ids],
      (error, response) => {
        connection.release();
        console.log("response", response);
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

router.post("/login", async (req, res) => {
  console.log("req", req.body);
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
        console.log("error", error);
        console.log("response", response);
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
            console.log("response", response);
            const token = jwt.sign(
              { id: response[0].id, email: response[0].email },
              "jwtkey"
            );
            console.log("token", token);
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

router.post("/punchatten", async (req, res) => {
  // console.log("body", req.body);
  const data = req.body.punchintime;
  console.log("data123", data.data);
  const { punchin, date, signup_user_id } = data;

  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to connect",
      });
    }
    const finddata = `SELECT * FROM attendance WHERE signup_user_id=${signup_user_id} AND date ="${date}" `;

    connection.query(finddata, (error, respons) => {
      // connection.release();
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        if (respons && respons.length > 0) {
          const updatedata = `UPDATE  attendance SET punchin='${JSON.stringify(
            punchin
          )}' WHERE signup_user_id=${signup_user_id} AND date ="${date}" `;

          connection.query(updatedata, (error, response) => {
            connection.release();

            if (error) {
              return res.status(500).json({
                message: "error in posting data",
              });
            } else {
              return res.status(201).json({
                message: "success",
                data: response.data,
              });
            }
          });
        } 
        else {
          connection.query(
            "INSERT INTO attendance(punchin, date, signup_user_id) VALUES(?,?,?)",
            [JSON.stringify(punchin), date, signup_user_id],
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
        }
      }
    });
    //     // yha s y code bnd hai
    //     // connection.query(
    //     //   "INSERT INTO attendance(punchin, punchout, date, signup_user_id) VALUES(?,?,?,?)",
    //     //   [punchin, punchout, date, signup_user_id],
    //     //   (error, response) => {
    //     //
    //     //     connection.release();
    //     //     console.log("hhhhhhhhhhhhhhh", error);
    //     //     console.log("hhhhhhhhhhhhhhh", response);
    //     //     if (error) {
    //     //       return res.status(500).json({
    //     //         message: "error in posting data",
    //     //       });
    //     //     } else {
    //     //       return res.status(201).json({
    //     //         message: "success",
    //     //         data: response,
    //     //       });
    //     //     }
    //     //   }
    //     // );
    //     // yha tk y code bnd hai
  });
});

// router.post("/outatten/:id", async (req, res) => {
//   const data = req.body.c;
//   const { id } = req.params;
//   const { punchout, date, signup_user_id } = data;
//   await pool.getConnection((err, connection) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Failed to connect",
//       });
//     }
//     connection.query(
//       "UPDATE  attendance SET punchout=? WHERE id = ?",
//       [punchout, id],
//       (error, response) => {
//         connection.release();
//         console.log("hhhhhhhhhhhhhhh", error);
//         if (error) {
//           return res.status(500).json({
//             message: "error in posting data",
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

router.post("/addproduct", async (req, res) => {
  const data = req.body.pro;
  const { category, price, size, uploadedfile, quantity } = data;
  console.log("data", data);

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
        console.log("hhhhhhhhhhhhhhh", response);
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
  console.log("ids", ids);
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
        // console.log("response",response);
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

module.exports = router;
