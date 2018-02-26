const Mongoose = require('mongoose');

const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const jwt = require('bluebird').promisifyAll(require('jsonwebtoken'));
var randomstring = require("randomstring");

const awaitIFY = require('../lib/awaitIFY');

const User = new Mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String, unique: true},
    user_id: {type: String, unique: true}
});


User.methods._save = async (schema, credentials) => {

    return bcrypt.hashAsync(credentials[1], 15).then(hash => {
        schema.username = credentials[0];
        schema.password = hash;
        schema.user_id = randomstring.generate({length: 100});
        return schema.save().then(saved => {
            return saved;
        });
    });
}

User.methods.compare = (password, hash) => {
    return bcrypt.compare(password, hash).then ((res) => {
        return res;
    });
}

User.methods.parseJWT = (_jwt) => {
    let _id = false;
    return new Promise((resolve) => {
        try {
            _id = jwt.verify(_jwt, process.env.SECRET);
        } catch (err) {
            _id = false;
        }
        return (_id) ? resolve(_id) : resolve(_id);

    });

}


User.methods.generateToken = async (user) => {
    return jwt.sign({user_id: user.user_id},process.env.SECRET);
}


module.exports = Mongoose.model('User', User);