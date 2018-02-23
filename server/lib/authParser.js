'use strict';

let _basic = (auth, req, res, next) => {
    let base64 = auth[1];
    let base64Buffer = new Buffer(base64, 'base64');
    
    let stringHeader = base64Buffer.toString();

    let authArray = stringHeader.split(':');
    req.body.auth.credentials = authArray;
    return;
}

let _bearer = (auth, req, res, next) => {
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

    if (authType[0] === 'Basic') _basic(authType, req, res, next);
    if (authType[0] === 'Bearer') _bearer (authType, req, res, next);


    return next();
};