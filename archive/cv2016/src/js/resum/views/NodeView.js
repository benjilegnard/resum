define(["backbone","raphael","resum/models/NodeModel"],function(Backbone){
var NodeView = Backbone.View.extend({
    // make a child on click
    events: {
        'click': 'createChild'
    },
    initialize: function() {
        // draw a node, set "element" to the raphael node
        this.element = Exobrain.drawNode(
            this.model.x(), this.model.y(), this.model.size()
        );
        // set the dom element to the raphael element's dom node
        this.setElement(this.element.node);
        this.model.on('change', this.render, this);
    },
    // render will just move the node, not re-draw it
    render: function() {
        this.element.attr('cx', this.model.x());
        this.element.attr('cy', this.model.y());
    },
    // Create a new model and a view for it
    createChild: function() {
        new Exobrain.NodeView({model: this.model.createChild()})
    }
});

var Exobrain = {
    /* redacted */

    // draw a raphael node
    drawNode: function(x,y,size) {
        // make a circle on the Raphael "paper"
        var el = this.paper.circle(x,y,size);
        // fill it with red
        el.attr({fill: 'red'});
        return el;
    }

    /* redacted */
};
});