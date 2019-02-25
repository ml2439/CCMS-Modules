define(function(require, exports, module) {

    require("css!./content-instances.css");

    var Ratchet = require("ratchet/web");
    var DocList = require("ratchet/dynamic/doclist");
    var OneTeam = require("oneteam");
    var TemplateHelperFactory = require("template-helper");

    return Ratchet.GadgetRegistry.register("content-instances", DocList.extend({

        configureDefault: function()
        {
            this.base();

            this.config({
                "observables": {
                    "query": "content-instances-list_query",
                    "sort": "content-instances-list_sort",
                    "sortDirection": "content-instances-list_sortDirection",
                    "searchTerm": "content-instances-list_searchTerm",
                    "selectedItems": "content-instances-list_selectedItems"
                }
            });
        },

        setup: function()
        {
            this.get("/projects/{projectId}/content", this.index);
            this.get("/projects/{projectId}/content/{qname}", this.index);
            this.get("/projects/{projectId}/content/{qname}/documents", this.index);
        },

        entityTypes: function()
        {
            return {
                "plural": "content instances",
                "singular": "content instance"
            }
        },

        /**
         * Loads dynamic/configuration driven portions of the list into the model.
         *
         * @param model
         */
        applyDynamicConfiguration: function(model)
        {
            var self = this;
            
            var selectedContentType = this.observable("selected-content-type").get();

            // "content-instances-buttons"
            var buttons = OneTeam.configEvalArray(selectedContentType, "content-instances-buttons", self);

            if (buttons && buttons.length > 0)
            {
                for (var i = 0; i < buttons.length; i++)
                {
                    model.buttons.push(buttons[i]);
                }
            }
        },

        prepareModel: function(el, model, callback)
        {
            var self = this;

            this.base(el, model, function() {

                TemplateHelperFactory.create(self, "content-instances", function(err, renderTemplate) {

                    model.renderTemplate = renderTemplate;

                    callback();
                });
            });
        },

        beforeSwap: function(el, model, callback)
        {
            var self = this;

            this.base(el, model, function() {

                // set up observables
                var refreshHandler = self.refreshHandler(el);

                // when the selected content type changes, we refresh
                self.subscribe("selected-content-type", refreshHandler);

                // refresh when locale selection changes
                self.subscribe("locale", refreshHandler);

                callback();

            });
        },

        checkPermission: function(observableHolder, permissionedId, permissionId, item)
        {
            var result = this.base(observableHolder, permissionedId, permissionId, item);

            // should we do a capabilities check?
            if (item.category === "capabilities-check")
            {
                result = false;

                var descriptor = observableHolder.observable("selected-content-type").get();
                if (descriptor && descriptor.capabilities)
                {
                    if (permissionId === "create_subobjects")
                    {
                        permissionId = "create";
                    }

                    result = descriptor.capabilities.contains(permissionId);
                }
            }

            return result;
        },

        afterSwap: function(el, model, originalContext, callback)
        {
            var self = this;

            this.base(el, model, originalContext, function() {

                TemplateHelperFactory.afterRender(self, el);

                // hide create button if nothing selected
                var descriptor = self.observable("selected-content-type").get();
                if (!descriptor)
                {
                    $(".btn.list-button-create-content").hide();
                }

                // CUSTOMIZED: filter by locale dropdown selector
                var localeDropdownHtml = "<div style='display:inline-block; margin-right:5px;'><label>Filter by " + self.msg("types.Text.locale") + ": </label></div><div style='display:inline-block; margin-right:5px;'><select class='select-locale form-control'></select></div>";
                $(el).find(".pull-right").append(localeDropdownHtml);

                // no specified locale -- display all locales of the same type
                var selector = $(el).find(".select-locale");
                selector.append("<option>All</option>");

                var selectedLocale = self.observable("locale");
                if (!selectedLocale) {
                    selectedLocale = "All";
                }

                var project = self.observable("project").get();
                if (project && project.locales)
                {
                    for (var i = 0; i < project.locales.length; ++i)
                    {
                        var htmlStr = "<option value=" + project.locales[i].code;
                        
                        if (selectedLocale.value && selectedLocale.value == project.locales[i].code) {
                            htmlStr += " selected ";
                        }

                        htmlStr += ">" + project.locales[i].title + "</option>";
    
                        selector.append(htmlStr);
                    }

                    selector.off().on("change", function(e) {
                        e.preventDefault();
                        var val = $(e.target).find(":selected").val() || "";
                        self.observable("locale").set(val);
                    });
    
                }

                callback();
            });
        },

        doGitanaQuery: function(context, model, searchTerm, query, pagination, callback)
        {
            var self = this;

            pagination.paths = true;

            model.pagination = pagination;

            var project = self.observable("project").get();

            if (OneTeam.isEmptyOrNonExistent(query) && searchTerm)
            {
                query = OneTeam.searchQuery(searchTerm, ["title", "description"]);
            }

            if (!query)
            {
                query = {};
            }

            OneTeam.projectBranch(self, function() {

                // selected content type
                var selectedContentTypeDescriptor = self.observable("selected-content-type").get();
                if (!selectedContentTypeDescriptor)
                {
                    // produce an empty node map
                    return callback(new Gitana.NodeMap(this));
                }

                var locale = self.observable("locale").get();
                if (locale && locale !== "All")
                {
                    query["_features.f:locale.locale"] = locale;
                }
    
                query._type = selectedContentTypeDescriptor.definition.getQName();

                this.queryNodes(query, pagination).then(function() {
                    callback(this);
                });
            });
        },

        linkUri: function(row, model, context)
        {
            var uri = null;

            if (row.isContainer())
            {
                // folder
                uri = OneTeam.linkUri(this, row, "browse");
            }
            else
            {
                // file
                uri = OneTeam.linkUri(this, row);
            }

            return uri;
        },

        iconUri: function(row, model, context)
        {
            return OneTeam.iconUriForNode(row);
        },

        columnValue: function(row, item, model, context)
        {
            var self = this;

            var project = self.observable("project").get();

            var value = this.base(row, item, model, context);

            row.pagination = model.pagination;

            if (item.key === "titleDescription") {

                value = model.renderTemplate(row);
            }

            return value;
        },

        populateSingleDocumentActions: function(row, item, model, context, selectorGroup)
        {
            var self = this;

            var thing = Chain(row);

            // evaluate the config space against the current row so that per-row action buttons customize per document
            var itemActions = OneTeam.configEvalArray(thing, "content-instances-list-item-actions", self, null, null, true);

            if (itemActions && itemActions.length > 0)
            {
                for (var z = 0; z < itemActions.length; z++)
                {
                    selectorGroup.actions.push(itemActions[z]);
                }
            }

            // TODO: can't do this yet, need ACLs for every document?
            //selectorGroup.actions = self.filterAccessRights(self, thing, model.buttons);
        }


    }));

});