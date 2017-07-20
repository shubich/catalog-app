require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
require("./node_modules/bootstrap/dist/css/bootstrap-theme.min.css");
require("./app/css/style.css");

window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.min.js');
require("./node_modules/bootstrap/dist/js/bootstrap.min.js");
require("./node_modules/angular/angular.min.js");
require("./node_modules/angular-resource/angular-resource.min.js");
require("./node_modules/angular-route/angular-route.min.js");
require("./node_modules/angular-animate/angular-animate.js");

require("./app/app.module.js");
require("./app/app.config.js");
require("./app/app.animations.js");
require("./app/core/core.module.js");
require("./app/core/checkmark/checkmark.filter.js");
require("./app/core/range/range.filter.js");
require("./app/core/phone/phone.module.js");
require("./app/core/phone/phone.service.js");
require("./app/phone-list/phone-list.module.js");
require("./app/phone-list/phone-list.component.js");
require("./app/phone-detail/phone-detail.module.js");
require("./app/phone-detail/phone-detail.component.js");

//require("./node_modules/angular-file-upload/dist/angular-file-upload.min.js");