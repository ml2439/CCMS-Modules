define(function(require, exports, module) {

    var CKEditorTools = require("ckeditor-tools");

    CKEditorTools.registerPlugin("helloworld", {
        "filepath": "ckeditor-plugins/helloworld/plugins/ckeditor/helloworld/plugin.js",
        "module": module
    });

});
