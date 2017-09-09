'use strict';

var app = app || {};

(function(module) {
  const homeController = {};

  homeController.index = () => {
    $('.content').children().hide();
    $('#content-home').show();
  };

  module.homeController = homeController;
})(app);
