'use strict';

const User = require('../models/User');

let _basic = (auth, req, res, next) => {

    let base64Buffer = new Buffer(auth, 'base64');
    
    let stringHeader = base64Buffer.toString();

    let authArray = stringHeader.split(':');
    if (authArray.length > 2 || authArray[0] === '' || authArray[1] === '' || authArray[2] === '') {
        return next();
    }
    req.body.auth.credentials = authArray;
    req.body.auth.type = 'Basic';
    return;
}

let _bearer = async (auth, req, res, next) => {
    let verified = await User.parseJWT(auth);
    console.log('verified JWT: ',verified);


    req.body.auth.verified = verified;
    req.body.auth.type = 'Bearer';
    return;
}

module.exports = async (req, res, next) => {
    req.body = req.body || {};
    req.body.auth = req.body.auth || {};
    req.body.auth = {
        credentials: false
    }

    let authHeader = req.headers.authorization || false;
    if (!authHeader) return next();

    let authType = authHeader.split (' ');

    if (authType[0] === 'Basic') _basic(authType[1], req, res, next);
    if (authType[0] === 'Bearer') _bearer(authType[1], req, res, next);

    return next();
};