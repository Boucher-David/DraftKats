const express = require('express');
const app = module.exports = express.Router();
const path = require('path');
const cors = require('cors');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const bodyParser = require("body-parser");

const cronDateFile = require('./lib/cronDateFile.js')();
const playerFetch = require('./lib/playerFetch');

const User = require('./models/User.js');
const History = require('./models/History.js');

const newUser = new User();


const awaitIFY = require('./lib/awaitIFY.js');
var randomstring = require("randomstring");

const authParser = require('./lib/authParser.js');

let sports = ['Football', 'Soccer', 'Baseball', 'Basketball'];

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

    if (req.body.user === false) return res.json({
        message: 'Please provide a username and password. Basic authentication required.'
    });


    if (req.body.user === null) {

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
    if (req.body.user === false || req.body.user === null) return res.json({
        message: 'Please provide a username and password. Basic authentication required.'
    });


    let [err, match] = await awaitIFY(newUser.compare(req.body.credentials[1], req.body.user.password));
    
    if (err || !match) return res.json({login:false});

    let token = await awaitIFY(newUser.generateToken(req.body.user));

    return res.json({
        login: true,
        token: token[1]
    });

});

app.get('/login/signout/:token',(req, res, next) => {return console.log(req.params)} ,async (req, res, next) => {

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
    let comparePassword, newHash, updated, err;
    
    if (req.body.credentials.length !== 3 || req.body.user === null || req.body.user === false) return res.json({
        updated: false,
        message: 'Please make sure to send username, password, and new password as basic auth'
    });


    [err, comparePassword] = await awaitIFY(newUser.compare(req.body.credentials[1], req.body.user.password));

    if (!comparePassword) return res.json({updated: false});

    [err, newHash] = await awaitIFY(bcrypt.hashAsync(req.body.credentials[2], 15));

    [err, updated] = await awaitIFY(User.findOneAndUpdate({user_id: req.body.user.user_id},{password: newHash},{new: true}));

    return res.json({
        updated: true
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

    if (! sports.includes(req.params.sport)) return res.send('Invalid sport');

    let list = await playerFetch.models[req.params.sport].find({}).sort({adp: -1});

    list.forEach((player, i) => {
        
        let sendPlayer = {};
        sendPlayer['name'] = player.name;
        sendPlayer['team'] = player.team;
        sendPlayer['adp'] = i + 1;
        sendPlayer['position'] = player.position;
        sendPlayer['id'] = player._id;
        list[i] = sendPlayer;
    });
    return res.send(list);
});

app.post('/draft/:sport/:token', async (req, res, next) => {

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
