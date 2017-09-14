'use strict';

var app = app || {};

(function(module) {

  app.populateDraft = function() {
    $.get(`/scripts/draft.hbs`, (source) => {

      $.each(app.config.playerData, (index, player) => {
        let template = Handlebars.compile(source);
        $('#content-draft').append(template(player));
      });
    });

  app.checkRoster = function(position, team){
    let teamPositionTotal = 0;
    let rosterPositionMax = 0;


      // loop through the team's roster.
      $.each(app.config.teamSelected[team], (index, player) => {
        if (player.position = position) {
          teamPositionTotal += 1;
        };
      });

      // total available roster spots for the position
      $.each(app.config.roster, (index, roster) => {
        if (roster.position = position) {
          rosterPositionMax = roster.value;
        }
      });
      return rosterPositionMax - teamPositionTotal;
    };

    // this will eventually be moved into draft logic
    app.checkRoster("WR", 1);

    app.createDraftOrder = function() {
      let totalSpots = 0;

      $.each(app.config.roster, (index, spot) => {
        totalSpots += spot.value;
      });

      for (var i = 0; i < totalSpots; i++) {
        let localI = i + 1;

        // Check for odd
        if (localI % 2 !== 0) {

          for (var j = 0; j < app.config.teams; j++) {
            let localJ = j + 1;
            app.config.draftOrder.push(localJ);
          }
        } else { // must be even
          for (var k = app.config.teams -1; k >= 0; k--) {
            let localK = k + 1;
            app.config.draftOrder.push(localK);
          };
        }
      }
    };
    
    app.setTeamsTab = function() {
    for (var i = 0; i < app.config.teams; i++){
      $('#blank').append($('<option>', {
        id:   `${i + 1}`,
        text: `Team ${i + 1}`
      }));

      $("#team-list").append(
        $('<div>', {
          class: `team-${i + 1}`
        })
      );
    };
  }
    
  app.setTeamPlayer = function(team, player) {
    // take in player data. 
    $(`.team-${team}`).append(`<h6>${player.position}:</h6><p>${player.name}</p>`);
  }
  
  $('#blank').on('change', function(event){
    $(`.team-${$(this).children(":selected").attr("id")}`).show().siblings().hide();
   });

  $("#team-list").children().hide();

  $('.teams-tab').hide();
    $('#draft-nav').on('click', function(event){
      $(`.${event.target.id}-tab`).show().siblings().not('#draft-nav').hide();
    });
  };
})(app);
