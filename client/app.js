var old = {},
    appManager = new function () {
      this.currentAppName;
      this.currentApp;

      this.startApp = function (container, appName) {
        console.log("angular start app '"+appName+"'");
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


Router.route('/', function () {
  this.render('main');
});
Router.route('/other', function () {
  this.render('other');
});


Router.onBeforeAction(function(){
  console.log("iron router before action - new url: '"+this.url+"' -  old url: '"+old.url+"'");
  
  /*
  if(old.url!=this.url){
    old.url = this.url;
    this.next();
  }
  */
  this.next();
  
});

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
  "ngRoute",
  "angular-meteor"
])

.config(["$routeProvider", function($routeProvider){
  $routeProvider
  .when('/test', {
    templateUrl: 'client/views/test.ng.html',
    controller: 'testCtrl'
  })
  .when("/truc",{
    templateUrl: "client/views/truc.ng.html",
    controller: "trucCtrl",
    reloadOnSearch: false
  })
  .otherwise("/test");
  
}])

.controller("testCtrl", function($scope, $timeout) {

    console.log("angular test controller");
  
})

.controller("trucCtrl", function($scope, $timeout) {

    console.log("angular truc controller");
  
})

.run(function($rootScope, $location){

  $rootScope.$on("$routeChangeStart", function(){
    console.log("angular route change start: '"+$location.url()+"'");
  });
  
});
