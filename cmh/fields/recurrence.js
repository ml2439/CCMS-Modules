define(function (require, exports, module) {

    var $ = require("jquery");
    var Alpaca = require("alpaca");
    var OneTeam = require("oneteam");
    var Actions = require("ratchet/actions");

    Alpaca.Fields.RecurrenceField = Alpaca.Fields.ObjectField.extend(
        {
            getFieldType: function () {
                return "recurrence";
            },

            setValue: function (value) {
                this.data = value;
            },

            getValue: function () {
                return this.data;
            },

            setup: function () {

                var self = this;

                self.observableHolder = self.getObservableHolder();

                this.base();

            },

            getObservableHolder: function () {
                var top = this;
                while (top.parent) {
                    top = top.parent;
                }
                return top.options.observableHolder;
            },

            afterRenderContainer: function (model, callback) {
                var self = this;

                this.base(model, function () {
                    var container = self.getContainerEl();

                    $('<div style="clear:both;"></div>').appendTo(container);

                    // only editable when creating a new content instance or editing document properties
                    var pageIsEditable = window.location.href.indexOf("content") > 0 || window.location.href.indexOf("properties") > 0;
                    var buttonText = pageIsEditable ? "Set Recurrence" : "View Recurrence";
                    var setButton = $('<div class="alpaca-form-button">' + buttonText + '</div>').appendTo(container);

                    setButton.css({
                        "color": "#2196F3",
                        "font-weight": "bold"
                    });
                    setButton.hover(function () {
                        $(this).css({
                            "cursor": "pointer"
                        });
                    });
                    setButton.click(function () {
                        var actionId = "set-recurrence";
                        var actionConfig = {
                            "title": "Set Recurrence"
                        };
                        var actionContext = {
                            "project": self.getObservableHolder().observable("project").get(),
                            "document": self.getObservableHolder().observable("document").get(),
                            "branch": self.getObservableHolder().observable("branch").get(),
                            "recurrenceFieldId": self.propertyId,
                            "pageIsEditable": pageIsEditable
                        };

                        Actions.execute(actionId, actionConfig, actionContext, function (err, result) {
                            self.setValue(result);
                        });

                    });

                });

                callback();
            }

        });

    Alpaca.registerFieldClass("recurrence", Alpaca.Fields.RecurrenceField);

});
