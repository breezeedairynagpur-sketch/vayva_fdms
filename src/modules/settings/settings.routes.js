
const express = require("express");
const router = express.Router();

const settingsController = require("./settings.controller");

// GET all settings
router.get("/", settingsController.getAppSettings);

// GET setting by ID
router.get("/:id", settingsController.getAppSettingById);

// CREATE setting
router.post("/", settingsController.createAppSetting);

// UPDATE setting
router.put("/:id", settingsController.updateAppSetting);

// DELETE setting
router.delete("/:id", settingsController.deleteAppSetting);

module.exports = router;
