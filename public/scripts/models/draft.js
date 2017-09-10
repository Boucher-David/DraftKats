'use strict';

var app = app || {};

(function(module) {

$('.teams-tab').hide();
  $('#draft-nav').on('click', function(event){
    $(`.${event.target.id}-tab`).show().siblings().not('#draft-nav').hide();
  });

})(app);
