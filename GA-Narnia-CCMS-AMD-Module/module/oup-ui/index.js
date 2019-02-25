define(function(require) {

    // action: "create-journal"
    require("./actions/create-journal/create-journal.js");
    
    // action: "edit-journal"
    require("./actions/edit-journal/edit-journal.js");
    
    // action: "open-oup"
    require("./actions/open-oup/open-oup.js");

    // new pages
    require("./gadgets/all-journals-list.js");
    require("./gadgets/secondary-pages-list.js");
    require("./gadgets/help/help.js");
    
    // use this to globally control the position of helper text
    Alpaca.defaultHelpersPosition = "above";    
});
