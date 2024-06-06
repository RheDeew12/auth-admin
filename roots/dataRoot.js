const express = require('express');
const router = express.Router();
const adminController = require('../controllers/controllerAdmin');

router.get("/admin/:username", adminController.findById);
router.post("/admin", adminController.create);
router.post("/admin/login", adminController.login);
router.get("/admin", adminController.findAll);
router.delete("/admin/:username", adminController.delete);

router.get("/admin/check-username", adminController.checkUsername);

module.exports = router;
