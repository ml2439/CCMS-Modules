define(function(require, exports, module) {

    var $ = require("jquery");
    var Alpaca = require("alpaca");
    var OneTeam = require("oneteam");
    var Registry = require("field-editor/field-registry");
    var AbstractAlpacaFieldEditor = require("field-editor/abstract-alpaca-field-editor");

    return Registry.registerFieldClass(AbstractAlpacaFieldEditor.extend({
                
        generateForm: function(schema, options, data, callback) {

            var c = {
                "schema": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string",
                            "required": true
                        },
                        "label": {
                            "type": "string"
                        },
                        "required": {
                            "type": "boolean"
                        },
                        "helper": {
                            "type": "string"
                        }
                    }
                },
                "options": {
                    "fields": {
                        "id": {
                            "label": "Name",
                            "type": "text"
                        },
                        "label": {
                            "label": "Display Label",
                            "type": "text"
                        },
                        "required": {
                            "rightLabel": "Make this field required",
                            "type": "checkbox"
                        },
                        "helper": {
                            "label": "Helper Text",
                            "type": "text"
                        }
                    }
                }
            };

            c.data = data;

            callback(null, c);

        },

        getSchemaValue: function(control) {
            var val = {
                "type": "string" 
            };
            val.required = control.childrenByPropertyId["required"].getValue();

            return val;
        },
        
        getOptionsValue: function(control) {
            var val = {
                "type": "summernote"
            };
            val.label = control.childrenByPropertyId["label"].getValue();
            val.helper = control.childrenByPropertyId["helper"].getValue();

            return val;
        },

        canHandle: function(schemaObj, optionsObj) {
            return schemaObj.type == "string" && optionsObj.type == "summernote";
        },

        getType: function() {
            return "Content";
        }
        
    }));

});
