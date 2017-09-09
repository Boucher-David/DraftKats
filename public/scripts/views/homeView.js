'use strict';

var app = app || {};

(function(module) {

  $('.dropdown').click(function( event ) {
    event.preventDefault();
    var sport = $( 'select#dropdown').val();
    // val is select, it hide it, if not show it
    if (sport == '#draft-configure')
      $('#draft-configure').show(IDK);
    else
      $('#draft-configure').hide(IDK);
  });

  module.homeView = homeView;
})(app);
