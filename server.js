'use strict';

const express = require('express');
const app = express();

const requestProxy = require('express-request-proxy')

app.use(express.static('./public'));
app.listen(process.env.PORT || 5000, function(){
  console.log('surfs up!');
});

app.get('/api', requestProxy({
  url: "https://draft.premierleague.com/api/bootstrap-static"
}));
