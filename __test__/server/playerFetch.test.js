const expect = require('expect');
require('dotenv').config();
let server = require('../../server/server');
const superagent = require('superagent');
const playerFetch = require('../../server/lib/playerFetch');

let URL = (process.env.NODE_ENV === 'production') ? 'draftkats.herokuapp.com' : `localhost:${process.env.BACKEND_PORT}`;

beforeAll(async (done) => {
  server.start(true);
  return done();
});

afterAll(async (done) => {
  await server.stop();
  return done();
});

let correctAPI = 'http://api.cbssports.com/fantasy/players/list?versiojn=3.0&SPORT=football&response_format=json';
let incorrectAPI = 'fgfdgdfd';
let lessIncorrectAPI = 'http://api.cbssports.com/fantasy/players';

test('Test fetch returns null on incorrect url', async (done) => {

  let fetched = await playerFetch.fetch(incorrectAPI);
  expect(fetched).toEqual(null);

  return done();
});

test('Test fetch returns null on a correct url that 404s incorrect url', async (done) => {

  let fetched = await playerFetch.fetch(lessIncorrectAPI);
  expect(fetched).toEqual(null);

  return done();
});

test('Test fetch returns 200 when url is ok', async (done) => {

  let fetched = await playerFetch.fetch(correctAPI);

  expect(fetched).not.toEqual(null);
  expect(fetched.statusCode).toEqual(200);

  return done();
});