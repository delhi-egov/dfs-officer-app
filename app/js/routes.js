module.exports = function($stateProvider, $urlRouterProvider, $locationProvider) {
    var params = {
        processType: undefined,
        currentStage: undefined,
        params: undefined
    };

    $stateProvider

    .state('user',  {
        abstract: true,
        templateUrl: 'app/views/usermanagement.html',
        controller: 'userController',
        controllerAs: 'uc',
        data: {
            css: 'build/stylesheets/usermanagement.css'
        }
    })
    .state('user.login', {
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
    .state('application',  {
        templateUrl: 'app/views/application.html',
        controller: 'applicationController',
        controllerAs: 'ac',
        data: {
            css: 'build/stylesheets/task.css'
        }
    })
    .state('task', {
      abstract: true,
      templateUrl: 'app/views/task.html',
      controller: 'taskController',
      controllerAs: 'tc',
      data: {
            css: 'build/stylesheets/task.css'
      }
  })
    .state('task.Building_Inspection', {
      templateUrl: 'app/views/partials/building_inspection.html',
      controller: 'formController',
      controllerAs: 'fc',
      params: {
        forms: ['Inspection Details']
      }
  })
    .state('task.Recommendations-submission-by-Assistant-Divisional-Officer', {
      templateUrl: 'app/views/partials/recommendations.html',
      controller: 'formController',
      controllerAs: 'fc',
      params: {
        forms: ['Recommendations']
      }
  })
    .state('task.Review-by-Divisional-Officer', {
      templateUrl: 'app/views/partials/doReview.html',
      controller: 'formController',
      controllerAs: 'fc',
      params: {
        forms: ['Divisional Officer Review' ],
        variablesToSet: [
          {
            key: "isOk",
            value: "JSON.parse(that.forms['Divisional Officer Review'].decision)"
          }
        ]
      }
  })
    .state('task.Review-by-Deputy-Chief-Fire-Officer', {
      templateUrl: 'app/views/partials/dcfoReview.html',
      controller: 'formController',
      controllerAs: 'fc',
      params: {
        forms: ['Deputy Chief Fire Officer Review' ],
        variablesToSet: [
          {
            key: "isOk",
            value: "JSON.parse(that.forms['Deputy Chief Fire Officer Review'].decision)"
          }
        ]
      }
  })
    .state('task.Decision-on-application-by-Director', {
      templateUrl: 'app/views/partials/decision.html',
      controller: 'formController',
      controllerAs: 'fc',
      params: {
        forms: ['Decision' ],
        variablesToSet: [
          {
            key: "isOk",
            value: "JSON.parse(that.forms['Decision'].decision)"
          }
        ]
      }
  });

    $urlRouterProvider.otherwise('/');

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
};
