/**
 * Created by HP on 2017/10/30.
 */
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



window.onload = function(){
    $("#button1").click(function(){
        $("#button1").attr("class","clicked");
        $("#button2")[0].removeAttribute("class");
    });
    $("#button2").click(function(){
        $("#button1")[0].removeAttribute("class");
        $("#button2").attr("class","clicked")
    });
    $("#button1M").click(function(){
        $("#button1M").attr("class","clicked");
        $("#button2M")[0].removeAttribute("class");
    });
    $("#button2M").click(function(){
        $("#button2M").attr("class","clicked");
        $("#button1M")[0].removeAttribute("class");
    });

    document.getElementById("teamName").onblur = function(){
        var teamName = $("#teamName");
        if(teamName.val()==""){
            alert("这么飘逸？连队名都不要了?!");
            return;
        }
        $.post("/isteamname/",{
            teamName:teamName.val()
        },function(data){
            if(data==="0"){
                alert("这个队名太跑火了，已经被别人抢注了！");
                $("#teamName")[0].value = "";
            }
        },"json");
    };

    document.getElementById("leaderId").onblur = function(){
        var leaderId = $("#leaderId");
        if(leaderId.val()==""){
            alert("当队长的一定要先填上自己的学号呀！");
            return;
        }
        $.post("/iscaptain/",{
            leaderId:leaderId.val()
        },function(data){
            if(data==="0"){
                alert("队长学号已存在！（dalao，你只能带一支队伍！）");
                $("#leaderId")[0].value = "";
            }
        },"json");
    };

     document.getElementById("teamNameM").onblur = function(){
         var teamName = $("#teamNameM");
         if(teamName.val()==""){
             alert("这么飘逸？连队名都不要了?!");
             return;
         }

        $.post("/isteamname/",{
            teamName:teamName.val()
        },function(data){
            if(data==="0"){
                alert("这个队名太跑火了，已经被被人抢注了！");
                $("#teamNameM")[0].value = "";
            }
        },"json");
    };

    document.getElementById("leaderIdM").onblur = function(){
        var leaderId = $("#leaderIdM");
        if(leaderId.val()==""){
            alert("当队长的一定要先填上自己的学号呀！");
            return;
        }
        $.post("/iscaptain/",{
            leaderId:leaderId.val()
        },function(data){
            if(data==="0"){
                alert("队长学号已存在！（dalao，你只能带一支队伍！）");
                $("#leaderIdM")[0].value = "";
            }
        },"json");
    };

    $("#submit").click(function(){
        document.getElementById("submit").style.boxShadow = "0 3px 3px rgba(0,0,0,.5) inset";
        setTimeout(function(){
            var myDate = new Date();
            if(myDate.getTime()>Date.parse(new Date("2019/11/23 00:00:00"))){
                alert("报名通道已关闭！");
                document.getElementById("submit").style.removeProperty("box-shadow");
                return;
            }
            if((!document.getElementById("button1").className)&&(!document.getElementById("button2").className)){  //11.1
                alert("是不是忘了选择自己的组别呀！");
                return;
            }
            var type = new Object();
            var content = $("#regForm").serializeArray();
            if($("#button1")[0].className){
                type.name = "zero";
                type.value = '零组';
            }
            if($("#button2")[0].className){
                type.name = "one";
                type.value = '壹组';
            }
            content.push(type);
            console.log(content);
            if(!content.every(function(item){
                    if(item.value!==""){
                        return true;
                    }
                })){
                alert("请将信息填写完整！");
                return;
            }
            $.post('/',content,function (data) {
                if(data){
                    alert("报名信息已飞速送至某些dalao手中！");
                    location.replace("/")
                }
                else {
                    alert("哎呀，怎么失败了呢？重试一次吧！");
                    document.getElementById("submit").style.removeProperty("box-shadow");
                }
            },"json");
           
        },100);
        
    });

    $("#submitM").click(function(){
        document.getElementById("submitM").style.boxShadow = "0 6px 6px rgba(0,0,0,.5) inset";
        setTimeout(function(){
            var myDate = new Date();
            if(myDate.getTime()>Date.parse(new Date("2017/11/23 00:00:00"))){
                alert("报名通道已关闭！");
                document.getElementById("submitM").style.boxShadow="";
                return;
            }
            if((!document.getElementById("button1M").className)&&(!document.getElementById("button2M").className)){  //11.1
                alert("是不是忘了选择自己的组别呀");
                return;
            }
            var type = new Object();
            var content = $("#regFormM").serializeArray();
            if($("#button1M")[0].className){
                type.name = "zero";
                type.value = '零组';
            }
            if($("#button2M")[0].className){
                type.name = "one";
                type.value = '壹组';
            }
            content.push(type);
            if(!content.every(function(item){
                    if(item.value!==""){
                        return true;
                    }
                })){
                alert("请将信息填写完整！");
                return;
            }
            $.post("/",content,function (data) {
                if(data){
                    alert("报名信息已飞速送至某些dalao手中！");
                    location.replace("/")
                }
                else {
                    alert("哎呀，怎么失败了呢？重试一次吧！");
                    document.getElementById("submitM").style.boxShadow="";
                }
            },"json");
        },100);
        console.log(content);
    })
};
