var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

$(document).ready(function() {

    $(window).scroll(function()
    {
        if (($(window).scrollTop()) >= ($(document).height() - $(window).height() - $(".footer").height() - 70))
        {
            if ((selector != "bandas") && (selector != "mastiendas") && (selector != "calendario"))
                load_more(selector);
        }
    });

    $("#tab-mastiendas #seccionfoto").find("li a").each(function(i, e) {
        $(e).click(function(event) {
            event.preventDefault();
            var find = $(this).attr("href");
            var catTopPosition = jQuery(find).offset().top - 50;
            jQuery('html, body').animate({scrollTop: catTopPosition}, 'slow');
        });
    });
    
    $("#tab-banda .pagination").find("li a").each(function(i, e) {
        $(e).click(function(event) {
            event.preventDefault();
            var find = "div#" + $(this).html();
            var catTopPosition = jQuery(find).offset().top - 50;
            jQuery('html, body').animate({scrollTop: catTopPosition}, 'slow');
        });
    });

    $("#li-").click(function() {
        hide_menu_merch();
        var e = get_limit_offset("");
        if (e.offset == 0) {
            load_more("");
        }
        selector = "";
    });

    $("#li-discos").click(function() {
        hide_menu_merch();
        var e = get_limit_offset("discos");
        if (e.offset == 0) {
            load_more("discos");
        }
        selector = "discos";
    });

    $("#li-mastiendas").click(function() {
        hide_menu_merch();
        var e = get_limit_offset("mastiendas");
        if (e.offset == 0) {
            load_destacados();
            load_tiendas();
        }
        selector = "mastiendas";
    });

    $("#li-banda").click(function() {
        hide_menu_merch();
        var e = get_limit_offset("banda");
        if (e.offset == 0) {
            load_bandas();
        }
        selector = "banda";
    });

    $("#li-merch").click(function() {
        $("#submenu").animate({marginTop: 0}, 500, function() {
            var e = get_limit_offset("merch");
            if (e.offset == 0) {
                load_more("merch");
            } else {
                $('#tab-merch').isotope({filter: '*'});
            }
        });
        selector = "merch";
    });

    $("#li-video").click(function() {
        $("#submenu").animate({marginTop: -55}, 500, function() {
            var e = get_limit_offset("video");
            if (e.offset == 0) {
                load_more("video");
            }
        });
        selector = "video";
    });

    $("#li-calendario").click(function() {

        jQuery('html, body').animate({scrollTop: 478}, 'slow');

        var options = {
            events_source: '/assets_verticales/calendario.json.php',
            view: 'month',
            language: "es-MX",
            tmpl_path: '/assets_verticales/js/tmpls/',
            tmpl_cache: false,
            day: "now",
            onAfterEventsLoad: function(events) {
                if (!events) {
                    return;
                }
                var list = $('#eventlist');
                list.html('');

                $.each(events, function(key, val) {
                    $(document.createElement('li'))
                            .html('<a href="' + val.url + '">' + val.title + '</a>')
                            .appendTo(list);
                });
            },
            onAfterViewLoad: function(view) {
                $('.page-header h3').text(this.getTitle());
                $('.btn-group button').removeClass('active');
                $('button[data-calendar-view="' + view + '"]').addClass('active');
            },
            classes: {
                months: {
                    general: 'label'
                }
            }
        };

        var calendar = $('#calendar').calendar(options);

        $('.btn-group button[data-calendar-nav]').each(function() {
            var $this = $(this);
            $this.click(function() {
                calendar.navigate($this.data('calendar-nav'));
            });
        });

        $('.btn-group button[data-calendar-view]').each(function() {
            var $this = $(this);
            $this.click(function() {
                calendar.view($this.data('calendar-view'));
            });
        });

        $('#first_day').change(function() {
            var value = $(this).val();
            value = value.length ? parseInt(value) : null;
            calendar.setOptions({first_day: value});
            calendar.view();
        });

        $('#language').change(function() {
            calendar.setLanguage($(this).val());
            calendar.view();
        });

        $('#events-in-modal').change(function() {
            var val = $(this).is(':checked') ? $(this).val() : null;
            calendar.setOptions({modal: val});
        });
        $('#events-modal .modal-header, #events-modal .modal-footer').click(function(e) {
            //e.preventDefault();
            //e.stopPropagation();
        });
        selector = "calendario";
    });

    $("#g-filters").find("li").each(function(i, e) {
        $(e).click(function() {
            window.history.replaceState({}, '', "/on/" + ((selector == "banda") ? "bandas" : ((selector == "home") ? "" : selector)));
        });
    });


    $("#submenu").find("li a").each(function(i, e) {
        $(e).click(function() {
            if ($(e).data().filter)
                f = "." + $(e).data().filter;
            else
                f = "*";
            $('#tab-merch').isotope({
                filter: f
            });
        });
    });

    function hide_menu_merch() {
        $("#submenu").animate({marginTop: -55}, 500);
    }

    delay(function() {
        $("#li-" + selector).click();
    }, 1000);



});

