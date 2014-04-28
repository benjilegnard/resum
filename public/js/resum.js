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
        "lodash":"libs/lodash",
        "oriDomi":"libs/oriDomi",
        "noClickDelay":"libs/noClickDelay"
    },
    shims:{
        "zepto":{"exports":"Zepto"},
        "raphael":{"exports":"Raphael"},
        "lodash":{"exports":"_"}
    }
});
define(["zepto", "oriDomi","icons"], function ($, oriDomi, icons) {


    var resetSectionHeight =  function (e) {
        $('section').css("height", $(window).height());
    };

    $(document).ready(function (e) {
        resetSectionHeight(e);
        $(window).on('resize', resetSectionHeight);
        $('#menu ul').on('click', function (e) {
            return false;
        });
    });

});