define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dojo/_base/lang",
    "dojo/fx",
    "dojo/dom-style",
    "dojo/text!./templates/LoginPageHeader.html",
    "dojo/text!./templates/loginForm.html",
    "dojo/text!./templates/registerForm.html"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ContentPane,lang, fx, domStyle, template, loginForm, registerForm) {

    cssProps = {formsHeight: 180};
    return declare([_WidgetBase, _TemplatedMixin , _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "header",

        _loginButtonState: "not-clicked",//can clicked
        _registerButtonClick: "not-clicked",//can clicked ,
        constructor : function(){
            lang.mixin(this , commonLabel)
        },

        loginFormTemplate: declare([_WidgetBase , _TemplatedMixin], {
            templateString: loginForm,

            _isPasswordIsCleared: false,
            _isUsernameIsCleared: false,
            constructor : function(){
                lang.mixin(this , commonLabel)
            },
            _clearOnFocus: function (e, type) {
                if ((type === "login" && !this._isUsernameIsCleared) || (type === "password" && !this._isPasswordIsCleared))
                    e.target.value = "";

            },
            _login : function(e){
                domStyle.set(this.overlayNode,"display","")
            },
            postCreate: function () {
                var self = this;
                this.loginUsernameNode.onfocus = function (e) {
                    self._clearOnFocus(e, "login");
                    self._isUsernameIsCleared = true;
                };
                this.loginPasswordNode.onfocus = function (e) {
                    self._clearOnFocus(e, "password");
                    self._isPasswordIsCleared = true;
                }
            }
        }),
        registerFormTemplate: declare([_WidgetBase , _TemplatedMixin], {
            templateString: registerForm ,

            _isPasswordIsCleared: false,
            _isUsernameIsCleared: false,
            _isEmailIsCleared: false,

            constructor : function(){
                lang.mixin(this , commonLabel)
            },

            _clearOnFocus: function (e, type) {
                if ((type === "login" && !this._isUsernameIsCleared) ||
                    (type === "password" && !this._isPasswordIsCleared) ||
                    (type === "email" && !this._isEmailIsCleared))
                    e.target.value = "";

            },
            _register : function(e){
                domStyle.set(this.overlayNode,"display","")
            },
            postCreate: function () {
                var self = this;
                this.registerUsernameNode.onfocus = function (e) {
                    self._clearOnFocus(e, "login");
                    self._isUsernameIsCleared = true;
                };
                this.registerEmailNode.onfocus = function (e) {
                    self._clearOnFocus(e, "email");
                    self._isEmailIsCleared = true;
                };
                this.registerPasswordNode.onfocus = function (e) {
                    self._clearOnFocus(e, "password");
                    self._isPasswordIsCleared = true;
                };
            }

        }),
        _loginClick: function (e) {
            if (this._loginButtonState === "not-clicked") {
                domStyle.set(this.registerNode, "display", "none");
                this.loginButtonNode.innerHTML = this.cancel;
                this._destroySubWidget();
                this._showHideSlide("not-clicked");
                this.loginFormNode.addChild(new this.loginFormTemplate());
                this._loginButtonState = "clicked";
            } else {
                this._showHideSlide("clicked");
                this._loginButtonState = "not-clicked";
                domStyle.set(this.registerNode, "display", "");
                this.loginButtonNode.innerHTML = this.login;
            }
        },
        _registerClick: function (e) {
            if (this._registerButtonClick === "not-clicked") {
                domStyle.set(this.loginNode, "display", "none");
                this.registerButtonNode.innerHTML = this.cancel;
                this._destroySubWidget();
                this._showHideSlide("not-clicked");
                this.registerFormNode.addChild(new this.registerFormTemplate());
                this._registerButtonClick = "clicked";
            } else {
                this._showHideSlide("clicked");
                this._registerButtonClick = "not-clicked";
                domStyle.set(this.loginNode, "display", "");
                this.registerButtonNode.innerHTML = this.register;
            }
        },
        _showHideSlide: function (state) {
            var self = this;
            if (state === "not-clicked")
                fx.slideTo({ node: this.domNode, top: cssProps.formsHeight, duration: 200}).play();
            else {
                fx.slideTo({ node: this.domNode, top: 0, duration: 200,onEnd:function(){self._destroySubWidget()} }).play();
            }
        },
        _destroySubWidget: function () {
            this.loginFormNode.destroyDescendants();
            this.registerFormNode.destroyDescendants();
        }
    })

});