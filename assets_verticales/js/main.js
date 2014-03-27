/**
 *
 * This file is part of Tiendas Verticales para !Kichink
 *
 * JS functions for main layout
 *
 * @package    main
 * @copyright  2013 BitCraft (http://bitcraft.mx)
 * @author     Rodrigo Placencia (Darktide)
 */


var headerSliding = false;

function mainInt()
{
	$("#banner-slider").width(948 * $("#banner-slider").children().length);
	$("#banner-button-left").click(goLeft);
	$("#banner-button-right").click(goRight);
}

function goRight(e)
{
	if($("#banner-slider").position().left > -948 * ($("#banner-slider").children().length - 1) && !headerSliding)
	{
		headerSliding = true;
		$("#banner-slider").animate({left: "-=948px"}, 450, "swing", resetSlideFlag);
	}
}

function goLeft(e)
{
	if($("#banner-slider").position().left < 0 && !headerSliding)
	{
		headerSliding = true;
		$("#banner-slider").animate({left: "+=948px"}, 450, "swing", resetSlideFlag);
	}
}

function resetSlideFlag()
{
	headerSliding = false;
}

$(document).ready(mainInt);