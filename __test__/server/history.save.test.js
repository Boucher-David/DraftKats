const expect = require('expect');
require('dotenv').config();
let server = require('../../server/server');
const superagent = require('superagent');

const History = require('../../server/models/History.js');

let URL = (process.env.NODE_ENV === 'production') ? 'draftkats.herokuapp.com' : `localhost:${process.env.BACKEND_PORT}`;
let token = '';

beforeAll(done => {
    server.start();


    History.remove({}).then(() => {
        done();

    });

  });

afterAll(done => {
    server.stop();
    done();
});

test('Test that correct credentials give us a true for login and a token', async (done) => {
    let response = await superagent.post(URL + '/login/signin').auth('username', 'password');

    token = response.body.token;

    expect(response.body.login).toEqual(true);
    done();
});

test('Test if we send the wrong token as auth', async (done) => {
    let response = await superagent.post(URL + `/history/save/football/wrongToken`).send({team: '[]'});

    expect(response.body.saved).toEqual(false);
    done();
});

test('Test if we send the incorrect sport', async (done) => {
    let response = await superagent.post(URL + `/history/save/handegg/${token}`).send({team: '[]'});
    
    expect(response.body.saved).toEqual(false);
    done();
});

test('Test if we send an empty array', async (done) => {
    let response = await superagent.post(URL + `/history/save/football/${token}`).send({team: '[]'});
    
    expect(response.body.saved).toEqual(false);
    done();
});

test('Test sending all the correct info and we saved the team', async (done) => {
    let response = await superagent.post(URL + `/history/save/football/${token}`).send({team: '[{}]'});

    expect(response.body.saved).toEqual(true);
    done();
});