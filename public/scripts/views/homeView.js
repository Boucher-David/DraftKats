'use strict';

var app = app || {};

(function(module) {

  $('.dropdown').click(function( event ) {
    event.preventDefault();
    // val is select, it hide it, if not show it
    
    if ($( 'select#dropdown').val() === "select-sport") {
      $('.draft-configure').hide();  
    } else {
      $('.draft-configure').show();
    }
  });

  module.homeView = homeView;
})(app);
