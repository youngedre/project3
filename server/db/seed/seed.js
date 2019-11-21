const seedData = require('./seed.json');
const db = require("../../models");

module.exports = {
  seedFoodData: function(cb) {
    db.Food.deleteMany({})
      .then(() => {
        return db.Food.insertMany(seedData);
      })
      .then(()=> {
        cb({ message: 'success' });
      })
      .catch(error => {
        console.log(error);
        cb({ message: 'error', error: error });
      });
  }
};
