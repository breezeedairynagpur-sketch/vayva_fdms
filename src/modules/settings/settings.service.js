
const { pool } = require("../../config/database");

// GET all settings
const getAppSettings = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM app_settings"
    );

    return rows;
};

// GET setting by ID
const getAppSettingById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM app_settings WHERE id = ?",
        [id]
    );

    return rows[0] || null;
};

// CREATE setting
const createAppSetting = async (data) => {
    const [result] = await pool.query(
        "INSERT INTO app_settings (setting_name, setting_value) VALUES (?, ?)",
        [data.setting_name, data.setting_value]
    );

    return {
        id: result.insertId,
        ...data
    };
};

// UPDATE setting
const updateAppSetting = async (id, data) => {
    const [result] = await pool.query(
        "UPDATE app_settings SET setting_name = ?, setting_value = ? WHERE id = ?",
        [data.setting_name, data.setting_value, id]
    );

    return {
        affectedRows: result.affectedRows
    };
};

// DELETE setting
const deleteAppSetting = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM app_settings WHERE id = ?",
        [id]
    );

    return {
        affectedRows: result.affectedRows
    };
};

module.exports = {
    getAppSettings,
    getAppSettingById,
    createAppSetting,
    updateAppSetting,
    deleteAppSetting
};
