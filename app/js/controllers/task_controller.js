module.exports = function($scope, $state, taskService, userService, taskInfo, authInfo) {
    var that = this;
    this.selectForm = function(form) {

    };
    this.selectDocument = function(document) {

    };
    this.addComment = function() {
        taskService.addComment(this, this.commentText).then(function(response) {
            that.commentText = undefined;
            $scope.$apply();
        });
    };
    this.completeTask = function() {
        taskService.completeTask(this);
    };
    this.claimTask = function() {
        taskService.claimTask(this);
    };
    this.goBack = function() {
        $state.go('dashboard');
    };
    userService.me().then(function(response) {
        taskService.initTaskController(that);
        taskService.getComments(that);
    }, function(response) {
        console.error("Could not load user information");
    });
    this.task = taskInfo.task;
    this.user = authInfo.user;
};