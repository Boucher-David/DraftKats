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



  module.homeView = homeView;
})(app);
