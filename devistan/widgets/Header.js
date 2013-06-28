define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dijit/Tooltip",
    "dojo/query",
    "dojo/_base/lang",
    "dojo/fx",
    "dojo/dom-style",
    "dojo/text!./templates/Header.html"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ContentPane, Tooltip, query, lang, fx, domStyle, template) {

    return declare([_WidgetBase, _TemplatedMixin , _WidgetsInTemplateMixin], {
        templateString: template,

        constructor: function () {
            lang.mixin(this, commonLabel)
        },
        postCreate: function () {
            new Tooltip({
                connectId: query("span", this.userControllerNode),
                position: ["below-centered", "above-centered"],
                getContent: function (matchedNode) {
                    return matchedNode.getAttribute("tooltipText");
                }
            });

        }


    });
});