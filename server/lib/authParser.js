'use strict';

const User = require('../models/User');
const newUser = new User();

let _basic = (auth, req, res, next) => {

    let base64Buffer = new Buffer(auth, 'base64');
    
    let stringHeader = base64Buffer.toString();

    let authArray = stringHeader.split(':');

    if (authArray.length > 3 || authArray[0] === '' || authArray[1] === '' || authArray[2] === '') return res.json({
        message: "Please provide a username and password. Basic authentication required."
    });
    req.body.auth.credentials = authArray;
    req.body.auth.type = 'Basic';

    return;
}

let _bearer = async (auth, req, res, next) => {
    let token = await newUser.parseJWT(auth);
    if (token) {
        req.body.auth = {
            token: token.user_id,
            credentials: true,
            type: 'Bearer'
        }
        return next();
    } else {
        req.body.auth = {
            credentials: false,
            type: 'Bearer',
            token: false
        }
    }

}

module.exports = async (req, res, next) => {
    req.body = req.body || {};
    req.body.auth = req.body.auth || {};
    req.body.auth = {
        credentials: false
    }

    let authHeader = req.headers.authorization || false;
    if (!authHeader) return res.json({
        message: "Please provide a username and password. Basic authentication required."
    });

    let authType = authHeader.split (' ');

    if (authType[0] === 'Basic') _basic(authType[1], req, res, next);
    if (authType[0] === 'Bearer') _bearer(authType[1], req, res, next);

    return next();
};