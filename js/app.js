var app = {
    init: function() {
        app.dropDownInit();
        app.homeCycleInit();
    },
    homeCycleInit: function() {
        jQuery('.slideshow').cycle({
            speed: 1000,
            slides: '.slide',
            timeout: 3000,
            fx: 'scrollHorz'
        });
    },
    dropDownInit: function() {
        jQuery('.dropdown').click(function(){
            jQuery('.dropdown').not(this).removeClass('opened');
            if(!jQuery(this).hasClass('opened')) {
                jQuery(this).addClass('opened')
            } else {
                jQuery(this).removeClass('opened')
            }
        });

        // If dropdown clicked
        jQuery('.dropdown li').click(function(){
            var $val = jQuery(this).text();
            jQuery(this).parents('.dropdown').find('span').text($val);
        });
    }
};


jQuery(document).ready(function($){
    app.init();
    jQuery(window).resize(function(){
        app.onResize();
    });
});