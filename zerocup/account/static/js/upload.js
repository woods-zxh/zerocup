jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});



window.onload = function() {

    document.getElementById("teamName").onblur = function () {
        var teamName = $("#teamName");
        if (teamName.val() == "") {
            alert("这么飘逸？连队名都不要了?!");
            return;
        }
    };
    $("#submit").click(function () {
        document.getElementById("submit").style.boxShadow = "0 3px 3px rgba(0,0,0,.5) inset";
        setTimeout(function () {
            var myDate = new Date();
            if (myDate.getTime() > Date.parse(new Date("2018/11/29 24:00:00"))) {
                alert("作品提交时间已截止！");
                document.getElementById("submit").style.removeProperty("box-shadow");
                return;
            }
            if($("#teamName").val()=="")
            {
                alert("这么飘逸？连队名都不要了?!");
                return;
            }
            var content = $("#regForm").serializeArray();
            console.log(content);
            $.post('/', content, function (data) {
                if (data) {
                    alert("报名信息已飞速送至某些dalao手中！");
                    location.replace("/")
                }
                else {
                    alert("哎呀，怎么失败了呢？重试一次吧！");
                    document.getElementById("submit").style.removeProperty("box-shadow");
                }
            }, "json");
        },100);
    });
};