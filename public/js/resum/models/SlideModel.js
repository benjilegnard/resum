define(["jquery", "backbone"], function($, Backbone) {

    var User = Backbone.Model.extend({

        // Model Constructor
        initialize: function() {

        },

        // Default values for all of the User Model attributes
        defaults: {

            firstname: "",

            lastname: "",

            email: "",

            phone: ""

        },

        // RegEx Patterns
        // ==============
        patterns: {

            specialCharacters: "[^a-zA-Z 0-9]+",

            digits: "[0-9]",

            email: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9][a-zA-Z0-9.-]*[.]{1}[a-zA-Z]{2,6}$",

            phone: "^([0-9]{3})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"

        },

        // Validators
        // ==========
        validators: {

            minLength: function(value, minLength) {

                return value.length >= minLength;

            },

            maxLength: function(value, maxLength) {

                return value.length <= maxLength;

            },

            pattern: function(value, pattern) {

                return new RegExp(pattern, "gi").test(value) ? true : false;

            },

            isEmail: function(value) {

                return User.prototype.validators.pattern(value, User.prototype.patterns.email);

            },

            isPhone: function(value) {

                return User.prototype.validators.pattern(value, User.prototype.patterns.phone);

            },

            hasSpecialCharacter: function(value) {

                return User.prototype.validators.pattern(value, User.prototype.patterns.specialCharacters);

            },

            hasDigit: function(value) {

                return User.prototype.validators.pattern(value, User.prototype.patterns.digits);

            }

        }

    });

    // Returns the Model class
    return User;

});