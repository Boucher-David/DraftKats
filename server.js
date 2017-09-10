'use strict';

const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
// const conString = 'postgres://localhost:5432/DATABASE';
app.use(express.static('./public'));
app.listen(PORT, function(){
  console.log('surfs up!');
});

function proxyCBS(request, response) {
  console.log('Routing CBSSports request');
  requestProxy({
    url: `http://api.cbssports.com/api/fantasy/players/average-draft-position?version=3.0&response_format=JSON&SPORT=football`}
  )(request, response);
}

app.get('/api/*', proxyCBS);
