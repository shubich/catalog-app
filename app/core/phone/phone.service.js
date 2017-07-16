'use strict';

angular.
module('core.phone').
factory('Phone', ['$resource',
    function($resource) {
        return $resource('http://localhost:8080/phones/:phoneId', {}, {
            query: {
                method: 'GET',
                //params: { phoneId: 'phones' },
                isArray: true
            }
        });
    }
]);