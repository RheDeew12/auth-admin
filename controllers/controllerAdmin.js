const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require("../models/adminModel");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  Admin.findById(username, async (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Error fetching data" });
    }

    if (!data || data.length === 0) {
      return res.status(404).send({ message: "Admin not found" });
    }

    try {
      const isMatch = await bcrypt.compare(password, data[0].password);
      if (isMatch) {
        const token = jwt.sign({ username: data[0].username }, 'secretkey');
        return res.status(200).send({ message: "Login successful", token });
      } else {
        return res.status(401).send({ message: "Incorrect password" });
      }
    } catch (error) {
      return res.status(500).send({ message: "Error during authentication" });
    }
  });
};

exports.findById = (req, res) => {
  Admin.findById(req.params.username, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else {
      res.json(data);
    }
  });
};

exports.create = async (req, res) => {
  const newAdmin = new Admin(req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new Admin({
      username: req.body.username,
      password: hashedPassword,
    });

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Please provide all required fields" });
  } else {
    Admin.create(newAdmin, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error creating data" });
      } else {
        res.json({ message: "Admin added successfully", data });
      }
    });
  }
} catch (error) {
  res.status(500).send({ message: "Error creating data" });
}
};

exports.findAll = (req, res) => {
  Admin.findAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  Admin.delete(req.params.username, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error deleting data" });
    } else {
      res.json({ message: "Admin deleted successfully" });
    }
  });
};
