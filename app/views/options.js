/* globals define */
define(['text!templates/options.html', 'backbone'], function(html, Backbone) {
  'use strict';

  var Options = Backbone.View.extend({
    el:'#container',
    events: {
      'click #sound_off_button': 'setSoundOff',
      'click #sound_on_button': 'setSoundOn',
      'click #music_off_button': 'setMusicOff',
      'click #music_on_button': 'setMusicOn',
      'click .back_button': 'goBack'
    },
    template: html,
    render: function render() {
      this.model.fetch();
      //console.log('render', this.model);
      this.$el.html(html);
      if(this.model.get('musicOn')){
        this.showMusicOn();
      }else{
        this.showMusicOff();
      }
      if(this.model.get('soundsOn')){
        this.showSoundOn();
      }else{
        this.showSoundOff();
      }
      return this;
    },
    showSoundOff: function showSoundOff(){
      this.$('#sound_off_button').removeClass('button_off');
      this.$('#sound_off_button').addClass('button_active');
      this.$('#sound_on_button').removeClass('button_active');
      this.$('#sound_on_button').addClass('button_off');
    },
    setSoundOff: function setSoundOff(){
      this.model.set('soundsOn', false) ;
      this.model.save();
      console.log('setSoundOff', this.model);
      this.showSoundOff();
    },
    showSoundOn: function showSoundOn(){
      this.$('#sound_on_button').removeClass('button_off');
      this.$('#sound_on_button').addClass('button_active');
      this.$('#sound_off_button').removeClass('button_active');
      this.$('#sound_off_button').addClass('button_off');
    },
    setSoundOn: function setSoundOn(){
      this.model.set('soundsOn',true);
      this.model.save();
      console.log('setSoundOn', this.model);
      this.showSoundOn();
    },
    showMusicOff: function showMusicOff(){
      this.$('#music_off_button').removeClass('button_off');
      this.$('#music_off_button').addClass('button_active');
      this.$('#music_on_button').removeClass('button_active');
      this.$('#music_on_button').addClass('button_off');
    },
    setMusicOff: function setMusicOff(){
      this.model.pauseMusic();
      this.model.save();
      console.log('setMusicOff', this.model);
      this.showMusicOff();
    },
    showMusicOn: function showMusicOn(){
      this.$('#music_on_button').removeClass('button_off');
      this.$('#music_on_button').addClass('button_active');
      this.$('#music_off_button').removeClass('button_active');
      this.$('#music_off_button').addClass('button_off');
    },
    setMusicOn: function setMusicOn(){
      this.model.playMusic();
      this.model.save();
      console.log('setMusicOn', this.model);
      this.showMusicOn();
    },
    goBack: function goBack(){
      console.log("back button");
      Backbone.history.navigate('',true);
    }
  });

  return Options;
});
