'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('phoneList').
component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone', '$resource',
        function PhoneListController(Phone, $resource) {
            var self = this;

            self.phones = Phone.query(function() {
                self.setPhoneInfo();
            });
            self.curPage = 1;

            var Info = $resource('http://localhost:8080/info', {});
            Info.get({}, function(data) {
                self.info = data;
                self.setPages(self.curPage, data.pages);
            });

            //self.orderProp = 'age';

            self.params = ["Операционная система", "Диагональ", "Технология матрицы", "Разрешение", "Оперативная память", "Встроенная память", "Поддержка карт памяти", "Разрешение основной тыловой камеры", "Емкость аккумулятора", "Число SIM-карт", "Цвет"];

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
                            self.phones[i].info[name] = text + ' ' + unit;
                        }
                    }
                    console.log(self.phones[i].info);
                }
            };

            self.getPhoneInfo = function(data) {
                var info = '';
                info += data["Операционная система"] ? data["Операционная система"] + ', ' : '';
                info += data["Диагональ"] ? data["Диагональ"] + ' ' : '';
                info += data["Технология матрицы"] ? data["Технология матрицы"] + ' ' : '';
                info += data["Разрешение"] ? data["Разрешение"] + ', ' : '';
                info += data["Оперативная память"] ? ' ОЗУ ' + data["Оперативная память"] + ', ' : '';
                info += data["Встроенная память"] ? 'флэш-память ' + data["Встроенная память"] + ', ' : '';
                info += data["Поддержка карт памяти"] ? 'карты памяти' + ', ' : '';
                info += data["Разрешение основной тыловой камеры"] ? 'камера ' + data["Разрешение основной тыловой камеры"] + ', ' : '';
                info += data["Емкость аккумулятора"] ? 'аккумулятор ' + data["Емкость аккумулятора"] + ', ' : '';
                info += data["Число SIM-карт"] ? data["Число SIM-карт"] + 'SIM, ' : '';
                info += data["Цвет"] ? 'цвет ' + data["Цвет"] + ', ' : '';

                return info.slice(0, -2);
            }

            self.setPages = function(cur, num) {
                var leftPage = (cur > 2) ? (cur - 2) : 1;
                var rightPage = (leftPage + 4) < num ? (leftPage + 4) : num;

                // Поддерживаем диапазон в 4 единицы если это возможно
                leftPage = (rightPage - 4) > 0 ? (rightPage - 4) : 1;

                self.pages = {
                    left: leftPage,
                    right: rightPage
                };
            };

            self.toThePage = function(page) {
                Phone.query({ page: page }, function(phones) {
                    self.phones = phones;
                    self.setPhoneInfo();
                    self.curPage = page;
                    self.setPages(page, self.info.pages);
                });
            };


        }
    ]
});