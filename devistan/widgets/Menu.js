define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "dijit/layout/ContentPane",
    "dojo/fx",
    "dojo/dom-style",
    "dojo/text!./templates/Menu.html"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, ContentPane, fx, domStyle, template) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        constructor: function () {
            lang.mixin(this, commonLabel)
        }
    })
});