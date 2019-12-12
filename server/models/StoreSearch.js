const mongoose = require("mongoose");


// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var StoreSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
},
  itemLink: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
},
  storeSource: {
    type: String,
    required: true
  },
  timeScraped: {
    type: Date,
    default: Date.now,
    expires: '8h'
  },
  searchedTerm: {
    type: String,
    required: true
  }

});

// This creates our model from the above schema, using mongoose's model method
var StoreSearch = mongoose.model("StoreSearch", StoreSchema);

// Export the Article model
module.exports = StoreSearch;