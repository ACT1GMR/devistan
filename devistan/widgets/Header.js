define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dojo/query",
    "dojo/_base/lang",
    "dojo/fx",
    "dojo/dom-style",
    "dojo/text!./templates/Header.html"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ContentPane, query, lang, fx, domStyle, template) {

    return declare([_WidgetBase, _TemplatedMixin , _WidgetsInTemplateMixin], {
        templateString: template,

        constructor: function () {
            lang.mixin(this, commonLabel)
        },
        postCreate: function () {
          $("span[title]",this.userControllerNode).qtip({
              style: {
                  classes: 'qtip-dark'
              },
              position: {
                  my: 'top center',
                  at: 'bottom center'
              }

          })
        }


    });
});