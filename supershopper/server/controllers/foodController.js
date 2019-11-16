const db = require("../models");

// Defining methods for the foodController
module.exports = {
  find: function(req, res) {
    const param = req.query.q;
    
    if(!param) {
      res.json({
        error: 'Missing required parameter `q`'
      });
      return;
    }

    const value = param.toLowerCase().trim();

    db.Food
      .find({
        description: { $regex: value, $options: 'i' }
      })
      .then(foods => {
        res.json(foods);
      })
      .catch(err => res.status(422).json(err));
  },
  importData: function(req, res) {
    // Import food data from json, uncomment once
    const seed = require('../db/seed/seed.js');
    seed.seedFoodData(response => {
      res.json(response);
    });
  }
};
