(function() {

    var CKEDITOR = window.CKEDITOR;

    var pluginName = "helloworld";

    CKEDITOR.plugins.add(pluginName, {
        icons: pluginName,
        init: function (editor) {

            // button
            editor.ui.addButton(pluginName, {
                label: 'Hello World!',
                command: pluginName
            });

            editor.addCommand(pluginName, {
                exec: function (editor) {
                    editor.insertHtml("<em>Hello World!</em>");
                }
            });
        }
    });

})();