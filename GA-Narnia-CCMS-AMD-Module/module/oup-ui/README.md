# Custom Module Samples

This module provides configuration samples that demonstrate how to customize the UI with custom menus, navigation elements, buttons, actions and pages.

## Configuration

To enable any of these configuration samples, you will need to remove the `.sample` extension from the file name
and redeploy the module.

### Document Actions

The `document-actions` menu provides the list of actions that the current user may perform against the current document.

The following examples are provided:

- `config/oup-ui/blocks/default/document-actions/hide-change-qname-for-a-project.json.sample`
Hides the "Change QName" action for all documents in a given project.

- `config/oup-ui/blocks/default/document-actions/hide-change-qname-for-a-user.json.sample`
Hides the "Change QName" action for a specific user.

- `config/oup-ui/blocks/default/document-actions/hide-change-qname-for-a-team.json.sample`
Hides the "Change QName" action when the current user belongs to a specified team.

- `config/oup-ui/blocks/default/document-actions/hide-change-qname-for-a-role.json.sample`
Hides the "Change QName" action when the current user has a specific role.

- `config/oup-ui/blocks/default/document-actions/hide-delete-document-for-a-content-type.json.sample`
Hides the "Delete Document" action for a content item of a given type.

- `config/oup-ui/blocks/default/document-actions/hide-delete-document-for-a-page-type.json.sample`
Hides the "Delete Document" action for a content item of a given type.

- `config/oup-ui/blocks/default/document-actions/open-oup.json.sample`
Adds a `Open OUP Home Page` link to the document actions that invokes a custom action.  The action class is
implemented in `actions/open-oup/open-oup.js`.

- `config/oup-ui/blocks/default/document-actions/open-oup.json.sample2`
Adds a `Open OUP Home Page` link to the document actions that opens a URL in a new window.  This uses the `url` property and doesn't require a separate action implementation class.


### Documents List Buttons

The `documents-list-buttons` menu is the top button selection that you see when you're browsing folders in the document library.
This includes things like "Create" and "View Properties".

The following examples are provided:

- `config/oup-ui/blocks/default/documents-list-buttons/adjust-documents-list-buttons-for-path.json.sample`
When browsing a folder at a specified path, remove the `new_text_file` button and change the name of the `new_document`
menu option to `Create Page Template`.  Removes `view_rules`, `view_details` and the sort and actions selectors.

- `config/oup-ui/blocks/default/documents-list-buttons/adjust-documents-list-buttons-for-type.json.sample`
When browsing a folder of a specific type, remove the `new_text_file` button and change the name of the `new_document`
menu option to `Create Page Template`.  Removes `view_rules`, `view_details` and the sort and actions selectors.

- `config/oup-ui/blocks/default/documents-list-buttons/create-journal-for-path.json.sample`
Adds a menu option to the Create menu for a folder at the given path.

- `config/oup-ui/blocks/default/documents-list-buttons/create-journal-for-type.json.sample`
Adds a menu option to the Create menu for a folder of the given type.

- `config/oup-ui/blocks/default/documents-list-buttons/create-journal.json.sample`
Adds a menu option to the Create menu for all folders.

### Documents List Selected Actions

The `documents-list-selected-actions` menu consists of the right-side dropdown that provides actions that run against the 
currently selected set of items from the table (using checkboxes).

The following examples are provided:

- `config/oup-ui/blocks/default/documents-list-selected-actions/remove-delete-selected-action-for-path.json.sample`
Removes the `Delete...` selected actions item for items within a folder at a specified path.

- `config/oup-ui/blocks/default/documents-list-selected-actions/remove-delete-selected-action-for-type.json.sample`
Removes the `Delete...` selected actions item for items within a folder of a specified type.

- `config/oup-ui/blocks/default/document-list-selected-actions/remove-download-zip-for-a-project.json.sample`
Removes the "Download ZIP" action from the "Selected..." drop down for a project with a specific title.

