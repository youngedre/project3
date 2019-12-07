const amazonSearch = require("./scrapes/amazon");
const walmartSearch = require("./scrapes/walmart");
const targetSearch = require('./scrapes/target')

const searchFunctions = {walmartSearch, amazonSearch, targetSearch}

module.exports = searchFunctions