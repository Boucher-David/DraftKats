'use strict';

var app = app || {};


(function(module) {
  app.config = {
    "selected": null,
    "teams": 10,
    "position": 1,
    "roster": {
      "football": [
        {"position": "WR", "value": 1}
        {"position": "RB", "value": 2}
        {"position": "QB", "value": 3}
      ],
      "soccer": [
        {"position": "FWD", "value": 1}
        {"position": "MID", "value": 2}
        {"position": "DEF", "value": 3}
        {"position": "GK", "value": 3}
      ]
    }
  };

  module.home.setConfig = function() {
    module.config.selected = $('').find(':selected').text();
    module.config.teams = $('').find(':selected').text();
    module.config.position = $('').find(':selected').text();

    // need clever way of setting the roster options based on
    module.config.roster[module.config.selected] = blah;

    // save to local storage when complete
    module.home.saveConfig();
  },

  module.home.getConfig = function() {
    let local = localStorage.getItem("DraftKats");
    console.log(local);
    (local) ? module.config = local : null ;
  },

  module.home.saveConfig = function() {
    localStorage.saveItem("DraftKats", module.config);
  }

})(app);
