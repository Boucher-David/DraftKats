'use strict';

var app = app || {};

(function(module) {
let homeView = [];

  $('.dropdown').change(function( event ) {
    event.preventDefault();
    // val is select, it hide it, if not show it

    if ($( 'select#dropdown').val() === "select-sport") {
      $('.draft-config').hide();
    } else {
      $('.draft-config').show();
    }
  });

  $('#random-btn').click(function ( event ){
    event.preventDefault();
        var options = $('#userPos').children('option');
        var random = Math.floor(options.length * (Math.random() % 1));
        options.attr('selected', false).eq(random).attr('selected', true);
        console.log(options);
  });

  module.homeView = homeView;
})(app);
