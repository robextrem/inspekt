
$(function() {
	function openModal(event) {
		$('#modal_'+event.data.postActual).modal("show");
	}
   
    $(".nav.nav-justified").MenuVertical({
        "menu": menu,
        "onSuccess": function(e) {           
            
            window.location.href=formatter+$(e).data().slug;

        }
    });


    
	//LO MAS VISTO
	$.ajaxq("load", {
		type: "POST",
		beforeSend: function() {
		    $("#foo4").prepend("<div id='loader'></div>");
		    $("#load_more").hide();
		},
		async: false,
		url: "/moda/get_posts/20/0/?tags=home_masvisto",
		success: function(data) {
			$("#foo4").html('');
			var posts = jQuery.parseJSON(data);
			$("#loader").remove();
			var pid = 0;
			var liNuevo = '';
			if (posts.length > 0) {
				for (i = 0; i < posts.length; i++) {
					if (posts[i] != undefined) {
						if( posts[i].post_type=='item_kichink' || posts[i].post_type=='tienda' ) {
							var img = (posts[i].imagenes[0] + "/121x171");
							var itemK = posts[i];
							liNuevo+='<li><a href="' + itemK.link +'" id="lmv_' + i + '"><img src="' + img + '" border="0"></a></li>';
							$("#foo4").append(liNuevo);
							liNuevo='';
							var postActual = i;
							var contenidoModal = '';
							contenidoModal+= '<div class="modal fade modal_item_tienda" id="modal_'+postActual+'">';
							contenidoModal+= '<div class="modal-dialog">';
							contenidoModal+= '<div class="modal-content">';
							contenidoModal+= '<div class="modal-header">';
							contenidoModal+= '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
							contenidoModal+= '<h4 class="modal-title">'+itemK.titulo+'</h4>';
							contenidoModal+= '</div>';
							contenidoModal+= '<div class="modal-body">';
							contenidoModal+= '<iframe width="100%" height="100%" src="' + itemK.link + '" frameborder="0"/>';
							contenidoModal+= '</div>';
							contenidoModal+= '</div><!-- /.modal-content -->';
							contenidoModal+= '</div><!-- /.modal-dialog -->';
							contenidoModal+= '</div><!-- /.modal -->';
							$('#modals').append(contenidoModal);
							$('#lmv_'+i).bind('click', { postActual: postActual }, openModal);
								

							$('#lmv_'+i).on('click', function(event) {
								event.preventDefault();
							});
						}
					}
				}

			} else {
				$("#foo4").html('<li>No existen art&iacute;culos</li>');
			}
		}
	});
    if ($("#foo4").length > 0) {
        $('#foo4').carouFredSel({
            responsive: true,
            width: '945px',
            prev: '#prev',
            next: '#next',
            scroll: 1,
            items: {
                width: 110,
                height: '100%', //	optionally resize item-height
                visible: {
                    min: 2,
                    max: 6
                }
            }
        });
    }
});