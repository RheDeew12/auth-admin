const Pasien = require("../models/pasienModel");

exports.findAll = (req, res) => {
  Pasien.findAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  const newPasien = new Pasien(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Please provide all required fields" });
  } else {
    Pasien.create(newPasien, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error creating data" });
      } else {
        res.json({ message: "Data added successfully", data });
      }
    });
  }
};

exports.findById = (req, res) => {
  Pasien.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res) => {
  const newPasien = new Pasien(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Please provide all required fields" });
  } else {
    Pasien.update(req.params.id, newPasien, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error updating data" });
      } else {
        res.json({ message: "Data updated successfully" });
      }
    });
  }
};

exports.delete = (req, res) => {
  Pasien.delete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error deleting data" });
    } else {
      res.json({ message: "Data deleted successfully" });
    }
  });
};
