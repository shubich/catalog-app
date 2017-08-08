require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
require("./node_modules/bootstrap/dist/css/bootstrap-theme.min.css");
require("./app/css/style.css");

window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.min.js');
require("./node_modules/bootstrap/dist/js/bootstrap.min.js");
require("./node_modules/angular/angular.min.js");
require("./node_modules/angular-resource/angular-resource.min.js");
require("./node_modules/angular-ui-router/release/angular-ui-router.min.js");
require("./node_modules/angular-animate/angular-animate.js");
require("./node_modules/angular-i18n/angular-locale_ru-ru.js");

require("./app/app.module.js");
require("./app/app.config.js");
require("./app/app.animations.js");
require("./app/core/core.module.js");
require("./app/core/checkmark/checkmark.filter.js");
require("./app/core/range/range.filter.js");
require("./app/core/phone/phone.module.js");
require("./app/core/phone/phone.service.js");

require("./app/nav-bar/nav-bar.module.js");
require("./app/nav-bar/nav-bar.component.js");

require("./app/phone-list/phone-list.module.js");
require("./app/phone-list/phone-list.component.js");
require("./app/phone-detail/phone-detail.module.js");
require("./app/phone-detail/phone-detail.component.js");

require("./app/about/about.module.js");
require("./app/about/about.component.js");

require("./app/contact/contact.module.js");
require("./app/contact/contact.component.js");

require("./app/cart/cart.module.js");
require("./app/cart/cart.component.js");