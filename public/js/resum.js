/**
 * Created with IntelliJ IDEA.
 * User: Benjamin Legrand
 * Date: 21/03/13
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
require.config({
    baseUrl:'js/',
    paths:{
        "zepto":"libs/zepto",
        "backbone":"libs/backbone",
        "raphael":"libs/raphael",
        "traer":"libs/traer",
        "scrollspy":"libs/scrollspy",
        "underscore":"libs/lodash",
        "bootstrap":"libs/bootstrap"
    },
    shims:{
        "backbone":{deps:["jquery","underscore"],"exports":"Backbone"},
        "raphael":{"exports":"Raphael"},
        "traer":{"exports":"Traer"},
        "scrollspy":{deps:"jquery"},
        "underscore":{deps:"jquery","exports":"_"}
    }
});
define(["zepto", "backbone", "raphael", "traer","resum/ResumRouter"], function ($, Backbone, Raphael,ResumRouter) {

    Backbone.history.start();

});