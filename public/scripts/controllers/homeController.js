'use strict';

var app = app || {};

(function(module) {
  const homeController = {};

  homeController.index = () => {
    $('#content-home').show().siblings().hide();
  };

  module.homeController = homeController;
})(app);
