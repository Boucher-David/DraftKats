'use strict';

const express = require('express');
const app = express();

var request = require('superagent');

app.use(express.static('./public'));

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/handlebars', express.static(__dirname + '/node_modules/handlebars/dist/'));
app.use('/page', express.static(__dirname + '/node_modules/page/'));

app.listen(process.env.PORT || 5000, function(){
  console.log('Touchdown!!');
});

app.get('/api', function(req, res) {
  request.get('http://api.cbssports.com/fantasy/players/average-draft-position?version=3.0&response_format=JSON&SPORT=football').end((err, response) =>{
    res.send(response.text);
  });
});
