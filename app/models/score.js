/* globals define */
define(['backbone'], function(Backbone) {
  'use strict';
  var ScoreModel = Backbone.Model.extend({
    defaults: {
      player: 'player',
      score: 0
    }
  });
  return ScoreModel;
});
