const expect = require('expect');
require('dotenv').config();
let server = require('../../server/server');
const superagent = require('superagent');

const User = require('../../server/models/User.js');
let newUser = new User();

let URL = (process.env.NODE_ENV === 'production') ? 'draftkats.herokuapp.com' : `localhost:${process.env.BACKEND_PORT}`;

let username = 'david';
let password = 'password';
let savedUser;

beforeAll(done => {
    server.start();
    User.remove({username: 'david'}).then(() => {
        newUser._save(newUser, [username, password]).then((user) => {
            savedUser = user;
            return done();
        });
    });

  });

afterAll(done => {
    server.stop();
    done();
});

test('Test that login doesnt work if we send wrong credentials', async (done) => {
    let response = await superagent.post(URL + '/login/signin').auth('david', 'wrongPassword');
    expect(response.body.login).toEqual(false);

    done();
});

test('Test that correct credentials give us a true for login and a token', async (done) => {
    let response = await superagent.post(URL + '/login/signin').auth('david', 'password');
    expect(response.body.login).toEqual(true);
    done();
});