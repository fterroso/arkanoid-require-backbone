/* globals define */
define(['text!templates/menu-template.html', 'backbone'], function(html, Backbone) {
  'use strict';

  var HomeView = Backbone.View.extend({
    el: '#container',
    render: function render() {
      this.$el.html(html);
    }
  });

  return HomeView;
});
