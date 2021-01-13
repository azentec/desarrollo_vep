jQuery(function () {
    "use strict";
    // Burger Menu 
    var burgerMenu = function () {
        jQuery('.js-addo-nav-toggle').on('click', function (event) {
            event.preventDefault();
            var jQuerythis = jQuery(this);
            if (jQuery('body').hasClass('offcanvas')) {
                jQuerythis.removeClass('active');
                jQuery('body').removeClass('offcanvas');
            }
            else {
                jQuerythis.addClass('active');
                jQuery('body').addClass('offcanvas');
            }
        });
    };
    // Click outside of offcanvass
    var mobileMenuOutsideClick = function () {
        jQuery(document).click(function (e) {
            var container = jQuery("#addo-aside, .js-addo-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if (jQuery('body').hasClass('offcanvas')) {
                    jQuery('body').removeClass('offcanvas');
                    jQuery('.js-addo-nav-toggle').removeClass('active');
                }
            }
        });
        jQuery(window).scroll(function () {
            if (jQuery('body').hasClass('offcanvas')) {
                jQuery('body').removeClass('offcanvas');
                jQuery('.js-addo-nav-toggle').removeClass('active');
            }
        });
    };
    var wind = jQuery(window);
    // Sections background image from data background
    var pageSection = jQuery(".bg-img, section");
    pageSection.each(function (indx) {
        if (jQuery(this).attr("data-background")) {
            jQuery(this).css("background-image", "url(" + jQuery(this).data("background") + ")");
        }
    });
    // Testimonials owlCarousel
    jQuery('.carousel-single.owl-carousel').owlCarousel({
        items: 1
        , loop: true
        , margin: 0
        , mouseDrag: false
        , autoplay: true
        , smartSpeed: 500
    });
    // Clients owlCarousel
    jQuery('.clients .owl-carousel').owlCarousel({
        loop:true,
        margin: 60,
        mouseDrag:true,
        autoplay:true,
        dots: false,
        responsiveClass:true,
        responsive:{
            0:{
                margin: 10,
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
    // Team owlCarousel
    jQuery('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        dots: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                autoplay:true,
            },
            600:{
                items:2,
                autoplay:true,
            },
            1000:{
                items:3,
                autoplay:false,
            }
        }
    });
    // Project owlCarousel
    jQuery('.projects .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: true
        , dots: true
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 2
            }
            , 1000: {
                items: 3
            }
        }
    });
    // Testimonials owlCarousel
    jQuery('.testimonials .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: true
        , dots: false
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 1
            }
            , 1000: {
                items: 1
            }
        }
    });
    
    // MagnificPopup
    jQuery(".img-zoom").magnificPopup({
        type: "image"
        , closeOnContentClick: !0
        , mainClass: "mfp-fade"
        , gallery: {
            enabled: !0
            , navigateByImgClick: !0
            , preload: [0, 1]
        }
    })
    jQuery('.magnific-youtube, .magnific-vimeo, .magnific-custom').magnificPopup({
        disableOn: 700
        , type: 'iframe'
        , mainClass: 'mfp-fade'
        , removalDelay: 300
        , preloader: false
        , fixedContentPos: false
    });
    
    // YouTubePopUp
    jQuery("a.vid").YouTubePopUp();
});
// === window When Loading === //
jQuery(window).on("load", function () {
    var wind = jQuery(window);
    // Preloader
    setTimeout(function () {
            jQuery("#loader").fadeOut(200);
        }, 200);
    // stellar
    wind.stellar();
});

// Smooth Scrolling
    jQuery('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]').not('[href="#0"]').click(function (event) {
            // On-page links
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                // Figure out element to scroll to
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    jQuery('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var jQuerytarget = jQuery(target);
                        jQuerytarget.focus();
                        if (jQuerytarget.is(":focus")) { // Checking if the target was focused
                            return false;
                        }
                        else {
                            jQuerytarget.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            jQuerytarget.focus(); // Set focus again
                        };
                    });
                }
            }
        });
// Slider 
jQuery(document).ready(function () {
    var owl = jQuery('.header .owl-carousel');
    // Slider owlCarousel
    jQuery('.slider .owl-carousel').owlCarousel({
        items: 1
        , loop: true
        , dots: true
        , margin: 0
        , autoplay: jQuery(".slider .owl-carousel").data("slider-autoplay")
        , smartSpeed: jQuery(".slider .owl-carousel").data("slider-speed")
        , animateOut: 'fadeOut'
    });
    // Slider owlCarousel
    jQuery('.slider-fade .owl-carousel').owlCarousel({
        items: 1
        , loop: true
        , dots: true
        , margin: 0
        , autoplay: jQuery(".slider-fade .owl-carousel").data("slider-autoplay")
        , smartSpeed: jQuery(".slider-fade .owl-carousel").data("slider-speed")
        , animateOut: 'fadeOut',
		animateIn: 'fadeIn',
    });
    owl.on('changed.owl.carousel', function (event) {
        var item = event.item.index - 2; // Position of the current item
        jQuery('.image-logo').removeClass('animated fadeInDown');
        jQuery('h4').removeClass('animated fadeInUp');
        jQuery('h1').removeClass('animated fadeInUp');
        jQuery('p').removeClass('animated fadeInUp');
        jQuery('.btn').removeClass('animated zoomIn');
        jQuery('.owl-item').not('.cloned').eq(item).find('.image-logo').addClass('animated fadeInDown');
        jQuery('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated fadeInUp');
        jQuery('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
        jQuery('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
        jQuery('.owl-item').not('.cloned').eq(item).find('.btn').addClass('animated zoomIn');
    });
	
	jQuery('.blank-section .wpb_row > *').unwrap();
 	jQuery('.blank-section .wpb_column > *').unwrap();
 	jQuery('.blank-section .wpb_wrapper > *').unwrap();
 	jQuery('.blank-section .wpb_content_element > *').unwrap();
	 jQuery('.blank-section .vc_column-inner  > *').unwrap();
 	jQuery('.blank-section .vc_column-inner  > *').unwrap();
 	jQuery('.blank-section .row  > *').unwrap();
 	jQuery('.blank-section .full_section_inner  > *').unwrap();
});