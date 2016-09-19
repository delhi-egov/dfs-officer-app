module.exports = function($stateProvider, $urlRouterProvider, $locationProvider) {
    var params = {
        processType: undefined,
        currentStage: undefined,
        params: undefined
    };

    $stateProvider

    .state('user',  {
        //url: '/user',
        abstract: true,
        templateUrl: 'app/views/usermanagement.html',
        controller: 'userController',
        controllerAs: 'uc',
        data: {
            css: 'build/stylesheets/usermanagement.css'
        }
    })
    .state('user.login', {
      //url: '/login',
      templateUrl: 'app/views/partials/login.html',
      controller: 'loginController',
      controllerAs: 'lc',
      data: {
            css: ['build/stylesheets/login.css', 'build/stylesheets/usermanagement.css']
      }
  })
    .state('dashboard',  {
        url: '/',
        templateUrl: 'app/views/dashboard.html',
        controller: 'dashboardController',
        controllerAs: 'dc',
        data: {
            css: 'build/stylesheets/dashboard.css'
        }
    })
    .state('task', {
      //url: '/',
      abstract: true,
      templateUrl: 'app/views/task.html',
      controller: 'taskController',
      controllerAs: 'tc',
      data: {
            css: 'build/stylesheets/task.css'
      }
  })
    .state('task.scrutiny', {
      //url: '/',
      templateUrl: 'app/views/partials/scrutiny.html',
      controller: 'scrutinyController',
      controllerAs: 'sc'
  })
    .state('application',  {
        templateUrl: 'app/views/application.html',
        controller: 'applicationController',
        controllerAs: 'ac',
        data: {
            css: 'build/stylesheets/task.css'
        }
    });

    $urlRouterProvider.otherwise('/');

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
};
