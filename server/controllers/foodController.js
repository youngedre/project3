const db = require("../models");
const searchFunctions = require('../models/scrape')

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
    console.log(value)
    db.StoreSearch
      .find({
        searchedTerm: { $regex: value, $options: 'i' }
      })
      .then(items => {
        if(items.length===0){
          console.log("scraping would be here")
          async () => {
            let testStuff = await searchFunctions.walmartSearch(value);
            console.log(testStuff)
            // res.json(testStuff)
          }
        }else{
          console.log('results would be here')
          res.json(items)
        }
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