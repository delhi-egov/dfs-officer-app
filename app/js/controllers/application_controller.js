module.exports = function($scope, $state, $sce, applicationService, userService, applicationInfo, authInfo) {
    var that = this;
    this.selectedAttachment = {};
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
    this.goBack = function() {
        $state.go('dashboard');
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
    this.application = applicationInfo.application;
    this.application.variables = this.parseVariables(this.application.variables);
    this.user = authInfo.user;
};