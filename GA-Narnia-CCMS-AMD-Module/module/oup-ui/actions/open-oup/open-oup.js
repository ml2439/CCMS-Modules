define(function (require, exports, module) {

    var Ratchet = require("ratchet/ratchet");

    return Ratchet.Actions.register("open-oup", Ratchet.AbstractAction.extend({

        defaultConfiguration: function()
        {
            var config = this.base();

            config.title = "Open OUP Home Page";

            return config;
        },

        execute: function(config, actionContext, callback)
        {
            window.open("http://global.oup.com/?cc=us");
            
            callback();
        }

    }));
});

