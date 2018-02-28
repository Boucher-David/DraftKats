const expect = require('expect');
require('dotenv').config();
let server = require('../../server/server');
const superagent = require('superagent');

const User = require('../../server/models/User.js');
let newUser = new User();

let URL = (process.env.NODE_ENV === 'production') ? 'draftkats.herokuapp.com' : `localhost:${process.env.BACKEND_PORT}`;

let username = 'david';
let password = 'password';

beforeAll(done => {
    server.start();
    User.remove({username: 'david'}).then(() => {
        done();
    });
  });

afterAll(done => {
    server.stop();
    done();
});

test('Test user does not already exist', done => {
    User.findOne({username: username}).then(find => {
        expect(find).toEqual(null);
        done();
    });
});

test('Test that user isnt created if we fail to pass credentials', async (done) => {
    let response = await superagent.post(URL + '/login/signup');

    expect(response.body.message).toEqual('Please provide a username and password. Basic authentication required.');

    done();

});

test('Test that user isnt created if we pass only one credential', async (done) => {
    let response = await superagent.post(URL + '/login/signup').auth(username, '');


    expect(response.body.message).toEqual('Please provide a username and password. Basic authentication required.');

    done();
});

test('Test that we create a user correctly' , async (done) => {
    let response = await superagent.post(URL + '/login/signup').auth(username, password);

    expect(response.body.created).toEqual(true);
    done();
});



test('Test that we cannot duplicate a user', async (done) => {
    let response = await superagent.post(URL + '/login/signup').auth(username, password);

    expect(response.body.created).toEqual(false);
    expect(response.body.message).toEqual('User already exists.');
    done();
});