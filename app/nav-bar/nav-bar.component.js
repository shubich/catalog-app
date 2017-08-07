'use strict';

angular.
module('navBar').
component('navBar', {
    templateUrl: 'nav-bar/nav-bar.template.html',
    controller: ['$resource',
        function NavBarController($resource) {
            var self = this;

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