const express = require('express');
const app = module.exports = express.Router();
const path = require('path');
const cors = require('cors');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

const User = require('./models/User.js');
const newUser = new User();
const awaitIFY = require('./lib/awaitIFY.js');
var randomstring = require("randomstring");

const authParser = require('./lib/authParser.js');

app.use((err, req, res, next) => {
    if (err) return res.sendStatus(400);
});
app.use(cors());
app.use(authParser);
app.use((req, res, next) => {
    res.body = res.body || {};
    res.body.kats = res.body.kats || {};
    return next();
});

app.use(express.static(path.join(__dirname, '/../bundle')));


// Route creator is responsible for testing + documenting each route thoroughly. Document and test any modules you create on the route, too. 

// POST /login/create
    //User wants to create an account for storing draft history. Save to DB. Create User model with a uuid field, with a  randomly generated uuid() value on save, as well as other fields you deem necessary. 
app.post('/login/signup', async (req, res, next) => {



    let [err, user] = await awaitIFY(User.findOne({username: req.body.auth.credentials[0]}));

    if (user === null) {
        newUser._save(newUser, req.body.auth.credentials).then(result => {

            return res.send({
                created: true
            });
        });

    } else {

        return res.json({
            created: false,
            message: 'User already exists.'
        });

    }

});

app.post('/login/signin', async (req, res, next) => {
    let err, user, match;
    
    [err, user] = await awaitIFY(User.findOne({username: req.body.auth.credentials[0]}).then(exists => {

        return (exists) ? exists : null;
    }));

    if (user === null) return res.json({
        login: false
    });

    [err, match] = await awaitIFY(newUser.compare(req.body.auth.credentials[1], user.password));
    
    if (err || !match) return res.json({login:false});
    let token = await awaitIFY(user.generateToken(user));
    return res.json({
        login: true,
        token: token[1]
    });

});

app.get('/login/signout', async (req, res, next) => {
let updated;
    if (req.body.auth.type === 'Basic' || !req.body.auth.credentials) return res.json({loggedOut: false});

    let [err, user] = await awaitIFY(User.findOne({user_id: req.body.auth.token}));

    if (user === null) return res.json({
        loggedOut: false
    });

    
    [err, updated] = await awaitIFY(User.findOneAndUpdate({user_id: user.user_id}, {user_id: randomstring.generate({length: 100})}, {new: true}));

    return (updated) ? res.json({loggedOut: true}) : res.json({loggedOutfalse}); 

});

app.post('/login/update', async (req, res, next) => {
    if (req.body.auth.credentials.length !== 3) return res.json({
        updated: false,
        message: 'Please make sure to send username, password, and new password as basic auth'
    });
 
    [err, user] = await awaitIFY(User.findOne({username: req.body.auth.credentials[0]}));
    if (!user) return res.json({
        updated: false
    });

    [err, comparePassword] = await awaitIFY(newUser.compare(req.body.auth.credentials[1], user.password));
    if (!comparePassword) return res.json({updated: false});

    [err, newHash] = await awaitIFY(bcrypt.hashAsync(req.body.auth.credentials[2], 15));

    [err, updated] = await awaitIFY(User.findOneAndUpdate({user_id: user.user_id},{password: newHash},{new: true}));


    return res.json({
        updated: true,
    });

});

app.use('*', (req, res, next) => {    

    res.redirect('/');
});

// POST login/login
    //User enters login information. Generate JWT. Create middleware for parsing JWT tokens that we can use in other routes. Use uuid field as token input, not mongo's _id.
    
// PUT login/update
    //User wants to change their password. Verify and update.
    
// POST login/signout
    //User clicks signout button. Update the user's uuid field with a new random value.

// POST history/:sport
    //User completed draft. We send their drafted team and save it to db. DB will need to know which username did which draft.

// GET /history/:sport
    //User wants to see their previous drafts of the sport in :sport. Query the sports db and send them their history.
    
// GET /draft/:sport
    //front-end sends a request for player data for sport, based upon req.params.sport. send them back players data, and roster setup like so:
//  {
   //playerData: [{name: name, team: team, position: position, adp: adp},{name: name, team: team, position: position, adp: adp}],
   //roster: [{position: position, value: 1},{position: position, value: 1}]
//  }
    
