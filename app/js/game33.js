function clear(index) {
    $('.user-card[data-pos="'+index+'"]').attr("class", "user-card hide-card show-card").css("display", "none");
    $('.user-card[data-pos="'+index+'"] .cardbox').attr("class", "cardbox hind").attr("onclick", "");
    $('.user-card[data-pos="'+index+'"] .cardbox .card').removeAttr("data-value").removeAttr("data-color");
    $('.niuniuNumber [data-pos="'+index+'"]').remove();
    $(".kanpai-box [data-pos="+index+"]").empty().hide();
    $(".kaipai-box [data-pos="+index+"]").empty().hide();
    $('.user-card[data-pos="'+index+'"] .cardbox-abandon').removeClass("cardbox-abandon");
    if(index > 0) {
        $('.user-card[data-pos="'+index+'"] .cardbox').attr("class", "cardbox card-small hind");
    }
    if(index <= 0) {
        $(".kanpai-result").empty();
    }
}

function adduser(data){
    var indexuser=data.user.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    if(data.user.online=='-1'){
        var onlinezt=' leave';
    }
    else{
        var onlinezt='';
    }
    indexuser -= 1;
    $(".user-info[data-pos="+indexuser+"]").remove();
    var html='<div class="user-info'+onlinezt+'" data-id="'+data.user.id+'" data-pos="'+indexuser+'">' +
        '<div class="user-img">' +
        '<img src="'+data.user.img+'">' +
        '</div>' +
        '<div class="name-value">' +
        '<span class="user-nickname">'+decode64(data.user.nickname)+'</span>' +
        '<span class="user-value">'+data.user.dqjf+'</span>' +
        '</div>' +
        '</div>';
    $('.user-list').append(html);

    if(data.user.zt==1){
        if(indexuser == 0) $(".prepare").hide();
        $('.prepare-list .prepare-item[data-pos='+indexuser+']').show();
    }
    else {
        if(indexuser == 0) $(".prepare").show();
        $('.prepare-list .prepare-item[data-pos='+indexuser+']').hide();
    }
}
function zbuser(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    indexuser -= 1;
    clear(indexuser);
    $('.prepare-list').show();
    $('.prepare-list .prepare-item[data-pos='+indexuser+']').show();
}
function removeuser(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    indexuser -= 1;
    $('.user-list .user-info[data-pos='+indexuser+']').addClass("leave");
    //$('.prepare-list .prepare-item[data-pos='+indexuser+']').hide();
}

function removeuser2(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    indexuser -= 1;
    $('.user-list .user-info[data-pos='+indexuser+']').hide();
    $('.prepare-list .prepare-item[data-pos='+indexuser+']').hide();
}


function userdjs(data){
    clearTimeout(ji);
    var now=data.time-Math.ceil(new Date()/1000)-(0-timewc)-1;
    if(now>0){
        var indexuser=data.index-index-(-1);
        if(indexuser<=0){
            indexuser=indexuser-(-6);
        }
        indexuser -= 1;
        $(".head-time [data-pos='"+indexuser+"']").show();
        $(".head-time [data-pos='"+indexuser+"']").html(now);
        ji=setTimeout('userdjs('+JSON.stringify(data)+')',1000);
    }
    else{
        clearuserdjs();
    }
}
function clearuserdjs(){
    clearTimeout(ji);
    $(".head-time > *").hide();
}

// 播放游戏开始效果并开始游戏
function tipsallfapai() {
    game.generalGameStateTips("start_tips");
    for (var i = 0; i < 6; i ++) {
        clear(i);
    }
    $('.prepare').hide();
    $('.prepare-list').hide();
    $('.prepare-item').hide();
}

