var angular = require("angular");

require("angular-ui-router");
require("ng-file-upload");
require('angular-ui-router-styles');
var angularUtilsPagination = require('angular-utils-pagination');

var angularOfficerClient = require("angular-officer-client");
var routes = require("./routes");

var userController = require("./controllers/user_controller");
var loginController = require("./controllers/login_controller");
var dashboardController = require("./controllers/dashboard_controller");
var taskController = require("./controllers/task_controller");

var app = angular.module("app", ['ui.router', 'ngFileUpload', 'uiRouterStyles', angularUtilsPagination]);

//Filters
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

//Interceptors registration
app.factory("authenticationInterceptor", ['$q', '$location', '$injector', 'authInfo', angularOfficerClient.authenticationInterceptor]);

//Services registration
app.factory("authInfo", angularOfficerClient.infoHolder);
app.factory("taskInfo", angularOfficerClient.infoHolder);
app.factory("backendClient", ['$http', 'Upload', angularOfficerClient.backendClient]);
app.factory("userService", ['$state', 'backendClient', 'authInfo', angularOfficerClient.userService]);
app.factory("taskService", ['$state', 'backendClient', 'authInfo', 'taskInfo', angularOfficerClient.taskService]);

//Controller registration
app.controller("userController", ['userService', userController]);
app.controller("loginController", ['userService', loginController]);
app.controller("taskController", ['userService', taskController]);
app.controller("dashboardController", ['userService', 'taskService', 'authInfo', '$state', '$scope', '$timeout', dashboardController]);

//Configuration
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
	$httpProvider.interceptors.push('authenticationInterceptor');
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	routes($stateProvider, $urlRouterProvider, $locationProvider);
}]);

//Run on load
app.run(['backendClient', 'authInfo', function(backendClient, authInfo) {
	backendClient.me().then(function(response) {
		console.log("User data loaded");
	}, function(response) {
		console.error("Could not load user information");
	});
}]);
