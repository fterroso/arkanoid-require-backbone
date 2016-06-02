/* globals define */
define(['models/options','collections/scores'], function(Options,Scores) {
  var OPTIONS_ID = 'ak-options-id';
  var SCORES_ID = 'ak-scores-id';
  function Config(){
    this.scores = new Scores({id: SCORES_ID});
    this.scores.fetch();
    this.options = new Options({id: OPTIONS_ID});
    this.options.fetch();
    this.options.configMusic();
  }
  return new Config();
});

