(function($) {

    $.fn.FilterTags = function(options)
    {
        return this.each(function()
        {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('FilterTags'))
                return;

            // pass options to plugin constructor
            var myplugin = new FilterTags(this, options);
            // Store plugin object in this element's data
            element.data('FilterTags', myplugin);
            element.data('filters', new Array());
            element.data().FilterTags.methods.init();
        });
    };

    var FilterTags = function(target, options) {
        var componentObj = {
            filterClass: "",
            enemies: {},
            onSuccess: function() {
            },
            methods: {
                init: function() {
                    componentObj.onSuccess = (options.onSuccess != undefined) ? options.onSuccess : componentObj.onSuccess;
                    componentObj.enemies = options.enemies;
                    componentObj.filterClass = options.filterClass;

                    $(target).html('');

                    $(componentObj.filterClass).each(function(i, e) {
                        $(e).live("click", function() {
                            var tag = $(e).data().tagcontent;
                            var txt = $(e).text();
                            var slug = componentObj.methods.convertToSlug(tag);
                            if ($(target).find("span[data-tag='" + slug + "']").length < 1) {
                              
                                if (componentObj.enemies!=undefined) {
                                    
                                    for (j in componentObj.enemies) {                                
                                        if((j=="*") || (slug == j)) {
                                            componentObj.methods.excludetag(componentObj.enemies[j]);
                                        }
                                    }
                                }

                                var sp = document.createElement("span");

                                $(sp).html(txt);
                                $(sp).addClass("label");
                                $(sp).addClass("label-info");
                                $(sp).attr("data-tag", slug);
                                $(sp).attr("data-text", txt);

                                var a = document.createElement("a");
                                $(a).addClass("close");
                                $(a).html(" &times;");
                                $(a).click(function() {
                                    var t = $(this).parent().attr("data-tag");
                                    var index = $(target).data().filters.indexOf($(target).find("span[data-tag='" + t + "']").attr("data-text"));
                                    $(target).data().filters.splice(index, 1);
                                    $(this).parent().remove();

                                    componentObj.onSuccess();

                                    /*set_limit_offset($(target).data().limit, 0);
                                     $("#posts-target").html('');
                                     load_more();*/
                                });

                                $(sp).append(a);
                                $(target).append(sp);
                                $(target).data().filters.push(tag);

                                /*if ($('#posts-target').length > 0) {
                                 var catTopPosition = jQuery('#posts-target').offset().top - 35;
                                 jQuery('html, body').animate({scrollTop: catTopPosition}, 'slow', function() {
                                 set_limit_offset($("#content-filters").data().limit, 0);
                                 load_more();
                                 });
                                 }*/

                                componentObj.onSuccess();

                            }
                        });
                    });


                },
                removeAll: function(){
                    $(target).html('');
                    $(target).data().filters=new Array();                    
                },
                convertToSlug: function(text)
                {
                    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
                    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
                    for (var i = 0; i < acentos.length; i++) {
                        text = text.replace(acentos.charAt(i), original.charAt(i));
                    }
                    return text
                            .toLowerCase()
                            .replace('ñ', 'n')
                            .replace(/ /g, '-')
                            .replace(/[^\w-]+/g, '')
                            ;
                },
                excludetag: function(t) {
                    if(t=="*"){
                        componentObj.methods.removeAll();
                    }else if ($(target).find("span[data-tag='" + t + "']").length > 0) {
                        $(target).find("span[data-tag='" + t + "']").remove();
                        var index = $(target).data().filters.indexOf($(target).find("span[data-tag='" + t + "']").attr("data-text"));
                        $(target).data().filters.splice(index, 1);
                    }
                }

            }
        };
        return componentObj;
    };
})(jQuery);

