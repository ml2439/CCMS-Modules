/**
 * A modal to set irregular hours and generate JSON
 */
define(function (require, exports, module) {

    require("css!./set-irregular-hours.css");
    var html = require("text!./set-irregular-hours.html");

    var Ratchet = require("ratchet/ratchet");
    var $ = require("jquery");
    var Helper = require("./helper.js");

    return Ratchet.Actions.register("set-irregular-hours", Ratchet.AbstractUIAction.extend({

        defaultConfiguration: function () {
            var config = this.base();

            config.title = "Set Irregular Hours";
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

            var modalTitle = "Set Irregular Hours";
            if (!actionContext.pageIsEditable) {
                modalTitle = "View Irregular Hours";
            }

            // pop up a modal dialog
            self.showModal(modalTitle, function (div, renderCallback) {

                // body
                $(div).find(".modal-body").html("");
                $(div).find(".modal-body").append("<div class='form'></div>");

                // append empty form
                $(div).find(".form").append(html);
                $(div).find(".isopen").css("display", "none");

                var record = Helper.record;
                var period = Helper.period;

                // populate form with current JSON data
                try {
                    var document = actionContext.document;
                    if (!document) {
                        document = actionContext.observable("document").get();
                    }

                    var fieldId = actionContext.hoursIrregularFieldId;
                    var irregularHoursData = Helper.convertIrregularHours(document[fieldId]);

                    var $parent, $record;

                    irregularHoursData.forEach(function ({ name, value }) {
                        if (name == "name") {
                            var addRecordButton = $(div).find(".add-record");
                            $record = $(record);
                            $record.insertBefore(addRecordButton);
                            var el = $record.find('[name="' + name + '"]');
                            Helper.fillData(el, value);
                        }
                        else if (name == "date") {
                            var el = $record.find('[name="' + name + '"]');
                            Helper.fillData(el, value);
                        }
                        else if (name == "switch") {
                            var el = $record.find('[name="' + name + '"]');
                            $parent = el.closest(".entry");

                            Helper.fillData(el, value);
                            Helper.flipSwitch(el);
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

                    $(div).find("form").on("click", ".add-record", function () {
                        $(record).insertBefore($(this));
                    });

                    $(div).find("form").on("click", ".remove-record", function () {
                        $(this).closest(".record").remove();
                    });

                    $(div).find("form").on("change", "select", function () {
                        $(this).find("option").removeAttr("selected");
                        $(this).find("option:selected").attr("selected", "selected");
                    });

                    $(div).find("form").on("change", "input[type='date']", function () {
                        $(this).attr("value", $(this).val());
                    });

                    // submit form
                    $(div).find(".confirm").click(function () {

                        var ihJson = {
                            "irregular_hours": []
                        };
                        var arr = $(div).find("form").serializeArray();

                        for (var i = 0, cur = -1; i < arr.length; ++i) {
                            if (arr[i].name == "name") {
                                var dateJson = {
                                    "date": "",
                                    "name": arr[i].value,
                                    "state": "close",
                                    "hours": []
                                };

                                ihJson["irregular_hours"].push(dateJson);
                                cur++;
                            }
                            else if (arr[i].name == "date") {
                                ihJson["irregular_hours"][cur].date = arr[i].value;
                            }
                            else if (arr[i].name == "switch" && arr[i].value == "on") {
                                ihJson["irregular_hours"][cur].state = "open";
                            }
                            else {
                                // added hours but closed, ignore
                                if (ihJson["irregular_hours"][cur].state == "close") {
                                    continue;
                                }

                                var curHours = ihJson["irregular_hours"][cur].hours;

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
                            callback(null, ihJson["irregular_hours"]);
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

