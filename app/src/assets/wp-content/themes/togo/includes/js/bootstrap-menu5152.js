/**
	togo - HTML header navigation menu - v1.4.2
 	Copyright (c) 2020, Pophonic
	
	Author: Pophonic
	Profile: https://codecanyon.net/user/pophonic
	
**/


jQuery(document).ready(function() {
	
	"use strict";
	
	/* ========== Sticky on scroll ========== */
	function stickyNav() {

		var scrollTop = jQuery(window).scrollTop(),
			noSticky = jQuery('.no-sticky'),
			viewportSm = jQuery('.viewport-sm'),
			viewportLg = jQuery('.viewport-lg'),
			viewportLgBody = viewportLg.parent('body'),
			viewportLgNosticky = jQuery('.viewport-lg.no-sticky'),
			viewportLgNostickyBody = viewportLgNosticky.parent('body'),
			viewportLgLogo = viewportLg.find('.logo img'),
			viewportLgNostickyLogo = viewportLgNosticky.find('.logo img'),
			headerTransparentLg = jQuery('.viewport-lg.header-transparent'),
			headerTransparentLgNosticky = jQuery('.viewport-lg.header-transparent.no-sticky'),
			headerTransparentLgBody = headerTransparentLg.parent('body'),
			headerOpacityLg = jQuery('.viewport-lg.header-opacity'),
			headerOpacityLgNosticky = jQuery('.viewport-lg.header-opacity.no-sticky'),
			headerOpacityLgBody = headerOpacityLg.parent('body');

		if (scrollTop > togoHeaderHeight) {
			togoHeader.addClass('sticky');
			viewportLgLogo.attr('src', stickyLogoSrc);
			viewportLgNostickyLogo.attr('src', logoSrc);
			headerTransparentLg.removeClass('header-transparent-on');
			headerOpacityLg.removeClass('header-opacity-on');
			headerTransparentLgNosticky.addClass('header-transparent-on');
			headerOpacityLgNosticky.addClass('header-opacity-on');
			viewportLgBody.css("margin-top", togoHeaderHeight);
			viewportLg.css("margin-top", -togoHeaderHeight);
		} else {
			togoHeader.removeClass('sticky');
			viewportLgLogo.attr('src', logoSrc);
			headerTransparentLg.addClass('header-transparent-on');
			headerOpacityLg.addClass('header-opacity-on');
			viewportLgBody.add(viewportLg).css("margin-top", "0");
		}

		noSticky.removeClass('sticky');
		viewportSm.removeClass('sticky');
		
		headerTransparentLg.add(headerTransparentLgBody).add(headerOpacityLg).add(headerOpacityLgBody).add(viewportLgNostickyBody).add(viewportLgNosticky).css("margin-top", "0");

		var logoCenterWidth = jQuery('.logoCenter .logo img').width(),
			menuCenterOneWidth = jQuery('.center-menu-1 .togo-menu').width(),
			menuCenterOneListMenu = jQuery('.center-menu-1 .togo-menu > ul'),
			menuCenterOneListWidth = menuCenterOneWidth - logoCenterWidth;

		if (jQuery(window).width() < 1200) {
			menuCenterOneListMenu.outerWidth( menuCenterOneWidth );
		} else {
			menuCenterOneListMenu.outerWidth( menuCenterOneListWidth / 2 );
		}

		jQuery('.logoCenter').width(logoCenterWidth);
		
	}

	/* ========== Menu overlay transition ========== */
	function overlayMenuTransition() {
		var overlayMenuFirst = jQuery('.togo-menu-overlay > ul > li:first-child'),
			overlayMenuList = jQuery('.togo-menu-overlay > ul > li');

		overlayMenuFirst.attr('data-delay', '0');

		overlayMenuList.each(function(){
			var jQuerythis = jQuery(this),
				overlayMenuNext = jQuerythis.next('li'),
				menuDataDelay = jQuerythis.attr('data-delay'),
				menuDataDelayNext = parseInt(menuDataDelay) + parseInt('100');

			overlayMenuNext.attr('data-delay', menuDataDelayNext);

			jQuerythis.delay(menuDataDelay).queue(function(next) {
				jQuery(this).addClass("menuSlideIn");
				next();
			});
		});
	}

	/* ========== Horizontal navigation menu ========== */
	if (jQuery('.togo-header').length) {

		var togoHeader = jQuery('.togo-header'),
			togoHeaderHeight = togoHeader.height(),
			logo = togoHeader.find('.logo'),
			logoImg = logo.find('img'),
			logoSrc = logoImg.attr('src'),
			logoClone = logo.clone(),
			mobileLogoSrc = logo.data('mobile-logo'),
			stickyLogoSrc = logo.data('sticky-logo'),
			burgerMenu = togoHeader.find('.burger-menu'),
			togoMenuListWrapper = jQuery('.togo-menu > ul'),
			togoMenuListDropdown = jQuery('.togo-menu ul li:has(ul)'),
			headerShadow = jQuery('.togo-header.header-shadow'),
			headerTransparent = jQuery('.togo-header.header-transparent'),
			headerOpacity = jQuery('.togo-header.header-opacity'),
			megaMenuFullwidthContainer = jQuery('.mega-menu-fullwidth .mega-menu-container');

		/* ========== Center menu 1 ========== */
		jQuery('.center-menu-1 .togo-menu > ul:first-child').after('<div class="logoCenter"></div>');
		jQuery('.logoCenter').html(logoClone);

		/* ========== Mega menu fullwidth wrap container ========== */
		megaMenuFullwidthContainer.each(function(){
			jQuery(this).children().wrapAll('<div class="mega-menu-fullwidth-container"></div>');
		});

		/* ========== Window resize ========== */
		jQuery(window).on("resize", function() {

			var megaMenuContainer = jQuery('.mega-menu-fullwidth-container');

			if (jQuery(window).width() < 1200) {

				logoImg.attr('src', mobileLogoSrc);
				togoHeader.removeClass('viewport-lg');
				togoHeader.addClass('viewport-sm');
				headerTransparent.removeClass('header-transparent-on');
				headerOpacity.removeClass('header-opacity-on');
				megaMenuContainer.removeClass('container');

			} else {

				logoImg.attr('src', logoSrc);
				togoHeader.removeClass('viewport-sm');
				togoHeader.addClass('viewport-lg');
				headerTransparent.addClass('header-transparent-on');
				headerOpacity.addClass('header-opacity-on');
				megaMenuContainer.addClass('container');

			}

			stickyNav();

		}).resize();

		/* ========== Dropdown Menu Toggle ========== */
		burgerMenu.on("click", function(){
			jQuery(this).toggleClass('menu-open');
			togoMenuListWrapper.slideToggle(300);
		});
		
		togoMenuListDropdown.each(function(){
			jQuery(this).append( '<span class="dropdown-plus"></span>' );
			jQuery(this).addClass('dropdown_menu');
		});
		
		jQuery('.dropdown-plus').on("click", function(){
			jQuery(this).prev('ul').slideToggle(300);
			jQuery(this).toggleClass('dropdown-open');
		});
		
		jQuery('.dropdown_menu a').append('<span></span>');

		/* ========== Added header shadow ========== */
		headerShadow.append('<div class="header-shadow-wrapper"></div>');

		/* ========== Sticky on scroll ========== */
		jQuery(window).on("scroll", function() {
			stickyNav();
		}).scroll();

		/* ========== Menu hover transition ========== */
		var listMenuHover4 = jQuery('.togo-menu.menu-hover-4 > ul > li > a');
		listMenuHover4.append('<div class="hover-transition"></div>');

	}

	/* ========== Overlay navigation menu ========== */
	if (jQuery('.togo-header-overlay').length) {

		var togoHeaderOverlay = jQuery('.togo-header-overlay'),
			togoMenuOverlay = jQuery('.togo-menu-overlay'),
			burgerMenuOverlay = togoHeaderOverlay.find('.burger-menu'),
			lineMenuOverlay = togoHeaderOverlay.find('.line-menu'),
			menuOverlayLogo = togoHeaderOverlay.find('.logo'),
			overlayLogoClone = menuOverlayLogo.clone(),
			menuWrapperLogoSrc = menuOverlayLogo.data('overlay-logo'),
			menuOverlayListDropdown = jQuery('.togo-menu-overlay > ul > li:has(ul)'),
			menuOverlayLink = jQuery('.togo-menu-overlay > ul > li > a'),
			menuSlide = jQuery('.togo-header-overlay.menu-slide'),
			menuSlideSubmenuLink = menuSlide.find('.togo-menu-overlay > ul ul a'),
			menuSlideSubmenuDropdown = menuSlide.find('.togo-menu-overlay > ul > li > ul li:has(ul)'),
			menuSocialMedia = togoMenuOverlay.next('.menu-social-media'),
			submenuVerticalListItem = jQuery('.submenu-vertical > ul > li > ul li:has(ul)'),
			submenuVerticalLink = jQuery('.submenu-vertical > ul > li > ul a');

		lineMenuOverlay.wrapAll('<span></span>');
		menuOverlayLink.wrap('<div class="menu-overlay-link"></div>');
		submenuVerticalLink.wrap('<div class="menu-overlay-link"></div>');
		menuSlideSubmenuLink.wrap('<div class="menu-overlay-link"></div>');

		/* ========== Submenu Toggle ========== */
		menuOverlayListDropdown.each(function(){
			var menuOverlayDropdownLink = jQuery(this).children('.menu-overlay-link');
			menuOverlayDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
			jQuery(this).addClass('overlay_dropdown_menu');
		});

		submenuVerticalListItem.each(function(){
			var submenuVerticalDropdownLink = jQuery(this).children('.menu-overlay-link');
			submenuVerticalDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
			jQuery(this).addClass('overlay_dropdown_menu');
		});

		menuSlideSubmenuDropdown.each(function(){
			var submenuVerticalDropdownLink = jQuery(this).children('.menu-overlay-link');
			submenuVerticalDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
			jQuery(this).addClass('overlay_dropdown_menu');
		});

		jQuery('.overlay_dropdown_menu > ul').addClass('overlay-submenu-close');
		
		jQuery('.overlay-dropdown-plus').on("click", function(){
			var jQuerythisParent = jQuery(this).parent('.menu-overlay-link');
			jQuerythisParent.next('ul').slideToggle(300).toggleClass('overlay-submenu-close');
			jQuery(this).toggleClass('overlay-dropdown-open');
		});

		togoMenuOverlay.add(menuSocialMedia).wrapAll('<div class="nav-menu-wrapper"></div>');

		var overlayNavMenuWrapper = jQuery('.nav-menu-wrapper');

		overlayNavMenuWrapper.prepend(overlayLogoClone);
		overlayNavMenuWrapper.find('.logo img').attr('src', menuWrapperLogoSrc);

		var menuOverlayHover = jQuery('.togo-menu-overlay > ul > .overlay_dropdown_menu > ul');

		menuOverlayHover.each(function(){
			jQuery(this).on("mouseenter", function () {
				jQuery(this).parents("li").addClass("overlay-menu-hover");
			});
			jQuery(this).on("mouseleave", function () {
				jQuery(this).parents("li").removeClass("overlay-menu-hover");
			});
		});

		/* ========== Menu overlay open ========== */
		burgerMenuOverlay.on("click", function(){

			var overlayMenuList = jQuery('.togo-menu-overlay > ul > li');

			jQuery(this).toggleClass('menu-open');
			overlayNavMenuWrapper.toggleClass('overlay-menu-open');
			overlayMenuList.removeClass("menuSlideIn");
			
			if (jQuery(this).hasClass("menu-open")) {
				overlayMenuTransition();
				overlayMenuList.removeClass("menuSlideOut").addClass("menuFade");
			}

			if (!jQuery(this).hasClass("menu-open")) {
				overlayMenuList.addClass("menuSlideOut").removeClass("menuFade");
			}

		});

		/* ========== Menu slide settings ========== */
		var menuSlideNavWrapper = menuSlide.find('.nav-menu-wrapper'),
			menuSlideNavLogo = menuSlideNavWrapper.find('.logo');

		if (togoHeaderOverlay.hasClass('menu-slide')){
			togoHeaderOverlay.removeClass('overlay-center-menu');
		}

		menuSlideNavLogo.remove();
		menuSlideNavWrapper.after('<div class="slidemenu-bg-overlay"></div>');

		jQuery('.slidemenu-bg-overlay').on("click", function(){
			menuSlideNavWrapper.removeClass('overlay-menu-open');
			burgerMenuOverlay.removeClass('menu-open');
		});

	}

	/* ========== Fixed sidebar menu ========== */
	if (jQuery('.togo-fixed-sidebar').length) {
		var togoFixedSidebar = jQuery('.togo-fixed-sidebar'),
			togoMenuFixed = jQuery('.togo-menu-fixed'),
			togoSideContent = jQuery('.togo-side-content'),
			logoFixedSidebar = togoFixedSidebar.find('.logo'),
			logoClone = logoFixedSidebar.clone(),
			burgerMenuFixedSidebar = togoFixedSidebar.find('.burger-menu'),
			burgerMenuDetach = burgerMenuFixedSidebar.detach(),
			togoFixedDropdown = togoMenuFixed.find('li:has(ul)');

		togoFixedSidebar.parent('body').addClass('body-fixed-sidebar');
		togoFixedSidebar.after('<div class="fixedsidebar-bg-overlay"></div>').after(burgerMenuDetach);
		togoSideContent.prepend(logoClone);

		jQuery('.togo-fixed-sidebar .logo, .togo-menu-fixed').wrapAll('<div class="fixed-menu-wrap"></div>');

		var burgerMenuMove = togoFixedSidebar.next('.burger-menu'),
			fixedSidebarlineMenu = burgerMenuMove.find('.line-menu');

		fixedSidebarlineMenu.wrapAll('<span></span>');

		/* ========== Side menu open on mobile ========== */
		burgerMenuMove.on("click", function(){
			jQuery(this).toggleClass('menu-open');
			togoFixedSidebar.toggleClass('fixed-sidebar-open');
		});

		jQuery('.fixedsidebar-bg-overlay').on("click", function(){
			togoFixedSidebar.removeClass('fixed-sidebar-open');
			burgerMenuMove.removeClass('menu-open');
		});

		/* ========== Submenu collapse ========== */
		togoFixedDropdown.each(function(){
			jQuery(this).append( '<span class="overlay-dropdown-plus"></span>' );
		});

		jQuery('.overlay-dropdown-plus').on("click", function(){
			jQuery(this).prev('ul').slideToggle(300).toggleClass('submenu-collapse');
			jQuery(this).toggleClass('overlay-dropdown-open');
		});
	}

	/* ========== Menu icon color ========== */
	jQuery('.togo-menu-icon').css('color', function () {
		var iconColorAttr = jQuery(this).data('fa-color');
		return iconColorAttr;
	});

});