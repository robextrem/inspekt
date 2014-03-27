<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Cache-control" content="public">
        <title>Kichink ON! - Especial Vive Latino 2014</title>
        <link href="assets_verticales/img/musica/favicon_on.ico" rel="shortcut icon" type="images/ico" />   
        <link href="assets_verticales/css/bootstrap.min.css" rel="stylesheet"/>	
        <link href="assets_verticales/css/fonts.css" rel="stylesheet" type="text/css" />   
        <link href="assets_verticales/css/musica.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="assets_verticales/js/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" src="assets_verticales/js/bootstrap.js"></script>
        <script type="text/javascript" language="javascript" src="assets_verticales/js/ajaxq.jquery.js"></script>
        <style>
            .navbar>.container .navbar-brand-center {
                z-index:100;
            }

            .container img.big{
                margin:100px 0 60px;
                text-align: center;
            }
            .container img.img-responsive.thumbk{
                margin: 15px 0;
            }
            .item-sel {
                float: left;
                margin: 12px 0;
                position: relative;
                height: 185px;
                color: #FFFFFF;
                list-style: none;
            }
            .item-sel span{
                margin:6px 0;
                font-family: RockwellLight, Rockwell, Helvetica, Arial;
                display:block;
            }
            .item-sel a{
                color:#e2e2e2;
            }

            ul{
                margin:0;
                padding:0;
            }
            body{
                background: #333;
                padding-bottom:40px;
            }
            .carousel-inner {
                height: auto;
                overflow: hidden;
                background-color: #333;
            }
            .title{
                margin: 20px 30px;
            }
            .compras{
                display:none;
            }
        </style>
        <!--My DOM Inspector-->
        <link href="css/font-awesome.min.css" rel="stylesheet" />
        <link href="css/mydominspector.css" rel="stylesheet" media="screen"/>
        <link href="css/jquery.miniColors.css" rel="stylesheet" media="screen"/>
        <script type="text/javascript" src="js/jquery.mydominspector.js"></script>
        <script type="text/javascript" src="js/jquery.combobox.js"></script>
        <script type="text/javascript" src="js/jquery.miniColors.js"></script>

        <script src="js/ace/ace.js" type="text/javascript" charset="utf-8"></script>

        <script>
            $(document).ready(function() {
                $("body").MyDOMInspector({
                    oulineColor: "blue",
                    onModalShown: function() {
                        $('#inspect-modal.mydominspector-modal').find('#size').combobox([
                            'Default',
                            'Small (25%)',
                            'Medium (33%)',
                            'Large (50%)',
                            'Huge (100%)'
                        ]);

                        $('#inspect-modal.mydominspector-modal').find('#font-size').combobox([
                            '10px',
                            '11px',
                            '12px',
                            '14px',
                            '16px'
                        ]);

                        $('#inspect-modal.mydominspector-modal').find('#font-weight').combobox([
                            'lighter',
                            'light',
                            'normal',
                            'bold'
                        ]);

                        $('#inspect-modal.mydominspector-modal').find('#font-family').combobox([
                            'Arial',
                            'Helvetica',
                            'Verdana',
                            'Times',
                            'Sans-serif'
                        ]);

                        $('#inspect-modal.mydominspector-modal').find('#border-style').combobox([
                            'none',
                            'solid',
                            'dotted',
                            'dashed',
                            'double'
                        ]);

                        $('#inspect-modal.mydominspector-modal').find('#border-width').combobox([
                            '1px',
                            '2px',
                            '3px',
                            '4px',
                            '5px'
                        ]);

                        $(".color-picker").each(function() {
                            $(this).miniColors({
                                control: 'hue',
                                defaultValue: $(this).attr('data-oldvalue') || '',
                                inline: false,
                                letterCase: 'uppercase',
                                position: 'bottom right',
                                theme: 'bootstrap'
                            });

                        });

                    },
                    aboutURI: "https://www.kichink.com/desarrolladores",
                    saveURI: "/index.php",
                    localStorage: true,
                    theme: "bootstrap"
                });



            });

        </script>
        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.min.css" rel="stylesheet" />
        
        <script type="text/javascript">
            $(document).ready(function() {
                var url = "/on/get_posts/42/0/item_kichink?tags=vivelatino&order=desc";
                $.ajaxq("loadr", {
                    type: "POST",
                    url: url,
                    success: function(data) {
                        var obj = jQuery.parseJSON(data);
                        if (obj.result.length > 0) {
                            for (var i in obj.result) {
                                var li = document.createElement("li");
                                var a = document.createElement("a");
                                $(li).addClass("col-lg-3");
                                $(li).addClass("col-md-3");
                                $(li).addClass("col-sm-3");
                                $(li).addClass("item-sel");
                                $(a).attr("href", obj.result[i].item_url);
                                $(a).attr("target", "_blank");
                                $(a).append("<img src='" + obj.result[i].item_thumb + "' class='img-responsive'/>")
                                $(a).append("<span>" + obj.result[i].item_name + "'</span>")
                                $(li).append(a)
                                $("#seleccion").append(li);
                            }
                            $(".compras.compras-seleccion").show();
                        }
                    }

                });
                var url = "/on/get_posts/42/0/item_kichink?tags=recomendaciones&order=desc";
                $.ajaxq("loadr", {
                    type: "POST",
                    url: url,
                    success: function(data) {
                        var obj = jQuery.parseJSON(data);
                        if (obj.result.length > 0) {
                            for (var i in obj.result) {
                                var li = document.createElement("li");
                                var a = document.createElement("a");
                                $(li).addClass("col-lg-3");
                                $(li).addClass("col-md-3");
                                $(li).addClass("col-sm-3");
                                $(li).addClass("item-sel");
                                $(a).attr("href", obj.result[i].item_url);
                                $(a).attr("target", "_blank");
                                $(a).append("<img src='" + obj.result[i].item_thumb + "' class='img-responsive'/>")
                                $(a).append("<span>" + obj.result[i].item_name + "'</span>")
                                $(li).append(a)
                                $("#recomendaciones").append(li);
                            }
                            $(".compras.compras-recomendaciones").show();
                        }
                    }
                });


            });
        </script>
    </head>
    <body>
        <nav role="navigation" class="navbar navbar-default">
            <div class="container">                

                <div class="row">
                    <div class="collapse navbar-collapse navbar-ex1-collapse">
                        <a class="navbar-brand-center" target="_blank" href="/"><img src="assets_verticales/img/musica/logo_on_n.png" height="70" alt="On!"/></a>
                        <a class="navbar-brand" href="http://www.kichink.com"><img src="assets_verticales/img/logok_bco.png" alt="Kichink!"/></a>
                        <ul class="nav navbar-nav navbar-right">
                            <div id="top-bar">    
                                <ul class="content-social" id="btnshare">
                                    <li>
                                        <a href="http://www.twitter.com/kichinkON" target="_blank">
                                            <i class="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://www.facebook.com/kichinkON" target="_blank">
                                            <i class="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://www.pinterest.com/kichinkON" target="_blank">
                                            <i class="fa fa-pinterest"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://www.instagram.com/kichinkON" target="_blank">
                                            <i class="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <div align="center">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <!-- Wrapper for slides -->
                <div class="carousel-inner" style="background-color:#120655">
                    <div class="item active">
                        <img class="img-responsive" src="assets_verticales/img/musica/botonesvl/head_vlatino.png"/>
                    </div>
                    <div class="item">
                        <img class="img-responsive" src="assets_verticales/img/musica/botonesvl/head2_vlatino_1.jpg"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">    
            <div class="col-lg-12 col-md-12 col-sm-12" align="center">
                <img class="big" src="assets_verticales/img/musica/botonesvl/titulo_vl.png"/>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <a target="_blank" href="https://www.kichink.com/stores/helloseahorse"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/HS_btn.png"/></a>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <a target="_blank" href="https://www.kichink.com/stores/los-bunkers"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/Bun_btn.png"/></a>
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <a target="_blank" href="https://www.kichink.com/stores/zoe"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/Zoe_btn.png"/></a>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <a target="_blank" href="https://www.kichink.com/stores/ely-guerra-ciclos"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/Ely_btn.png"/></a>
                </div>
            </div>
            <div align="center" style='text-align:center'>
                <a target="_blank" href="https://www.kichink.com/stores/lostres"><img style='display:inline-block' class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/lostres_btn.png"/></a>
            </div>            
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <a target="_blank" href="https://www.kichink.com/stores/la-banda-baston"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/BB_btn.png"/></a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <a target="_blank" href="https://www.kichink.com/stores/technicolor-fabrics"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/TF_btn.png"/></a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <a target="_blank" href="https://www.kichink.com/stores/odisseo"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/OD_btn.png"/></a>
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <a target="_blank" href="https://www.kichink.com/stores/littlejesus"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/LJ_btn.png"/></a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <a target="_blank" href="https://www.kichink.com/stores/caloncho"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/Cal_btn.png"/></a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <a target="_blank" href="https://www.kichink.com/stores/los-fascinantes"><img class="img-responsive thumbk" src="assets_verticales/img/musica/botonesvl/LFas_btn.png"/></a>
                </div>
            </div>
            <div class="compras compras-seleccion">
                <div class="row" style="clear:both">
                    <br/><br/>
                    <h1 class="title">Favoritos ON</h1>
                </div>
                <ul id="seleccion">
                </ul>
            </div>
            <div class="compras compras-recomendaciones">
                <div class="row">
                    <br/><br/>
                    <h1 class="title">Recomendaciones</h1>
                </div>
                <ul id="recomendaciones">
                </ul>
            </div>
        </div>
    </body> 
</html>