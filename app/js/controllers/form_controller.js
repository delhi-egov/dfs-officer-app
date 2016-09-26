module.exports = function($state, taskService, taskInfo) {
    var that = this;
    this.forms = {};
    this.saveForm = function(key) {
        taskService.attachForm(this, key, this.forms[key])
        .then(function(response) {
            if($state.params.variablesToSet) {
                var variables = [];
                $state.params.variablesToSet.forEach(function(item, index,arr) {
                    var variable = {
                        name: item.key,
                        value: eval(item.value)
                    };
                    variables.push(variable);
                });
                taskService.addVariables(that, variables);
            }
        }, function(response) {

        });
    };
    this.initController = function() {
    	var formList = $state.params.forms;
    	formList.forEach(function(item, index, arr) {
    		if(taskInfo.task.variables.internalForms && taskInfo.task.variables.internalForms[item]) {
    			that.forms[item] = taskInfo.task.variables.internalForms[item].data;
    		}
    		else {
    			that.forms[item] = {};
    		}
    	})
    };
    this.initController();
};
