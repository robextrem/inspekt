/**
 *
 * This file is part of Tiendas Verticales para !Kichink
 *
 * JS functions for store Product View
 *
 * @package    product
 * @copyright  2013 BitCraft (http://bitcraft.mx)
 * @author     Rodrigo Placencia (Darktide)
 */

var prodHeaderSliding = false;
var prodBannerBlock = 0;

function prodInit(){
	prodBannerBlock = $("#prod-banner").width();
	$("#p-banner-slider").width(prodBannerBlock * $("#p-banner-slider").children().length);
	$("#p-banner-button-left").click(prodGoLeft);
	$("#p-banner-button-right").click(prodGoRight);
	$("#prod-close-button").click(closeProducts);
}

function prodGoRight(e){
	if($("#p-banner-slider").position().left > -prodBannerBlock * ($("#p-banner-slider").children().length - 1) && !prodHeaderSliding)
	{
		prodHeaderSliding = true;
		$("#p-banner-slider").animate({left: "-=" + prodBannerBlock + "px"}, 450, "swing", prodResetSlideFlag);
	}
}

function prodGoLeft(e){
	if($("#p-banner-slider").position().left < 0 && !prodHeaderSliding)
	{
		prodHeaderSliding = true;
		$("#p-banner-slider").animate({left: "+=" + prodBannerBlock + "px"}, 450, "swing", prodResetSlideFlag);
	}
}

function prodResetSlideFlag(){
	prodHeaderSliding = false;
}

function closeProducts(){
	$("#prod-container").animate({opacity:0}, 450, "swing", closeAnimFinished);
}

function closeAnimFinished(){
	var cont = $("#overlay-container");
	cont.animate({opacity:1, height:0}, 450);
	$("body,html,document").animate({scrollTop:actualScroll}, 450, showGallery);
	$("#prod-container").remove();
}

function showGallery(){
	prodParent.siblings().each(function(i, elem){ $(elem).animate({opacity:1}, 50 + Math.random() * 600); });
	prodParent.animate({opacity:1}, 350)
}