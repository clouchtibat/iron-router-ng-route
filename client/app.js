var old = {},
    appManager = new function () {
      this.currentAppName;
      this.currentApp;

      this.startApp = function (container, appName) {
        console.log("angular start app '"+appName+"' - old app: "+this.currentAppName);
        if(appName && this.currentAppName!=appName){
          if (this.currentApp) {
            this.destroyApp(this.currentApp, this.currentAppName);
          }
          this.currentAppName = appName;
          this.currentApp = angular.bootstrap(container, [appName]);      
        }
      }

      this.destroyApp = function (app, appName) {
        var $rootScope = app.get('$rootScope');
        $rootScope.$destroy();
      }
    };


Router.route('/(.*)', function () {
  this.render('main');
});
/*
Router.route('/other', function () {
  this.render('other');
});
*/

/*

Router.onBeforeAction(function(){
  console.log("iron router before action - new url: '"+this.url+"' -  old url: '"+old.url+"'");
  

  if(this.url=="/other"){
    this.redirect("other")
  }
  else {
    if(old.url!=this.url){
      old.url = this.url;
      this.next();
    }    
  }
  
  
});

*/


Router.onAfterAction(function() {
        
  console.log("iron router after action");

  Tracker.afterFlush(function() {
    var body = angular.element(".body"),
        app = body.data("app");

    console.log("iron router tracker afterFlush - angular app name: '"+app+"'");  
    appManager.startApp(body, app);

  });

});


angular.module("main", [
  "ui.router",
  "angular-meteor"
])

.config(function($urlRouterProvider, $stateProvider, $locationProvider){
  
  $locationProvider.html5Mode(true);
  
  $stateProvider
  .state('test', {
    url: '/test',
    templateUrl: 'client/views/test.ng.html',
    controller: 'testCtrl',
    reloadOnSearch: false
  })
  .state('truc', {
    url: '/truc',
    templateUrl: "client/views/truc.ng.html",
    controller: "trucCtrl",
    reloadOnSearch: false
  })  
  
  
  $urlRouterProvider.otherwise("/test");
  
})

.controller("testCtrl", function($scope, $timeout, $stateParams) {

    console.log("angular test controller - params: "+angular.toJson($stateParams));
  
})

.controller("trucCtrl", function($scope, $timeout) {

    console.log("angular truc controller");
  
})

.run(function($rootScope, $location){

  $rootScope.$on("$stateChangeStart", function(){
    console.log("angular state change start: '"+$location.url()+"'");
  });
  
});