function allfapai(data){

    $('.user-card[data-pos] span.card').attr({
        'data-value': '',
        'data-color': ''
    });

    $('.prepare').hide();
    $('.prepare-list').hide();
    $('.prepare-item').hide();

    for(var i=0;i<data.user.length;i++){
        var user=data['user'][i];
        var indexuser=user.index-index-(-1);
        var html='';
        if(indexuser<=0){
            indexuser=indexuser-(-6);
        }
        indexuser -= 1;
        $('.user-card[data-pos="' + indexuser + '"]').show();
        $('.user-card[data-pos="' + indexuser + '"] .cardbox').show();

        if(data.allcard && data.allcard[user.id]) {
            for (var ii in data.allcard[user.id]) {
                $('.user-card[data-pos="'+indexuser+'"] .cardbox[data-item="' + ii + '"] span.card').attr({
                    'data-value': data.allcard[user.id][ii].pai,
                    'data-color': data.allcard[user.id][ii].hs
                });
                $('.user-card[data-pos="'+indexuser+'"] .cardbox').removeClass('front').addClass('hind');
                $('.user-card[data-pos="'+indexuser+'"] .cardbox[data-item="' + ii + '"]').removeClass('hind').addClass('front');
            }
        }
    }

    $('.user-card').show();
    $('.user-card .cardbox').addClass('animate');
}
function havelook(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    indexuser -= 1;
    $(".kanpai-box [data-pos='"+indexuser+"']").attr("onclick", "");
    $(".kanpai-box [data-pos='"+indexuser+"']").html("已看牌");
    $(".kanpai-box [data-pos='"+indexuser+"']").show();
}

function havelose(data){
  var indexuser=data.index-index-(-1);
  if(indexuser<=0){
      indexuser=indexuser-(-6);
  }
  if(indexuser==1){
    hidebook();
    $('#member .member1 .quitBack').show();
    $('.myCards .isLose').show();
    $('.myQuitBack').show();
    for(var i=0;i<3;i++){
        $('.cardDeal .card1'+(i-(-1))).hide();
        $('.myCards .card'+i).show();
    }
  }
  else{
  var html='<div class="isLose isLose'+indexuser+'" style="z-index: 100;" ></div> ';
  $('#userfp').append(html);
  }
}

function havequit(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    indexuser -= 1;
    $(".kanpai-box [data-pos="+indexuser+"]").html("弃牌").show();
    $(".kanpai-box [data-pos="+indexuser+"]").attr("onclick", "");
    $(".user-card[data-pos="+indexuser+"] .card-bg").addClass("cardbox-abandon");
}
function bipai(data){
    qxbp();
    if(data.user.length>=1 && data.count >= 2){
        var compare_users = [];
        for (var k in data.user) {
            compare_users.push(data.user[k].id);
        }
        game.compareUsers({
            "compare_users" : compare_users
        });
        $("div.box-mask > div").each(function(i, item) {
            var $this = $(this);
            var user_id = $(".user-info[data-pos="+$this.attr("data-pos")+"]").attr("data-id");
            $this.attr("onclick", "send('bipai',{uid:"+user_id+",time:"+data.time+"})");
        });
    } else {
        send('bipai',{uid:data['user']['0']['id'],time:data.time});
    }
}
function qxbp(){
  $(".bipai-box").hide();
  $('.box-mask, .box-mask>div').hide();
}
function startPk(data){
    compareCard({
        "is_pk" : 1,
        "user" : [
            {"img" : data.user[0].img, "nickname" : decode64(data.user[0].nickname), "score" : data.user[0].dqjf, "pk_id" : data.user[0].pk_id},
            {"img" : data.user[1].img, "nickname" : decode64(data.user[1].nickname), "score" : data.user[1].dqjf, "pk_id" : data.user[1].pk_id}
        ],
        'win' : data.win,
        'lose' : data.lose
    });

  mp3play('shandian');
  $('.playerPK .pkLoser').hide();
  $('.playerPK .pk1 .title').html(decode64(data['user'][0]['nickname']));
  $('.playerPK .pk1 .avatar').attr('src',data['user'][0]['img']);
  $('.playerPK .pk1 .score').html(data['user'][0]['dqjf']);

  $('.playerPK .pk2 .title').html(decode64(data['user'][1]['nickname']));
  $('.playerPK .pk2 .avatar').attr('src',data['user'][1]['img']);
  $('.playerPK .pk2 .score').html(data['user'][1]['dqjf']);

  $('.playerPK').show();
  setTimeout(function(){
        if(data['user'][0]['index']==data.lose){
          $('.playerPK .pk1 .pkLoser').show();
        }
        else{
          $('.playerPK .pk2 .pkLoser').show();
        }

        havelose({index:data.lose});
     },1000);
}
function fapai(data){
    for(var i=0;i<data.card.length;i++){
        var card = data['card'][i];
        $('.user-card[data-pos="0"] .cardbox[data-item="' + i + '"] span.card').attr({
            'data-value': card.pai,
            'data-color': card.hs
        });
        $('.user-card[data-pos="0"] .cardbox[data-item="' + i + '"]').removeClass('hind').addClass('front');
    }
    $(".kanpai-result").html(game.getCardType(data.type));
    $(".kanpai-result").show();
}

