'use strict';

angular.
module('catalogApp').
config(['$stateProvider', '$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {

        var states = [
            { name: 'about', url: '/about', component: 'about' },
            { name: 'contact', url: '/contact', component: 'contact' },
            { name: 'cart', url: '/cart', component: 'cart' },

            {
                name: 'phones',
                url: '/phones',
                component: 'phoneList'
            },

            {
                name: 'phoneDetail',
                url: '/phones/{phoneId}',
                component: 'phoneDetail'
            }

        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
        $urlRouterProvider.otherwise('/phones');
    }
]);