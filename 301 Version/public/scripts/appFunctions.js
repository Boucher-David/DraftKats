'use strict';

var app = app || {};

{
    app.config = {
        "playerData": [], // put API data here
        "selected": "",
        "teams": 4,
        "position" : 1,
        "roster": [
            {"position":"WR", "value": 1},
            {"position":"RB", "value": 1},
            {"position":"QB", "value": 1},
            {"position":"TE", "value": 1},
            {"position":"K", "value": 1},
            {"position":"DST", "value": 1}
        ],
        "draftOrder": [], // example snake draft
        "teamSelected" : {
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
          10: [],
          11: [],
          12: [],
          13: [],
          14: [],
          15: [],
          16: [],
        }
      };

    app.runAuction = function() {
      $('#intro').hide();
      // if everyone has drafted, don't run function anymore. Clear player data. Tell human the draft is over.
      if (app.config.draftOrder.length === 0) {
        app.config.playerData = [];

        let $teamList = $('.draft-tab');
        $teamList.remove();
          $('#team-list div:not(.team-1)').hide();
        return;
      }
      // If human is drafting, no need to run AI logic.
      if (app.config.draftOrder[0] === app.config.position) {
        $('#intro').show();
        return;
      }

      let i = 0;

      let valid = app.checkRoster(app.config.playerData[i].position, app.config.draftOrder[0]);

      if ((valid === "safe") || (valid > 0)) {
        app.draftPlayer(i, app.config.draftOrder[0]);
      } else {
        while(valid === 0) {
          i++;
          valid = app.checkRoster(app.config.playerData[i].position, app.config.draftOrder[0]);
        }
        app.draftPlayer(i, app.config.draftOrder[0]);
      }
    }

    app.draftPlayer = function(player, team) {
      // Push the player drafted into the correct team's [] for later tracking.

      // Highlight the player being drafted by giving them blue BG.
      // Then fade out that element, and finally remove it completely from list.
      $(`#${app.config.playerData[player].id}`).css('background-color', 'blue').fadeOut(2000, () => {
        (app.config.teamSelected[team]).push(app.config.playerData[player]);

        app.setTeamPlayer(team , app.config.playerData[player]);
        $(this).remove();
        // Remove the player from the player data so we can't draft them again
        app.config.playerData.splice(player, 1);
      
        // When team has drafted, remove them from snake list so they can't draft again
        app.config.draftOrder.shift();
  
        app.runAuction();
      });
    }

    app.populateDraft = function() {
        $.get(`/scripts/draft.hbs`, (source) => {
            $.each(app.config.playerData, (index, player) => {

                let localPlayer = player;
                
                localPlayer.id = localPlayer.name.replace(" ","_").replace("'","").replace(".","_").replace(".","_");
                
                let template = Handlebars.compile(source);
                $('.draft-tab').append(template(localPlayer));
            });
        })
    }

    app.checkRoster = function(position, team){
        let teamPositionTotal = 0;
        let rosterPositionMax = 0;
    
        if (app.config.teamSelected[team].length === 0) return "safe";
    
          // loop through the team's roster.
          $.each(app.config.teamSelected[team], (index, player) => {

            if (player.position === position) {
              teamPositionTotal += 1;
            };
          });
    
          // total available roster spots for the position
          $.each(app.config.roster, (index, roster) => {
            if (roster.position === position) {
              rosterPositionMax = roster.value;
            }
          });

          return rosterPositionMax - teamPositionTotal;
    };

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
    }

    app.setTeamsTab = function() {
        for (let i = 0; i < app.config.teams; i++){

          $('#blank').append($('<option>', {
            id:   `${i + 1}`,
            text: `Team ${i + 1}`
          }));
    
        };

        for (let i = 0; i < 16; i ++) {
          $("#team-list").append(
            $('<div>', {
              class: `team-${i + 1}`
            })
          );
        }
    }
    app.setTeamPlayer = function(team, player) {

        // take in player data. 
        $(`.team-${team}`).append(`<h6>${player.position}:</h6><p>${player.name}</p>`);
    }

    app.setConfig = function() {
        app.config.teams = parseInt($('#teamCount').find(':selected').text());
        app.config.position = parseInt($('#userPos').find(':selected').val());
        $.each(app.config.roster, (index, position) => {
          app.config.roster[index].value = parseInt($(`#${position.position}`).find(':selected').val());
        });
        // save to local storage when complete
        app.saveConfig([{"teams": app.config.teams, "position": app.config.position, "roster": app.config.roster}]);
    }

    app.getStorage = function() {
        
        try {
          let local = JSON.parse(localStorage.getItem("DraftKats"))[0];
          $(`#teamCount option[value=${local.teams}]`).attr('selected', 'selected');
          $(`#userPos option[value=${local.position}]`).attr('selected','selected');

          $.each(local.roster, (index, position) =>{
            $(`#${position.position} option[value=${position.value}]`).attr('selected','selected');
          });
        } catch(err){
          return;
        }

      }

    app.saveConfig = function(newConfig) {
        localStorage.setItem("DraftKats", JSON.stringify(newConfig));
    }

    app.pingAPI = function() {
        $.get('/api').then(results => {
            $.each(JSON.parse(results)['body']['average_draft_position']['players'], (index, player) => {
              app.config.playerData.push({"name": player.fullname, "bye": parseInt(player.bye_week), "adp":player.rank, "position": player.position, "team": player.pro_team});
            });
        }).then(function(){
            app.populateDraft();
            $('#startDraft').show();
        });
    }

    app.populateRoster = function() {
        $.get(`/scripts/roster.hbs`, (source) => {
          var template = Handlebars.compile(source);
          var rosterTemplate = template(app.config.roster);
    
          $('.roster-position').append(rosterTemplate);
          $.each((app.config.roster), function(index, position){
            $(`#${position.position}`).val(`${position.value}`);
          });
          app.getStorage();
        });
    }    
}
