module.exports = function(userService) {
    var that = this;
    this.credentials = {};
    this.login = function(error) {
    	if(!error) {
        	userService.login(this, this.credentials);
    	}
    };
};
