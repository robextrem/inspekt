$('#tab-home').isotope();
$('#tab-merch').isotope();
$('#tab-discos').isotope();

var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

$(document).ready(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() < 200) {
            $(".scrollup").css("opacity", 0)
        } else {
            $(".scrollup").css("opacity", 1)
        }
    });

    $('.scrollup').click(function(evt) {
        evt.preventDefault();
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });

    $("#g-filters").find("li a").each(function(i, e) {
        $(e).click(function() {
            selector = $(e).data().filter;
            if (selector == "merch") {
                $("#submenu").animate({marginTop: 0}, 500);
            } else {
                $("#submenu").animate({marginTop: -55}, 500);
            }
            
            if(selector == "mastiendas"){
                alert("no seas chismoso, esto todavia no esta!");
            }
            
            if (selector != "banda" && selector != "bandas" && selector != "calendario") {
                if ($(this).data().offset == 0) {
                    load_more(selector);
                }
                else {
                    delay(function() {
                    $($(this).attr("href")).isotope({
                        filter: "*"
                    });
                    }, 500);
                }
            }

            window.history.replaceState({}, '', "/musica/" + ((selector == "banda") ? "bandas" : ((selector == "home") ? "" : selector)));

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

    $("#tab-banda .pagination").find("li a").each(function(i, e) {
        $(e).click(function() {
            var find = "h1#" + $(this).html();
            var catTopPosition = jQuery(find).offset().top - 50;
            jQuery('html, body').animate({scrollTop: catTopPosition}, 'slow');
        });
    });



    function get_sizes(l) {
        var cls = new Array();
        cls[0] = new Array('g-item-single', 'g-item-single', 'g-item-single');
        cls[1] = new Array('g-item-double-h', 'g-item-double-h');
        cls[2] = new Array('g-item-single', 'g-item-double-h', 'g-item-quarter', 'g-item-quarter');
        cls[3] = new Array('g-item-quarter', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter');
        //cls[4] = new Array('g-item-single', 'g-item-single', 'g-item-quarter', 'g-item-quarter', 'g-item-single', 'g-item-double-h', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter', 'g-item-quarter');
        var i = Math.floor(Math.random() * cls.length);
        while (i == l)
            i = Math.floor(Math.random() * cls.length);
        last = i;
        return cls[i];
    }


    function get_limit_offset(selector) {
        var e = $("#g-filters li a[href=#tab-" + selector + "]");
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

    function load_more(selector) {
            if (selector == "") {
                selector = "home";
            }
            if (!$.ajaxq.isRunning()) {
                var e = get_limit_offset(selector);

                var l = parseInt(e.limit);
                var offset = parseInt(e.offset);
                var url = "";

                if ((selector != "item_kichink") && (selector != "banda") && (selector != "articulo") && (selector != "video"))
                    url = "/musica/get_posts/" + (l) + "/" + offset + "/item_kichink?tags=" + selector + "&order=desc";
                else
                    url = "/musica/get_posts/" + (l) + "/" + offset + "/" + selector + "?tags=&order=desc";

                $.ajaxq("loadr", {
                    type: "POST",
                    async: false,
                    beforeSend: function() {
                        /* if (scroll == "scroll")
                         $("#bottom-frame").after("<div id='loader'></div>");*/
                    },
                    url: url,
                    success: function(data) {

                        if (selector == "banda" || selector == "bandas" || selector == "calendario") {
                            var r = new Array();
                            var s = new Object();
                            for (var n = 0; n < gallery.result.length; n++) {
                                r.push(gallery.result[n].item_name);
                                s[gallery.result[n].item_name] = gallery.result[n].item_url;
                            }
                            r.sort();

                            init_carousel("#foo4");


                        } else {
                            var gallery = JSON.parse(data);
                            var target = "#tab-" + selector;
                            set_limit_offset(selector, offset + l);
                            galleryItems(gallery, $(target));
                            $(target).isotope({
                                filter: "*"
                            });
                        }
                        /*$("#loader").remove();
                         
                         
                         
                         
                         if (gallery.store.length < l) {
                         test = -1;
                         } else {
                         test = 1;
                         }
                         
                         
                         if(selector=="banda"){
                         var r= new Array();
                         var s= new Object();
                         for(var n=0;n<gallery.store.length;n++){
                         console.log(gallery.store[n]);
                         r.push(gallery.store[n].item_name);
                         s[gallery.store[n].item_name]=gallery.store[n].item_url;
                         }
                         console.log(r);
                         console.log(s);
                         }else{
                         galleryItems(gallery);
                         masCont.isotope({filter: '*'});
                         initGallery();
                         set_limit_offset(l, offset + l);
                         }*/
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
                case 'item':
                    var gid = i;
                    if (items[i]['item_cat'] == "discos") {
                        if (selector == "" || selector == "home")
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
                        $('#item_modal .modal-title').html(items[i]['item_name']);
                        var content = '';
                        if (items[i]['type'] == "item") {
                            content = '<iframe width="100%" height="100%" src="' + items[i]['item_url'] + '" frameborder="0"/>';
                        }

                        $('#item_modal .modal-body').html(content);
                        $("#item_modal").modal("show");
                    });

                    masCont.isotope('insert', $(galleryItem));
                    break;
                case 'article':
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
                case 'video':
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
                        $('#item_modal .modal-title').html(items[i]['item_name']);
                        var content = '';
                        if (items[i]['type'] == "video") {
                            $('#item_modal').addClass("video");
                            var v = getdatafromvideo(items[i]['item_url']);

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

    function init_carousel(id) {

        $(id).carouFredSel({
            responsive: true,
            width: '90%',
            scroll: 1,
            prev: '#prev',
            next: '#next',
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

    $('#item_modal').on('hidden.bs.modal', function() {
        $("#item_modal .modal-body").find("iframe").remove();
    });

    $(window).scroll(function()
    {
        if (($(window).scrollTop()) >= ($(document).height() - $(window).height() - $(".footer").height() - 70))
        {
            load_more(selector);
        }
    });


    if (selector == "merch" || selector == "discos" || selector == "home" || selector == "") {
        load_more(selector);
        console.log(selector);
    }

    init_carousel("#foo4");



    var options = {
        events_source: '/musica/get_posts/1000/0/evento?order=desc',
        view: 'month',
        language: "es-MX",
        tmpl_path: '/js/tmpls/',
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
});