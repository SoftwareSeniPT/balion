var app = {
    init: function() {
        app.dropDownInit();
        app.detailsCycleInit();
        app.accordionChanger();
        app.initMap();
        app.multiSelectInit();
        app.refineSearchReveal();
        app.detailsPageLightSliderInit();
        app.detailsPageSlideshowTrigger();
        app.detailsPageThumbnailReveal();
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
    detailsPageSlideshowTrigger: function() {
        jQuery('#hero .hero-background').click(function() {
            jQuery("#slideshow").fadeIn(300);
        });

        jQuery('#slideshow .close img').click(function() {
            jQuery("#slideshow").fadeOut(300);
        });
    },
    detailsPageLightSliderInit: function() {

        var $cycle = jQuery("#slideshow .images");

        $cycle.cycle({
            manualSpeed: 500,
            slides: '.slide',
            timeout: 0,
            fx: 'scrollHorz',
            next: '.next',
            prev: '.prev',
            caption: '#slideshow .page-count',
            captionTemplate: '{{slideNum}} / {{slideCount}}',
            pager: '#adv-custom-pager',
            pagerTemplate: "<a href='#'><img src='{{children.0.src}}' width=60 height=60></a>"
        });

        $cycle.on('cycle-bootstrap', function(e, opts, API) {
            console.log('dsdsd', 'sdsdsds');

            API.customGetImageSrc = function(slideOpts, opts, slideEl) {
                console.log(slideEl, 'sdsdsds');
            }
        });


    },
    detailsPageThumbnailReveal: function() {
        jQuery('#adv-custom-pager .thumbnail-button').click(function() {
            if (!jQuery('body').hasClass('thumbnail-open')) {
                jQuery('body').addClass('thumbnail-open')
            } else {
                jQuery('body').removeClass('thumbnail-open')
            }
        })
    },
    refineSearchReveal: function() {
        jQuery('.search-param .button .btn').click(function() {
            jQuery(this).css({opacity: 0, 'z-index': -100, position: 'relative'});
            jQuery('.search-param').addClass('revealed');
            jQuery('.search-param').next().slideDown();
        });

        jQuery('#hero .form-member button').click(function() {
            jQuery('.search-param .button .btn').removeAttr('style');
            jQuery('.search-param').removeClass('revealed');
            jQuery('.search-param').next().slideUp();
            jQuery('body').addClass('body-on-loading');
        });
    },
    multiSelectInit: function() {
        jQuery('.refine-search select').multipleSelect({
            placeholder: "Please select",
            width: '100%'
        });
    },
    detailsCycleInit: function() {
        var $cycle = jQuery('.details-page .slideshow');

        $cycle.cycle({
            manualSpeed: 500,
            slides: '.slide',
            timeout: 0,
            fx: 'scrollHorz',
            next: '.next',
            prev: '.prev'
        });

        jQuery(document).keyup(function(event) {
            // Stop auto slideshow
            $cycle.cycle('pause');

            if (event.keyCode == 38 || event.keyCode == 37) {
                $cycle.cycle('prev');
            } else if (event.keyCode == 40 || event.keyCode == 39) {
                $cycle.cycle('next');
            }
        });
    },
    accordionChanger: function() {
        jQuery('.details .details-menu li > a').click(function(event) {
            jQuery('.details .details-menu li').removeClass('selected');

            jQuery(this).parent().addClass('selected');

            var target = jQuery(this).data('target');
            jQuery('.details .details-wrapper > div').hide();
            jQuery(target).fadeIn();

            event.preventDefault()
        })
    },
    initMap: function() {
        if (!jQuery('#content').hasClass('details')) {
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
                icon: 'http://i.imgur.com/ynCiQGj.png'
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
