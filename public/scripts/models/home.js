'use strict';

var app = app || {};

(function(module) {

  //api request

  $.get('/api', function(response){
    console.log(response);
  });

  // delete afterwards
  app.config = {
    playerData: [],
    "selected": "football",
    "teams": 10,
    "position": 1,
    "roster": {
      "football": [
        {"position": "WR", "value": 5},
        {"position": "RB", "value": 6},
        {"position": "QB", "value": 10}
      ],
      "soccer": [
        {"position": "FWD", "value": 1},
        {"position": "MID", "value": 2},
        {"position": "DEF", "value": 3},
        {"position": "GK", "value": 3}
      ]
    }
  };

  //app.config.roster
  let populateRoster = function() {
    $.get(`/scripts/roster.hbs`, (source) => {
      var template = Handlebars.compile(source);
      var rosterTemplate = template(app.config.roster[app.config.selected]);

      $('.roster-position').append(rosterTemplate);
      $.each((app.config.roster[app.config.selected]), function(index, position){
        console.log();
        $(`#${position.position}`).val(`${position.value}`);
      });

    });
  };
  populateRoster();
})(app);
