var app = {
    init: function() {
        // Size things
        app.setWinSize();
    },

    setWinSize: function({
        // Set window size
        app.winHeight = jQuery(window).height();
        app.winWidth = jQuery(window).width();
    }
};


jQuery(document).ready(function($){
    app.init();
    jQuery(window).resize(function(){
        app.onResize();
    });
});