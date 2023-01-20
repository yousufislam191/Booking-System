const jwt = require("jsonwebtoken");
const db = require("../config/config");
require("dotenv").config();

//get admin data
const getAdminData = (req, res) => {
  const getQuery = "SELECT * FROM admin_info";
  db.query(getQuery, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    } else {
      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json({ message: "admin not found in database" });
      }
    }
  });
};

//for admin login
const getAdmin = (req, res) => {
  const { email, password } = req.body;
  const getQuery = "SELECT * FROM admin_info  WHERE email=? AND password=? ";
  db.query(getQuery, [email, password], (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    } else {
      if (result.length > 0) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "72h",
        });
        return res
          .status(200)
          .json({
            message: "admin login successfully",
            token: token,
            result: result,
          });
      } else {
        return res.status(404).json({ message: "wrong email and password" });
      }
    }
  });
};

const createAdmin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "Please enter email and password" });
  else {
    const chechQuery = "SELECT * FROM `admin_info` WHERE email=?";
    const insertQuery = "INSERT INTO admin_info(email, password) VALUES (?,?)";

    db.query(chechQuery, [email], async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res
          .status(200)
          .json({ message: "email already has been registered" });
      } else {
        db.query(insertQuery, [email, password], async (err, result) => {
          if (err) throw err;
          return res.status(201).json({ message: "user created successfully" });
        });
      }
    });
  }
};

const updateAdmin = (req, res) => {
  const userid = req.params.id;
  const { email, password } = req.body;
  const updateQuery = "UPDATE admin_info SET email=?, password=? WHERE id=?";
  db.query(updateQuery, [email, password, userid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "admin id not found" });
      }
      return res.status(200).json({ message: "Updated admin" });
    }
  });
};

const deleteAdmin = (req, res) => {
  const userid = req.params.id;
  const updateQuery = "DELETE FROM admin_info WHERE id=?";
  db.query(updateQuery, [userid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "admin id not found" });
      }
      return res.status(200).json({ message: "Delated admin successfully" });
    }
  });
};

module.exports = {
  getAdminData,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
