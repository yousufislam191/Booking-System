const db = require("../config/config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUserData = (req, res) => {
  const getQuery = "SELECT * FROM user_info";
  db.query(getQuery, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    } else {
      if (result.length > 0) {
        return res.status(200).json({ message: "user registered" });
      } else {
        return res.status(400).json({ message: "user not found in database" });
      }
    }
  });
};

const getUser = (req, res) => {
  const { email, password } = req.body;
  const getQuery = "SELECT * FROM user_info  WHERE email=? AND password=? ";

  db.query(getQuery, [email, password], (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    } else {
      if (result.length > 0) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "72h",
        });
        return res.status(200).json({
          message: "user login successfully",
          token: token,
          result: result,
        });
      } else {
        return res.status(404).json({ message: "wrong email and password" });
      }
    }
  });
};

const createUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "Please enter email and password" });
  else {
    const chechQuery = "SELECT * FROM `user_info` WHERE email=?";
    const insertQuery = "INSERT INTO user_info(email, password) VALUES (?,?)";

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

const updateUser = (req, res) => {
  const userid = req.params.id;
  const { email, password } = req.body;
  const updateQuery = "UPDATE user_info SET email=?, password=? WHERE id=?";
  db.query(updateQuery, [email, password, userid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "user id not found" });
      }
      return res.status(200).json({ message: "Updated user" });
    }
  });
};

const deleteUser = (req, res) => {
  const userid = req.params.id;
  const updateQuery = "DELETE FROM user_info WHERE id=?";
  db.query(updateQuery, [userid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "user id not found" });
      }
      return res.status(200).json({ message: "Delated user successfully" });
    }
  });
};

module.exports = {
  getUserData,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