function myresult(data) {
    if(data.id == user.id) {
        $(".kaipai-box [data-pos=0]").attr("data-item", "0");
    } else {
        $(".kaipai-box [data-pos=0]").attr("data-item", "1");
    }
    $(".kaipai-box [data-pos=0]").fadeIn('fast');
    $('.kaipai-box [data-pos=0]').delay(1000).hide(0);
}

function otherpai(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
         indexuser=indexuser-(-6);
    }
    indexuser -= 1;
    var user_id = $(".user-info[data-pos="+indexuser+"]").attr("data-id");
    $(".kaipai-box [data-pos="+indexuser+"]").attr("data-item", data.type);
    if(user_id == data.win) {
        $(".kaipai-box [data-pos="+indexuser+"]").attr("data-value", "1");
    } else {
        $(".kaipai-box [data-pos="+indexuser+"]").attr("data-value", "0");
    }
    $(".kaipai-box [data-pos="+indexuser+"]").show();

    if(data.win == user.id) {
        $(".kaipai-box [data-pos=0]").attr("data-item", "0");
    } else {
        $(".kaipai-box [data-pos=0]").attr("data-item", "1");
    }

    for(var i=0;i<data.card.length;i++){
        var card = data['card'][i];
        $('.user-card[data-pos="'+indexuser+'"] .cardbox[data-item="' + i + '"] span.card').attr({
            'data-value': card.pai,
            'data-color': card.hs
        });
        $('.user-card[data-pos="'+indexuser+'"] .cardbox[data-item="' + i + '"]').removeClass('hind').addClass('front');
    }

}
function showmycard(id){
    $('.cardDeal .card1'+(id-(-1))).hide();
    $('.myCards .card'+id).show();
    $('.myCards .card'+id).addClass('card-flipped');
}

function showop(data) {
    var html = "";
    for (var i = 0; i < data.list.length; i ++) {
        if(i >= data.beishu) {
            html += '<span data-pos="'+data.list[i]+'" data-click="1" onclick="send(\'xiazhu\',{xz:'+i+',time:'+data.timexx+'})">'+data.list[i]+'</span>';
        } else {
            html += '<span data-pos="'+data.list[i]+'" data-click="0">'+data.list[i]+'</span>';
        }
    }
    html += '<span onclick="send(\'qipai\',{time:'+data.timexx+'})">弃牌</span>';
    if(data.biuser.user && data.biuser.user.length) {
        html += '<span data-bipai="1" onclick=\'bipai('+JSON.stringify(data.biuser)+')\'>比牌</span>';
    } else {
        html += '<span data-bipai="0">比牌</span>';
    }

    $(".bipai-box").html(html);
    $(".bipai-box").show();
}

function showbook(data){
    $(".kanpai-box [data-pos=0]").html('点击看牌');
    $(".kanpai-box [data-pos=0]").show();
    $(".kanpai-box [data-pos=0]").attr("onclick", "send('looking',{})");
}
function hidebook(){
    $(".kanpai-box [data-pos=0]").hide();
}

// 扔筹码动画
function scoresArea(data){//index,i

    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
         indexuser=indexuser-(-6);
    }
    indexuser -= 1;
    game.chouma(data.jf, indexuser, data.bol ? data.bol : 0);
    var lastValue = parseInt($(".user-info[data-pos='"+indexuser+"'] .user-value").html());
    $(".user-info[data-pos='"+indexuser+"'] .user-value").html(lastValue-parseInt(data.jf));
}
function recm(data){
    var total=0;
    for(var i=0;i<data.cm.length;i++){
      total=total-(0-data.cm[i]);
      $(".scoresArea").append("<div class='coin  coinType"+data.cm[i]+"' style='top:" + (140 * 1 - 28) * Math.random() + "px;left:" + (140 * 1 - 28) * Math.random() + "px;' ></div>");
    }
    $('.totalScore .scores').html(total);

}




