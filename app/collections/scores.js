/* globals define */
define(['models/score', 'backbone', 'localStorage', ], function (Score, Backbone, Store) {
  'use strict';
  var ScoresCollection = Backbone.Collection.extend({
    model: Score,
    comparator: function sortBy(score1, score2) {
      return score1.get('score') <= score2.get('score');
    },
    localStorage: new Store('ak-scores2')
  });
  return ScoresCollection;
});
