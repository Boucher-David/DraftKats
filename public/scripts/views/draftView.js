'use strict';

var app = app || {};

(function(module) {
  let draftView = [];
  const ui = function() {
    let $draft = $('#content-draft');
  };

  // const render = handlebars.compile($('#draft-template').text());

draftView.index = function() {
  ui();

  $('#content-draft').append(
    app.draftPlayer.with('Player Name').map(render)
  );
};
  module.draftView = draftView;
})(app);