// 收筹码动画
function shou(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
         indexuser=indexuser-(-6);
    }
    indexuser -= 1;
    game.settlement({
        "win" : data.id,
        "winValue" : data.win_value
    });
}

function compareCard(data) {
    Page.running = 3;
    //players['u_' + data.lose[0]].is_end = 1;
    var _this = game;
    $('.head-time>span').hide();
    if (data.is_pk) {
        $('.box-mask').hide().find('div').removeClass('box-animate');
        game.generalGameStateTips('bipai_tips');
        setTimeout(function() {
                var leftPlayerObject = {
                    'src': data.user[0].img,
                    'name': data.user[0].nickname,
                    'score': data.user[0].score,
                    'pk_id': data.user[0].pk_id
                };
                var rightPlayerObject = {
                    'src': data.user[1].img,
                    'name': data.user[1].nickname,
                    'score': data.user[1].score,
                    'pk_id': data.user[1].pk_id
                };
                var pkArr = [];
                pkArr.push(leftPlayerObject);
                pkArr.push(rightPlayerObject);
                pkArr.sort(function() {
                    return 0.5 - Math.random()
                });
                _this.pkCanvas(pkArr[0], pkArr[1],
                    function() {
                        _this.generalResultState(data);
                    })
            },
            1700)
    } else {
        if (data.sex) {
            sound.play(100, data.sex);
        }
        setTimeout(function() {
                _this.generalResultState(data);
            },
            1500)
    }
}

function initroom(){
    //compareCard({"is_pk" : 1});

    $(".selectMultiple .item").hide();
    $(".prepare-item").hide();
    $(".prepare").show();
    $('.winLost').remove();

    $(".kanpai-box > span").attr("onclick", "");
}

function zhunbei(){
    $(".prepare").hide();
    send('zhunbei',{});
    clear(0);
    $(".prepare-list").show();
    $(".prepare-list .prepare-item[data-pos=0]").show();
}

function overroom(data){
    window.isClose = true;
    $('#loadings').fadeIn();
    var _data = {
        "game_id":"2",
        "users":[],
        "sum":data.zjs,
        "num":data.js,
        "datetime":data.time,
        "room_number":data.roomid
    };
    for (var k in data.user) {
        _data["users"].push({
            "value" : data.user[k].dqjf,
            "nickname" : decode64(data.user[k].nickname_base64),
            "path" : data.user[k].img,
            "user_id" : data.user[k].id
        });
    }
    console.log(data);
    liuliuCreateRanking(_data,
        function(d) {
            var img = document.createElement('img');
            if (parseInt(_data.users.length) > 6) {
                img.className = 'room-gameover-ten ranking-img';
            } else {
                img.className = 'room-gameover ranking-img';
            }
            img.src = d;
            img.onload = function() {
                setTimeout(function() {
                        $('#loadings').fadeOut();
                        document.body.style.backgroundColor = '#000000';
                        document.body.style.minHeight = 'initial';
                        document.body.appendChild(img);
                        var div = document.createElement('div');
                        div.className = 'search-number-box';
                        document.body.appendChild(div);
                        var detailedBtn = '<a class="search-number-box-btn" href="#" style="position: absolute;"></a>';
                        div.insertAdjacentHTML("beforeend", detailedBtn);
                        getRankingSix();
                        $('.body').remove();
                        $(document.body).off('touchmove');
                    },
                    2500);
            };
        });
}


function msgshow(data){
      var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
       var html='<div class="messageSay messageSay'+indexuser+'" ><div>'+data.msg+'</div> <div class="triangle"></div></div>'
      $('#messageSay').append(html);
      mp3play(data.mp3);
      setTimeout(function(){
            console.log(indexuser);
            $('.messageSay'+indexuser).remove();
      },1500);
}


