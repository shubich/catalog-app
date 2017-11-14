'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('phoneList').
component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone', '$resource', '$rootScope', '$state',
        function PhoneListController(Phone, $resource, $rootScope, $state) {
            var self = this;
            self.rs = $rootScope;

            self.rs.$watch('name', function(newValue, oldValue) {
                if (newValue !== undefined && $state.current.name == 'phones') {
                    self.search.name = newValue;
                    self.find();
                }
            });

            self.search = {};
            self.curPage = 1;
            self.params = ["Операционная система", "Диагональ", "Технология матрицы", "Разрешение", "Оперативная память", "Встроенная память", "Поддержка карт памяти", "Разрешение основной тыловой камеры", "Емкость аккумулятора", "Число SIM-карт", "Цвет"];

            var Info = $resource('http://localhost:8080/info', {});

            if (self.rs.name == undefined) {
                self.phones = Phone.query(function() {
                    self.setPhoneInfo();
                });

                Info.get({}, function(data) {
                    self.info = data;
                    self.setPages(self.curPage, data.pages);
                });
            }

            self.facets = {
                "Операционная система": ["Android", "iOS", "Windows"],
                "Диагональ": [
                    { name: 'менее 4"', value: '^[0-3]' },
                    { name: '4 - 4.5"', value: '^4\.[0-5]' },
                    { name: '4.5 - 5"', value: '^4\.[5-9]|^5[^0-9]$' },
                    { name: '5 - 5.5"', value: '^5[^0-9]$|^5\.[0-5]' },
                    { name: '5.5 - 6"', value: '^5\.[5-9]|^6[^0-9]$' },
                    { name: '6" и более', value: '^[6-7]' }
                ],
                "Разрешение": ["540x960 (qHD)", "720x1280 (HD)", "1080x1920 (FullHD)", "1440x2560 (QHD)"]
            }

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


            self.setPrice = function(key) {
                self.search.price = { min: self.price.min ? self.price.min : 0, max: self.price.max ? self.price.max : 999999 };
                self.find();
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

            self.clear = function() {
                self.search = {};
                delete $rootScope.name;
                self.find();
            };

            self.isEmpty = function(obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }

                return JSON.stringify(obj) === JSON.stringify({});
            }


        }
    ]
});