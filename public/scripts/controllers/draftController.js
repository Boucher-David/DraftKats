'use strict';

var app = app || {};

(function(module) {
  const draftController = {};

  draftController.index = () => {
    $('#content-draft').show().siblings().hide();
  };

  module.draftController = draftController;
})(app);
