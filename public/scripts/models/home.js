'use strict';

var app = app || {};

(function(module) {

  // delete afterwards
  app.config = {
    "playerData": [], // put API data here
    "selected": "",
    "teams": 5,
    "position" : 1,
    "roster": [
        {"position":"WR", "value": 5},
        {"position":"RB", "value": 3},
        {"position":"QB", "value": 3},
        {"position":"TE", "value": 3},
        {"position":"WR/RB", "value": 3},
        {"position":"WR/RB/TE", "value": 3},
        {"position":"WR/RB/TE/QB", "value": 3},
        {"position":"K", "value": 3},
        {"position":"DEF", "value": 3}
      ],
    "draftOrder": [1,2,3,4,5,5,4,3,2,1,1,2,3,4,5], // example snake draft
    "teamSelected" : { // we need to dynamically build this based on the # of teams in the draft.
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }
  };

  //api request
  $.get('/api').then(results => {
    $.each(JSON.parse(results)['body']['average_draft_position']['players'], (index, player) => {
      app.config.playerData.push({"name": player.fullname, "bye": parseInt(player.bye_week), "adp":player.rank, "position": player.position, "team": player.pro_team});
    });
  });

  //app.config.roster
  let populateRoster = function() {
    var source   = $("#roster-template").html();
    var template = Handlebars.compile(source);
    var rosterTemplate = template(app.config.roster);

    $('.roster-position').append(rosterTemplate);
    $.each((app.config.roster), function(index, position){
      $(`#${position.position}`).val(`${position.value}`);
    });

  };
  populateRoster();
})(app);
