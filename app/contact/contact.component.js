'use strict';

// Register `contact` component, along with its associated controller and template
angular.
module('contact').
component('contact', {
    templateUrl: './contact/contact.template.html',
    controller: [
        function ContactController() {
            var self = this;
        }
    ]
});