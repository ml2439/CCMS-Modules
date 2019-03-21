define(function(require, exports, module) {

    var CKEditorTools = require("ckeditor-tools");

    CKEditorTools.registerPlugin("helloworld", {
        "filepath": "plugin.js",
        "module": module
    });

});
