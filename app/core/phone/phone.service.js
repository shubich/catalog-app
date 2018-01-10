'use strict';

angular.
module('core.phone').
factory('Phone', ['$resource',
    function($resource) {
        return $resource('/phones/:phoneId', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }
]);