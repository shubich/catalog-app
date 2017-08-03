'use strict';

angular.
module('navBar').
component('navBar', {
    templateUrl: 'core/nav-bar/nav-bar.template.html',
    controller: ['$routeParams', '$resource',
        function NavBarController($routeParams, $resource) {
            var self = this;

            self.items = [{
                name: 'Home',
                link: '#!/',
                class: 'active'
            }, {
                name: 'About',
                link: '#!/about'
            }, {
                name: 'Contact',
                link: '#!/contact'
            }];

            self.setActiveItem = function(i) {
                self.items.forEach(function(item, index, arr) {
                    item.class = (index == i) ? 'active' : '';
                });
            };
        }


    ]
});