- `config/oup-ui/blocks/default/document-list-selected-actions/remove-add-to-favorites-for-type.json.sample`
Removes the "Add To Favorites" action from the "Selected..." drop down when the folder has a given type.

### Project Context

The `project-context` menu is the left-hand menu that you get when you're inside of a project.

The following examples are provided:

- `config/oup-ui/blocks/default/project-context/project.json`
Adds a new menu item to the left-hand side that serves as a link into the document library.

- `config/oup-ui/blocks/default/project-context/rename-content-to-page-templates.json.sample`
Renames the `Content` menu item to `Page Templates`.

- `config/oup-ui/blocks/default/project-context/rename-documents-to-content-library.json.sample`
Renames the `Documents` menu item to `Content Library`.

- `config/oup-ui/blocks/default/project-context/rename-project-heading-when-viewing-test-view.json.sample`
Renames the "Content" heading in the Project left-hand menu when the current user has selected a view named "Test".

### Document Sub-Context

The `document-subcontext` menu is the left-hand navigation sub-menu that appears when you view a document.

The following examples are provided:

- `config/oup-ui/blocks/default/document-subcontext/hide-actions-for-a-project.json.sample`
Hide the "Actions" menu in the Document left-hand navigation for a given project.

- `config/oup-ui/blocks/default/document-subcontext/hide-actions-for-a-user-group.json.sample`
Hide the "Actions" menu in the Document left-hand navigation for a user lacking a specific authority.

- `config/oup-ui/blocks/default/document-subcontext/hide-actions-for-a-user.json.sample`
Hide the "Actions" menu in the Document left-hand navigation for a specific user.

- `config/oup-ui/blocks/default/document-subcontext/hide-actions-for-a-role.json.sample`
Hide the "Actions" menu in the Document left-hand navigation when the current user has a specific role over the document.

- `config/oup-ui/blocks/default/document-subcontext/hide-actions-for-a-role2.json.sample`
Hide the "Actions" menu in the Document left-hand navigation when the current user has a specific role over the document.  This is an alternative way to achieve the same thing as the previous example.

- `config/oup-ui/blocks/default/document-subcontext/hide-actions-for-a-permission.json.sample`
Hide the "Actions" menu in the Document left-hand navigation when the current user has a specific permission over the document.

### Documents List Item Actions
The `documents-list-item-actions` configuration space defines the buttons that appear on each row of the
document listing.  These are single-shot actions that let you perform actions against the document in the
row.  These actions are evaluated against each row item, letting you finely tune which buttons should appear
for each row based on document type, mimetype or other properties.

- `config/oup-ui/blocks/default/documents-list-item-actions/add-edit-image-item-action.json.sample`
Adds an Edit Image button to the action list.

### Content Instances List Item Actions
The `content-instances-list-item-actions` configuration space defines the buttons that appear on each row of the "Content" page listing.  These are single-shot actions that let you perform actions against the content item in the row.  These actions are evaluated against each row item, letting you finely tune which buttons should appear
for each row based on document type, mimetype or other properties.

- `config/oup-ui/blocks/default/content-instances-list-item-actions/add-edit-image-item-action.json.sample`
Adds an Edit Image button to the action list.

## Region Overrides

Via configuration, you can override specific "regions" of a page based on its URL or any other evaluators
running against the context.  Here are some examples of region overrides:

- `config/oup-ui/blocks/default/regions/all-journals.json.sample`
When browsing a folder and the folder's content type is "my:alljournals", override the center region to use
an `all-journals-list` javascript implementation.  The implementation class is located in `gadgets/all-journals-list.js`.

- `config/oup-ui/blocks/default/regions/secondary-pages.json.sample`
When browsing a folder and the folder's content type is "my:secondarypages", override the center region to use
an `secondary-pages-list` javascript implementation.  The implementation lcass is located in `gadgets/secondary-pages-list.js`.

