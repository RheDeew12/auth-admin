const connection = require('../db');
const bcrypt = require('bcrypt');

const Admin = function(admin) {
    this.username = admin.username;
    this.password = admin.password;
};

Admin.create = (newAdmin, result) => {
    connection.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, { id: res.insertId, ...newAdmin });
        }
    });
};

Admin.findById = (username, result) => {
    connection.query("SELECT * FROM admin WHERE username = ?", [username], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.length ? res[0] : null);
        }
    });
};

Admin.findAll = (result) => {
    connection.query("SELECT * FROM admin", (err, res) => {
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
            connection.query(
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
    connection.query("DELETE FROM admin WHERE username = ?", [username], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Admin.login = (req, res) => {
    Admin.findById(req.body.username, async (err, data) => {
        if (err) {
            res.status(500).send({ message: "Error fetching data" });
        } else if (!data) {
            res.status(400).send({ message: "User not found" });
        } else {
            try {
                const isMatch = await bcrypt.compare(req.body.password, data.password);
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
