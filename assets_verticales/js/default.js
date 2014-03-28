/*Array.prototype.compare = function(array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}*/

function convertToSlug(text)
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
}

function getdatafromvideo(uri) {
    if (uri.substring(0, 3).toLowerCase() == "www") {
        uri = "http://" + uri;
    }

    var a = document.createElement('a');
    a.href = uri;
    var domain = a.hostname;
    var args = a.pathname.split("/");
    var video = new Object();
    video.originalurl = uri;
    if ((domain.search("youtu.be") >= 0) || (domain.search("youtube.com") >= 0)) {
        video.rtype = "Youtube";
        if (domain.search("youtu.be") >= 0)
        {
            video.refid = args[1];
            video.videourl = "http://www.youtube.com/embed/" + video.refid;
        } else {
            if (args[1] == "embed") {
                video.refid = args[2];
                video.videourl = uri;
            }
            else {
                var vars = {};
                var parts = uri.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                    vars[key] = value;
                });

                if (vars.v != undefined) {
                    video.refid = vars.v;
                    video.videourl = "http://www.youtube.com/embed/" + video.refid;
                } else {
                    return undefined;
                }
            }
        }
        video.thumbnail = "http://img.youtube.com/vi/" + video.refid + "/0.jpg";
    }
    else if ((domain.search("dailymotion.com") >= 0) || (domain.search("dai.ly") >= 0)) {
        video.rtype = "Dailymotion";
        if (domain.search("dai.ly") >= 0)
        {
            video.refid = args[1];
            video.videourl = "http://www.dailymotion.com/embed/video/" + video.refid;
        } else {
            if (args[1] == "embed") {
                video.videourl = uri;
                video.refid = args[3];
            }
            else {
                var parts = args[2];
                var d = parts.split("_");
                video.refid = d[0];
                video.videourl = "http://www.dailymotion.com/embed/video/" + video.refid;
            }
        }
        video.thumbnail = "http://www.dailymotion.com/thumbnail/320x240/video/" + video.refid;
    }
    else if (domain.search("vimeo.com") >= 0) {
        video.rtype = "Vimeo";
        if (domain.search("player.vimeo.com") >= 0) {
            video.videourl = uri;
            video.refid = args[2];
        }
        else {
            video.refid = args[1];
            video.videourl = "http://player.vimeo.com/video/" + video.refid;
        }

        $.ajax({
            url: 'http://vimeo.com/api/v2/video/' + video.refid + '.json',
            async: false,
            success: function(data) {
                video.thumbnail = data[0].thumbnail_large;
            },
            error: function(err) {
                console.log(err)
            }
        });

    }

    if (video.refid != undefined)
        return video;

    return undefined;
}
