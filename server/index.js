const express = require("express");
const app = express();
const cors = require("cors");
// const bodyparser = require("body-parser");
// const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 4800;
const authRoutes = require('./controllers/user.controllers')

app.use(cors());
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({limit:"100mb", extended: true }));
// app.use(bodyparser.json());
// app.use(
//   bodyparser.urlencoded({
//     extended: true,
//   })
// );
// app.use(morgan("dev"));

// app.get("/", async (req, res) => {
//   await res.status(201).json({
//     message: "welcome to server",
//   });
// });



app.use("", authRoutes);

app.listen(PORT, () =>
  console.log(`your application is running on http://localhost:${PORT}`)
);