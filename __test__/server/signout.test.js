const expect = require('expect');
require('dotenv').config();
let server = require('../../server/server');
const superagent = require('superagent');

const User = require('../../server/models/User.js');
let newUser = new User();

let URL = (process.env.NODE_ENV === 'production') ? 'draftkats.herokuapp.com' : `localhost:${process.env.BACKEND_PORT}`;

let username = 'david';
let password = 'password';
let token = '';

beforeAll(done => {
    server.start();

    User.remove({username: 'david'}).then(() => {
        
        newUser._save(newUser, [username, password]).then(() => {
            return done();
        });
    });

  });

afterAll(done => {
    server.stop();
    done();
});

test('Test signin and save the token we receive', async (done) => {
    let response = await superagent.post(URL + '/login/signin').auth('david', 'password');

    token = response.body.token;
    expect(response.body.login).toEqual(true);
    done();
});


test('Test sending the wrong bearer token', async (done) => {
    let response = await superagent.get(URL + '/login/signout/abc123');

    expect(response.body.loggedOut).toEqual(false);

    done();
});

test('Test sending the correct bearer token', async (done) => {
    let response = await superagent.get(URL + `/login/signout/${token}`);

    expect(response.body.loggedOut).toEqual(true);

    done();
});

