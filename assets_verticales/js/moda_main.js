    function prepare_modal_content() {
        $("#posts-container").find(".box").each(function(i, e) {
            $(e).live('click', function() {
                if (set_modal_content($(e).data()))
                    $("#item_modal").modal("show");
            });
        });
    }

    function set_modal_content(post) {
        var obj = post.info;
        $('#item_modal .modal-title').html(obj.titulo);
        //var content = 'soy un articulo cualqiera y necesito ser armado' + JSON.stringify(obj);
        if (obj.post_type == "item_kichink") {
            content = '<iframe width="100%" height="100%" src="' + obj.item_url + '" frameborder="0"/>';
        }
        if (obj.post_type == "video") {
            $('#item_modal').addClass("video");
            var v = getdatafromvideo(obj.body.videoURL);
            console.log(v);
            content = '<div id="prod-close-button" data-dismiss="modal"></div>';
            content += '<iframe width="100%" height="100%" src="' + v.videourl + '" frameborder="0" allowfullscreen=""></iframe>';
        }
        if (obj.post_type == "articulo") {
            content = obj.body.article_body;
        }
        if( obj.imagenes ) {
	        if( obj.imagenes.length>0 ) {
	        	for( i=0; i<obj.imagenes.length; i++ ) {
	        		var imagen = obj.imagenes[i];
	        		content+='<img src="' + imagen + '" border="0">';
	        	}
	        }
        }
        $('#item_modal .modal-body').html(content);
        return true;

    }
