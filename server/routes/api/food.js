const router = require("express").Router();
const itemSearchController = require("../../controllers/itemSearchController");

// Matches with "/api/food"
router.route("/search").get(itemSearchController.find);

module.exports = router;