function get_limit_offset(selector) {
    var s = (selector == undefined) ? "" : selector;
    var e = $("#g-filters li a[href=#tab-" + s + "]");
    if (e) {
        return $(e).data();
    } else {
        return 32;
    }
}

function set_limit_offset(selector, offset) {
    var e = $("#g-filters li a[href=#tab-" + selector + "]");
    $(e).data().offset = offset;
    $(e).attr("data-offset", offset);
    return $(e).data();
}


function get_sizes(l) {
    var cls = new Array();
    cls[0] = new Array('g-item-single', 'g-item-single', 'g-item-single');
    cls[1] = new Array('g-item-double-h', 'g-item-double-h');
    cls[2] = new Array('g-item-single', 'g-item-double-h', 'g-item-quarter', 'g-item-quarter');
    cls[3] = new Array('g-item-quarter', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter');
    //cls[4] = new Array('g-item-single', 'g-item-single', 'g-item-quarter', 'g-item-quarter', 'g-item-single', 'g-item-double-h', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter');
    var i = Math.floor(Math.random() * cls.length);
    while (i == last)
        i = Math.floor(Math.random() * cls.length);
    last = i;
    return cls[i];
}

function load_destacados() {
    var url = "/on/get_posts/330/0/item_kichink?tags=destacado";

    $.ajaxq("loadr", {
        type: "POST",
        beforeSend: function() {
            $("#bottom-frame").after("<div id='loader'></div>");
        },
        url: url,
        success: function(data) {
            obj = jQuery.parseJSON(data);
            for (var i in obj.result) {
                var data = obj.result[i];
                $("#carrusel-destacado #foo5").append("<li><a href='" + data.item_url + "' target='_blank'><img class='img-responsive' src='" + data.item_thumb + "'/></a></li>");
            }
            init_carousel("#carrusel-destacado");

        }

    });

}

function load_tiendas() {
    var url = "/on/get_posts/64/0/tienda?order=desc";
    $.ajaxq("loadr", {
        type: "POST",
        async: true,
        url: url,
        success: function(data) {
            if (data.item_cat[0])
                $("#tab-mastiendas ." + data.item_cat[0] + " ul").append("<li><a href='" + data.item_url + "' target='_blank'>" + data.item_name + "</a></li>");
        }
    });
}

function load_bandas() {
    var url = "/on/get_posts/2/0/banda?tags=banner&order=desc";
    $.ajaxq("loadr", {
        type: "POST",
        async: true,
        beforeSend: function() {
            $("#bottom-frame").after("<div id='loader'></div>");
        },
        url: url,
        success: function(data) {
            obj = jQuery.parseJSON(data);
            $("#dosbandas #bandaleft").attr("href", obj.result[0].item_url);
            $("#dosbandas #bandaleft .left").css("background", "url(" + obj.result[0].item_thumb + ")");
            $("#dosbandas #bandaleft .left .nombrebanda").html(obj.result[0].item_name);

            $("#dosbandas #bandaright").attr("href", obj.result[1].item_url);
            $("#dosbandas #bandaright .right").css("background", "url(" + obj.result[1].item_thumb + ")");
            $("#dosbandas #bandaright .right .nombrebanda").html(obj.result[1].item_name);
        }

    });

    url = "/on/get_posts/100/0/banda";

    $.ajaxq("loadr", {
        type: "POST",
        beforeSend: function() {
            $("#bottom-frame").after("<div id='loader'></div>");
        },
        url: url,
        success: function(data) {
            obj = jQuery.parseJSON(data);
            for (var i in obj.result) {
                var data = obj.result[i];
                var fletter = data.item_name.toUpperCase().substr(0, 1);

                $("#" + fletter).find(".allbands").append("<li><a href='" + data.item_url + "' target='_blank'>" + data.item_name + "</a></li>");

                if (Math.floor((Math.random() * 3) + 1) >= 2) {
                    $("#carrusel-bandas #foo4").append("<li><a href='" + data.item_url + "' target='_blank'><img class='img-responsive' src='" + data.item_thumb + "'/></a></li>");
                }

            }
            init_carousel("#carrusel-bandas");

        }

    });


}

function init_carousel(id) {

    $(id).find("ul").carouFredSel({
        responsive: true,
        width: '90%',
        scroll: 1,
        prev: id + ' .prev',
        next: id + ' .next',
        items: {
            width: 136,
            //	height: '30%',	//	optionally resize item-height
            visible: {
                min: 2,
                max: 5
            }
        }
    });
}

//No banda/bandas o calendario o mastiendas
function load_more(selector) {
    if (!$.ajaxq.isRunning()) {
        var e = get_limit_offset(selector);
        var target = "#tab-" + selector;
        var l = parseInt(e.limit);
        var offset = parseInt(e.offset);
        var url = "";

        if ((selector != "item_kichink") && (selector != "banda") && (selector != "articulo") && (selector != "video"))
            url = "/on/get_posts/" + (l) + "/" + offset + "/item_kichink?tags=" + selector + "&order=desc";
        else
            url = "/on/get_posts/" + (l) + "/" + offset + "/" + selector + "?tags=&order=desc";

        $.ajaxq("loadr", {
            type: "POST",
            async: true,
            beforeSend: function() {
                $("#bottom-frame").after("<div id='loader'></div>");
            },
            url: url,
            success: function(data) {
                //selector=(selector=="")?"home":selector;
                var gallery = JSON.parse(data);

                set_limit_offset(selector, offset + l);
                galleryItems(gallery, $(target));

                delay(function() {
                    $(target).isotope({
                        filter: "*"
                    });
                }, 1000);
            }
        });
    } else {
        //$.ajaxq.clear("loadr");
    }

}



function galleryItems(items, masCont) {

    masCont.isotope({
        filter: '*',
        itemSelector: '.g-item',
        masonry: {
            columnWidth: 157,
            gutterWidth: 0
        }
    });

    var itemsColors = Array(
            "g-item-filter-cielo",
            "g-item-filter-magenta",
            "g-item-filter-aqua",
            "g-item-filter-mostaza",
            "g-item-filter-rojo",
            "g-item-filter-pasto",
            "g-item-filter-naranja",
            "g-item-filter-cielocl");

    var block;
    var cl = "";
    var galleryItem;
    var displayban = "visibility:visible;";
    var ieban = /MSIE (\d+\.\d+);/.test(navigator.userAgent);

    items = items['result'];

    for (var n = 0; n < items.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (items.length - n));
        var temp = items[k];
        items[k] = items[n];
        items[n] = temp;

    }

    if (ieban) {
        displayban = "visibility:hidden;";
    }

    for (i in items) {
        var randcolor = itemsColors[Math.floor(Math.random() * itemsColors.length)];
        var colorfilter = '<div id="filter-' + gid + '" class="g-item-filter"><div class="g-item-filter-content ' + randcolor + '"/></div>';
        switch (items[i]['type']) {
            case 'item':{
                var gid = i;
                if (items[i]['item_cat'] == "discos") {
                    if ((selector == "") || (selector == "home"))
                        cls = 'g-item-quarter';
                    else
                        cls = 'g-item-banda';
                } else {

                    if (sizes.length < 1) {
                        sizes = get_sizes(last);
                        //sizes.pop(); //por el compare
                    }
                    cls = sizes[0];
                    sizes.shift();
                }
                  
                var ar=items[i]['item_cat'];
                
                img="bandas.png";
                
                if(!ar.indexOf("merch")){
                    img="merch.png";
                }
                
                if(!ar.indexOf("discos")){
                    img="discos.png";
                }
                colorfilter = '<div id="filter-' + gid + '" class="g-item-filter g-hover"><div class="g-item-filter-content ' + randcolor + '"><img src="/assets_verticales/img/musica/iconos/'+img+'" /><br/>' + items[i]['item_name'] + '</div></div>';

                var gImg = items[i]['item_thumb'];
                block = '<div class="post" id="' + gid + '" style="background-image:url(' + gImg + ');">';
                if (!ieban) {
                    block += colorfilter;
                }
              
              
                block += '</div>';
                if (ieban)
                    block += colorfilter;
                cl = cls + ' ' + ar.join(" ");
                var galleryItem = document.createElement("div");
                $(galleryItem).addClass("g-item " + cl);
                $(galleryItem).html(block);
                $(galleryItem).data('info', items[i]);

                $(galleryItem).click(function() {
                    
                    $('#item_modal').removeClass("video");
                    $('#item_modal .modal-title').html($(this).data().info.item_name);
                    var content = '';
                    if (items[i]['type'] == "item") {
                        content = '<iframe width="100%" height="100%" src="' + $(this).data().info.item_url + '" frameborder="0"/>';
                    }

                    $('#item_modal .modal-body').html(content);
                    $("#item_modal").modal("show");
                });

                masCont.isotope('insert', $(galleryItem));
                break;
            }
            case 'article':{
                var gid = i;
                var size = ['g-item-double-v', 'g-item-single'];
                var cls = size[Math.floor(Math.random() * size.length)];

                block = '<div class="post" id="' + gid + '" class="g-text">';
                block += '<div class="p">' + items[i]['item_desc'] + '</div>';

                block += '</div>';

                cl = cls + ' ' + items[i]['item_cat'].join(" ");
                galleryItem = document.createElement("div");
                $(galleryItem).addClass = "g-item " + cl;
                $(galleryItem).html(block);
                $(galleryItem).data('info', items[i]);
                masCont.isotope('insert', $(galleryItem));
                break;
            }
            case 'video':{
                var gid = i;
                cls = 'g-item-double-h';
                if (items[i]['item_url'] != undefined) {
                    var v = getdatafromvideo(items[i]['item_url']);
                }

                colorfilter = '<div id="filter-' + gid + '" class="g-item-filter g-hover"><div class="g-item-filter-content ' + randcolor + '">' + items[i]['item_name'] + '</div></div>';

                var gImg = items[i]['item_thumb'];
                block = '<div class="post" id="' + gid + '" style="background-image:url(' + gImg + ');">';
                if (!ieban) {
                    block += colorfilter;
                }
                block += '<img src="" style="' + displayban + '" />';
                block += '</div>';
                if (ieban)
                    block += colorfilter;
                cl = cls + ' ' + items[i]['item_cat'].join(" ");
                var galleryItem = document.createElement("div");
                $(galleryItem).addClass("g-item " + cl);
                $(galleryItem).html(block);
                $(galleryItem).data('info', items[i]);

                $(galleryItem).click(function() {
                    $('#item_modal').removeClass("video");
                    $('#item_modal .modal-title').html($(this).data().info,item_name);
                    var content = '';
                    if (items[i]['type'] == "video") {
                        $('#item_modal').addClass("video");
                        var v = getdatafromvideo($(this).data().info.item_url);

                        content = '<div id="prod-close-button" data-dismiss="modal"></div>';
                        content += '<iframe width="100%" height="100%" src="' + v.videourl + '" frameborder="0" allowfullscreen=""></iframe>';
                    }

                    $('#item_modal .modal-body').html(content);
                    $("#item_modal").modal("show");
                });

                masCont.isotope('insert', $(galleryItem));


                /*
                 if (block != undefined) {
                 galleryItem = createItem('g-item g-item-double-h ' + items[i]['item_cat'], block);
                 $(galleryItem).data('info', items[i]);
                 masCont.isotope('insert', $(galleryItem));
                 }*/
                break;
            }
        }
    }


    function setupVideo(gid, v) {
        var block;
        if (v != undefined) {
            var randcolor = itemsColors[Math.floor(Math.random() * itemsColors.length)];
            var colorfilter = '<div id="filter-' + gid + '" class="g-item-filter"><div class="g-item-filter-content ' + randcolor + '"/></div>';

            if (ieban) {
                ieban = true;
                displayban = "visibility:hidden;";
            }

            block = '<div id="' + gid + '" style="background-image:url(' + v.thumbnail + ');">';
            if (!ieban) {
                block += colorfilter;
            }
            block += '<img src="" style="' + displayban + '" />';
            block += '</div>';
            if (ieban)
                block += colorfilter;

        }
        return block;
    }
}