'use strict';

var app = app || {};

(function(module) {
let homeView = [];

  $('#random-btn').click(function ( event ){
    event.preventDefault();
        var options = $('#userPos').children('option');
        var random = Math.floor(options.length * (Math.random() % 1));
        options.attr('selected', false).eq(random).attr('selected', true);
  });

  module.homeView = homeView;
})(app);
