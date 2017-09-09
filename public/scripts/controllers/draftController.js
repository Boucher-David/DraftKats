'use strict';

var app = app || {};

(function(module) {
  const draftController = {};

  draftController.index = () => {
    $('#draft').show().siblings().hide();
  };

  module.draftController = draftController;
})(app);
