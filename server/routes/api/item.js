const router = require("express").Router();
const itemSearchController = require("../../controllers/itemSearchController");

// Matches with "/api/food"
router.route("/search").get(itemSearchController.find);
// Matches with "/api/food/seed"
// router.route("/seed").get(foodController.importData);

module.exports = router;
