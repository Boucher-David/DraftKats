'use strict';

const User = require('../models/User');

let _split = async (arr, char) => {
    return new Promise((resolve) => {
        resolve(arr.split(char));
    });

}


module.exports = async (req, res, next) => {


    if (!req.headers.authorization) {
        req.body.credentials = false;
        return next();
    }

    let auth = await _split(req.headers.authorization, ' ');


    if (auth[0] !== 'Basic' || auth[1] === '') return req.body.credentials = false;
    let base64Buffer = new Buffer(auth[1], 'base64');
    let str = base64Buffer.toString();
    let authArray = await _split(str,':');


    req.body.credentials = authArray;
    return next();
};