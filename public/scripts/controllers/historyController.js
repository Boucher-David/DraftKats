'use strict';

var app = app || {};

(function(module) {
  const historyController = {};

  historyController.index = () => {
    $('#content-history').show().siblings().hide();
    };
  module.historyController = historyController;
})(app);
