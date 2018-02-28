// sport file. mongoose template.

const Mongoose = require('mongoose');

const history = new Mongoose.Schema({
    user_id: {type: String, required: true},
    sport: {type: String, required: true},
    team: {type: Array} 
});

module.exports = Mongoose.model('History', history);