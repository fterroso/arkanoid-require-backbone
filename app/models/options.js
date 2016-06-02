/* globals define */
define(['backbone','jquery','localStorage'], function(Backbone, $, Store) {
  'use strict';
  var OptionsModel = Backbone.Model.extend({
    defaults: {
      musicOn: true,
      soundsOn: true
    },
    localStorage: new Store('ak-options'),
    pauseMusic: function setMusicOff(){
      console.log('music off model');
      this.set('musicOn', false);
      $('#music_tune').trigger('pause');
    },
    playMusic: function setMusicOn(){
      console.log('music on model');
      this.set('musicOn', true);
      $('#music_tune').trigger('play');
    },
    configMusic: function configMusic(){
      if(this.get('musicOn')){
       this.playMusic();
      }
    }
  });
  return OptionsModel;
});
