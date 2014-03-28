var formatter="/moda/store/";
var menu = {
    "Nuevo": {
        "Ver Todo": [],
        "Hombre": [],
        "Mujer": [],
        "Ropa": [],
        "Joyer&iacute;a": [],
        "Bolsas": [],
        "Zapatos": [],
        "Accesorios": []
    },
    "&Eacute;l": {
        "Ropa": [
            "Casual",
            "Camisas",
            "T-shirts",
            "Abrigos/sweaters",
            "Pantalones",
            "Shorts",
            "Sport",
            "Playa",
            "Interior"
        ],
        "Zapatos": [],
        "Accesorios": [
            "Mochilas",
            "Fundas",
            "Lentes",
            "Gorras",
            "Corbatas",
            "Otros"
        ],
        "Relojes": []
    },
    "Ella": {
        "Ropa": [
            "Casual",
            "Vestidos",
            "Blusas",
            "Pantalones",
            "Faldas",
            "Shorts",
            "Abrigos/sweaters",
            "Leggings",
            "Sport",
            "Playa",
            "Interior",
            "Otros"
        ],
        "Joyer&iacute;a": [
            "De dise&ntilde;ador",
            "Bizuter&iacute;a",
            "Relojes"
        ],
        "Zapatos": [
            "Zapatos",
            "Tenis"
        ],
        "Bolsas": [],
        "Accesorios": []
    },
    "Marcas":{"A-Z":[]},
    "Dise&ntilde;adores":{"A-Z":[]},
    "Boutique":{"A-Z":[]},
    "Ropa":{
        "Casual":["Hombre", "Mujer"],
        "Sport":["Hombre", "Mujer"],
        "Playa":["Hombre", "Mujer"],
        "Interior":["Hombre", "Mujer"]
    },
    "Joyer&iacute;a":{
        "Joyer&iacute;a":[],
        "Bizuter&iacute;a":[],
        "Relojes":[]        
    }, 
    "Accesorios":{
        "Bolsas":[],
        "Mochilas":[],
        "Zapatos":[],
        "Belleza":[],
        "Fundas":[], 
        "Cinturones":[],
        "Audifonos":[],
        "Sombreros/Gorras":[],
        "Lentes":[],
        "Corbatas":[]      
        
    },
    "Descuentos":{
        "Todo":[],
        "&Eacute;l":[],
        "Ella":[]
    }
    
};

