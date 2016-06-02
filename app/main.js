/* globals require */

require.config({
  baseUrl: 'app',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    backbone: 'vendors/backbone/backbone',
    localStorage: 'vendors/backbone.localStorage/backbone.localStorage',
    underscore: 'vendors/underscore/underscore',
    jquery: 'vendors/jquery-dist/jquery.min',
    pageslider: 'vendors/PageSlider/pageslider',
    text: 'vendors/text/text',
    templates: '../assets/html'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'underscore']
    }
  }
}) ;

require(['routers/router'] , function(Router) {
  console.log(Router);
  new Router();
});


