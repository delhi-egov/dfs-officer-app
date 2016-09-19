module.exports = function(userService, taskService, applicationService, authInfo, $state, $scope, $timeout) {
    var that = this;
    this.tasks = [];
    this.userTasksActive = true;
    $timeout(function() {
        that.user = authInfo.user;
    }, 1000);
    this.logout = function() {
        userService.logout(this);
    };
    this.refresh = function() {
        this.getTasks();
    };
    this.selectTask = function(task) {
        taskService.selectTask(that, task);
        $state.go('task.' + task.taskDefinitionKey);
    };
    this.showUserTasks = function() {
        this.tasks = this.userTasks;
        this.userTasksActive = true;
    };
    this.showQueuedTasks = function() {
        this.tasks = this.queuedTasks;
        this.userTasksActive = false;
    };
    this.parseVariables = function(variables) {
        var parsed = {};
        if(!variables) {
            return parsed;
        }
        variables.forEach(function(item, index, arr) {
            if(item.type === 'map') {
                parsed[item.name] = JSON.parse(item.value);
            }
            else {
                parsed[item.name] = item.value;
            }
        });
        return parsed;
    };
    this.sort = function(keyname){
        this.sortKey = keyname;   //set the sortKey to the param passed
        this.reverse = !this.reverse; //if true make it false and vice versa
    };
    this.getTasks = function() {
        taskService.getTasks(that).then(function(data) {
            that.userTasks.forEach(function(item, index, arr) {
                item.variables = that.parseVariables(item.variables);
            });
            that.showUserTasks();
        });
        taskService.getQueuedTasks(that).then(function(data) {
            that.queuedTasks.forEach(function(item, index, arr) {
                item.variables = that.parseVariables(item.variables);
            });
        });
    };
    this.getHistoricalApplication = function() {
        applicationService.getHistoricalProcess(this.applicationSearchId)
        .then(function (response) {
            $state.go('application');
        })
    },
    userService.me().then(function(response) {
        that.getTasks();
    }, function(response) {
        console.error("Could not load user information");
    });
};
