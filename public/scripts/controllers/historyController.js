'use strict';

var app = app || {};

(function(module) {
  const historyController = {};

  historyController.index = () => {
    $('.content').children().hide();
    $('#content-history').show();
  };
  module.historyController = historyController;
})(app);
