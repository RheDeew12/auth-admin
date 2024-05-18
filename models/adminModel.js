const dbConn = require("../db");
const bcrypt = require('bcrypt');

const Admin = function (admin) {
  this.username = admin.username;
  this.password = admin.password;
};

Admin.create = (newAdmin, result) => {
  dbConn.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Admin.findById = (username, result) => {
  dbConn.query("SELECT * FROM admin WHERE username = ?", [username], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Admin.findAll = (result) => {
  dbConn.query("SELECT * FROM admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Admin.update = (username, admin, result) => {
  bcrypt.hash(admin.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      dbConn.query(
        "UPDATE admin SET password=? WHERE username = ?",
        [hashedPassword, username],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            result(null, res);
          }
        }
      );
    }
  });
};

Admin.delete = (username, result) => {
  dbConn.query("DELETE FROM admin WHERE username = ?", [username], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

exports.login = (req, res) => {
  Admin.findById(req.body.username, async (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else if (data.length === 0) {
      res.status(400).send({ message: "User not found" });
    } else {
      try {
        const isMatch = await bcrypt.compare(req.body.password, data[0].password);
        if (isMatch) {
          res.json({ message: "Login successful" });
        } else {
          res.status(400).send({ message: "Incorrect password" });
        }
      } catch (error) {
        res.status(500).send({ message: "Error during authentication" });
      }
    }
  });
};

module.exports = Admin;
