const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  ndb_no: { type: Number },
  description: { type: String },
  kcal: { type: Number },
  protein_g: { type: Number }, 
  carbohydrate_g: { type: Number },
  fa_sat_g: { type: Number }, 
  fa_mono_g: { type: Number }, 
  fa_poly_g: { type: Number },
  fat_g: { type: Number }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
