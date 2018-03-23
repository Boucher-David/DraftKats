const Mongoose = require('mongoose');

const Soccer = new Mongoose.Schema({
  name: {type: String},
  position: {type: String},
  team: {type: String},
  adp: {type: String},
  drafted: {type: Array}
});

module.exports = Mongoose.model('Soccer', Soccer);