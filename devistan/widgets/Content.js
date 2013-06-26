define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dojo/fx",
    "dojo/dom-style",
    "dojo/text!./templates/Content.html"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ContentPane, fx, domStyle, template) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString:template
    })
});