const expect = require('expect');
require('dotenv').config();
let server = require('../../server/server');

const request = require('superagent');

beforeAll(done => {
    server.start();
    done();
  });

afterAll(done => {
    server.stop();
    done();
})



test('Test that server responds with 200 on /, showing server is live', async (done) =>{ 
    request.get(`localhost:${process.env.BACKEND_PORT}`).then(response => {
        expect(response.statusCode).toEqual(200);
        done();
    });
});