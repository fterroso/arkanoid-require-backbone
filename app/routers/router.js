/* globals define */
define(['views/home-view',
        'views/game',
        'views/options',
        'views/scores',
        'config',
        'backbone'], function(HomeView, GameView, OptionsView, ScoresView, config, Backbone) {
  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      '': 'homeAction',
      'home': 'homeAction',
      'startGame': 'gameAction',
      'showOptions': 'optionsAction',
      'showScores': 'scoresAction',
    },
    config: config,
    initialize: function initialize(pushState) {
      Backbone.history.start({pushState: pushState});
    },
    homeAction: function() {
      var hv = new HomeView();
      hv.render();
    },
    gameAction: function() {
      var gm = new GameView();
      gm.render();
    },
    optionsAction: function() {
      var op = new OptionsView({model: this.config.options});
      op.render();
    },
    scoresAction: function(){
      console.log('scores action');
      var sc = new ScoresView({collection:this.config.scores});
      sc.render();
    }
  });
  return Router;
});
