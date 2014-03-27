/**
 *
 * This file is part of Tiendas Verticales para !Kichink
 *
 * JS functions for store purchare overly
 *
 * @package    overly
 * @copyright  2013 BitCraft (http://bitcraft.mx)
 * @author     Rodrigo Placencia (Darktide)
 */

function getOverlyView(e)
{
	e.stopPropagation();
	var wall = $("<div id='po-wall'></div>");
	wall.height($(document).height());
	wall.width($(window).width());
	wall.css("opacity", 0);
	wall.animate({opacity:0.8}, 400);
	var wallContent = $("<div id='po-wall-content'></div>");
	wallContent.width(727);
	wallContent.height(474);
	wallContent.css("top", ($(window).height() / 2 - 237) + "px");
	wallContent.css("left", ($(window).width() / 2 - 363) + "px");
	wallContent.load(base_url + "index.php/getview/overly", overlyLoaded);
	wallContent.css("opacity", 0);
	wallContent.animate({opacity:1}, 500);
	$('body').append(wall);
	$('body').append(wallContent);
}

function overlyLoaded(res, stat)
{
	if(stat == "success")
	{
		$("#po-close-button").click(closeOverly);
	}
}

function closeOverly()
{
	$("#po-wall").animate({opacity:0}, 400, "swing", removeOverly);
	$("#po-wall-content").animate({opacity:0}, 300);
}

function removeOverly()
{
	$("#po-wall").remove();
	$("#po-wall-content").remove();
}