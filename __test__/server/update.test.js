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

test('Test that user is created and we can sign in', async (done) => {
    let response = await superagent.post(URL + '/login/signin').auth('david', 'password');

    expect(response.body.login).toEqual(true);
    done();
});


test('Test that we cant update if we dont send credentials', async (done) => {
    let response = await superagent.post(URL + '/login/signin');

    expect(response.body.message).toEqual('Please provide a username and password. Basic authentication required.');
    done();
});

test('Test that we cant update if we dont send all 3 pieces of auth', async (done) => {
    let response = await superagent.post(URL + '/login/update').auth('david', 'password');

    expect(response.body.updated).toEqual(false);
    done();
});

test('Test that we cant update if username is wrong', async (done) => {
    let response = await superagent.post(URL + '/login/update').auth('username1:password', 'newPassword');

    expect(response.body.updated).toEqual(false);
    done();
});


test('Test that we cant update if password is wrong', async (done) => {
    let response = await superagent.post(URL + '/login/update').auth('david:password1', 'newPassword');

    expect(response.body.updated).toEqual(false);
    done();
});

test('Test that we update if all things are accurate', async (done) => {
    let response = await superagent.post(URL + '/login/update').auth('david:password', 'newPassword');

    expect(response.body.updated).toEqual(true);
    done();
});

