'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('phoneList').
component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone',
        function PhoneListController(Phone) {
            var self = this;

            self.phones = Phone.query();
            self.orderProp = 'age';

            self.toThePage = function(page) {
                Phone.query({ page: page }, function(phones) {
                    self.phones = phones;
                });
            };


        }
    ]
});