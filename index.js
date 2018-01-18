// don't change this file. everything works fine.
require('dotenv').config();

require('./server/server.js').start(process.env.BACKEND_PORT || 3000);