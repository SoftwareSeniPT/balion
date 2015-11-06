var app = {
    init: function() {
        app.dropDownInit();
        app.homeCycleInit();
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