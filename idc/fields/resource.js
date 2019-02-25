define(function(require, exports, module) {

    var Alpaca = require("alpaca");

    Alpaca.Fields.ResourceField = Alpaca.Fields.ObjectField.extend({

        getFieldType: function() {
            return "resource";
        },

        setup: function()
        {
            this.base();

            this.schema = {
                "title": "Resource",
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "title": "Title"
                    },
                    "type": {
                        "type": "string",
                        "enum": [
                            "video",
                            "upload"
                        ]
                    },
                    "upload": {
                        "type": "string",
                        "format": "uri"
                    },
                    "videourl": {
                        "type": "string"
                    }
                },
                "dependencies": {
                    "upload": [
                        "type"
                    ],
                    "videourl": [
                        "type"
                    ]
                },
                "required": ["type"]
            };

            Alpaca.merge(this.options, {
                "fields": {
                    "type": {
                        "type": "radio",
                        "label": "Type"
                    },
                    "upload": {
                        "type": "file",
                        "label": "Upload",
                        "dependencies": {
                            "type": "upload"
                        },
                        "validator": function(callback) {
                            var type = this.getParent().childrenByPropertyId["type"].getValue();
                            var files = this.control[0].files;
                            if (type == "upload" && files.length < 1) {
                                callback({
                                    "status": false,
                                    "message": "value cannot be empty"
                                });
                                return;
                            }
                            callback({
                                "status": true
                            });
                        }
                    },
                    "videourl": {
                        "type": "text",
                        "label": "Video Url",
                        "dependencies": {
                            "type": "video"
                        },
                        "validator": function(callback) {
                            var value = this.getValue();
                            var type = this.getParent().childrenByPropertyId["type"].getValue();
                            if (type == "video" && value == "") {
                                callback({
                                    "status": false,
                                    "message": "value cannot be empty"
                                });
                                return;
                            }
                            callback({
                                "status": true
                            });
                        }
                    }
                }
            });
        },

        postRender: function(callback) 
        {
            var self = this;

            this.base(function() {

                self.childrenByPropertyId["type"].on("change", function() {
                    Alpaca.compileValidationContext(self.childrenByPropertyId["videourl"], function() {
                        Alpaca.compileValidationContext(self.childrenByPropertyId["upload"], function() {
                            // nothing
                        });
                    });
                });

                Alpaca.compileValidationContext(self.childrenByPropertyId["videourl"], function() {
                    Alpaca.compileValidationContext(self.childrenByPropertyId["upload"], function() {
                        callback();
                    });
                });

            });
        }
    });

    Alpaca.registerFieldClass("resource", Alpaca.Fields.ResourceField);

});
