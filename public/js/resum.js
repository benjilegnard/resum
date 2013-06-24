/**
 * Created with IntelliJ IDEA.
 * User: Benjamin Legrand
 * Date: 21/03/13
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
require.config({
    baseUrl:'/public/js/',
    paths:{
        "zepto":"libs/zepto",
        "angular":"libs/angular",
        "raphael":"libs/raphael",
        "lodash":"libs/lodash",
        "oriDomi":"libs/oriDomi",
        "noClickDelay":"libs/noClickDelay"
    },
    shims:{
        "angular":{deps:["zepto"],"exports":"angular"},
        "raphael":{"exports":"Raphael"},
        "lodash":{"exports":"_"}
    }
});
define(["zepto", "angular", "raphael", "oriDomi","resum/app"], function ($, angular, Raphael, oriDomi, app) {

    angular.bootstrap(document, ['app']);
});