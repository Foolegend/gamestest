var cs=10;
var hosturl=window.location.hostname;
var websocket;
var token;
var room;
var index;
var indexsex={};
var timewc=0;
var bgmp3open;
var mp3open;
var overzt=1;
if(!localStorage.bgmp3open){
    bgmp3open=1;
}
else{
    bgmp3open=localStorage.bgmp3open;
}
if(!localStorage.mp3open){
    mp3open=1;
}
else{
    mp3open=localStorage.mp3open;
}
function connect(n){
    if(overzt==0){
        return false;
    }
    if(websocket)websocket.close();
    if(cs>0){
        cs=cs-1;
        websocket = new WebSocket("ws://"+hosturl+":"+n);
        websocket.onmessage = function(event) {
            cs=10;
            zdata=JSON.parse(event.data);
            console.log(zdata.act);
            window[zdata.act](zdata.msg);
        };
        websocket.onopen=function(e){
            if(!token){
                token=localStorage.token;
            }
            send('init',{token:token,room:room});
        }
        websocket.onclose=function(e){
            if(overzt==0){
                return false;
            }
            //prompt('网络不给力,正在努力链接服务器!');
            websocket.close(); //关闭TCP连接
            cs=cs-1;
            connect(n);
        };
    }
    else{
        //prompt('已经于服务器断开,请刷新重试!');
    }
}
function gologin(){
    location.href="/";
}
function gxtoken(data){
    localStorage.token=data;
}
//遮罩
function maik(s) {
    var hei = $j(window).height();
    var wid = $j(window).width();
    var html = "<div class=\"maik\" style='height:"+hei+"px;width:"+wid+"px;' onclick=\"Center($j('.noticewi'), 'hide')\"></div>";
    if (s == 'show') {
        if ($j(".maik").length <= 0) {
            $j('body').append(html);
        }
    }
    if (s == 'hide') {
        $j('.maik').remove();
    }
}
//获取页参数
function Request(m) {
    var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
    return sValue ? sValue[1] : sValue;
}
function prompt(txt) {
    $.alert(txt);return;
    var html = "<div class=\"prompt\"><span>" + txt + "</span></div>";
    var Bw = $j(window).width();
    var Bh = $j(window).height();
    $j('body').append(html);
    var Pw = $j('.prompt').width();
    var Ph = $j('.prompt').height();
    $j('.prompt').css({
        "top": Bh / 2 - Ph / 2,
        "left": Bw / 2 - Pw / 2
    });
    setTimeout(function () {
        $j('.prompt').remove();
    }, 2000);
}

//记录登陆凭证
function login(data){
    localStorage.userid=data.uid;
    localStorage.salt=data.salt;
}
//销毁登陆凭证
function loginout(msg){
    if(msg){
        prompt(msg);
        setTimeout("$j('body').hide()",3000);
    }
    localStorage.token='';
    websocket.close();
}

function send(act,data){
    if(!data){
        data={};
    }
    var fs = data;
    fs.act=act;
    console.log(act);
    var jsonStr = JSON.stringify(fs);
    if(typeof(websocket)=='undefined'){
        prompt('与服务器端口链接，请刷新重试');
        return false;
    }
    websocket.send(jsonStr);
}

function createRoom() {
    $.get('/Portal/dasheng/isbindphone', function (data) {
        if(data["is"] != "1") {
            return Page.phoneMask('.niuniu-mask');
        }
        else {
            send('openroom',{});
        }
    }, "JSON");
    //send('openroom',{});
}

//标题
function Title(title) {
    document.title = title;
}
function attr(data){
    $j('#'+data.id).attr(data.wz,data.nr);
}
function html(data){
    if(data.id == 'nickname') {
        data.html = decode64(data.html);
    }
    $j('#'+data.id).html(data.html);
}

function addid(data){
    $j('#'+data.id).addClass(data.html);
}


function removeid(data){
    $j('#'+data.id).removeClass(data.html);
}


function value(data){
    $j('#'+data.id).val(data.html);
}
function value2(data){
    $j(''+data.id).val(''+data.html);
}
function append(data){
    $j('#'+data.id).append(data.html);
}
function jsdata(data){
    eval(data);
}
function active(data){
    $j('#'+data.id).addClass(data.html).siblings().removeClass(data.html);
}

function showid(data){
    $j('#'+data.id).show();
}
function hideid(data){
    $j('#'+data.id).hide();
}

function goroom(data){
    location.href="/portal/index/dashengroom.html?room="+data.room;
}

function gxindex(data){
    index=data;
}
// 设置玩家性别
function gxindexsex(data) {
    indexsex[data.index.toString()]=data.sex != 2 && data.sex != 1 ? 1 : data.sex;
}
function timewcgx(data){
    timewc=Math.ceil(new Date()/1000)-data;
    //console.log(timewc);
    setTimeout('send("timegx",{})',5000);
}
function timeyc(data){
    send("timeyc",{time:data});
}
function ycxx(data){
    $j('#user'+data.id+' .zmmyctime').html(data.time);
}


function WeChat(url,title,img,desc){
    $.get("/index.php/portal/index/getconfig/",{url:window.location.href},function(data) {
            wx.config(data);
            wx.ready(function () {
                // 在这里调用 API
                wx.onMenuShareTimeline({  //例如分享到朋友圈的API
                    title: title, // 分享标题
                    link: url, // 分享链接
                    imgUrl: img, // 分享图标
                    success: function () {
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: url, // 分享链接
                    imgUrl: img, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.error(function (res) {
                    //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
                });
            });
        },
        "json"
    );
}


var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
//中国asp之家 http://www.aspxhome.com
function encode64(input)
{
    input = strUnicode2Ansi(input);

    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do{
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2))
        {
            enc3 = enc4 = 64;
        }
        else if(isNaN(chr3))
        {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

    }while(i < input.length);

    return output;
}