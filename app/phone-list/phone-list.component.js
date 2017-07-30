'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('phoneList').
component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone', '$resource',
        function PhoneListController(Phone, $resource) {
            var self = this;
            self.search = {};
            self.curPage = 1;
            self.params = ["Операционная система", "Диагональ", "Технология матрицы", "Разрешение", "Оперативная память", "Встроенная память", "Поддержка карт памяти", "Разрешение основной тыловой камеры", "Емкость аккумулятора", "Число SIM-карт", "Цвет"];

            self.phones = Phone.query(function() {
                self.setPhoneInfo();
            });

            var Info = $resource('http://localhost:8080/info', {});
            Info.get({}, function(data) {
                self.info = data;
                self.setPages(self.curPage, data.pages);
            });

            var Facets = $resource('http://localhost:8080/facets/:field', {});
            Facets.query({ field: "vendor" }, function(data) {
                self.vendors = data.sort();
            })

            self.delEmptyFields = function(obj) {
                for (var key in obj) {
                    var value = obj[key];
                    if (value === "" || value === null) {
                        delete obj[key];
                    } else if (Object.prototype.toString.call(value) === '[object Object]') {
                        self.delEmptyFields(value);
                    } else if ($.isArray(value)) {
                        for (var k in value) {
                            self.delEmptyFields(value[k]);
                        }
                    }
                }
            }

            self.setParam = function(name, text) {
                if (!self.search.param) self.search.param = {};
                if (!self.search.param[name]) self.search.param[name] = [];
                var id = self.search.param[name].indexOf(text);

                if (id == -1) self.search.param[name].push(text);
                else self.search.param[name].splice(id, 1);

                if (!self.search.param[name].length) delete self.search.param[name];
                //I know that's trash but, life is so short
                if (jQuery.isEmptyObject(self.search.param)) delete self.search.param;

                self.find();
            }

            self.find = function() {
                self.delEmptyFields(self.search);

                Phone.query({ search: self.search }, function(phones) {
                    self.phones = phones;
                    self.setPhoneInfo();
                    self.curPage = 1;
                    Info.get({ search: self.search }, function(data) {
                        self.info = data;
                        self.setPages(self.curPage, data.pages);
                    });
                });
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

            self.getPhoneInfo = function(data) {
                var info = '';
                self.params.forEach(function(item) {
                    info += data[item] ? item + ' ' + data[item] + ', ' : '';
                });

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
                Phone.query({ page: page, search: self.search }, function(phones) {
                    self.phones = phones;
                    self.setPhoneInfo();
                    self.curPage = page;
                    self.setPages(page, self.info.pages);
                });
            };


        }
    ]
});