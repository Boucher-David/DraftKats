'use strict';

var app = app || {};

{


    app.home = function() {
        $('#content-home').show().siblings().hide();
        $('#startDraft').hide();
        app.pingAPI();
        app.populateRoster();
    }

    app.draft = function() {
        app.setConfig();
        $('#content-draft').show().siblings().hide();
        app.createDraftOrder();
        app.setTeamsTab();

        $('.draftPlayer').click(function(event) {
            let iD = $(this).parent().attr('id');

            // let obj = app.config.playerData.find(o => o.name === $(this).parent().attr('id'));   
            let getIndex = function(element){
                return element.id === iD;
            }

            let playerIndex = app.config.playerData.findIndex(getIndex);

            if (app.checkRoster(app.config.playerData[playerIndex].position,app.config.position) === 0) {
                $(this).css('color', 'red');
            return;
            }
            app.draftPlayer(playerIndex, app.config.position);
        });
        app.runAuction();
    }

    $('#blank').on('change', function(event){
        $(`.team-${$(this).children(":selected").attr("id")}`).show().siblings().hide();
    });

    
    $("#team-list").children().hide();
    
    $('#draft-nav').on('click', function(event){

        $(`.${event.target.id}-tab`).show().siblings().not('#draft-nav').hide();
    });

    $('#random-btn').click(function ( event ){
        event.preventDefault();
            var options = $('#userPos').children('option');
            var random = Math.floor(app.config.teams * (Math.random() % 1));
            options.attr('selected', false).eq(random).attr('selected', true);
    });
}
