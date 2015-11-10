var app = {
    init: function() {
        app.dropDownInit();
        app.detailsCycleInit();
        app.initMap();
    },
    dropDownInit: function() {
        jQuery('.dropdown').click(function() {
            jQuery('.dropdown').not(this).removeClass('opened');
            if (!jQuery(this).hasClass('opened')) {
                jQuery(this).addClass('opened')
            } else {
                jQuery(this).removeClass('opened')
            }
        });

        // If dropdown clicked
        jQuery('.dropdown li').click(function() {
            var $val = jQuery(this).text();
            jQuery(this).parents('.dropdown').find('span').text($val);
        });
    },
    detailsCycleInit: function() {
        jQuery('.details-page .slideshow').cycle({
            manualSpeed: 500,
            slides: '.slide',
            timeout: 1500,
            fx: 'scrollHorz'
        });
    },
    initMap: function() {
        if(!jQuery('#content').hasClass('details')) {
            return false;
        }

        function initialize() {
            var lang = new google.maps.LatLng(5.962528, 80.706668);
            var mapOptions = {
                center: lang,
                zoom: 16,
                scrollwheel: false,
                navigationControl: true,
                mapTypeControl: false,
                scaleControl: true,
                draggable: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            }
            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            var marker = new google.maps.Marker({
                position: lang,
                map: map,
                title: 'Hiriketiya Beachhouse',
                icon: 'http://www.beachhousehiriketiya.com/wp-content/themes/hybrid/assets/images/pin.png'
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    },
};


jQuery(document).ready(function($) {
    app.init();
    jQuery(window).resize(function() {
        app.onResize();
    });
});
