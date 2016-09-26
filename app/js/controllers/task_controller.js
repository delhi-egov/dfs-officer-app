module.exports = function($scope, $state, $sce, taskService, userService, taskInfo, authInfo) {
    var that = this;
    this.selectedAttachment = {};
    this.logout = function() {
        userService.logout(this);
    };
    this.selectForm = function(formName, form) {
        this.selectedAttachment.name = formName;
        this.selectedAttachment.attachment = form;
        this.selectedAttachment.display = formName;
    };
    this.selectDocument = function(documentName, document) {
        this.selectedAttachment.name = documentName;
        this.selectedAttachment.attachment = document;
        if(document.endsWith('jpg') || document.endsWith('png') || document.endsWith('jpeg') || document.endsWith('svg')) {
            this.selectedAttachment.display = 'image';
            this.selectedAttachment.url = 'api/file/' + document;
        }
        else if(document.endsWith('pdf') || document.endsWith('doc') || document.endsWith('docx') || document.endsWith('txt')) {
            this.selectedAttachment.display = 'doc';
            this.selectedAttachment.url = $sce.trustAsResourceUrl('https://docs.google.com/viewer?embedded=true&url=http://localhost/api/file/' + document);
        }
        else {
            this.selectedAttachment.display = 'unknown';
        }
    };
    this.addComment = function() {
        taskService.addComment(this, this.commentText).then(function(response) {
            that.commentText = undefined;
            $scope.$apply();
        });
    };
    this.completeTask = function() {
        taskService.completeTask(this).then(function(response) {
            that.task = taskInfo.task;
            $scope.$apply();
            $state.go('dashboard');
        });
    };
    this.claimTask = function() {
        taskService.claimTask(this).then(function(response) {
            that.task = taskInfo.task;
            $scope.$apply();
        });
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