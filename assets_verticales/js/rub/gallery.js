/**
 *
 * This file is part of Tiendas Verticales para !Kichink
 *
 * JS functions for store gallery
 *
 * @package    gallery
 * @copyright  2013 BitCraft (http://bitcraft.mx)
 * @author     Rodrigo Placencia (Darktide)
 */
var masCont = null;

function initGallery()
{
    $('#add_single').click(addSingle);
    $('#add_double_h').click(addDoubleH);
    $('#add_double_v').click(addDoubleV);

    $(".g-item").mouseenter(galleryItemOver);
    $(".g-item").mouseleave(galleryItemOut);
    $(".g-item").each(function(i, e) {

        $(e).click(function() {
            if ($(e).data() != undefined)
                getProdView(e);
        });
    });

    masCont = $('#gallery-content');
    masCont.isotope({
        itemSelector: '.g-item',
        masonry: {
            columnWidth: 157,
            gutterWidth: 0
        }
    });
}

function scrolling(e)
{
    //console.log($(document).scrollTop() + " height: " + $(document).height());
}

function createItem(cl, cont)
{
    //console.log(cl);
    //console.log(cont);
    var i = document.createElement("div");
    i.className = "g-item " + cl;
    i.innerHTML = cont;
    $(i).mouseenter(galleryItemOver);
    $(i).mouseleave(galleryItemOut);
    $(i).click(function() {
        getProdView(i);
    }
    );

    return i;
}

function galleryItemOver(e)
{
    var o = $(e.target);
    var op;


    if (ieban) {
        o = o.parent().prev();
        op = o.parent();
    } else {
        o = o.parent().parent();
        op = o;
    }

    var i = o.attr('id');
    var gal = gallery['store'][i];

    /*
     var block = "<div class='g-item-overly'><div class='g-item-overly-desc'>";
     block += "<span class='g-item-overly-title'>";
     block += (gal['store_name'] != null) ? gal['store_name'] : '';
     block += "</span><br><span class='g-item-overly-subtitle'>";
     block +=  gal['item_name'];
     block += "</span></div><div class='g-item-overly-buy'><div class='g-item-overly-pricetag'>";
     block += (gal['item_price'] != null) ? '$'+gal['item_price']+' '+gal['item_currency'] : '';
     //block += "</div><div class='g-item-overly-button'>COMPRAR</div></div></div>";
     block += "</div></div></div>";
     */

    //var b1 = $(block);

    //b1.hide();
    //b1.fadeIn("fast");
    //op.append(b1);

    //b1.css("top", (op.height() - b1.height()) + "px");

    /*block = "<div class='g-fav-share'><img src='" + base_url + "img/share-01.svg' alt='Compartir'><img class='g-fav-heart' src='" + base_url + "img/want-01.svg' alt='Favorito'></div>";
     var b2 = $(block);
     
     b2.hide();
     b2.fadeIn("fast");
     op.append(b2);
     
     $(".g-fav-heart").click(getOverlyView);
     */
    //$('.g-item-overly-button').click(getOverlyView);
}

function galleryItemOut(e)
{
    //$(".g-item-overly").remove();
    $(".g-fav-share").remove();
}

var prodParent = null;
var actualScroll = 0;
var sibTotal = 0;
var sibCount = 1;

function getProdView(post)
{
    obj = $(post).data().info;
    console.log(obj);
    /*var o = $(e.target).parents(".g-item");
     sibCount = 1;
     prodParent = o;
     sibTotal = prodParent.siblings().length;
     actualScroll = $(document).scrollTop();
     o.animate({opacity:0}, 350, "swing", fadeSiblings);
     }
     
     function prepare_modal_content() {
     $("#posts-container").find(".box").each(function(i, e) {
     $(e).live('click', function() {
     if (set_modal_content($(e).data()))
     $("#item_modal").modal("show");
     });
     });
     }*/

    //function set_modal_content(post) {
    /*var obj = post.info;*/
    $('#item_modal').removeClass("video");
    $('#item_modal .modal-title').html(obj.item_name);
    var content = '';
    if (obj.type == "item") {
        content = '<iframe width="100%" height="100%" src="'+obj.item_url+'" frameborder="0"/>';
    }
    if (obj.type == "video") {
        $('#item_modal').addClass("video");
        var v = getdatafromvideo(obj.item_url);

        content = '<div id="prod-close-button" data-dismiss="modal"></div>';
        content += '<iframe width="100%" height="100%" src="' + v.videourl + '" frameborder="0" allowfullscreen=""></iframe>';
    }
    if (obj.type == "article") {
        content = obj.item_body;
    }
    $('#item_modal .modal-body').html(content);
    $("#item_modal").modal("show");
    return true;

}

function fadeSiblings()
{
    prodParent.siblings().each(function(i, elem) {
        $(elem).animate({opacity: 0}, 250 + Math.random() * 600, startLoading);
    });
}

function startLoading()
{
    if (sibCount == sibTotal)
    {
        var cont = $("#overlay-container");
        //cont.width(724);
        cont.width(948);
        cont.height(0);
        cont.css("opacity", 0);
        cont.animate({opacity: 1, height: $("#gallery-content").height()}, 450, "swing", loadAnimDone);
        $("body,html,document").animate({scrollTop: $("#gallery-content").offset().top - 50});
    }
    else
    {
        sibCount++;
    }
}

function viewLoaded(res, stat)
{
    if (stat == "success")
    {
        var cont = $($("#overlay-container").children()[0]);
        if (cont.height() > $("#gallery-content").height())
        {
            $("#gallery-content").height(cont.height());
            //onResize();
        }
        prodInit();
        cont.css("opacity", 0);
        cont.animate({opacity: 1}, 450);
        $(".p-item-overly-button").click(getOverlyView);
        $(".p-fav-heart").click(getOverlyView);
    }
}

function loadAnimDone(e)
{
    var cont = $("#overlay-container");
    cont.load(base_url + "index.php/getview/prod", viewLoaded);
}

function addSingle()
{
    var o = createItem("g-item-single extragrande", "<div><img src='" + base_url + "img/playerita.png'></div>");

    masCont.append(o).isotope('insert', $(o));
    //onResize();
}

function addDoubleH()
{
    var o = createItem("g-item-double-h serigrafia", "<div><img src='" + base_url + "img/play.png'></div>");

    masCont.append(o).isotope("insert", $(o));
    //onResize();
}

function addDoubleV()
{
    var o = createItem("g-item-double-v limitada", "<div class='g-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>");

    masCont.append(o).isotope("insert", $(o));
    //onResize();
}

function onResize() {
    //$('#side-bar').height($('#content').height() - 60);
}

$.Isotope.prototype._getMasonryGutterColumns = function() {
    var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
    containerWidth = this.element.width();

    this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
            this.$filteredAtoms.outerWidth(true) ||
            containerWidth;
    this.masonry.columnWidth += gutter;
    this.masonry.cols = Math.floor((containerWidth + gutter) / this.masonry.columnWidth);
    this.masonry.cols = Math.max(this.masonry.cols, 1);
};

$.Isotope.prototype._masonryReset = function() {
    this.masonry = {};
    this._getMasonryGutterColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
        this.masonry.colYs.push(0);
    }
};

$(document).scroll(scrolling);
$(document).ready(initGallery);
//$(window).load(onResize);
//$(window).resize(onResize);
