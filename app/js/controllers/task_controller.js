module.exports = function($state, taskService) {
    var that = this;
    this.selectForm = function(form) {

    };
    this.selectDocument = function(document) {

    };
    this.addComment = function() {
        taskService.addComment(this, this.commentText);
    };
    this.completeTask = function() {
        taskService.completeTask(this);
    };
    this.claimTask = function() {
        taskService.claimTask(this);
    };
    userService.me().then(function(response) {
        taskService.initTaskController(that);
        taskService.getComments(that);
    }, function(response) {
        console.error("Could not load user information");
    });

};