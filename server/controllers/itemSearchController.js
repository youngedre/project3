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
      let allResults = []
      let walmartFiltered = itemSearchResults.filter(item => item.storeSource === 'Walmart')
      let amazonFiltered = itemSearchResults.filter(item => item.storeSource === 'Amazon')

      let allResults = Promise.all([prom1, prom2]);

      const prom1 = new Promise ((resolve, reject) => {
          resolve('test') 
        })

      const prom2 = new Promise ((resolve, reject) => {
        resolve('test')
      })

      if(walmartFiltered.length <= 20){
        let testWalmart = await searchFunctions.walmartSearch(value);
        console.log(testWalmart)
        allResults = allResults.push(testWalmart)
      }else{allResults = allResults.push(walmartFiltered)}



      if(amazonFiltered.length <=20){
        let testAmazon = await searchFunctions.amazonSearch(value)
        console.log(testAmazon)
        allResults = allResults.push(testAmazon)
      }else{allResults = allResults.push(amazonFiltered)}

      return res.json(allResults)
      }
      catch(err){res.status(200).json(err)};
  },
};