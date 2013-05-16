define(["jquery","backbone","models/SlideModel"], function($, Backbone, Slide) {

    var SlideList = Backbone.Collection.extend({

        model: Slide

    });

    // Returns the Collection class
    return SlideList;

});