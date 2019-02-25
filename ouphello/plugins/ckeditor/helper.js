define(function(require, exports, module) {

    var CKEDITOR = window.CKEDITOR;

    return {
        registerPlugin: function(pluginId)
        {
            var pluginPath = "../../../_modules/ouphello/plugins/ckeditor/ouphello/";

            CKEDITOR.plugins.addExternal(pluginId, pluginPath, 'plugin.js');

            if (CKEDITOR.config.extraPlugins.length > 0) {
                CKEDITOR.config.extraPlugins += ",";
            }
            CKEDITOR.config.extraPlugins += pluginId;
        }
    };
});
