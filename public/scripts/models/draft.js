'use strict';

var app = app || {};

(function(module) {
  let populateDraft = function() {
    var source   = $("#draft-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < 10; i++) {
    $('#content-draft').append(template);
    }
  };
  populateDraft();

})(app);
