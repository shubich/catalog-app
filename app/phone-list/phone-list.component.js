'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('phoneList').
component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone', '$resource',
        function PhoneListController(Phone, $resource) {
            var self = this;

            self.phones = Phone.query();
            self.curPage = 1;

            var Info = $resource('http://localhost:8080/info', {});
            Info.get({}, function(data) {
                self.info = data;
                self.setPages(self.curPage, data.pages);
            });

            self.orderProp = 'age';

            self.setPages = function(cur, num) {
                var leftPage = (cur > 2) ? (cur - 2) : cur;
                var rightPage = (leftPage + 4) < num ? (leftPage + 4) : num;

                self.pages = {
                    left: leftPage,
                    right: rightPage
                };
                console.log(self.pages);

            };

            self.toThePage = function(page) {
                Phone.query({ page: page }, function(phones) {
                    self.phones = phones;
                    self.curPage = page;
                    self.setPages(page, self.info.pages);
                });
            };


        }
    ]
});