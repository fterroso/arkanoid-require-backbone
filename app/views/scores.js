/* globals define */
define(['text!templates/scores.html', 'backbone','jquery','underscore'], function(html, Backbone, $, _) {
  'use strict';

  var ScoresView = Backbone.View.extend({
    el: '#container',
    events: {
      'click .back_button': 'goBack'
    },
    template: _.template(html),
    render: function render() {
      this.$el.html(this.template({
        scores: this.collection.toJSON()
      }));
    },
    goBack: function goBack(){
      console.log("back button");
      Backbone.history.navigate('',true);
    }
  });

  return ScoresView;
});
