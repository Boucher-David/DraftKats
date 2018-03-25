const expect = require('expect');
require('dotenv').config();
let server = require('../../server/server');
const superagent = require('superagent');
const User = require('../../server/models/User');

const History = require('../../server/models/History.js');

let URL = (process.env.NODE_ENV === 'production') ? 'draftkats.herokuapp.com' : `localhost:${process.env.BACKEND_PORT}`;
let token = '';

beforeAll(async (done) => {
    server.start(true);
    let newUser = new User();
    await User.remove({});
    await newUser._save(newUser, ['username', 'password']);
    return done();
});

afterAll(async (done) => {
    await server.stop();
    done();
});

test('Test that correct credentials give us a true for login and a token', async (done) => {
    let response = await superagent.post(URL + '/login/signin').auth('username', 'password');

    token = response.body.token;

    expect(response.body.login).toEqual(true);
    done();
});

test('Test if we send the wrong token as auth', async (done) => {
    let response = await superagent.post(URL + `/history/save/Football/wrongToken`).send({team: []});

    expect(response.body.saved).toEqual(false);
    done();
});

test('Test if we send the incorrect sport', async (done) => {
    let response = await superagent.post(URL + `/history/save/handegg/${token}`).send({team: []});
    
    expect(response.body.saved).toEqual(false);
    done();
});

test('Test if we send an empty array', async (done) => {
    let response = await superagent.post(URL + `/history/save/Football/${token}`).send({team: []});
    
    expect(response.body.saved).toEqual(false);
    done();
});

test('Test sending all the correct info and we saved the team', async (done) => {
    let response = await superagent.post(URL + `/history/save/Football/${token}`).send({team: [{test: true}]});

    expect(response.body.saved).toEqual(true);
    done();
});

test('Test sending all the correct info and we saved the team', async (done) => {
    let response = await superagent.post(URL + `/history/save/Football/${token}`).send({team: [{test2: true}]});

    expect(response.body.saved).toEqual(true);
    done();
});

test('Test sending all the correct info and we saved the team', async (done) => {
    let response = await superagent.post(URL + `/history/save/Football/${token}`).send({team: [{test3: true}]});

    expect(response.body.saved).toEqual(true);
    done();
});