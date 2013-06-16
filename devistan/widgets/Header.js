define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dojo/fx",
    "dojo/dom-style",
    "dojo/text!./templates/Header.html",
    "dojo/text!./templates/loginForm.html",
    "dojo/text!./templates/registerForm.html"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ContentPane, fx, domStyle, template, loginForm, registerForm) {
    commonLabel = {register: "ثبت نام", login: "ورود", username: "نام کاربری", password: "رمز عبور", cancel: "لغو",userLogin : "ورود کاربران"};
    cssProps = {formsHeight: 140};
    return declare([_WidgetBase, _TemplatedMixin , _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "header",
        register: commonLabel.register,
        login: commonLabel.login,

        _loginButtonState: "not-clicked",//can clicked
        _registerButtonClick: "not-clicked",//can clicked

        loginFormTemplate: declare([_WidgetBase , _TemplatedMixin], {
            templateString: loginForm,

            username: commonLabel.username,
            password: commonLabel.password,
            userLogin : commonLabel.userLogin,
            login: commonLabel.login,
            _isPasswordIsCleared: false,
            _isUsernameIsCleared: false,
            _clearOnFocus: function (e, type) {
                if ((type === "login" && !this._isUsernameIsCleared) || (type === "password" && !this._isPasswordIsCleared))
                    e.target.value = "";

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
            templateString: registerForm
        }),
        _loginClick: function (e) {
            if (this._loginButtonState === "not-clicked") {
                domStyle.set(this.registerNode, "display", "none");
                this.loginButtonNode.innerHTML = commonLabel.cancel;
                this._destroySubWidget();
                this._showHideSlide("not-clicked");
                this.loginFormNode.addChild(new this.loginFormTemplate());
                this._loginButtonState = "clicked";
            } else {
                this._showHideSlide("clicked");
                this._loginButtonState = "not-clicked";
                domStyle.set(this.registerNode, "display", "");
                this.loginButtonNode.innerHTML = commonLabel.login;
            }
        },
        _registerClick: function (e) {
            if (this._registerButtonClick === "not-clicked") {
                domStyle.set(this.loginNode, "display", "none");
                this.registerButtonNode.innerHTML = commonLabel.cancel;
                this._destroySubWidget();
                this._showHideSlide("not-clicked");
                this.registerFormNode.addChild(new this.registerFormTemplate());
                this._registerButtonClick = "clicked";
            } else {
                this._showHideSlide("clicked");
                this._registerButtonClick = "not-clicked";
                domStyle.set(this.loginNode, "display", "");
                this.registerButtonNode.innerHTML = commonLabel.register;
            }
        },
        _showHideSlide: function (state) {
            if (state === "not-clicked")
                fx.slideTo({ node: this.domNode, top: cssProps.formsHeight, duration: 200}).play();
            else {
                fx.slideTo({ node: this.domNode, top: 0, duration: 200 }).play();
            }
        },
        _destroySubWidget: function () {
            this.loginFormNode.destroyDescendants();
            this.registerFormNode.destroyDescendants();
        }
    })

});