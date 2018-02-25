const express = require('express');
const app = module.exports = express.Router();
const path = require('path');
const cors = require('cors');

const User = require('./models/User.js');
const awaitIFY = require('./lib/awaitIFY.js');

const authParser = require('./lib/authParser.js');

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
    res.body.kats = {
        created: false
    }

    if (req.body.auth.credentials.length !== 2) {
        res.body.kats.message = "Please provide a username and password.";
        res.send(res.body);
        return next();
    }

    let [err, user] = await awaitIFY(User.findOne({username: req.body.auth.credentials[0]}));

    if (user === null) {
        let newUser = new User();
        newUser._save(newUser, req.body.auth.credentials).then(result => {
            res.body.kats.created = true;
            res.send(res.body);
            return next();
        });

    } else {
        res.body.kats.message = "User already exists.";
        res.send(res.body);
        return next();
    }


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
    
