'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
module('phoneDetail').
component('phoneDetail', {
    templateUrl: './phone-detail/phone-detail.template.html',
    controller: ['$stateParams', 'Phone', '$window', '$rootScope',
        function PhoneDetailController($stateParams, Phone, $window, $rootScope) {
            var self = this;
            self.rs = $rootScope;

            self.params = ["Операционная система", "Диагональ", "Технология матрицы", "Разрешение", "Оперативная память", "Встроенная память", "Поддержка карт памяти", "Разрешение основной тыловой камеры", "Емкость аккумулятора", "Число SIM-карт", "Цвет"];

            self.phone = Phone.get({ phoneId: $stateParams.phoneId }, function(phone) {
                self.setImage(phone.picture[0]);
            });

            self.setImage = function setImage(imageUrl) {
                self.mainImageUrl = imageUrl;
            };

            self.addToCart = function() {
                var storedPhones = JSON.parse(localStorage.getItem("cart"));
                if (storedPhones === null) storedPhones = [];
                storedPhones.push($stateParams.phoneId);
                $window.localStorage.setItem("cart", JSON.stringify(storedPhones));
                self.rs.cartCount++;
            };

            self.delFromCart = function() {
                var storedPhones = JSON.parse(localStorage.getItem("cart"));
                if (storedPhones === null) return false;
                var delItemId = storedPhones.indexOf($stateParams.phoneId);
                if (delItemId === -1) return false;
                else {
                    // delete item without null
                    storedPhones.splice(delItemId, 1);
                    $window.localStorage.setItem("cart", JSON.stringify(storedPhones));
                    self.rs.cartCount--;
                }
            };

            self.inCart = function() {
                var storedPhones = JSON.parse(localStorage.getItem("cart"));
                if (storedPhones === null) return false;
                if (storedPhones.includes($stateParams.phoneId)) return true;
                else return false;
            };
        }
    ]
});