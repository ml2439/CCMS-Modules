define(function (require, exports, module) {

    var Registry = require("medialink-builder/medialink-registry");
    var MediaLinkBuilder = require("medialink-builder/medialink-builder");

    return Registry.registerMediaLinkClass(MediaLinkBuilder.extend({

        /**
         * @override
         */
        getSchema: function () {
            return {
                "nphoto": {
                    "type": "string"
                },
                "ncolumn": {
                    "type": "string"
                }
            };
        },

        /**
         * @override
         */
        getOptions: function () {
            return {
                "nphoto": {
                    "type": "text",
                    "label": "Number of photos"
                },
                "ncolumn": {
                    "type": "text",
                    "label": "Number of columns"
                }
            };
        },

        /**
         * @override
         */
        generateLink: function (control, template, callback) {
            var el = MediaLinkBuilder.prototype.generateLink(control, template, callback);
            var src = "https://instagram.com/" + control.childrenByPropertyId["mediaId"].getValue();
            el.attr("src", src);

            callback(null, el);
        },

        /**
         * @override
         */
        canHandle: function (mediaType) {
            return mediaType == "instagram";
        }

    }));

});
