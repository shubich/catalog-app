'use strict';

// Register `about` component, along with its associated controller and template
angular.
module('about').
component('about', {
    templateUrl: 'about/about.template.html',
    controller: [
        function AboutController() {
            var self = this;
        }
    ]
});