'use strict';

angular.
module('navBar').
component('navBar', {
    templateUrl: './nav-bar/nav-bar.template.html',
    controller: ['$resource', '$rootScope',
        function NavBarController($resource, $rootScope) {
            var self = this;

            self.rs = $rootScope;

            self.rs.cartCount = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).length : 0;

            self.items = [{
                name: 'Home',
                link: 'phones'
            }, {
                name: 'About',
                link: 'about'
            }, {
                name: 'Contact',
                link: 'contact'
            }];
        }
    ]
});