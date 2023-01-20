const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// const db = require("./config/db");
const adminGet = require("./routes/adminGet.routes");
const adminLoginRoute = require("./routes/adminLogin.routes");
const adminRegRoute = require("./routes/adminReg.routes");
const UserLoginRoute = require("./routes/userLogin.routes");
const userRegRoute = require("./routes/userReg.routes");

const createMetting = require("./routes/createMetting.routes");
const getMetting = require("./routes/getMetting.routes");
const deleteMetting = require("./routes/deleteMetting.routes");
const bookedMetting = require("./routes/bookedMetting.routes");
const getBookedAllMetting = require("./routes/getBookedAllMetting.routes");
const getUserBookedMetting = require("./routes/getUserBookedMetting.routes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/server/getadmin", adminGet);
app.use("/server/adminLogin", adminLoginRoute);
app.use("/server/adminRegister", adminRegRoute);
app.use("/server/userLogin", UserLoginRoute);
app.use("/server/userRegister", userRegRoute);

app.use("/server/createmetting", createMetting);
app.use("/server/getmetting", getMetting);
app.use("/server/deletemetting", deleteMetting);
app.use("/server/bookedmetting", bookedMetting);
app.use("/server/getbookedallmetting", getBookedAllMetting);
app.use("/server/getuserbookedmetting", getUserBookedMetting);

app.use((req, res, next) => {
  res.status(404).send("Page not found");
  res.end();
});

app.use((err, req, res, next) => {
  res.status(500).send("Server error: " + err.message);
});

module.exports = app;
