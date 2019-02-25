define(function (require, exports, module) {

    var flipSwitch = exports.flipSwitch = function (switchEl) {
        var entry = $(switchEl).closest(".entry");
        if ($(switchEl).prop("checked")) {
            $(switchEl).attr("checked", "checked");
            entry.find(".status").text("Open");
            entry.find(".isopen").css("display", "");
        }
        else {
            $(switchEl).removeAttr("checked");
            entry.find(".status").text("Closed");
            entry.find(".isopen").find(".periodlist").empty();
            entry.find(".isopen").css("display", "none");
        }
    };

    var fillData = exports.fillData = function ($el, value) {
        var type = $el.attr('type');
        switch (type) {
            case 'checkbox':
                $el.attr('checked', 'checked');
                break;
            case 'radio':
                $el.filter('[value="' + value + '"]').attr('checked', 'checked');
                break;
            default:
                $el.val(value);
        }
    };

    var repeatEveryWeek = exports.repeatEveryWeek = function (el) {
        if ($(el).find("option:selected").val() == "week") {
            $(el).closest("form").find(".pickdays").css("display", "");
        }
        else {
            $(el).closest("form").find(".pickdays").css("display", "none");
        }

        $(el).find("option").removeAttr("selected");
        $(el).find("option:selected").attr("selected", "selected");
    };

    var hasProperty = exports.hasProperty = function (obj, property, chain) {
        if (typeof obj != "object") {
            return false;
        }

        if (obj.hasOwnProperty(property)) {
            return true;
        }

        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            chain.push(keys[i]);

            if (hasProperty(obj[keys[i]], property, chain)) {
                return true;
            }

            chain.splice(-1);
        }

    };

    var updateObj = exports.updateObj = function (obj, value, propertyChain, targetProperty, subProperty) {
        var cur = obj;
        for (var i = 0; i < propertyChain.length; ++i) {
            cur = cur[propertyChain[i]];
        }

        if (!cur[targetProperty]) {
            cur[targetProperty] = {};
        }

        if (!subProperty) {
            cur[targetProperty] = value;
        }
        else {
            cur[targetProperty][subProperty] = value;
        }
    };

    var tp = function (target, key, val) {
        target.push({
            "name": key,
            "value": val
        });
    };

    var convertHours = exports.convertHours = function (source) {
        var target = [];

        Object.keys(source).forEach(k => {
            var detail = source[k];
            var name = "switch-" + k;
            var value = detail.state == "open" ? "on" : "off";

            tp(target, name, value);

            detail.hours.map(ts => {

                tp(target, "open", ts.open);
                tp(target, "close", ts.close);

            });
        })

        return target;
    };

    var convertIrregularHours = exports.convertIrregularHours = function (source) {
        var target = [];

        source.map(record => {
            tp(target, "name", record.name);
            tp(target, "date", record.date);
            tp(target, "switch", record.state === "open" ? "on" : "off");

            record.hours.map(ts => {

                tp(target, "open", ts.open);
                tp(target, "close", ts.close);

            })
        })

        return target;
    };

    var period = exports.period = `
    <div class="period">
        <select name="open">
            <option value="12:00AM">12:00AM</option>
            <option value="1:00AM">1:00AM</option>
            <option value="2:00AM">2:00AM</option>
            <option value="3:00AM">3:00AM</option>
            <option value="4:00AM">4:00AM</option>
            <option value="5:00AM">5:00AM</option>
            <option value="6:00AM">6:00AM</option>
            <option value="7:00AM">7:00AM</option>
            <option value="8:00AM">8:00AM</option>
            <option value="9:00AM">9:00AM</option>
            <option value="10:00AM">10:00AM</option>
            <option value="11:00AM">11:00AM</option>
            <option value="12:00PM">12:00PM</option>
            <option value="1:00PM">1:00PM</option>
            <option value="2:00PM">2:00PM</option>
            <option value="3:00PM">3:00PM</option>
            <option value="4:00PM">4:00PM</option>
            <option value="5:00PM">5:00PM</option>
            <option value="6:00PM">6:00PM</option>
            <option value="7:00PM">7:00PM</option>
            <option value="8:00PM">8:00PM</option>
            <option value="9:00PM">9:00PM</option>
            <option value="10:00PM">10:00PM</option>
            <option value="11:00PM">11:00PM</option>
        </select>
        <span>&ndash;</span>
        <select name="close">
            <option value="12:00AM">12:00AM</option>
            <option value="1:00AM">1:00AM</option>
            <option value="2:00AM">2:00AM</option>
            <option value="3:00AM">3:00AM</option>
            <option value="4:00AM">4:00AM</option>
            <option value="5:00AM">5:00AM</option>
            <option value="6:00AM">6:00AM</option>
            <option value="7:00AM">7:00AM</option>
            <option value="8:00AM">8:00AM</option>
            <option value="9:00AM">9:00AM</option>
            <option value="10:00AM">10:00AM</option>
            <option value="11:00AM">11:00AM</option>
            <option value="12:00PM">12:00PM</option>
            <option value="1:00PM">1:00PM</option>
            <option value="2:00PM">2:00PM</option>
            <option value="3:00PM">3:00PM</option>
            <option value="4:00PM">4:00PM</option>
            <option value="5:00PM">5:00PM</option>
            <option value="6:00PM">6:00PM</option>
            <option value="7:00PM">7:00PM</option>
            <option value="8:00PM">8:00PM</option>
            <option value="9:00PM">9:00PM</option>
            <option value="10:00PM">10:00PM</option>
            <option value="11:00PM">11:00PM</option>
        </select>

        <div class="remove">&times;</div>
    </div>`;

    var record = exports.record = `
    <div class="record">
        <div class="specialname">
            <input type="text" name="name" placeholder="Holiday Name">
        </div>
        <div class="entry">
            <div class="partone">
                <div class="day">
                    <input type="date" name="date">
                </div>
                <label class="switch">
                    <input type="checkbox" name="switch">
                    <span class="slider"></span>
                </label>
                <span class="status"></span>
            </div>

            <div class="parttwo">
                <div class="isopen">
                    <div class="periodlist"></div>
                    <div class="add">Add Hours</div>
                </div>
            </div>
            
            <div class="remove-record">&times;</div>
            
        </div>
    </div>`;

});

