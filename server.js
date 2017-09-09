'use strict';

const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
// const conString = 'postgres://localhost:5432/DATABASE';
app.use(express.static('./public'));
app.listen(PORT, function(){
  console.log('surfs up!');
});
