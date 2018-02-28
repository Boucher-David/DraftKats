const expect = require('expect');
require('dotenv').config();
let server = require('../../server/server');
const superagent = require('superagent');

const History = require('../../server/models/History.js');

let URL = (process.env.NODE_ENV === 'production') ? 'draftkats.herokuapp.com' : `localhost:${process.env.BACKEND_PORT}`;
let token = '';

beforeAll(done => {
    server.start();
    done();
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
    let response = await superagent.get(URL + `/history/get/football/wrongToken`)

    expect(response.body.searched).toEqual(false);
    done();
});

test('Test if we send the incorrect sport', async (done) => {
    let response = await superagent.get(URL + `/history/get/handegg/${token}`);
    
    expect(response.body.searched).toEqual(false);
    done();
});

test('Test if we send everything correctly and get list back', async (done) => {
    let response = await superagent.get(URL + `/history/get/football/${token}`);

    expect(response.body.searched).toEqual(true);
    done();
});