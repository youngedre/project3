const db = require("../models");
const searchFunctions = require('../models/scrape')

// Defining methods for the 
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
    const value = param.toLowerCase().trim().split(' ').join('+');

    console.log(value)
    itemSearchResults = await db.StoreSearch
      .find({
        searchedTerm: { $regex: value, $options: 'i' }
      })
      let walmartFiltered = itemSearchResults.filter(item => item.storeSource === 'Walmart')
      let amazonFiltered = itemSearchResults.filter(item => item.storeSource === 'Amazon')
      let prom1 = new Promise ((resolve, reject) => {
        let testWalmart = walmartFiltered.length<15 ? searchFunctions.walmartSearch(value) : walmartFiltered;
        resolve(testWalmart)
        reject("Failed to search") 
        })

      let prom2 = new Promise ((resolve, reject) => {
        let testAmazon = amazonFiltered.length<15 ? searchFunctions.amazonSearch(value) : amazonFiltered
        resolve(testAmazon)
        reject("Failed to search") 
      })

      let allResults = await Promise.all([prom1, prom2]);

      

      // if(walmartFiltered.length <= 20){
      //   let testWalmart = await searchFunctions.walmartSearch(value);
      //   console.log(testWalmart)
      //   allResults = allResults.push(testWalmart)
      // }else{allResults = allResults.push(walmartFiltered)}
      // if(amazonFiltered.length <=20){
      //   let testAmazon = await searchFunctions.amazonSearch(value)
      //   console.log(testAmazon)
      //   allResults = allResults.push(testAmazon)
      // }else{allResults = allResults.push(amazonFiltered)}
      let mergedResults = []
      mergedResults = allResults.map(arr => mergedResults.concat(arr))
      return res.json(mergedResults)
      }
      catch(err){res.status().json(err)};
  },
};