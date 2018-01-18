'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = module.exports = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/DraftKats', {useMongoClient: true});

app.use(require(`./routes.js`));
app.use(cors());

let http = null;
let isRunning = null;

module.exports = {
   start: (port) => {
       if (isRunning) return "Server is already running";
       http = app.listen(port, () => {
           isRunning = true;
           console.log(`Server is running in port: ${port}`);
           console.log('Did you run "npm run dev-db" to ensure your mongdb database is running?');
           if(port === 3000) console.log('Did you create an ENV file like the guide says? If not this will not work.');
       });
   },
   stop: () => {
       if (!isRunning) return "Server is already shut down";
       if (!http) return "Invalid Server";
       http.close(() => {
           http = null;
           isRunning = false;
           console.log('Server shut down.');
       });
   }
}
