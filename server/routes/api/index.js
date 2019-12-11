const router = require("express").Router();
const itemRoutes = require("./item");

// Food routes
router.use("/api", itemRoutes);

module.exports = router;
