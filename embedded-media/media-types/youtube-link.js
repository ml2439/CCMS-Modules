define(function (require, exports, module) {

    var Registry = require("medialink-builder/medialink-registry");
    var MediaLinkBuilder = require("medialink-builder/medialink-builder");

    return Registry.registerMediaLinkClass(MediaLinkBuilder.extend({

        /**
         * @override
         */
        getSchema: function () {
            return {
                "width": {
                    "type": "string"
                },
                "height": {
                    "type": "string"
                },
                "frameborder": {
                    "type": "string",
                    "enum": ["0", "1", "2"]
                },
                "allowfullscreen": {
                    "type": "boolean"
                }
            };
        },

        /**
         * @override
         */
        getOptions: function () {
            return {
                "width": {
                    "type": "text",
                    "label": "Width",
                    "default": "640"
                },
                "height": {
                    "type": "text",
                    "label": "Height",
                    "default": "360"
                },
                "frameborder": {
                    "type": "select",
                    "label": "Frame Border"
                },
                "allowfullscreen": {
                    "type": "checkbox",
                    "rightLabel": "Allow Full Screen?"
                }
            };
        },

        /**
         * @override
         */
        generateLink: function (control, template, callback) {
            var el = MediaLinkBuilder.prototype.generateLink(control, template, callback);
            var src = "https://www.youtube.com/embed/" + control.childrenByPropertyId["mediaId"].getValue();
            el.attr("src", src);

            callback(null, el);
        },

        /**
         * @override
         */
        canHandle: function (mediaType) {
            return mediaType == "youtube";
        }

    }));

});
