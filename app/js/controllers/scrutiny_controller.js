module.exports = function(taskService, taskInfo) {
    var that = this;
    this.alcReport = {};
    this.saveReport = function() {
        taskService.attachForm(this, 'ALC Report', this.alcReport);
    };
    if(taskInfo.task.variables.internalForms && taskInfo.task.variables.internalForms['ALC Report']) {
    	this.alcReport = taskInfo.task.variables.internalForms['ALC Report'].data;
    }
};
