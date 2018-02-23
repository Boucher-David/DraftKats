const Mongoose = require('mongoose');

const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

var randomstring = require("randomstring");

const User = new Mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    user_id: {type: String, unique: true}
});

User.methods._save = (username, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hashAsync(password, 15).then(hash => {
            this.password = hash;
            this.username = username;
            this.user_id = randomstring.generate({length: 100});
            User.save(this).then(success => resolve(success)).catch(failure => reject(failure));
        });

    });
}

User.methods.compare = (password, hash) => {
    return bcrypt.compare(password, hash).then ((res) => {
        return res;
    });
}

module.exports = Mongoose.model('User', User);