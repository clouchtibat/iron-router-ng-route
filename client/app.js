angular.module("root", [
  "ui.router",
  "angular-meteor"
])

.config(function($urlRouterProvider, $stateProvider, $locationProvider){
  
  $locationProvider.html5Mode(true);
  
  $stateProvider
  .state('main', {
    url: '/main',
    templateUrl: 'client/views/main.ng.html',
    reloadOnSearch: false
  })
  .state('main.page1', {
    url: '/page1',
    templateUrl: "client/views/main.page1.ng.html",
    controller: "page1Ctrl",
    reloadOnSearch: false
  })  
  .state('main.page2', {
    url: '/page2',
    templateUrl: "client/views/page2.ng.html",
    controller: "page2Ctrl",
    reloadOnSearch: false
  })   
  .state('export', {
    url: '/export',
    templateUrl: "client/views/export.ng.html",
    controller: "exportCtrl",
    reloadOnSearch: false
  })
  
  
  $urlRouterProvider.otherwise("/main/page1");
  
})

.controller("mainCtrl", function($scope) {

    console.log("angular mainCtrl controller");
  
})

.controller("page1Ctrl", function($scope, $stateParams) {

    console.log("angular page1Ctrl controller - params: "+angular.toJson($stateParams));
  
})

.controller("page2Ctrl", function($scope) {

    console.log("angular page2Ctrl controller");
  
})

.controller("exportCtrl", function($scope) {

    console.log("angular exportCtrl controller");
  
})


.run(function($rootScope, $location){

  $rootScope.$on("$stateChangeStart", function(){
    console.log("angular state change start: '"+$location.url()+"'");
  });
  
});