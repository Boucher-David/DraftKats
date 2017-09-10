'use strict';

const express = require('express');
const app = express();
const requestProxy = require('express-request-proxy')

app.use(express.static('./public'));

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/handlebars', express.static(__dirname + '/node_modules/handlebars/dist/'));
app.use('/page', express.static(__dirname + '/node_modules/page/'));

app.listen(process.env.PORT || 5000, function(){
  console.log('surfs up!');
});

app.get('/api', requestProxy({
  url: "https://draft.premierleague.com/api/bootstrap-static"
}));