(function($) {

    $.fn.MenuVertical = function(options)
    {
        return this.each(function()
        {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('MenuVertical'))
                return;

            // pass options to plugin constructor
            var myplugin = new MenuVertical(this, options);
            // Store plugin object in this element's data
            element.data('MenuVertical', myplugin);
            element.data().MenuVertical.methods.init();
        });
    };

    var MenuVertical = function(target, options) {
        var componentObj = {
            menu: {},
            onSuccess: function() {
            },
            methods: {
                init: function() {
                    $(document).on('click.dropdown.data-api', '.dropdown a', function(e) {
                        e.stopPropagation()
                    });
                    componentObj.onSuccess = (options.onSuccess != undefined) ? options.onSuccess : componentObj.onSuccess;
                    componentObj.menu = options.menu;

                    $(target).html('');

                    for (var categoria in componentObj.menu) {
                        var li = document.createElement("li");
                        $(li).addClass("dropdown");
                        $(li).html('<a href="#" data-toggle="dropdown" class="dropdown-toggle">' + categoria + '</a>');

                        var ul = document.createElement("ul");
                        $(ul).addClass("dropdown-menu");
                        $(ul).addClass("panel-group");

                        var accordion_id = "i-" + componentObj.methods.ider(categoria);

                        $(ul).addClass(accordion_id);

                        for (var subcategoria in componentObj.menu[categoria]) {
                            //console.log(Object.keys(menu[categoria]).length);
                            if (componentObj.menu[categoria][subcategoria].length > 0) {
                                //Tiene subsubcategorias
                                var collapse_id = "collapse-" + componentObj.methods.ider(categoria) + "-" + componentObj.methods.ider(subcategoria);
                                panel = document.createElement("li");
                                $(panel).addClass("panel");
                                $(panel).addClass("panel-inner");
                                //Header del panel
                                panel_heading = document.createElement("div");
                                $(panel_heading).addClass("panel-heading");
                                panel_title = document.createElement("h4");
                                $(panel_title).addClass("panel-title");
                                a = document.createElement("a");
                                $(a).addClass("collapsed");
                                $(a).addClass("j-" + componentObj.methods.ider(subcategoria));
                                $(a).attr("data-toggle", "collapse");
                                $(a).attr("data-parent", "." + accordion_id);
                                $(a).attr("href", "." + collapse_id);
                                $(a).attr("data-cat", ($("<div/>").html(categoria).text()));
                                $(a).attr("data-subcat", $("<div/>").html(subcategoria).text());
                                $(a).attr("data-subsubcat", "");
                                var slug = componentObj.methods.ider(categoria) + "/" + componentObj.methods.ider(subcategoria);
                                $(a).attr("data-slug", slug);
                                $(a).bind("click", function() {
                                    componentObj.onSuccess(this);

                                });
                                $(a).html(subcategoria);
                                $(panel_title).append(a);
                                $(panel_heading).append(panel_title);
                                $(panel).append(panel_heading);

                                //Body del panel
                                panel_collapse = document.createElement("div");
                                $(panel_collapse).addClass(collapse_id);
                                $(panel_collapse).addClass("panel-collapse");
                                $(panel_collapse).addClass("collapse");
                                panel_body = document.createElement("div");
                                $(panel_body).addClass("panel-body");
                                $(panel_body).html("<ul></ul>");
                                for (var subsubcategoria in componentObj.menu[categoria][subcategoria]) {
                                    //Solo el nombre
                                    a = document.createElement("a");
                                    $(a).html(componentObj.menu[categoria][subcategoria][subsubcategoria])
                                    var slug = componentObj.methods.ider(categoria) + "/" + componentObj.methods.ider(subcategoria) + "/" + componentObj.methods.ider(componentObj.menu[categoria][subcategoria][subsubcategoria]);
                                    $(a).addClass("k-" + componentObj.methods.ider(componentObj.menu[categoria][subcategoria][subsubcategoria]));
                                    $(a).attr("data-cat", ($("<div/>").html(categoria).text()));
                                    $(a).attr("data-subcat", ($("<div/>").html(subcategoria).text()));
                                    $(a).attr("data-subsubcat", ($("<div/>").html(componentObj.menu[categoria][subcategoria][subsubcategoria]).text()));
                                    $(a).attr("data-slug", slug);

                                    $(a).bind("click", function() {
                                        $(this).closest(".dropdown").removeClass("open");
                                        componentObj.onSuccess(this);
                                    });
                                    l = document.createElement("li");
                                    $(l).append(a);
                                    $(panel_body).find("ul").append(l);
                                }
                                $(panel_collapse).append(panel_body);
                                $(panel).append(panel_collapse);
                                $(ul).append(panel);
                            } else {
                                //Es una subcategoria solita
                                a = document.createElement("a");
                                $(a).html(subcategoria);
                                var slug = componentObj.methods.ider(categoria) + "/" + componentObj.methods.ider(subcategoria) + "/" + componentObj.methods.ider(componentObj.menu[categoria][subcategoria][subsubcategoria]);
                                $(a).addClass("normal");
                                $(a).addClass("j-" + componentObj.methods.ider(subcategoria));
                                $(a).attr("data-cat", ($("<div/>").html(categoria).text()));
                                $(a).attr("data-subcat", ($("<div/>").html(subcategoria).text()));
                                $(a).attr("data-subsubcat", "");
                                $(a).attr("data-slug", slug);
                                $(a).bind("click", function() {
                                    $(this).closest(".dropdown").removeClass("open");
                                    componentObj.onSuccess(this);
                                });
                                l = document.createElement("li");
                                $(l).append(a);
                                $(ul).append(l);
                            }
                        }

                        $(li).append(ul);
                        $(target).append(li);
                    }

                },
                ider: function(text) {
                    text = ($("<div/>").html(text).text());
                    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
                    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
                    for (var i = 0; i < acentos.length; i++) {
                        text = text.replace(acentos.charAt(i), original.charAt(i));
                    }
                    text = text
                            .toLowerCase()
                            .replace('ñ', 'n')
                            .replace(/ /g, '-')
                            .replace(/[^\w-]+/g, '');
                    return text;
                }
            }
        };
        return componentObj;
    };
})(jQuery);

