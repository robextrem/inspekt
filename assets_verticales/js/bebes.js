$(document).ready(function() {
    $("#content-filters").data().filters = Array();
    $("#load_more").hide();

    var kichink_txt = new Array(
            "Tu información personal y financiera está altamente protegida y encriptada para que compres sin preocupaciones.",
            "Realizamos envíos nacionales e internacionales y entregamos tu pedido en la puerta de tu casa u oficina.",
            "Bienvenidas todas las tarjetas de crédito, nacionales e internaciones (Visa, American Express y MasterCard), pagos en efectivo en Oxxo y en ventanilla de BBVA Bancomer, o bien, por referencia bancaria.",
            "¡Estamos para servirte!<ul>" +
            "<li>Línea Kichink (55) 4160-7999. Llámanos y con gusto te atenderemos de lunes a viernes de 9 a 6 pm y los sábados de 9 a 1 pm.</li>" +
            "<li>Chat. Ingresa a www.kichink.com vía la pestaña verde “Ayuda” de tu lado derecho y tendrás respuesta inmediata de lunes a viernes de 9 a 6 pm y los sábados de 9 a 1 pm.</li>" +
            "<li>Mail. Escríbenos a contacto@kichink.com y con gusto te contestaremos.</li></ul>",
            "Recíbelo en la comodidad de tu casa u oficina."
            );

    $(".col-lg-12.hover").each(function(i, e) {
        $(e).popover({
            content: kichink_txt[i],
            container: "body",
            html: true,
            toggle: "popover",
            placement: "right",
            trigger: "hover"});
    });

    $(".tag-cloud").find("a").each(function(i, e) {
        var minPercent = 80;
        var maxPercent = 160;
        var min = 1;
        var count = $(e).data().tagCount;
        var max = $(e).data().max;
        var size = minPercent + ((max - (max - (count - min))) * (maxPercent - minPercent) / (max - min));
        $(e).css("font-size", "" + size + "%")
    });

    $("#load_more").click(function() {
        load_more();
    });

    $('#item_modal').on('hidden.bs.modal', function() {
        $('#item_modal .modal-title').html('');
        $('#item_modal .modal-body').html('');
        $('#item_modal').removeClass("video");
        $('#item_modal').removeClass("articulo");

    });

    $("#content-filters").FilterTags({
        enemies: {
            "home_voyasermama": "home_yasoymama",
            "home_yasoymama": "home_voyasermama",
            "home_nino": "home_nina",
            "home_nina": "home_nino",
            "home_blog": "*",
            "*": "home_blog"
        },
        filterClass: ".filter-action",
        onSuccess: function() {
            if ($('#posts-container').length > 0) {
                var catTopPosition = jQuery('#posts-container').offset().top - 115;
                jQuery('html, body').animate({scrollTop: catTopPosition}, 'slow', function() {
                    set_limit_offset($("#content-filters").data().limit, 0);
                    load_more();
                });
            }

        }
    });

    function get_limit_offset() {
        var e = $("#content-filters");
        return $(e).data();
    }

    function set_limit_offset(l, offset) {
        var e = $("#content-filters");
        $(e).data().limit = l;
        $(e).attr("data-limit", l);
        $(e).data().offset = offset;
        $(e).attr("data-offset", offset);
        return $(e).data();
    }

    function load_more() {
        var e = get_limit_offset();
        var l = parseInt(e.limit);
        var offset = parseInt(e.offset);
        var c = ".right-div1#posts-container";
        var categories;
        if (jQuery.inArray("home_blog", $("#content-filters").data().filters) == 0) {
            categories = encodeURIComponent("item_kichink,articulo,video");
        } else {
            categories = encodeURIComponent("item_kichink");
        }        

        $.ajaxq("loadq", {
            type: "POST",
            beforeSend: function() {

                if (offset == 0)
                    $(c).html('');
                $(c).append("<div id='loader'></div>");
                $("#load_more").hide();
            },
            async: true,
            url: "/bebes/get_posts/" + (l + 1) + "/" + offset + "/" + categories + "/?tags=" + e.filters.join(','),
            success: function(data) {

                var posts = jQuery.parseJSON(data);
                $("#loader").remove();
                var pid = 0;
                if (posts.length > 0) {
                    for (i = 0; i < l; i++) {
                        if (posts[i] != undefined) {
                            pid = (i + offset);
                            var img = (posts[i].imagenes[0] + "/240x150");

                            var post_type = posts[i].post_type;

                            var tag = post_type;
                            //var titulo = posts[i].titulo;
                            var desc = "";
                            var precio = 0;
                            var origen;

                            
                            if (post_type == "video") {
                                console.log(posts[i]);
                                var v = getdatafromvideo(posts[i].body.videoURL);
                                if (v != undefined) {
                                    img = (v.thumbnail != undefined) ? v.thumbnail : img;
                                }
                                desc = ((posts[i].body.subtitulo != undefined) && posts[i].body.subtitulo != '') ? posts[i].body.subtitulo : ((posts[i].body.resumen != undefined) ? posts[i].body.resumen : '');
                                origen = v.rtype;
                            }
                            if (post_type == "articulo") {
                                if ((posts[i].body.subtitle != undefined) && posts[i].body.subtitle != '') {
                                    desc = posts[i].body.subtitle;
                                }
                                else {
                                    desc = $(posts[i].body.article_body).text();
                                    if (desc != undefined && desc.length > 60) {
                                        desc = desc.substr(0, 60) + "...";
                                    }
                                }
                                origen = posts[i].fecha_publicacion;

                            }
                            if (post_type == "item_kichink") {
                                tag = "item";
                                precio = parseFloat(posts[i].body.precio);
                                origen = posts[i].body.tienda;
                            }

                            $(c).find("div[post-id='" + pid + "']").remove();//Elimina duplicados

                            var html = "<div post-id='" + pid + "' class='col-lg-4 col-sm-4 col-xs-6 box " + post_type + "'>";
                            html += '<div class="product" style="background-image:url(' + img + ')"></div>';
                            html += '<div class="caption">';
                            html += '<div class="type">';
                            html += '<span class="origin">' + origen + '</span>';
                            html += '<span class="label label-default">' + tag.replace('_', ' ').toUpperCase() + '</span>';
                            html += '</div>';
                            html += '<p class="title" align="' + ((post_type == "item_kichink") ? "center" : "left") + '">' + posts[i].titulo + '</p>';
                            if (precio > 0) {
                                html += '<p class="price">$' + precio.toFixed(2) + '</p>';
                            }
                            else {
                                html += '<p class="desc">' + desc + '</p>';
                            }

                            html += '</div>'
                            html += '</div>';
                            $(html).hide().appendTo(c).fadeIn(500);
                            $(c).find("div[post-id='" + pid + "']").data('info', posts[i]);
                        }
                    }
                    set_limit_offset(l, offset + l);
                    prepare_modal_content();
                    $("#load_more").show();

                    if (posts.length <= l) {
                        $("#load_more").hide();
                    }
                } else {
                    $(c).html('');
                    $(c).prepend("<p align='center'>No hay art&iacute;culos disponibles con esos criterios de b&uacute;squeda</p>");
                }
            }
        });

    }

    function prepare_modal_content() {
        $(".right-div1#posts-container").find(".box").each(function(i, e) {
            $(e).live('click', function() {
                if (set_modal_content($(e).data()))
                    $("#item_modal").modal("show");
            });
        });
    }

    function set_modal_content(post) {
        var obj = post.info;
        $('#item_modal .modal-title').html(obj.titulo);
        var content = '';
       
        if (obj.post_type == "item_kichink") {
            content = '<iframe width="100%" height="100%" src="' + obj.item_url + '" frameborder="0"/>';
            $('#item_modal .modal-body').html(content);

        }
        if (obj.post_type == "video") {
            $('#item_modal').addClass("video");
            var v = getdatafromvideo(obj.body.videoURL);
            content = '<div id="prod-close-button" data-dismiss="modal"></div>';
            content += '<iframe width="100%" height="100%" src="' + v.videourl + '" frameborder="0" allowfullscreen=""></iframe>';
            $('#item_modal .modal-body').html(content);
        }
        if (obj.post_type == "articulo") {
            content = obj.body.article_body;
            $('#item_modal').addClass("articulo");

            $('#item_modal .modal-body').html(content);
            if (obj.imagenes_amazon.length > 0) {
                var nom = "carr" + obj.slug;
                div = document.createElement("div");
                $(div).attr("id", nom);
                $(div).addClass("carousel");
                $(div).addClass("slide");
                
                var ol='<!--ol class="carousel-indicators">';
                for (i=0;i<obj.imagenes_amazon.length;i++) {
                    ol+='<li data-target="#'+nom+'" data-slide-to="'+i+'" '+((i == 0) ? 'class="active"' : "" )+'></li>';
                }
                ol+='</ol-->';
                $(div).append(ol);
                $(div).append("<div class='carousel-inner'></div>");
                var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

                for (i in obj.imagenes_amazon) {
                    if (regexp.test(obj.imagenes_amazon[i])) {
                        c = '<div class="item ' + ((i == 0) ? "active" : "") + '"><img height="400px" src="' + obj.imagenes_amazon[i] + '"/></div>';
                        $(div).find(".carousel-inner").append(c);
                    }
                }

                if (obj.imagenes_amazon.length > 0) {
                    $(div).append('<a class="left carousel-control" href="#'+nom+'" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>');
                    $(div).append('<a class="right carousel-control" href="#'+nom+'" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>');
                }

                $('#item_modal .modal-body').prepend(div);
                $('#' + nom).carousel();
                div = null;
            }

        }

        return true;

    }

    function load_stores(l) {
        $.ajaxq("stores", {
            type: "POST",
            url: "/bebes/get_posts/" + (l) + "/0/tienda",
            success: function(data) {
                var stores = jQuery.parseJSON(data);

                for (i = 0; i < l; i++) {

                    if (stores[i] != undefined) {
                        var name = stores[i].titulo;
                        var img = stores[i].imagenes[0];
                        var url = stores[i].body.link_producto;

                        if (img != "" && img != undefined) {
                            $("#foo4").append("<li><a href='" + url + "' target='_blank'><img src='" + img + "/135x129' alt='" + name + "' class='img-responsive'/></a></li>");
                        }
                        else {
                            $("#foo4").append('<li><img data-src="holder.js/135x129" class="img-thumbnail" alt="' + name + '" style="width: 135px; height: 129px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAFjUlEQVR4Xu3XSUtcaxCH8XJKHFEUERcqTuBGnFFRwa/uHCckKiGCU5aituI8G+qFFuNCrJuy7+26z1nFpLpO6l8/33O6IJPJPAsXCXwwgQLAfDApylICgAGCKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUAGBMcVEMGAyYEgCMKS6KAYMBUwKAMcVFMWAwYEoAMKa4KAYMBkwJAMYUF8WAwYApAcCY4qIYMBgwJQAYU1wUAwYDpgQAY4qLYsBgwJQAYExxUQwYDJgSAIwpLooBgwFTAoAxxUUxYDBgSgAwprgoBgwGTAkAxhQXxYDBgCkBwJjiohgwGDAlABhTXBQDBgOmBABjiotiwGDAlABgTHFRDBgMmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUAGBMcVEMGAyYEgCMKS6KAYMBUwKAMcVFMWAwYEoAMKa4KAYMBkwJ5D2Yvb09+fXrl4yMjEhpaekfw2cyGfnx44eUl5dLX1+fFBQUyPPzs2xubsrR0VH6ua2tTZqbmz8cWq7v9+H/WI4K8xbM6empKIjd3d0U1djYmJSVlb3EpjCmpqbk4eFBvnz5IuPj41JYWCjfv3+Xw8NDKSkpSf+mdd3d3dLQ0PBu5Lm+X472b75N3oKZnp6Wu7u7l4EVxOsTZnt7W/b399O/698rqMfHR9HPKZyJiYkETgHV1NRIV1eXrK+vS1FRkfT398vFxYX8/PlTvn79Kr29vTI7O+t6v8HBQfOy/gsfyFswejroI+Xbt29yfX2dTpAsGP15bm4uPWrOzs7k6uoqAbm/v0+LLy4uTj9nAenP+vm1tTU5OTmR2tpaubm5SZ/r7OyUlpaWdBp530/h5tuVt2CyQSsYPQ1eg1ldXU1QJicnZWlpSW5vb19OFEVRV1eX3mkUgZ44+sjSEygL6unpKbWvrq6WoaGhP3bqeT8FmG9XODD6rrGysiIVFRXS1NQkOzs7ogA6Ojqkvr4+nTz6mHn9iMqeMPobry+1+hm9hoeHpaqq6l0wf3s/wOQ4gbe/8cfHx+nR8vZSDHoKZR9J+mc9mfQE0m9Ro6OjCdbMzEw6efRSYD09Pe+C+Zv7ccLkGIvebmFhQS4vL18eSbr07MuwIlleXk4A9LTQd5z5+fn0btLY2Cjn5+cJTXt7u7S2tsrGxoYcHBxIZWVlqtFeb79Bed7vX4jrr2+Z948kPSH0feXtt6TX7zgKRh9B+hutuBYXFxOG7HvKwMBAwqO4tEZfiBXO1tbWywuyfnvSy+t++fjCq/PnPZh/8iujWPQE0UtPk8++cn2/z5znfwnmMwON3hsw0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3g4w0TfsPB9gnAON3u43z049tXeoahsAAAAASUVORK5CYII="></li>');
                        }
                    }
                }
                init_carousel("#foo4");
            }
        });
    }

    function init_carousel(id) {
        $(id).carouFredSel({
            responsive: true,
            width: '95%',
            prev: '#prev',
            next: '#next',
            scroll: 2,
            items: {
                width: 110,
                height: '100%', //	optionally resize item-height
                visible: {
                    min: 2,
                    max: 5
                }
            }
        });
    }

    load_more();
    load_stores(10);

    $('.carousel').carousel({interval: 4000});

    var stickyTop = $('#menu-sticky').offset().top; // returns number 

    $(window).scroll(function() {
        x = $(".container").css("width").replace("px", "");
        if (parseInt(x) >= 970) {
            // scroll event  
            var windowTop = $(window).scrollTop(); // returns number
            if (stickyTop < windowTop) {
                $('#menu-sticky').css({position: 'fixed', width: x, top: 0});
            }
            else {
                stickyTop = $('#menu-sticky').offset().top
                $('#menu-sticky').css({position: 'relative'});
            }
        }
    });

});

