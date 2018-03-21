'use strict';

const superagent = require('superagent');

let footballAPI = 'http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json';
let soccerAPI = '';
let baseballAPI = '';
let basketballAPI = '';

let fetch = (api) => {
  return new Promise((resolve,reject) => {
    superagent.get(api).then(data => {
      if (data) resolve(data);
      return reject (null);
    });
  });
}

module.exports = {
  football: async () => {
    let footballPlayers = await fetch(footballAPI);
    let parsed = JSON.parse(footballPlayers.text).body.players;
    let positions = ['WR', 'RB', 'TE', 'QB', 'K', 'DEF'];
    Object.keys(parsed).forEach(i => {
      if (!positions.includes(parsed[i].position)) return;
      let player = {
        name: parsed[i].fullname,
        position: parsed[i].position,
        team: parsed[i].pro_team
      };

      console.log(player);

    });

    return footballPlayers;
  },
  soccer: () => {},
  baseball:() => {},
  baseketball: () => {}
}