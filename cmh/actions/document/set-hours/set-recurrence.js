/**
 * A modal to set recurrence for an event and generate JSON
 */
define(function (require, exports, module) {

    require("css!./set-recurrence.css");
    var html = require("text!./set-recurrence.html");

    var Ratchet = require("ratchet/ratchet");
    var $ = require("jquery");
    var Helper = require("./helper.js");

    return Ratchet.Actions.register("set-recurrence", Ratchet.AbstractUIAction.extend({

        defaultConfiguration: function () {
            var config = this.base();

            config.title = "Set Recurrence";
            config.iconClass = "fa fa-calendar";

            return config;
        },

        execute: function (config, actionContext, callback) {
            this.doAction(actionContext, function (err, result) {
                callback(err, result);
            });
        },

        doAction: function (actionContext, callback) {
            var self = this;

            var modalTitle = "Set Recurrence";
            if (!actionContext.pageIsEditable) {
                modalTitle = "View Recurrence";
            }

            // pop up a modal dialog
            self.showModal(modalTitle, function (div, renderCallback) {

                // body
                $(div).find(".modal-body").html("");
                $(div).find(".modal-body").append("<div class='form'></div>");

                // append empty form
                $(div).find(".form").append(html);
                $(div).find(".pickdays").css("display", "none");

                // populate form with current JSON data
                try {
                    var document = actionContext.document;
                    if (!document) {
                        document = actionContext.observable("document").get();
                    }

                    var fieldId = actionContext.recurrenceFieldId;
                    var jsonData = document[fieldId];
                    Object.keys(jsonData).forEach((name) => {
                        var el = $(div).find('[name="' + name + '"]');
                        Helper.fillData(el, jsonData[name]);
                    });

                    var selectEl = $(div).find("select");
                    Helper.repeatEveryWeek(selectEl);
                }
                catch (err) {
                    // no document found -- creating a new instance
                }

                if (actionContext.pageIsEditable) {

                    // append the "Confirm" button
                    $(div).find('.modal-footer').append("<button class='btn btn-primary pull-right confirm'>Confirm</button>");

                    $(div).find("form").on("change", "select", function () {
                        Helper.repeatEveryWeek(this);
                    });

                    $(div).find("form").on("change", "input[type='date']", function () {
                        $(this).attr("value", $(this).val());
                    });

                    // submit form
                    $(div).find(".confirm").click(function () {

                        var recurrenceJson = {};
                        var arr = $(div).find("form").serializeArray();

                        for (var i = 0; i < arr.length; ++i) {
                            recurrenceJson[arr[i].name] = arr[i].value;
                        }

                        self.hideModal(function () {
                            callback(null, recurrenceJson);
                        });

                    });
                }

                renderCallback(function () {

                    // TODO: anything here?

                });

            });
        }

    }));
});

