'use strict';

var app = app || {};

(function(module) {
  const draftController = {};

  draftController.index = () => {

    $('#draft').show().siblings().hide();
    app.draftPlayer.requestRepos(app.repoView.index);
  };

  module.draftController = draftController;
})(app);
