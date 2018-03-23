const Mongoose = require('mongoose');

const Football = new Mongoose.Schema({
  name: {type: String},
  position: {type: String},
  team: {type: String},
  adp: {type: String},
  drafted: {type: Array}
});

module.exports = Mongoose.model('Football', Football);