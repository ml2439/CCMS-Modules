(function () {

    var CKEDITOR = window.CKEDITOR;

    var pluginName = "ouphello";

    CKEDITOR.plugins.add(pluginName, {
        icons: pluginName,
        init: function (editor) {

            // button
            editor.ui.addButton(pluginName, {
                label: 'Meow!',
                command: pluginName
            });

            editor.addCommand(pluginName, {
                exec: function (editor) {
                    editor.insertHtml("<em>Meow!</em>");
                }
            });
        }
    });

    CKEDITOR.on('dialogDefinition', function (ev) {
        // Take the dialog name and its definition from the event data.
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;

        // Check if the definition is from the dialog window you are interested in
        if (dialogName == 'table') {
            // Property Tab
            var info = dialogDefinition.getContents('info');

            info.get('txtWidth')['default'] = '70%';
            info.get('txtCellSpace')['default'] = '1';
            info.get('txtCellPad')['default'] = '2';
            info.get('selHeaders').items.splice(-1, 1);     // remove 'Both' option
            
            // Advanced Tab
            var more = dialogDefinition.getContents('advanced');

            more.get('advStyles')['default'] = "";

        }
    });

})();