const path = require("path");

// Serve React production build
const frontendPath = path.join(__dirname, "../app/dist");

app.use(express.static(frontendPath));

// Keep this AFTER all API routes
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});