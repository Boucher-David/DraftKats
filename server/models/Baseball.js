const Mongoose = require('mongoose');

const Baseball = new Mongoose.Schema({
  name: {type: String},
  position: {type: String},
  team: {type: String},
  adp: {type: String},
  drafted: {type: Array}
});

module.exports = Mongoose.model('Baseball', Baseball);