const router = require("express").Router();
const foodRoutes = require("./food");

// Food routes
router.use("/api", foodRoutes);

module.exports = router;
