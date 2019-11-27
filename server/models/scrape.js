const amazonSearch = require("./scrapes/amazon");
const walmartSearch = require("./scrapes/walmart");

const searchFunctions = {walmartSearch, amazonSearch}

module.exports = searchFunctions