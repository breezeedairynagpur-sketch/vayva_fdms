
const settingsService = require("./settings.service");

// GET all settings
const getAppSettings = async (req, res) => {
    try {
        const result = await settingsService.getAppSettings();

        return res.status(200).json({
            success: true,
            message: "App settings fetched successfully",
            data: result
        });
    } catch (error) {
        console.error("Settings Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch app settings"
        });
    }
};

// GET setting by ID
const getAppSettingById = async (req, res) => {
    try {
        const result = await settingsService.getAppSettingById(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Setting fetched successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CREATE setting
const createAppSetting = async (req, res) => {
    try {
        const result = await settingsService.createAppSetting(req.body);

        return res.status(201).json({
            success: true,
            message: "Setting created successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE setting
const updateAppSetting = async (req, res) => {
    try {
        const result = await settingsService.updateAppSetting(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Setting updated successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE setting
const deleteAppSetting = async (req, res) => {
    try {
        await settingsService.deleteAppSetting(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Setting deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAppSettings,
    getAppSettingById,
    createAppSetting,
    updateAppSetting,
    deleteAppSetting
};
