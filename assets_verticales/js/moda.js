$(function() {

    $("#load_more").hide();

    $("#load_more").click(function() {
        load_more(true);
    });


    //$("#content-filters").data().filters = Array();

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

    function load_more(async) {

        var e = get_limit_offset();
        var l = parseInt(e.limit);
        var offset = parseInt(e.offset);
        var c = ".right-div#posts-container";
		$("#banner_interior").show();
        $.ajaxq("load", {
            type: "POST",
            /*async:false,*/
            beforeSend: function() {
                if (offset == 0)
                    $(c).html('');
                $(c).append("<div id='loader'></div>");
                $("#load_more").hide();
            },
            url: "/moda/get_posts/" + (l + 1) + "/" + offset + "/item_kichink%2Cvideo%2Ctienda%2Carticulo/?tags=" + e.filters.join(','),
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

                            /*if (post_type == "video") {
                             var v = getdatafromvideo(posts[i].body.videoURL);
                             if (v != undefined) {
                             img = (v.thumbnail != undefined) ? v.thumbnail : img;
                             }
                             desc = ((posts[i].body.subtitulo != undefined) && posts[i].body.subtitulo != '') ? posts[i].body.subtitulo : ((posts[i].body.resumen != undefined) ? posts[i].body.resumen : '');
                             origen = v.rtype;
                             }*/
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
                                origen = posts[i].body.date;
                            }
                            if (post_type == "item_kichink") {
                                tag = "item";
                                precio = parseFloat(posts[i].body.precio);
                                origen = posts[i].body.tienda;
                            }

                            $(c).find("div[post-id='" + pid + "']").remove();//Elimina duplicados

                            var html = "<div post-id='" + pid + "' class='col-lg-4 box " + post_type + "'>";
                            html += '<div class="product" style="background-image:url(' + img + ')"></div>';
                            html += '<div class="caption">';

                            html += '<p class="title" align="' + ((post_type == "item_kichink") ? "center" : "left") + '">' + origen + " / " + posts[i].titulo + '</p>';
                            if (precio > 0) {
                                html += '<p class="price">$' + precio.toFixed(2) + '</p>';
                            }
                            else {
                                html += '<p class="desc">' + desc + '</p>';
                            }

                            html += '</div>'
                            html += '</div>';
                            $(html).hide().appendTo(c).css('opacity', 0)
                            .slideDown('slow')
                            .animate(
                              { opacity: 1 },
                              { queue: false, duration: 'slow' }
                            );
                            
                            
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

    function load_custom_tag(tag) {
        var e = get_limit_offset();
        var l = parseInt(e.limit);
        var offset = parseInt(e.offset);
        var c = ".right-div#posts-container";
        $.ajaxq("load", {
            type: "POST",
            /*async:false,*/
            beforeSend: function() {
                if (offset == 0)
                    $(c).html('');
                $(c).append("<div id='loader'></div>");
                $("#load_more").hide();
            },
            url: "/moda/get_posts/" + (l + 1) + "/" + offset + "/?tags=" + tag,
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

                            /*if (post_type == "video") {
                             var v = getdatafromvideo(posts[i].body.videoURL);
                             if (v != undefined) {
                             img = (v.thumbnail != undefined) ? v.thumbnail : img;
                             }
                             desc = ((posts[i].body.subtitulo != undefined) && posts[i].body.subtitulo != '') ? posts[i].body.subtitulo : ((posts[i].body.resumen != undefined) ? posts[i].body.resumen : '');
                             origen = v.rtype;
                             }*/
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
                                origen = posts[i].body.date;
                            }
                            if (post_type == "item_kichink") {
                                tag = "item";
                                precio = parseFloat(posts[i].body.precio);
                                origen = posts[i].body.tienda;
                            }

                            $(c).find("div[post-id='" + pid + "']").remove();//Elimina duplicados

                            var html = "<div post-id='" + pid + "' class='col-lg-4 box " + post_type + "'>";
                            html += '<div class="product" style="background-image:url(' + img + ')"></div>';
                            html += '<div class="caption">';

                            html += '<p class="title" align="' + ((post_type == "item_kichink") ? "center" : "left") + '">' + origen + " / " + posts[i].titulo + '</p>';
                            if (precio > 0) {
                                html += '<p class="price">$' + precio.toFixed(2) + '</p>';
                            }
                            else {
                                html += '<p class="desc">' + desc + '</p>';
                            }

                            html += '</div>'
                            html += '</div>';
                            $(html).hide().appendTo(c).css('opacity', 0)
                            .slideDown('slow')
                            .animate(
                              { opacity: 1 },
                              { queue: false, duration: 'slow' }
                            );
                            
                            
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
	function get_banner(tag) {
		$.ajaxq("load", {
			type: "POST",
			beforeSend: function() {
			    $("#banner_seccion").prepend("<div id='loader'></div>");
			    $("#load_more").hide();
			},
			async: false,
			url: "/moda/get_posts/1/0/?tags=banner_"+tag,
			success: function(data) {
				var posts = jQuery.parseJSON(data);
				$("#loader").remove();
				if (posts.length > 0) {
					$('#banner_seccion').attr('src', posts[0].imagenes[0]+'/980x280');
					return true;
				} else {
					return false;
				}
			}
		});		
	}
    $(".nav.nav-justified").MenuVertical({
        "menu": menu,
        "onSuccess": function(e) {

            var filters = new Array();
            var s = $(e).data().slug;
            filters.push($(e).data().cat);

            if ($(e).data().subcat)
                filters.push($(e).data().subcat);
            if ($(e).data().subsubcat)
                filters.push($(e).data().subsubcat);


            if (filters.compare($("#content-filters").data().filters)) {
                console.log("Son iguales no tiene caso cambiarlos");
            } else {
                if (s == "nuevo/ver-todo/")
                {
                    s = "";
                    filters = new Array();
                }
                console.log("Son diferentes");

                $(".dropdown-menu a.selected").removeClass("selected");
                $(e).addClass("selected");

                var clone = $(e).closest(".dropdown-menu").clone();

                clone.css("display", "block");

                clone.find("a").each(function() {
                    $(this).click(function() {
                        init_leftbar($(this).data().slug);
                    });
                });

                $(".left-div").find(".dropdown").html(clone);

                window.history.replaceState({}, '', formatter + s);
                $("#content-filters").data().filters = filters;
                set_limit_offset($("#content-filters").data().limit, 0);
                load_more(true);
            }



        }
    });

    function init_leftbar(path) {

        var c = path.replace(formatter, "").split("/");
        var x;
        console.log(c);
        $(".navigation").find(".dropdown").removeClass("open");
        if (c[2] != undefined && c[2] != "") {

            x = $(".navigation").find(".i-" + c[0]).find(".collapse-" + c[0] + "-" + c[1]).find(".k-" + c[2]);
            if ($(x).length > 0) {
                $(x).click();
                return true;
            }

        }

        if (c[1] != undefined && c[1] != "") {
            $(".navigation").find(".dropdown").removeClass("open");
            x = $(".navigation").find(".i-" + c[0]).find(".j-" + c[1]);
			if( !get_banner(c[1]) ) {
				$("#banner_interior").hide();
			}
            if ($(x).length) {
                $(x).click();
                return true;
            }
        }

        if (c[0] != undefined && c[0] != "") {
        	//Hacer llamado a tag customizado de seleccion
        	load_custom_tag(c[0]);
        	//Quitar banner
        	$("#banner_interior").hide();
            //x = $($(".navigation").find(".i-" + c[0]).find("a")[0]).click();
        }
        else {
            $($(".navigation .nav .dropdown:first-child").find("li a")[0]).click();
            load_more(false);
        }


    }

    init_leftbar(window.location.pathname);


    if ($("#foo4").length > 0) {
        $('#foo4').carouFredSel({
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
});