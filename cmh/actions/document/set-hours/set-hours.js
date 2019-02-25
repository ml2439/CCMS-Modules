/**
 * A modal to set hours and generate JSON
 */
define(function (require, exports, module) {

    require("css!./set-hours.css");
    var html = require("text!./set-hours.html");

    var Ratchet = require("ratchet/ratchet");
    var $ = require("jquery");
    var Helper = require("./helper.js");

    return Ratchet.Actions.register("set-hours", Ratchet.AbstractUIAction.extend({

        defaultConfiguration: function () {
            var config = this.base();

            config.title = "Set Hours";
            config.iconClass = "fa fa-clock-o";

            return config;
        },

        execute: function (config, actionContext, callback) {
            this.doAction(actionContext, function (err, result) {
                callback(err, result);
            });
        },

        doAction: function (actionContext, callback) {
            var self = this;

            var modalTitle = "Set Hours";
            if (!actionContext.pageIsEditable) {
                modalTitle = "View Hours";
            }

            // pop up a modal dialog
            self.showModal(modalTitle, function (div, renderCallback) {

                // body
                $(div).find(".modal-body").html("");
                $(div).find(".modal-body").append("<div class='form'></div>");

                // append empty form
                $(div).find(".form").append(html);
                $(div).find(".isopen").css("display", "none");

                var period = Helper.period;

                // populate form with current JSON data
                try {
                    var document = actionContext.document;
                    if (!document) {
                        document = actionContext.observable("document").get();
                    }

                    var fieldId = actionContext.hoursFieldId;
                    var hoursData = Helper.convertHours(document[fieldId]);
                    var $parent;
                    hoursData.forEach(function ({ name, value }) {
                        var $el = $(div).find('[name="' + name + '"]');

                        if (name != "open" && name != "close") {
                            $parent = $el.closest(".entry");

                            Helper.fillData($el, value);
                            Helper.flipSwitch($el);
                        }
                        else {
                            if (name == "open") {
                                var $period = $(period);
                                var el = $period.find('[name="' + name + '"]');
                                $parent.find(".periodlist").append($period);
                            }
                            else if (name == "close") {
                                var el = $parent.find('[name="' + name + '"]').last();
                            }
                            Helper.fillData(el, value);
                        }
                    });
                }
                catch (err) {
                    // no document found -- creating a new instance
                }

                if (actionContext.pageIsEditable) {

                    // append the "Confirm" button
                    $(div).find('.modal-footer').append("<button class='btn btn-primary pull-right confirm'>Confirm</button>");

                    $(div).find("form").on("change", ".switch input", function () {
                        Helper.flipSwitch(this);
                    });

                    $(div).find("form").on("click", ".entry .add", function () {
                        $(this).closest(".isopen").find(".periodlist").append(period);
                    });

                    $(div).find("form").on("click", ".entry .remove", function () {
                        $(this).closest(".period").remove();
                    });

                    $(div).find("form").on("change", "select", function () {
                        $(this).find("option").removeAttr("selected");
                        $(this).find("option:selected").attr("selected", "selected");
                    });

                    // submit form
                    $(div).find(".confirm").click(function () {

                        var ohJson = {};
                        var arr = $(div).find("form").serializeArray();

                        var dayOpen = function (obj) {
                            if (obj.name.startsWith("switch-") && obj.value == "on") {
                                var index = "switch-".length;
                                return obj.name.substring(index);
                            }
                            return null;
                        };

                        for (var i = 0, cur = null; i < arr.length; ++i) {
                            var day = dayOpen(arr[i]);
                            if (day) {
                                var dayJson = {
                                    "state": "open",
                                    "hours": []
                                };

                                ohJson[day] = dayJson;
                                cur = day;
                            }
                            else {
                                // added hours but closed, ignore
                                if (!ohJson[cur]) {
                                    continue;
                                }

                                var curHours = ohJson[cur].hours;

                                if (arr[i].name == "open") {
                                    var newPeriod = {};
                                    newPeriod.open = arr[i].value;

                                    curHours.push(newPeriod);
                                }
                                else {
                                    curHours[curHours.length - 1].close = arr[i].value;
                                }
                            }
                        }

                        self.hideModal(function () {

                            callback(null, ohJson);

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

