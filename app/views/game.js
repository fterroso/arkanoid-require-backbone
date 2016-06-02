/* globals define */
define(['text!templates/game.html', 'game', 'backbone'], function (html, gameEngine, Backbone) {
  'use strict';

  var Game = Backbone.View.extend({
    el: '#container',
    events: {
      'click .back_button': 'goBack'
    },
    runGame: function runGame() {
      gameEngine.init();
      gameEngine.runGame();
    },
    render: function render() {
      this.$el.html(html);
      this.runGame();
    },
    goBack: function goBackGame(){
      gameEngine.finish();
      Backbone.history.navigate('',true);
    }
  });

  return Game;
});
