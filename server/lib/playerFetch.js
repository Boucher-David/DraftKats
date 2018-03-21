'use strict';

const superagent = require('superagent');

let footballAPI = 'http://api.cbssports.com/fantasy/players/list?versiojn=3.0&SPORT=football&response_format=json';
let soccerAPI = 'https://fantasy.premierleague.com/drf/bootstrap-static';
let baseballAPI = 'http://api.cbssports.com/fantasy/players/list?versiojn=3.0&SPORT=baseball&response_format=json';
let basketballAPI = '';

let fetch = (api) => {
  return new Promise((resolve,reject) => {
    superagent.get(api).then(data => {
      if (data) resolve(data);
      return reject (null);
    });
  });
}

let saveList = (sport, list) => {
  console.log(sport, list.length);
}

module.exports = {
  Football: async () => {
    let footballPlayers = await fetch(footballAPI);
    let parsed = JSON.parse(footballPlayers.text).body.players;
    let positions = ['WR', 'RB', 'TE', 'QB', 'K', 'DEF'];
    let playerArray = [];
    Object.keys(parsed).forEach(i => {
      if (!positions.includes(parsed[i].position)) return;
      let player = {
        name: parsed[i].fullname,
        position: parsed[i].position,
        team: parsed[i].pro_team
      };
      playerArray.push(player);
    });
    saveList('Football',playerArray);
    return playerArray;
  },
  Soccer: async () => {
    let soccerPlayers = await fetch(soccerAPI);
    let parsed = soccerPlayers.body.elements;
    let playerArray = [];

    let position = {
      1: 'GK',
      2: 'DEF',
      3: 'MID',
      4: 'FWD'
    }

    let teams = {};


    Object.keys(soccerPlayers.body.teams).forEach(team => {

      let code = soccerPlayers.body.teams[team]['code'];
      let short = soccerPlayers.body.teams[team]['short_name']
   
      teams[code] = short;
    });

    Object.keys(parsed).forEach(i => {
      let player = {
        position: position[parsed[i].element_type],
        team: teams[parsed[i].team_code],
        name: parsed[i].first_name.concat(' ', parsed[i].second_name)
      }
      playerArray.push(player);
    });

    saveList('Soccer', playerArray);
    return;
  },
  Baseball:async () => {
    let baseballPlayers = await fetch(baseballAPI);
    let parsed = JSON.parse(baseballPlayers.text).body.players;
    let playerArray = [];

    Object.keys(parsed).forEach(i => {
      let player = {
        name: parsed[i].fullname,
        position: parsed[i].position,
        team: parsed[i].pro_team
      }
      playerArray.push(player);
    });

    saveList('Baseball',playerArray);

    return;
  },

  Baseketball: () => {}
}