'use strict';

const User = require('../models/User');
const awaitIFY = require('./awaitIFY');

let _split = async (arr, char) => {
    return new Promise((resolve) => {
        resolve(arr.split(char));
    });

}


module.exports = async (req, res, next) => {

    req.body = req.body || {};

    if (req.headers.authorization === undefined) {
        req.body.user = false;
        return next();
    }

    let auth = await _split(req.headers.authorization, ' ');


    if (auth[0] !== 'Basic' || auth[1] === '') {
        req.body.user = false;
        return next();
    }

    let base64Buffer = new Buffer(auth[1], 'base64');
    let str = base64Buffer.toString();
    let authArray = await _split(str,':');

    if (authArray.length < 2 || authArray[1] === '' || authArray[0] === '') {
        req.body.user = false;
        return next();
    }
    req.body.credentials = authArray;

    let _user = await User.findOne({username: authArray[0]});

    req.body.user = _user;
    return next();
};