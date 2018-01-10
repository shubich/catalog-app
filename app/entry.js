/*
*   VENDORS
*/

require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/css/bootstrap-theme.min.css");
require("./css/style.css");

window.$ = window.jQuery = require('jquery/dist/jquery.min.js');
require("bootstrap/dist/js/bootstrap.min.js");
require("angular/angular.min.js");
require("angular-resource/angular-resource.min.js");
require("angular-ui-router/release/angular-ui-router.min.js");
require("angular-animate/angular-animate.js");
require("angular-i18n/angular-locale_ru-ru.js");

/*
*   LOCALS
*/

require("./app.module.js");
require("./app.config.js");
require("./app.animations.js");
require("./core/core.module.js");
require("./core/checkmark/checkmark.filter.js");
require("./core/range/range.filter.js");
require("./core/phone/phone.module.js");
require("./core/phone/phone.service.js");

require("./nav-bar/nav-bar.module.js");
require("./nav-bar/nav-bar.component.js");

require("./phone-list/phone-list.module.js");
require("./phone-list/phone-list.component.js");
require("./phone-detail/phone-detail.module.js");
require("./phone-detail/phone-detail.component.js");

require("./about/about.module.js");
require("./about/about.component.js");

require("./contact/contact.module.js");
require("./contact/contact.component.js");

require("./cart/cart.module.js");
require("./cart/cart.component.js");

