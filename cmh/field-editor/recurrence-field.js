define(function (require, exports, module) {

    var $ = require("jquery");
    var Alpaca = require("alpaca");
    var OneTeam = require("oneteam");
    var Registry = require("field-editor/field-registry");
    var AbstractFieldEditor = require("field-editor/abstract-field-editor");

    return Registry.registerFieldClass(AbstractFieldEditor.extend({

        render: function (el, schema, options, data, saveFunction, callback) {
            var self = this;

            self.generateForm(schema, options, data, function (err, c) {

                if (c.data.id) {
                    c.options.fields.id.readonly = true;
                }

                c.postRender = function (control) {

                    self.control = control;

                    var parentKeys = [];
                    var fieldId = control.childrenByPropertyId["id"].getValue();
                    var schemaVal = {
                        "type": "object"
                    };
                    var optionsVal = {
                        "type": "recurrence"
                    };
                    saveFunction(parentKeys, fieldId, schemaVal, optionsVal);

                    callback();

                };

                if (c.data) {
                    OneTeam.formEdit(el, c);
                }
                else {
                    OneTeam.formCreate(el, c);
                }
            });
        },

        generateForm: function (schema, options, data, callback) {

            var c = {
                "schema": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string",
                            "required": true
                        }
                    }
                },
                "options": {
                    "fields": {
                        "id": {
                            "label": "Name",
                            "type": "text"
                        }
                    }
                }
            };

            c.data = data;

            callback(null, c);

        },

        canHandle: function (schemaObj, optionsObj) {
            if (schemaObj.type == "object" && optionsObj.type == "recurrence") {
                return true;
            }
            return false;
        },

        getType: function () {
            return "Recurrence";
        }

    }));

});
