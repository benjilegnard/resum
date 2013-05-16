define(["jquery","backbone","models/SlideModel"], function($, Backbone, Node) {

    var NodeList = Backbone.Collection.extend({

        model: Node

    });

    // Returns the Collection class
    return NodeList;

});