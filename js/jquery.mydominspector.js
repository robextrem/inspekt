/*
 *
 * My DOM Inspector v1.0
 * By Roberto Romero @ kichink
 * 20 Mar 2014
 */

(function($) {

    $.fn.MyDOMInspector = function(options)
    {
        return this.each(function()
        {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('MyDOMInspector'))
                return;
            // pass options to plugin constructor
            var myplugin = new MyDOMInspector(this, options);
            // Store plugin object in this element's data
            element.data('MyDOMInspector', myplugin);
            element.data().MyDOMInspector.methods.init();
        });
    };
    var MyDOMInspector = function(target, options) {
        var componentObj = {
            outlineColor: '#C00',
            outlineStyle: 'solid',
            limited: false,
            localStorage: true,
            theme: 'bootstrap',
            aboutURI: "",
            saveURI: "",
            css: null,
            editor: null,
            onModalShown: function() {
            },
            methods: {
                init: function() {
                    var style = document.createElement("style");
                    $(style).attr("id", "scriptmydom");
                    $("head").append(style);

                    if (options.outlineColor != undefined)
                        componentObj.outlineColor = options.outlineColor;
                    if (options.outlineStyle != undefined)
                        componentObj.outlineStyle = options.outlineStyle;
                    if (options.onModalShown != undefined)
                        componentObj.onModalShown = options.onModalShown;
                    if (options.aboutURI != undefined)
                        componentObj.aboutURI = options.aboutURI;
                    if (options.saveURI != undefined)
                        componentObj.saveURI = options.saveURI;
                    if (options.localStorage != undefined){
                        componentObj.localStorage = options.localStorage;
                        if(componentObj.localStorage){
                            var customcss = (localStorage.getItem("mycustomcss")) ? localStorage.getItem("mycustomcss") : "";
                        }
                    }

                    componentObj.css = new Array();

                    var bar = document.createElement("div");
                    $(bar).attr("id", "mydominspector-bar");
                    $(bar).append("<div class='logo'>inspeKt!</div>");
                    var ul = document.createElement("ul");

                    var li = document.createElement("li");
                    $(li).attr("id", "inspect");
                    $(li).html("<a><i class='fa fa-bug'></i><div>Inspeccionar</div></a>");
                    $(li).click(function() {
                        if (!$(this).hasClass("active")) {
                            if ($("#inspect-modal.mydominspector-modal").length < 1) {
                                $("#mydominspector .active").removeClass("active");
                                $(this).addClass("active");
                                componentObj.methods.enableEditMode();
                            }
                        } else {
                            $(this).removeClass("active");
                            componentObj.methods.disableEditMode();
                        }
                    });
                    $(ul).append(li);

                    var li = document.createElement("li");
                    $(li).attr("id", "undo");
                    $(li).html("<a><i class='fa fa-undo'></i><div>Deshacer</div></a>");
                    $(li).click(function() {
                        componentObj.editor.undo();
                    });
                    $(ul).append(li);

                    li = document.createElement("li");
                    $(li).attr("id", "code");
                    $(li).html("<a><i class='fa fa-code'></i><div>C&oacute;digo</div></a>");
                    $(li).click(function() {
                        if ($(this).hasClass("active")) {
                            $(this).removeClass("active");
                            $(".csscodeTab").animate({right: -400}, 500);
                        } else {
                            $(this).addClass("active");
                            $(".csscodeTab").animate({right: 80}, 500);
                            if (parseInt($(".csssettingsTab").css("right").replace("px", "")) > 0) {
                                $(".csssettingsTab").animate({right: -400}, 500);
                                $("#settings").removeClass("active");
                            }
                        }

                    });
                    $(ul).append(li);
                    if (componentObj.saveURI) {
                        li = document.createElement("li");
                        $(li).attr("id", "settings");
                        $(li).html("<a><i class='fa fa-cog'></i><div>Opciones</div></a>");
                        $(li).click(function() {
                            if ($(this).hasClass("active")) {
                                $(this).removeClass("active");
                                $(".csssettingsTab").animate({right: -400}, 500);
                            } else {
                                $(this).addClass("active");
                                $(".csssettingsTab").animate({right: 80}, 500);
                            }

                        });
                        $(ul).append(li);
                    }

                    if (componentObj.aboutURI) {
                        $(ul).append("<li><a href='" + componentObj.aboutURI + "' target='_blank'><i class='fa fa-info'></i><div>Acerca de</div></a></li>");
                    }
                    li = document.createElement("li");
                    $(li).attr("id", "off");
                    $(li).html("<a><i class='fa fa-power-off'></i><div>Cerrar</div></a>");
                    $(li).click(function() {
                        if ($("#inspect-modal.mydominspector-modal").length > 0) {
                            $("#assigncss").find(".cancel").click();
                            $("#inspect-modal.mydominspector-modal").remove();
                        }
                        componentObj.methods.disableEditMode();
                        $(".csscodeTab").animate({right: -400}, 500);
                        $(".csssettingsTab").animate({right: -400}, 500);
                        $("#mydominspector-bar").animate({right: -400}, 700, function() {
                            $("#mydominspector button#on").show();
                        });
                        $("#mydominspector-bar").find(".active").removeClass("active");
                    });
                    $(ul).append(li);


                    $(bar).append(ul);
                    var tool = document.createElement("div");
                    $(tool).attr("id", "mydominspector");
                    var code = document.createElement("div");
                    $(code).addClass("mydom-Tab");
                    $(code).addClass("csscodeTab");
                    var settings = document.createElement("div");
                    $(settings).addClass("mydom-Tab");
                    $(settings).addClass("csssettingsTab");
                    $(settings).append("<b class='title'>Opciones</b>");
                    if (componentObj.saveURI) {
                        var div_option = document.createElement("div");
                        $(div_option).addClass("option");
                        $(div_option).attr("id", "upload-to");
                        $(div_option).attr("align", "center");

                        $(div_option).append("<h1 class='fa fa-cloud-upload'></h1><p>Guardar cambios en el servidor.</p>");
                        $(div_option).click(function() {
                            $.ajax({
                                type: "POST",
                                url: componentObj.saveURI,
                                data: {css: componentObj.editor.getValue()}
                            }).done(function() {
                                if(!$("#upload-to").hasClass("disabled")){
                                $("#upload-to").addClass("disabled");
                                }
                            });

                        });
                        $(settings).append(div_option);

                        div_option = document.createElement("div");
                        $(div_option).addClass("option");
                        $(div_option).attr("id", "restore-to");
                        $(div_option).attr("align", "center");

                        $(div_option).append("<h1 class='fa fa-times-circle'></h1><p>Restaurar plantilla predeterminada.</p>");
                        $(div_option).click(function() {
                            $.ajax({
                                type: "POST",
                                url: componentObj.saveURI,
                                data: {css: ""}
                            }).done(function() {
                                if(!$("#restore-to").hasClass("disabled")){
                                    $("#restore-to").addClass("disabled");
                                    $("#upload-to").addClass("disabled");
                                }
                            });

                        });
                        $(settings).append(div_option);
                    }


                    $(settings).append("<small style='color:#999'><b>Aviso:</b>&nbsp;Estos cambios se ver&aacute;n reflejados en el sitio y ser&aacute; visibles para todo el mundo.</small>");

                    var warning = document.createElement("div");
                    $(warning).addClass("warning");
                    $(warning).append("<h1 class='fa fa-warning'></h1><br>");
                    $(warning).append('<p>Zona para desarrolladores</p><br/>');
                    $(warning).append('<small>Clic para continuar</small>');
                    $(warning).click(function() {
                        $(this).remove();
                    });

                    $(code).append(warning);
                    $(code).append("<pre id='editor'>" + customcss + "</pre>");
                    componentObj.methods.saveCss(customcss);

                    $(tool).append(code);
                    $(tool).append(settings);
                    $(tool).append(bar);

                    var button = document.createElement("button");
                    $(button).attr("id", "on");
                    $(button).html("<i class='fa fa-puzzle-piece'></i>");
                    $(button).click(function() {
                        $(this).hide();
                        $("#mydominspector-bar").animate({right: 0}, 500);
                    });

                    $(tool).prepend(button);

                    $("body").append(tool);

                    ace.require("ace/ext/language_tools");
                    componentObj.editor = ace.edit("editor");

                    componentObj.editor.setTheme("ace/theme/twilight");
                    componentObj.editor.getSession().setMode("ace/mode/css");
                    componentObj.editor.setOptions({
                        enableBasicAutocompletion: true
                    });
                    componentObj.editor.on("change", function() {
                        $(".mydom-Tab.csssettingsTab .option.disabled").removeClass("disabled");
                        componentObj.methods.saveCss(componentObj.editor.getValue());
                    });

                },
                MDIOnMouseOver: function(evt) {
                    var element = evt.target; 	// not IE
                    if ($(element).parents("#mydominspector").length < 1) {
                        var style = "3px " + componentObj.outlineStyle + " " + componentObj.outlineColor;
                        $(element).css('outline', style);
                    }
                },
                MDIOnMouseOut: function(evt) {
                    var element = evt.target;
                    var style = "none";
                    $(element).css('outline', style);
                },
                MDIOnClick: function(evt) {
                    var element = evt.target;

                    function createModal(obj) {
                        if ((obj.id != undefined) || (obj.classname != undefined)) {

                            componentObj.methods.disableEditMode();

                            if ($("#inspect-modal.mydominspector-modal").length < 1) {

                                var modal = document.createElement("div");
                                $(modal).attr("id", "inspect-modal");
                                $(modal).addClass("mydominspector-modal");

                                var modalBody = document.createElement("div");
                                $(modalBody).addClass("mydominspector-dialog");

                                var btn_close = document.createElement("a");
                                $(btn_close).addClass("closeimg");
                                $(btn_close).click(function() {
                                    destroyModal(obj);
                                });

                                $(modalBody).append(btn_close);


                                var target_elements = new Array();

                                if ((obj.id != undefined) || (obj.classname != undefined)) {
                                    var menuselector = document.createElement("ul");
                                    $(menuselector).addClass("menuselector");

                                    var li_class = document.createElement("li");
                                    var a_class = document.createElement("a");
                                    $(a_class).html(". Class");

                                    if (obj.classname == undefined) {
                                        $(li_class).addClass("disabled");
                                    } else {
                                        $(li_class).addClass("active");
                                        target_elements = obj.classname.split(" ");
                                        for (var inx in target_elements) {
                                            target_elements[inx] = "." + target_elements[inx];
                                        }
                                        $(target_elements.join("")).css("outline", "3px " + componentObj.outlineStyle + " " + componentObj.outlineColor);
                                    }

                                    $(a_class).click(function() {
                                        if (!$(this).parent("li").hasClass("disabled")) {
                                            $(".menuselector").find("li").removeClass("active");
                                            $(this).parent("li").addClass("active");

                                            var target_elements2 = obj.classname.split(" ");
                                            for (var inx in target_elements2) {
                                                target_elements2[inx] = "." + target_elements2[inx];
                                            }

                                            $(".target-elements").html(fillDOMlabels(target_elements2));
                                            $(target_elements2.join(" ")).css("outline", "3px " + componentObj.outlineStyle + " " + componentObj.outlineColor);

                                        }
                                    });

                                    $(li_class).append(a_class);

                                    var li_id = document.createElement("li");
                                    var a_id = document.createElement("a");

                                    $(a_id).html("# Id");
                                    if (obj.id == undefined) {
                                        $(li_id).addClass("disabled");
                                    } else if (obj.classname == undefined) {
                                        $(li_id).addClass("active");
                                        target_elements[0] = "#" + obj.id;
                                        $("#" + obj.id).css("outline", "3px " + componentObj.outlineStyle + " " + componentObj.outlineColor);
                                    }

                                    $(a_id).click(function() {
                                        if (!$(this).parent("li").hasClass("disabled")) {
                                            $(".menuselector").find("li").removeClass("active");
                                            $(this).parent("li").addClass("active");
                                            $(".target-elements").html(fillDOMlabels(new Array("#" + obj.id)));

                                            $("." + obj.classname.replace(/ /g, '.')).css("outline", "");
                                            $("#" + obj.id).css("outline", "3px " + componentObj.outlineStyle + " " + componentObj.outlineColor);

                                        }
                                    });

                                    $(li_id).append(a_id);

                                    $(menuselector).append(li_class);
                                    $(menuselector).append(li_id);

                                    $(modalBody).append(menuselector);
                                    $(modalBody).append("<form id='assigncss'></form>");

                                    var dom_elements = document.createElement("div");
                                    $(dom_elements).addClass("cssfeature");
                                    $(dom_elements).append("<label>DOM</label>");

                                    $(dom_elements).append("<span class='target-elements'>" + fillDOMlabels(target_elements) + "</span>");

                                    $(modalBody).find("form").append(dom_elements);


                                } else {
                                    return false;
                                }


                                /*for(var i in obj.css){
                                 $(modalBody).find("form").append("<label>"+i+":</label>");
                                 $(modalBody).find("form").append("<input type='text' name='"+i+"' value='"+obj.css[i]+"'/><br/>");
                                 }*/

                                if (obj.resizable){
                                    $(modalBody).find("form").append("<div class='cssfeature'><label>Tama&ntilde;o</label>" + "<input class='select-editable' autocomplete='off' type='text' id='size' name='size' value='Default'/></div>");
                                }

                                $(modalBody).find("form").append("<div class='cssfeature'><label>Font Size</label>" + "<input class='select-editable' autocomplete='off' type='text' id='font-size' name='font-size' value='" + obj.css["fontSize"] + "'/></div>");

                                $(modalBody).find("form").append("<div class='cssfeature'><label>Font Weight</label>" + "<input class='select-editable' autocomplete='off' type='text' id='font-weight' name='font-weight' value='" + obj.css["fontWeight"] + "'/></div>");

                                $(modalBody).find("form").append("<div class='cssfeature'><label>Font Color</label>" + "<input autocomplete='off' class='color-picker' type='text' name='color' value='" + obj.css["color"] + "'/></div>");

                                $(modalBody).find("form").append("<div class='cssfeature'><label>Font Family</label>" + "<input class='select-editable' autocomplete='off' type='text' id='font-family' name='font-family' value='" + obj.css["fontFamily"] + "'/></div>");

                                $(modalBody).find("form").append("<div class='cssfeature'><label>Border Width</label>" + "<input class='select-editable' autocomplete='off' type='text' id='border-width' name='border-width' value='" + obj.css["borderWidth"] + "'/></div>");

                                $(modalBody).find("form").append("<div class='cssfeature'><label>Border Style</label>" + "<input class='select-editable' autocomplete='off' type='text' id='border-style' name='border-style' value='" + obj.css["borderStyle"] + "'/></div>");

                                $(modalBody).find("form").append("<div class='cssfeature'><label>Border Color</label>" + "<input autocomplete='off' class='color-picker' type='text' name='border-color' value='" + obj.css["borderColor"] + "' data-oldvalue='" + obj.css["backgroundColor"] + "'/></div>");

                                $(modalBody).find("form").append("<div class='cssfeature'><label>Background Color</label>" + "<input autocomplete='off' class='color-picker' type='text' name='background-color' data-oldvalue='" + obj.css["backgroundColor"] + "' value='" + obj.css["backgroundColor"] + "'/></div>");


                                var div = document.createElement("div");
                                $(div).addClass("buttonfeature");

                                var btn_submit = document.createElement("button");
                                $(btn_submit).addClass("submit");
                                $(btn_submit).html("Guardar");
                                $(div).append(btn_submit);
                                $(div).append("&nbsp;");
                                var btn_cancel = document.createElement("button");
                                $(btn_cancel).attr("type", "button");
                                $(btn_cancel).addClass("cancel");
                                $(btn_cancel).html("Cancelar");

                                $(btn_cancel).click(function() {
                                    destroyModal(obj);
                                });

                                $(div).append(btn_cancel);

                                $(modalBody).find("form").append(div);

                                $(modalBody).find("form").submit(function() {
                                    var selector = new Object();
                                    selector.selector = "";

                                    $(".target-elements").find("span.label").each(function(i, e) {
                                        selector.selector += $(e).html();
                                    });

                                    selector.style = $("form#assigncss").serializeArray();

                                    for (var i in selector.style) {
                                        if (selector.style[i].name == "size") {

                                            switch (selector.style[i].value.substr(0, 1).toLowerCase()) {
                                                case "h":
                                                    {
                                                        selector.style.push({name: "width", value: "95.9% !important"});
                                                        selector.style.push({name: "height", value: "auto !important"});
                                                        break;
                                                    }
                                                case "l":
                                                    {
                                                        selector.style.push({name: "width", value: "47% !important"});
                                                        selector.style.push({name: "height", value: "auto !important"});
                                                        break;
                                                    }
                                                case "m":
                                                    {
                                                        selector.style.push({name: "width", value: "30.72% !important"});
                                                        selector.style.push({name: "height", value: "auto !important"});
                                                        break;
                                                    }
                                                case "s":
                                                    {
                                                        selector.style.push({name: "width", value: "22.64% !important"});
                                                        selector.style.push({name: "height", value: "auto !important"});
                                                        break;
                                                    }
                                                default:
                                                    {
                                                        selector.style.push({name: "width", value: "200px !important"});
                                                        selector.style.push({name: "height", value: "230px !important"});
                                                        break;
                                                    }
                                            }

                                            selector.style.splice(selector.style[i], 1);

                                        }
                                    }

                                    var in_selector = 0;
                                    //Verificamos si ya existe en el registro de css
                                    for (var inx in componentObj.css) {
                                        if (componentObj.css[inx].selector == selector.selector) {
                                            in_selector++;
                                            componentObj.css[inx] = selector;
                                        }
                                    }

                                    if (in_selector < 1) {
                                        componentObj.css.push(selector);
                                    }
                                    if(componentObj.css){
                                        var fill=fillCustomCSS(componentObj.css);
                                        if(fill){
                                            componentObj.editor.setValue(fill);
                                        }
                                    }
                                    destroyModal(obj);
                                    return false;
                                });


                                $(modal).append(modalBody);
                                $("body").append(modal);

                                componentObj.onModalShown();
                            }
                        }
                    }

                    function fillDOMlabels(target_elements) {
                        var dom_elements = ""
                        for (var inx in target_elements) {
                            dom_elements += "<span class='label label-primary'>" + target_elements[inx] + "</span>&nbsp;";
                        }
                        return dom_elements;
                    }

                    function fillCustomCSS(obj) {
                        var text = "";
                        for (var inx in obj) {
                            if (obj[inx] !== undefined) {
                                text += obj[inx].selector + "{\n";
                                for (var jinx in obj[inx].style) {
                                    if (obj[inx].style[jinx] !== undefined) {
                                        if ((obj[inx].style[jinx].name) && (obj[inx].style[jinx].value)) {
                                            text += "\t" + obj[inx].style[jinx].name + ":" + obj[inx].style[jinx].value + ";\n";
                                        }
                                    }
                                }
                                text += "}\n";
                            }
                        }

                        componentObj.methods.saveCss(text);
                        return (text);
                    }

                    function destroyModal(obj) {
                        if (obj.id != undefined)
                            $("#" + obj.id).css("outline", "");

                        if (obj.classname != undefined)
                            $("." + obj.classname.replace(/ /g, '.')).css("outline", "");

                        if ($("#inspect-modal.mydominspector-modal").length > 0) {
                            componentObj.methods.enableEditMode();
                            $("#inspect-modal.mydominspector-modal").remove();
                        }
                    }

                    function rgb2hex(rgb) {
                        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                        if (rgb) {
                            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                        } else {
                            return "";
                        }
                    }

                    function hex(x) {
                        var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
                        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
                    }


                    if ($(element).parents("#mydominspector").length < 1) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        var style = "none";
                        var obj = new Object();
                        obj.id = $(element).attr("id");
                        obj.classname = ($(element).attr("class")) ? $(element).attr("class").trim() : undefined;
                        obj.resizable = $(element).hasClass("resizable");

                        $(element).css('outline', style);
                        obj.css = new Object();//(css($(evt.target)));

                        obj.css.backgroundColor = rgb2hex($(evt.target).css("backgroundColor"));

                        obj.css.color = rgb2hex($(evt.target).css("color"));

                        obj.css.fontFamily = $(evt.target).css("fontFamily").replace(/["']/g, "");

                        obj.css.fontWeight = $(evt.target).css("fontWeight");

                        obj.css.fontSize = $(evt.target).css("fontSize");

                        obj.css.borderColor = rgb2hex($(evt.target).css("borderColor"));

                        if ($(evt.target).css("borderStyle"))
                            obj.css.borderStyle = $(evt.target).css("borderStyle");

                        if ($(evt.target).css("borderWidth"))
                            obj.css.borderWidth = $(evt.target).css("borderWidth");

                        createModal(obj);

                        return false;
                    }
                },
                saveCss: function(text) {
                    if(componentObj.localStorage){
                        localStorage.setItem("mycustomcss", text);
                    }
                    if(text!=undefined){
                        $("#scriptmydom").html(text);
                    }
                },
                enableEditMode: function() {
                    target.addEventListener("mouseover", componentObj.methods.MDIOnMouseOver, true);
                    target.addEventListener("mouseout", componentObj.methods.MDIOnMouseOut, true);
                    target.addEventListener("click", componentObj.methods.MDIOnClick, true);
                },
                disableEditMode: function() {
                    target.removeEventListener("mouseover", componentObj.methods.MDIOnMouseOver, true);
                    target.removeEventListener("mouseout", componentObj.methods.MDIOnMouseOut, true);
                    target.removeEventListener("click", componentObj.methods.MDIOnClick, true);
                }

            },
        };
        return componentObj;
    };
})(jQuery);