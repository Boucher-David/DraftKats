'use strict';

var app = app || {};

(function(module) {
  let populateDraft = function() {
    var source   = $("#draft-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < 10; i++) {
    $('#content-draft').append(template);
    }
  };
  populateDraft();

$('.teams-tab').hide();
  $('#draft-nav').on('click', function(event){
    $(`.${event.target.id}-tab`).show().siblings().not('#draft-nav').hide();
  });

})(app);
