/**
 * Created with IntelliJ IDEA.
 * User: Benjamin Legrand
 * Date: 21/03/13
 * Time: 10:14
 * To change this template use File | Settings | File Templates.
 */

define(["backbone","raphael","traer"],function(Backbone, Raphael, Traer){
  var Node  = Backbone.Model.extend({
        // expects a particle and a size parameter
        initialize: function(attributes) {
            // when the particle changes, we fire a change
            this.get('particle').on('change', function() {
                this.trigger('change');
            }, this);
            // keep track of children
            this.children = new Exobrain.NodeList();
        },
        // proxy some particle attributes
        x:    function() { return this.get('particle').position.x; },
        y:    function() { return this.get('particle').position.y; },
        size: function() { return this.get('size');                },
        particle: function() { return this.get('particle'); },

        // Make a new node under this one
        createChild: function() {
            var mass = 0.4;
            // random x and y
            var x = this.x() + Math.random() * 50 - 25;
            var y = this.y() + Math.random() * 50 - 25;
            var z = 0;

            // make the physics particle
            var particle = Exobrain.makeParticle(mass, x, y, z);
            // make a model
            var node = new Exobrain.Node({particle: particle, size: 10});
            // add it to our child list
            this.children.add(node);

            // setup a spring between the new node and us
            var spring = 0.02;
            var damping = 0.10;
            var length = 120;
            Exobrain.makeSpring(this.particle(), node.particle(), spring, damping, length);

            // fire a child event for the node we created
            this.trigger('child', node);
            // when the node gets a child, make a link with this node
            node.on('child', this.link, this);
            // also, any child of our child is also our child, so all nodes link up the tree
            node.on('child', function(child) { this.trigger('child', child) }, this);

            return node;
        },
        // make a repulsive force with a node
        link: function(node, strength) {
            if (node === this) { return; }
            /* strength scales exponentially with distance, this keeps the system
             * from "folding up"
             */
            if (strength === undefined) {
                strength = -100.0;
            } else {
                strength = strength * 2.0;
            }
            var distanceMin = 5.0;
            Exobrain.makeAttraction(this.particle(), node.particle(), strength, distanceMin);
            this.children.each(function(child) { child.link(node, strength) }, this);
        }
    });

    /* Collection automatically links siblings */
    Exobrain.NodeList = Backbone.Collection.extend({
        model: Node,
        initialize: function(models, options) {
            this.on('add', this.linkNodes, this);
        },
        linkNodes: function(node) {
            this.each(function(other) {
                other.link(node);
            }, this);
        }
    });
});