module.exports = function(userService) {
    var that = this;
    this.logout = function() {
        userService.logout(this);
    };
};
