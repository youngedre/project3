const db = require("../models");
const searchFunctions = require('../models/scrape')

// Defining methods for the foodController
module.exports = {
  find: async function(req, res) {
    try{
      const param = req.query.q;

      if(!param) {
        res.json({
         error: 'Missing required parameter `q`'
        });
        return;
      }
    const value = param.toLowerCase().trim();
    console.log(value)
    itemSearchResults = await db.StoreSearch
      .find({
        searchedTerm: { $regex: value, $options: 'i' }
      })
      if(itemSearchResults.length <= 14){
        console.log("scraping would be here")
        let testStuff = await searchFunctions.walmartSearch(value);
        console.log("The Scrape worked!!!",testStuff)
        return res.json(testStuff)
      }else{
        console.log('results would be here: ', itemSearchResults)
        return res.json(itemSearchResults)
      }
      }
      catch(err){res.status(422).json(err)};
  },
  importData: function(req, res) {
    // Import food data from json, uncomment once
    const seed = require('../db/seed/seed.js');
    seed.seedFoodData(response => {
      res.json(response);
    });
  }
};