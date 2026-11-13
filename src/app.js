
const express = require("express");
const path = require("path");

const settingsRoutes = require("./modules/settings/settings.routes");

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/settings", settingsRoutes);

// React production build
const frontendPath = path.join(__dirname, "../app/dist");

app.use(express.static(frontendPath));

// React UI fallback (Express 5 compatible)
app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
        return next();
    }

    res.sendFile(
        path.join(frontendPath, "index.html"),
        (err) => {
            if (err) next(err);
        }
    );
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

module.exports = app;
