define(function(require) {

    // Instanciate Actions
    require("./actions/document/set-hours/set-hours.js");
    require("./actions/document/set-hours/set-irregular-hours.js");
    require("./actions/document/set-hours/set-recurrence.js");
    require("./actions/document/set-hours/helper.js");

    // CUSTOM FIELDS
    require("./fields/hours-irregular.js");
    require("./fields/hours.js");
    require("./fields/recurrence.js");

    // FIELD EDITORS
    require("./field-editor/hours-field.js");
    require("./field-editor/hours-irregular-field.js");
    require("./field-editor/recurrence-field.js");
});
