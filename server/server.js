'use strict';

require('dotenv').config();

const express = require('express');
const app = module.exports = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

app.use(require(`./routes.js`));


let http = null;
let isRunning = null;

module.exports = {
   start: (test=false) => {
       if (isRunning) return "Server is already running";
       if (process.env.BACKEND_PORT === undefined) return console.log("You need to create a .env file like the guide says.");
       return http = app.listen(process.env.BACKEND_PORT, () => {
           if (!test) console.log(`Server is running on port ${process.env.BACKEND_PORT}`);
           isRunning = true;
           return;
       });

   },
   stop: () => {
        return new Promise(resolve => {
            if (http === null || !isRunning) return resolve(isRunning);
            http.close(() => {
                isRunning = false;
                http = null;
                return resolve(isRunning);
            });
        });

   }
}
