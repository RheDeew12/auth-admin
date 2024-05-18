const connection = require('../db');

const Pasien = function(pasien) {
    this.nama_pasien = pasien.nama_pasien;
    this.umur = pasien.umur;
    this.jenis_kelamin = pasien.jenis_kelamin;
    this.no_telp_pasien = pasien.no_telp_pasien;
    this.keluhan = pasien.keluhan;
    this.konsultasi_dokter = pasien.konsultasi_dokter;
};

Pasien.create = (newPasien, result) => {
    connection.query("INSERT INTO pasien SET ?", newPasien, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Pasien.findById = (id, result) => {
    connection.query("SELECT * FROM pasien WHERE id_pasien = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res[0]);
        }
    });
};

Pasien.findAll = (result) => {
    connection.query("SELECT * FROM pasien", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Pasien.update = (id, pasien, result) => {
    connection.query("UPDATE pasien SET nama_pasien = ?, umur = ?, jenis_kelamin = ?, no_telp_pasien = ?, keluhan = ?, konsultasi_dokter = ? WHERE id_pasien = ?", 
    [pasien.nama_pasien, pasien.umur, pasien.jenis_kelamin, pasien.no_telp_pasien, pasien.keluhan, pasien.konsultasi_dokter, id], 
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Pasien.delete = (id, result) => {
    connection.query("DELETE FROM pasien WHERE id_pasien = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Pasien;
