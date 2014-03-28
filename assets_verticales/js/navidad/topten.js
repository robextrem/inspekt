$(document).ready(function(){

    $.ajax({
		type: "GET",
		//url: "/moda/get_posts/" + (l + 1) + "/" + offset + "/",
        url: "/navidad/get_posts/",
		data: {tags: category},
	}).done(function( data ) {
		var data_json = jQuery.parseJSON(data);

        // Load Items
        for(i in data_json.item_kichink){
            if(typeof data_json.item_kichink[i].imagenes != 'undefined') addItem(data_json.item_kichink[i]);
        }

        // Load Stores
        for(i in data_json.tienda){
            if(typeof data_json.tienda[i].body.link_producto != 'undefined') addStore(data_json.tienda[i]);
        }

	}).fail(function(jqXHR, textStatus) {
		alert('Request failed (3)');
	});

    function addStore(data){
        var div_content = '';

        //div_content += '    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 shopping-item 8a44a8b7">';
        div_content += '    <div style="height: 200px; float: left;" class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-space stores">';
        div_content += '        <a target="_blank" href="'+data.body.link_producto+'" title="'+data.titulo+'">';
        div_content += '            <img alt="'+data.titulo+'"';
        div_content += '                class="img-responsive lazy" src="'+data.imagenes[0]+'" style="display: block;">';
        div_content += '        </a>';
        div_content += '    <p>'+data.titulo+'</p>';
        div_content += '    </div>';

        $('#top_stores').append(div_content);

    }

    function addItem(data){
        var div_content = '';

        //div_content += '    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 shopping-item 8a44a8b7">';
        div_content += '    <div style="height: 200px; float: left;" class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-space items">';
        div_content += '        <a target="_blank" href="'+data.item_url+'" title="'+data.titulo+'">';
        div_content += '            <img alt="'+data.slug+'" title="'+data.titulo+'"';
        div_content += '                class="img-responsive lazy" src="'+data.imagenes[0]+'" style="display: block;">';
        div_content += '        </a>';
        div_content += '    <p>'+data.titulo+'</p>';
        div_content += '    <p>$'+data.body.precio+'</p>';
        div_content += '    </div>';

        $('#top_items').append(div_content);
    }
});
