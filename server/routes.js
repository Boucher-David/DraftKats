const express = require('express');
const app = module.exports = express.Router();
const path = require('path');
const cors = require('cors');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const bodyParser = require("body-parser");

const cronDateFile = require('./lib/cronDateFile.js');
const playerFetch = require('./lib/playerFetch');

const User = require('./models/User.js');
const History = require('./models/History.js');

const newUser = new User();


const awaitIFY = require('./lib/awaitIFY.js');
var randomstring = require("randomstring");

const authParser = require('./lib/authParser.js');

let sports = ['football', 'soccer', 'baseball', 'basketball'];

app.use((err, req, res, next) => {
    if (err) return res.sendStatus(400);
});
app.use(cors());
app.use(bodyParser.json());

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

    if (!req.body.credentials) return res.json({
        message: 'Please provide a username and password. Basic authentication required.'
    });


    if (req.body.credentials.length < 2 || req.body.credentials[1] === '' || req.body.credentials[0] === '') return res.json({
        message: 'Please provide a username and password. Basic authentication required.'
    });



    let [err, user] = await awaitIFY(User.findOne({username: req.body.credentials[0]}));

    if (user === null) {
        newUser._save(newUser, req.body.credentials).then(result => {

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
    if (!req.body.credentials) return res.json({
        message: 'Please provide a username and password. Basic authentication required.'
    });


    if (req.body.credentials.length < 2 || req.body.credentials[1] === '' || req.body.credentials[0] === '') return res.json({
        message: 'Please provide a username and password. Basic authentication required.'
    });

    let err, user, match;
    
    [err, user] = await awaitIFY(User.findOne({username: req.body.credentials[0]}).then(exists => {

        return (exists) ? exists : null;
    }));

    if (user === null) return res.json({
        login: false
    });

    [err, match] = await awaitIFY(newUser.compare(req.body.credentials[1], user.password));
    
    if (err || !match) return res.json({login:false});

    let token = await awaitIFY(user.generateToken(user));

    return res.json({
        login: true,
        token: token[1]
    });

});

app.get('/login/signout/:token', async (req, res, next) => {
    let updated;

    let token = await newUser.parseJWT(req.params.token);

    if (!token) return res.json({
        loggedOut: false
    });

    let [err, user] = await awaitIFY(User.findOne({user_id: token.user_id}));

    if (user === null) return res.json({
        loggedOut: false
    });

    [err, updated] = await awaitIFY(User.findOneAndUpdate({user_id: user.user_id}, {user_id: randomstring.generate({length: 100})}, {new: true}));

    return (updated) ? res.json({loggedOut: true}) : res.json({loggedOut: false}); 

});

app.post('/login/update', async (req, res, next) => {
    let comparePassword, newHash, updated;
    
    if (req.body.credentials.length !== 3) return res.json({
        updated: false,
        message: 'Please make sure to send username, password, and new password as basic auth'
    });
 
    let [err, user] = await awaitIFY(User.findOne({username: req.body.credentials[0]}));

    if (!user) return res.json({
        updated: false
    });

    [err, comparePassword] = await awaitIFY(newUser.compare(req.body.credentials[1], user.password));

    if (!comparePassword) return res.json({updated: false});

    [err, newHash] = await awaitIFY(bcrypt.hashAsync(req.body.credentials[2], 15));

    [err, updated] = await awaitIFY(User.findOneAndUpdate({user_id: user.user_id},{password: newHash},{new: true}));

    return res.json({
        updated: true,
    });

});


app.post('/history/save/:sport/:token', async (req, res, next) =>{
    let saved;
    if (sports.indexOf(req.params.sport) === -1) return res.json({
        saved: false
    });

    let token = await newUser.parseJWT(req.params.token);
    if (!token) return res.json({
        saved: false
    });

    if (req.body.team.length < 1) return res.json({
        saved: false
    });

    let [err, user] = await awaitIFY(User.findOne({user_id: token.user_id}));

    if (!user) return res.json({
        saved: false
    });

    let newHistory = new History({
        user_mongoose_id: user._id,
        sport: req.params.sport,
        team: req.body.team
    });

    [err, saved] = await awaitIFY(newHistory.save());

    return (saved) ? res.json({
        saved: true
    }) : res.json({
        saved: false
    });

});

app.get('/history/get/:sport/:token', async (req, res, next) => {
    let sportlist;
    if (sports.indexOf(req.params.sport) === -1) return res.json({
        searched: false
    });

    let token = await newUser.parseJWT(req.params.token);
    if (!token) return res.json({
        searched: false
    });

    if (req.body.team === '[]') return res.json({
        searched: false
    });

    let [err, user] = await awaitIFY(User.findOne({user_id: token.user_id}));

    if (!user) return res.json({
        searched: false
    });

    [err, sportlist] = await awaitIFY(History.find({user_mongoose_id: user._id}));

    let list = sportlist.map(t => {
        if (t.sport === req.params.sport) return t.team[0];
    });

    if (!sportlist) return res.json({
        searched: false
    });

    return res.json({
        searched: true,
        list
    });

});

app.get('/draft/:sport', async (req, res, next) => {
    let sports = ['Soccer','Football','Baseball','Basketball'];
    if (! sports.includes(req.params.sport)) return res.send('Invalid sport');

    let list = await playerFetch.models[req.params.sport].find({}).sort({adp: -1});

    list.forEach((player, i) => {
        let sendPlayer = {};
        sendPlayer['name'] = player.name;
        sendPlayer['team'] = player.team;
        sendPlayer['adp'] = player.adp;
        sendPlayer['position'] = player.position;
        sendPlayer['id'] = player._id;
        list[i] = sendPlayer;
    });
    return res.send(list);
});

app.post('/draft/:sport/:token', async (req, res, next) => {
    let sports = ['Soccer','Football','Baseball','Basketball'];
    if (! sports.includes(req.params.sport)) return res.json({
        saved: false
    });
    if (req.body.position === undefined || req.body.position === '') return res.json({
        saved: false
    });
    if (req.body.id === undefined || req.body.id === '') return res.json({
        saved: false
    });

    let token = await newUser.parseJWT(req.params.token);

    if (!token) return res.json({
        saved: false
    });

    let [err, user] = await awaitIFY(User.findOne({user_id: token.user_id}));

    if (user === null) return res.json({
        saved: false
    });

    let id = req.body.id;
    let player = await playerFetch.models[req.params.sport].findOne({_id: req.body.id});

    player.drafted.push(Number(req.body.position));
    player.adp = Math.round((player.drafted.reduce((acc, curr) => acc + curr)) / player.drafted.length);

    let updated = await playerFetch.models[req.params.sport].findOneAndUpdate({_id: player._id},{$set: {drafted: player.drafted, adp: player.adp}},{new: true});    

    res.json({
        saved: true
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
    
