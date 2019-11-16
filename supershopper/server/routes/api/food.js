const router = require("express").Router();
const foodController = require("../../controllers/foodController");

// Matches with "/api/food"
router.route("/").get(foodController.find);
// Matches with "/api/food/seed"
router.route("/seed").get(foodController.importData);

module.exports = router;
