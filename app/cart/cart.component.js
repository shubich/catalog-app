'use strict';

// Register `cart` component, along with its associated controller and template
angular.
module('cart').
component('cart', {
    templateUrl: 'cart/cart.template.html',
    controller: ['$stateParams', '$resource', 'Phone', '$window', '$rootScope',
        function CartController($stateParams, $resource, Phone, $window, $rootScope) {
            var self = this;

            self.rs = $rootScope;

            var Cart = $resource('http://localhost:8080/cart', {});
            var cart = $window.localStorage.cart;

            if (cart !== '[]') {
                Cart.query({ search: $window.localStorage.cart }, function(data) {
                    self.phones = data;
                    self.setPhoneInfo();
                });
            }

            self.inCart = function(id) {
                var storedPhones = JSON.parse(localStorage.getItem("cart"));
                if (storedPhones === null) return false;
                if (storedPhones.includes(id)) return true;
                else return false;
            };

            self.addToCart = function(id) {
                var storedPhones = JSON.parse(localStorage.getItem("cart"));
                if (storedPhones === null) storedPhones = [];
                storedPhones.push(id);
                $window.localStorage.setItem("cart", JSON.stringify(storedPhones));
                self.rs.cartCount++;
            };

            self.delFromCart = function(id) {
                var storedPhones = JSON.parse(localStorage.getItem("cart"));
                if (storedPhones === null) return false;
                var delItemId = storedPhones.indexOf(id);
                if (delItemId === -1) return false;
                else {
                    // delete item without null
                    storedPhones.splice(delItemId, 1);
                    $window.localStorage.setItem("cart", JSON.stringify(storedPhones));
                    self.rs.cartCount--;
                }
            };

            self.params = ["Операционная система", "Диагональ", "Технология матрицы", "Разрешение", "Оперативная память", "Встроенная память", "Поддержка карт памяти", "Разрешение основной тыловой камеры", "Емкость аккумулятора", "Число SIM-карт", "Цвет"];

            self.getPhoneInfo = function(data) {
                var info = '';
                self.params.forEach(function(item) {
                    info += data[item] ? item + ' ' + data[item] + ', ' : '';
                });

                return info.slice(0, -2);
            }

            self.setPhoneInfo = function() {
                for (var i = 0; i < self.phones.length; i++) {
                    // Добавляем новое свойство в объект с телефоном
                    // там будет храниться краткое описание
                    self.phones[i].info = [];

                    for (var j = 0; j < self.phones[i].param.length; j++) {
                        var name = self.phones[i].param[j]["@name"];
                        var text = self.phones[i].param[j]["#text"];
                        var unit = self.phones[i].param[j]["@unit"] ? ' ' + self.phones[i].param[j]["@unit"] : '';

                        if (self.params.includes(name)) {
                            self.phones[i].info[name] = text + unit;
                        }
                    }
                }
            };
        }
    ]
});