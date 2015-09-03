var jQuery = require('jquery');

(function($){
    var resetSectionHeight =  function (e) {
        $('section').css("height", $(window).height());
    };

    $(document).ready(function (e) {
        resetSectionHeight(e);
        $(window).on('resize', resetSectionHeight);
        $('#menu').find('ul').on('click', function (e) {
            return false;
        });
        $('#burger').find('a').on('click',function(){
            $('ul.tabs').toggleClass('active')
        })
    });

})(jQuery);