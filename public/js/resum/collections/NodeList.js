'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Node = require('../models/NodeModel');

module.exports = Backbone.Collection.extend({

        model: Node


});