'use strict';

const superagent = require('superagent');

let footballAPI = 'http://api.cbssports.com/fantasy/players/list?versiojn=3.0&SPORT=football&response_format=json';
let soccerAPI = 'https://fantasy.premierleague.com/drf/bootstrap-static';
let baseballAPI = 'http://api.cbssports.com/fantasy/players/list?versiojn=3.0&SPORT=baseball&response_format=json';
let basketballAPI = 'http://data.nba.net/10s/prod/v1/2017/players.json';

let models = {
  Football: require('../models/Football'),
  Soccer: require('../models/Soccer'),
  Baseball: require('../models/Baseball'),
  Basketball: require('../models/Basketball')
}


let fetch = (api) => {
  return new Promise((resolve,reject) => {
    superagent.get(api).then(data => {
      if (data) resolve(data);
      return reject (null);
    });
  });
}

let saveList = async (sport, list, date) => {
  console.log('Player list received for: ', sport);

  if (date) {

    await models[sport].remove({});
    list.forEach(async (player) => {
      player['drafted'] = [];
      player['adp'] = null;
      let newPlayer = new models[sport](player);
      await newPlayer.save();
    });
  } else {

    list.forEach(async (player) => {
      let findPlayer = await models[sport].find({name: player.name});

      if (Object.keys(findPlayer).length === 0) {
        let newPlayer = new models[sport](player);
        await newPlayer.save();
      } else {
        let changed = false;

        if (findPlayer[0].name !== player.name) {
          findPlayer[0].name = player.name;
          changed = true;
        }

        if (findPlayer[0].team !== player.team) {
          findPlayer[0].team = player.team;
          changed = true;
        }

        if (findPlayer[0].position !== findPlayer[0].position) {
          findPlayer[0].position = findPlayer[0].position;
          changed = true;
        }

        if (!changed) return;

        await findPlayer.save();

        return;

      }
    });
  }

}

module.exports = {
  saveList: saveList, 
  Football: async (date) => {
    let footballPlayers = await fetch(footballAPI);
    let parsed = JSON.parse(footballPlayers.text).body.players;
    let positions = ['WR', 'RB', 'TE', 'QB', 'K', 'DEF'];
    let playerArray = [];
    Object.keys(parsed).forEach(i => {
      if (!positions.includes(parsed[i].position)) return;
      
      if (parsed[i].pro_status !== 'A') return;

      let player = {
        name: parsed[i].fullname,
        position: parsed[i].position,
        team: parsed[i].pro_team
      };
      playerArray.push(player);
    });
    saveList('Football',playerArray, date);
    return playerArray;
  },
  Soccer: async (date) => {
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
      if (parsed[i].status === 'u') return;
      let player = {
        position: position[parsed[i].element_type],
        team: teams[parsed[i].team_code],
        name: parsed[i].first_name.concat(' ', parsed[i].second_name)
      }
      playerArray.push(player);
    });

    saveList('Soccer', playerArray, date);
    return;
  },
  Baseball:async (date) => {
    let baseballPlayers = await fetch(baseballAPI);
    let parsed = JSON.parse(baseballPlayers.text).body.players;
    let playerArray = [];

    Object.keys(parsed).forEach(i => {

      if (parsed[i].pro_status !== 'A') return;
      let player = {
        name: parsed[i].fullname,
        position: parsed[i].position,
        team: parsed[i].pro_team
      }
      playerArray.push(player);
    });

    saveList('Baseball',playerArray, date);

    return;
  },

  Basketball: async (date) => {
    let basketballTeams = await fetch('http://data.nba.net/10s/prod/v1/2017/teams.json');
    let parsedTeams = JSON.parse(basketballTeams.text).league.standard;

    let teamList = {};
    let playerList = [];

    parsedTeams.forEach(team => {
      teamList[team['teamId']] = team['tricode'];
    });

    let basketballPlayers = await fetch(basketballAPI);
    let parsedPlayers = JSON.parse(basketballPlayers.text).league.standard;

    parsedPlayers.forEach(player => {
      if (teamList[player.teamId] === undefined) return;
      let playerObj = {
        team: teamList[player.teamId],
        position: player.pos,
        name: player.firstName.concat(' ', player.lastName)
      };

      playerList.push(playerObj);
    });

    saveList('Basketball', playerList, date);
  }
}