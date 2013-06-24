
define(["zepto","backbone","raphael"],function($, Backbone, Raphael){



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

    return ResumRouter;
});