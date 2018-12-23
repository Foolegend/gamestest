var fapaizt=0;
var all;
var gamezt=0;
function allfapai(data){
    if(!inited) {
        return setTimeout(function () {
            allfapai(data);
        }, 100);
    }
    Game.chipInPanel.dealMajong(true);
}
function zhuangclear(){
    $j('.rtbabg').hide();
    $j('.rtbabg1').hide();
    $j('.status').show();
    gamezt=1;
}
function showqz(data){
    Game.clearTimerState();
    Game.clearQiangZuangTips();
    Game.clearQiangZhuangBtn(user.id);
    Game.generalBanker(data.random_users, data.master_userid, data.master_value);
}

// 抢庄结束动画
function sss(data){
    if(index>3){
        var indexuser=data+1;
    }
    else if(data>3){
        var indexuser=data+1;
    }
    else{
        var indexuser=data-index-(-1);
    }
    if(indexuser<=0){
        indexuser=indexuser-(-4);
    }
    $j('.member'+indexuser+' .status').eq(0).show();
    $j('.member'+indexuser+' .status').eq(1).hide();
    clearTimeout(ji);
    $j('.rtbabg').hide();

    $j("#bankerAnimate"+indexuser).show(),
        $j("#bankerAnimate"+indexuser).show(),
        $j("#bankerAnimate1"+indexuser).animate({
                top: "2%",
                left: "1%",
                width: "100%",
                height: "100%"
            },
            400,
            function() {
                $j("#bankerAnimate1"+indexuser).animate({
                        top: "10%",
                        left: "10%",
                        width: "82%",
                        height: "82%"
                    },
                    400,
                    function() {
                        $j('.member'+indexuser+' .rtbabg1').show();


                    })
            }),
        $j("#bankerAnimate"+indexuser).animate({
            top: "2%",
            left: "1%",
            width: "100%",
            height: "100%"
        },400),
        $j("#bankerAnimate"+indexuser).animate({
            top: "10%",
            left: "10%",
            width: "82%",
            height: "82%"
        },600)

}



var cmsj;
function cmxx(data){
    cmsj=data;
    console.log(cmsj);
}
var gongneng=0;
function kqgongneng(data){
    console.log(data);
    gongneng=data;
}
function xianstart(data){
    if(index>3){
        var indexuser=data+1;
    }
    else if(data>3){
        var indexuser=data+1;
    }
    else{
        var indexuser=data-index-(-1);
    }
    if(indexuser<=0){
        indexuser=indexuser-(-4);
    }

    if(indexuser==1 && index<4){
        for(var i =2;i<=4;i++){
            $j('.member'+i+' .scorePlace').eq(1).show();
        }
    }
    else{
        for(var i =1;i<=4;i++){
            if(i!=indexuser){
                $j('.member'+i+' .scorePlace').eq(1).show();
                $j('.member'+i+' .PKbox').show();
            }
        }
    }
}
function xiandingzhi(data){

    if(index>3){
        var indexuser=data+1;
    }
    else if(data>3){
        var indexuser=data+1;
    }
    else{
        var indexuser=data-index-(-1);
    }
    if(indexuser<=0){
        indexuser=indexuser-(-4);
    }


    if(data!=index){
        for(var i =1;i<=4;i++){
            if(i!=indexuser){
                $j('.member'+i+' .scorePlace').eq(1).hide();
                $j('.member'+i+' .scorePlace').eq(0).show();
                $j('.member'+i+' .PKbox').hide();
            }
        }
    }
    $j('.scorePlaceBanker').each(function(){
        $j(this).remove();
    });
    $j('.setScore').each(function(){
        $j(this).remove();
    });
    $j('.myScoreImg').each(function(){
        $j(this).remove();
    });
    $j('.totalScore').attr('data-val',0);
    $j('.myScore').attr('data-val',0);
    gongneng=0;
}

function xiazhu(data){

    if(gongneng<=0){
        var html= '';
        html= '<div class="setScore setScore'+data+'" >'
        html+= '<div class="clickBack" onclick="xiaoshi()"></div>'
        html+= '<div class="area"><div class="back"></div> <div class="triangle"></div>'
        html+= '<div>';
        for (var i = 0; i < cmsj.length; i++) {
            html+= '<img src="/app/img/28gang/coin'+cmsj[i]+'.png" class="buttonRound" onClick="xiazhupuls('+data+','+cmsj[i]+')">';
        }
        html+= '</div></div></div>';
        $j('.table').append(html);
    }
    else{
        var html= '';
        html= '<div class="setScore setScore'+data+'" >'
        html+= '<div class="clickBack" onclick="xiaoshi()"></div>'
        html+= '<div class="area"><div class="back"></div> <div class="triangle"></div>'
        html+= '<div>';
        for (var i = 0; i < cmsj.length; i++) {
            html+= '<img src="/app/img/28gang/coin'+cmsj[i]+'.png" class="buttonRound1" onClick="xiazhupuls('+data+','+cmsj[i]+')">';
        }
        html+= '<div style="height: 6vh;width: 9vh;position: relative;display: -webkit-inline-box;"><img src="/app/img/28gang/bisheng.png" class="buttonRound1" onclick="xiazhupuls('+data+','+(cmsj[(cmsj.length-1)]-(-1))+')"><span style="color: #fff;font-size:0.1rem;">胜率'+gongneng+'%</span></div>';
        html+= '</div></div></div>';
        $j('.table').append(html);
    }
}

function xiaoshi(){
    $j('.setScore').remove();
}


function xianxz(data) {
    var time=Math.ceil(new Date()/1000)-timewc;
    data.time = time;
    send('xianxz',data);
}

// 1是闲下注的样子  2是庄看到闲下注的样子
function xiazhupuls(xzindex,data){

    $j('.setScore'+xzindex+'').remove();
    if(index<4){
        xzindex=index+xzindex-1;
    }
    else{
        xzindex=xzindex-1;
    }
    if(xzindex>=4){
        xzindex=xzindex-4;
    }

    showmeplus({xzindex:xzindex,xz:data});

    var time=Math.ceil(new Date()/1000)-timewc;
    send('xianxz',{xzindex:xzindex,xz:data,time:time});
    if(data%10==1){
        gongneng=0;
        data=data-1;
    }
    addxz({xzindex:xzindex,index:index,xz:data,bank:-1});
    // if(index == 1){
    //     html = '<img src="/app/img/28gang/coin'+data+'.png" class="myScoreImg">'
    //    $j('.setScore'+index+'').hide()
    //    $j('.member'+index+' .scorePlace').append(html);
    // }else{
    //    html = '<div class="scorePlace scorePlaceBanker scorePlace'+index+'" style="height: 12vh;">'
    //    html += '<div class="coin coin'+index+'  coinType'+data+'"></div>'
    //    html += '</div>'
    // $j('.member'+index+'').append(html);
    // $j('.member'+index+' .scorePlace .coin'+index+'').animate({
    //     'margin-left': '0px',
    //     'margin-top': '0px'
    // })
    // }
}
function showmeplus(data){


    if(index>3){
        var indexuser=data.xzindex+1;
    }
    else if(data.xzindex>3){
        var indexuser=data.xzindex+1;
    }
    else{
        var indexuser=data.xzindex-index-(-1);
    }
    if(indexuser<=0){
        indexuser=indexuser-(-4);
    }

    var html='';
    $j('.setScore'+indexuser+'').remove();
    $j('.member'+indexuser+' .PKbox').hide();
    if(data.xz%10==1){
        html = '<img src="/app/img/28gang/bisheng.png" class="myScoreImg">';
    }
    else{
        html = '<img src="/app/img/28gang/coin'+data.xz+'.png" class="myScoreImg">';
    }
    $j('.member'+indexuser+' .scorePlace').append(html);
    var time=Math.ceil(new Date()/1000)-timewc;
}

// 摊牌
function tanpai(){
    var time=Math.ceil(new Date()/1000)-timewc;
    send('tanpai',{time:time});
    sjtanpai(index);
    operationButton('');
}
function sjtanpai(data){
    if(index == data){
        operationButton('')
    }
    var cardxx=all[data];
    if(index>3){
        var indexuser=data+1;
    }
    else if(data>3){
        var indexuser=data+1;
    }
    else{
        var indexuser=data-index-(-1);
    }
    if(indexuser<=0){
        indexuser=indexuser-(-4);
    }

    var html='';
    html=html+'<div class="pointArea">'
    html=html+'<img src="/app/img/28gang/point.png"><div class="point">'+cardxx.typename+'</div>'
    html=html+'</div>';
    $j('.member'+indexuser+' .gameStatus').append(html);
    var bian = cardxx.type*10;
    mp3play('mp3'+bian)
    if(index == data){
        divRobBankerText('13')
    }

}


function addxz(data){
    var _data = {
        "user_id":data.id,
        "sex":data.sex,
        "block":data.block,
        "value":data.value,
        "chip_value":data.chip_value,
        "all_value":data.all_value,
        "current_value":data.current_value,
        "size":data.size
    };
    sound.play('sound_4_4');
    Game.playerChipIn(_data, true);
}

// 下注
function ante(data) {
    setTimeout(function () {
        Page.running = 7;
        Game.clearSaizi();
        if (data.master_id == user.id) {
            players['u_' + user.id].showXianTips();
        }
        for (var i = 0; i < data.xianjia_user_ids.length; i++) {
            var player = players['u_' + data.xianjia_user_ids[i]];
            if (player.getUserId() == user.id) {
                player.showTips(Game.gamePanel.getGamePanelPrefix());
                Game.chipInPanel.initBlockClickState(true);
                player.generalPlayActionPanel(Game.gamePanel.getGamePanelPrefix());
                player.generalChooseDealCardBtn(localStorage.chooseValue ? localStorage.chooseValue: '1');
            }
        }
    }, 5000);
}

// 下注
function ante2(data) {
    if(! inited) {
        return setTimeout(function () {
            ante2(data);
        }, 100);
    }
    Page.running = 7;
    Game.clearSaizi();
    if (data.master_id == user.id) {
        players['u_' + user.id].showXianTips();
    }
    for (var i = 0; i < data.xianjia_user_ids.length; i++) {
        var player = players['u_' + data.xianjia_user_ids[i]];
        if (player.getUserId() == user.id) {
            player.showTips(Game.gamePanel.getGamePanelPrefix());
            Game.chipInPanel.initBlockClickState(true);
            player.generalPlayActionPanel(Game.gamePanel.getGamePanelPrefix());
            player.generalChooseDealCardBtn(localStorage.chooseValue ? localStorage.chooseValue: '1');
        }
    }
}


function xzmax(data) {
    Game.showMaxPointTips();
}

function zhuangdeal(data) {
    if(!inited) {
        return setTimeout(function () {
            zhuangdeal(data);
        }, 100);
    }
    console.log("1zhuangdeal");
    Game.clearTimerState();
    Game.generalDealCardBtn({"master_id" : data.master_id});
}

function waitzhuangdeal(data) {
    if(!inited) {
        return setTimeout(function () {
            waitzhuangdeal(data);
        }, 100);
    }
    console.log("1waitzhuangdeal");
    Game.clearTimerState();
    Game.generalDealCardBtn({"master_id" : data.master_id});
}

function zhuangdealclick(data) {
    if(!inited) {
        return setTimeout(function () {
            zhuangdealclick(data);
        }, 1000);
    }
    var _data = {
        "cards":{"s":[{"color":"3","value":"0"},{"color":"1","value":"0"}],"t":[{"color":"3","value":"0"},{"color":"2","value":"0"}],"d":[{"color":"2","value":"0"},{"color":"0","value":"0"}],"z":[{"color":"2","value":"0"},{"color":"3","value":"0"}]},
        "dices":{
            "dices":[data.shaizi.one,data.shaizi.two],
            "dices_point":"2"
        }
    };
    var newcards = {};
    for (var k in _data.cards) {
        newcards[k] = _data["cards"][k];
    }
    _data.cards = newcards;
    Game.clearTimerState();
    Game.showMajongType(_data);
    setTimeout(function() {
            Game.dealMajongToBlock(_data, true);
        },
        2000);
}

function gamerunning(data) {
    Game.startGame({"cur_match": data.js, "user_ids": data.user_list, "running": "2"});
}


function fapai(data){

}

function ffpai(i,j,card,time){
    $j('.member'+j+' .majiang').append('<div class="majiangTemp" style="display: none;"><img src="/app/img/28gang/majiang2.png" class="outer" /> <img src="/app/img/28gang/majiang2.png" class="outer moved" /></div>');
    $j('.member'+j+' .majiang').append('<div class="majiangTemp1" style="display: none;"><img src="/app/img/28gang/majiang2.png" class="outer" /> <img src="/app/img/28gang/majiang2.png" class="outer moved" /></div>');
    setTimeout(function(){
        if(time!=0){
            $j('.member'+j+' .majiangTemp').show();
        }
        $j("#userfp").find("div").eq(2*i).hide();
        $j("#userfp").find("div").eq(2*i-(0-1)).hide();
        var bwidht=$j(window).width();
        var mleft=$j("#userfp").find("div").eq(2*(i)).css("margin-left");
        var left=$j("#userfp").find("div").eq(2*(i)).css("left");
        var memw=$j('.member'+j).css('width');
        var memright=$j('.member'+j).css('margin-right');
        var right=parseInt(bwidht)-parseInt(mleft)-parseInt(left)-parseInt(memw)-parseInt(memright)-2*$j('.member'+j+' .majiangTemp img').width();

        $j('.member'+j+' .majiangTemp img').css('margin-right',right+'px');
        if(j == 1){
            $j('.member'+j+' .majiangTemp img').animate({
                'margin-bottom':'0px',
                'margin-right':'0px',
                'width':'8vh'
            },time);
        }else{
            $j('.member'+j+' .majiangTemp img').animate({
                'margin-bottom':'0px',
                'margin-right':'0px'
            },time);
        }

    },time*i)
    if(j==1 && index<4){
        var html='<div class="majiangSet" style="display:none">'
        html+='<div class="outer outer'+j+' zmmfapai0"  ><img src="/app/img/28gang/majiang2.png" class="ani" onclick="fanpai(0)"> <img src="/app/img/28gang/majiang3.png" class="ani" style="margin-bottom: -0.5vh; display: none;"> <img src="/app/img/28gang/majiang4.png" class="ani" style="display: none;"> <img src="/app/img/28gang/majiang5.png" class="ani" style="margin-bottom: -0.5vh; display: none;"> <img src="/app/img/28gang/majiang6.png" class="ani" style="display: none"> <img src="/app/img/28gang/card'+card['0']['card']+'.png" class="inner" style="display: none"></div>'
        html+='<div class="outer moved moved'+j+' zmmfapai1" ><img src="/app/img/28gang/majiang2.png" class="ani"  onclick="fanpai(1)"> <img src="/app/img/28gang/majiang3.png" class="ani" style="margin-bottom: -0.5vh; display: none;"> <img src="/app/img/28gang/majiang4.png" class="ani" style="display: none;"> <img src="/app/img/28gang/majiang5.png" class="ani" style="margin-bottom: -0.5vh; display: none;"> <img src="/app/img/28gang/majiang6.png" class="ani" style="display: none"> <img src="/app/img/28gang/card'+card['1']['card']+'.png" class="inner" style="display: none"></div>'
        html+='</div>';
    }
    else{
        var html='<div class="majiangSet" style="display:none">'
        html+='<div class="outer outer'+j+' zmmfapai0"><img src="/app/img/28gang/majiang2.png" class="ani" > <img src="/app/img/28gang/majiang3.png" class="ani" style="margin-bottom: -0.5vh; display: none;"> <img src="/app/img/28gang/majiang4.png" class="ani" style="display: none;"> <img src="/app/img/28gang/majiang5.png" class="ani" style="margin-bottom: -0.5vh; display: none;"> <img src="/app/img/28gang/majiang6.png" class="ani" style="display: none"> <img src="/app/img/28gang/card'+card['0']['card']+'.png" class="inner" style="display: none"></div>'
        html+='<div class="outer moved moved'+j+' zmmfapai1"><img src="/app/img/28gang/majiang2.png" class="ani" > <img src="/app/img/28gang/majiang3.png" class="ani" style="margin-bottom: -0.5vh; display: none;"> <img src="/app/img/28gang/majiang4.png" class="ani" style="display: none;"> <img src="/app/img/28gang/majiang5.png" class="ani" style="margin-bottom: -0.5vh; display: none;"> <img src="/app/img/28gang/majiang6.png" class="ani" style="display: none"> <img src="/app/img/28gang/card'+card['1']['card']+'.png" class="inner" style="display: none"></div>'
        html+='</div>';
    }

    $j('.member'+j+' .majiang').append(html);

}






function fanpai(data){
    for(i=1;i<=5;i++){
        fanpais('.member1 .zmmfapai'+data,i,1)
    }
}
function tanpaixx(data){
    var keys = ['s','t','d','z']
    var cards = {};
    var card_code = {};
    for(var key in keys) {
        var k = keys[key];
        if(!cards[k]) cards[k] = [];
        for (var kk in data.card[k].card) {
            var value = data.card[k].card[kk].card;
            if(data.card[k].card[kk].card == 5)
                value = 10;
            else
                value = Math.ceil(data.card[k].card[kk].card)/10;
            cards[k].push({"color":"3", "value":value.toString()});
        }

        var is_win = 0;
        if(k != 'z') {
            if(data.card[k].cardmax > data.card["z"].cardmax)
                is_win = 1;
        }


        card_code[k] = {
            "card" : [cards[k][0]["value"], cards[k][1]["value"]],
            "point" : data.card[k].type.toString(),
            "code" : data.card[k].type.toString(),
            "multiple":data.card[k].bs,
            "is_win":is_win
        };
    }
    _ws.callback.showdownOver({"cards" : cards,
        "dices":{"dices":["4","6"],"dices_point":"2"},
        "card_code":card_code,
        "running":"8"
    });
}

function settlement(data) {
    if(data.length) {
        setTimeout(function () {
            _ws.callback.settlement(data);
        }, 7000);
    }
}

function settlement2(data) {
    if(!inited) {
        return setTimeout(function () {
            settlement2(data);
        }, 100);
    }
    if(data.length) {
        _ws.callback.settlement(data);
    }
}

function fanpais(data,i,cs){
    if(i<5){
        var time=100*i;
    }
    else{
        var time=400;
    }
    setTimeout(function(){
        if(i == 5){
            $j(data).find('img').eq(i).show();
        }else{
            $j(data).find('img').eq(i).show().siblings().hide();
        }
        if(cs==1){
            if(!$j('.member1 .zmmfapai0 .inner').is(':hidden') && !$j('.member1 .zmmfapai1 .inner').is(':hidden')){
                operationButton('5');

            }
        }
    },time)

}













function msgshow(data){
    Game.playChat(data);
}









function shaizi(data){
    var html='<div class="dice1">'
    html+='<img src="/app/img/28gang/timg.gif" /></div>'
    html+='<div class="dice2" style="display:none">'
    html+='<img src="/app/img/28gang/timg.gif"  /></div>';
    $j('#dice').append(html);
    $j('.dice1 img').show();
    setTimeout(function(){
        $j('.dice1 img').attr('src','/app/img/28gang/'+data.one+'.png');
    },750)
    setTimeout(function(){
        $j('.dice2').show();
    },750)
    setTimeout(function(){
        $j('.dice2 img').attr('src','/app/img/28gang/'+data.two+'.png');
    },1500)

}






function zbuser(data){
    if(!players['u_' + data.id]) {
        return setTimeout(function () {
            zbuser(data);
        }, 100);
    }
    Game.generalPlayerPrepareText(data.id);
}


// 游戏过程中退出|或者没参与游戏
function removeuser(data){
    Game.playerLeave({
        "is_exist" : 1,
        "user_id" : data.id
    });
}

// 未开始游戏退出
function removeuser2(data){
    Game.playerLeave({
        "is_exist" : 0,
        "user_id" : data.id
    });
}


function membercsh(){
    for(i=1;i<5;i++){
        var html='<div class="member member'+i+'" id="userxx'+i+'"><div class="zmmyctime"></div>'
        html+='<img src="/app/img/28gang/player.png" class="background" style="display: none;" /> '
        html+='<img src="/app/img/28gang/banker1.png" style="position: absolute; top: 10%; left: 10%; width: 82%; height: 82%; display: none;" />'
        html+='<div class="title"></div> '
        html+='<img src="" class="avatar"  style="display:none"/>'
        html+='<div class="score" style="display:none"></div> '
        html+='<img src="/app/img/28gang/status_icon.png" class="status" style="display: none;" />'
        html+='<img src="/app/img/28gang/status2_icon.png" class="status" />'
        html+='<img id="bankerAnimate'+i+'"  class="rtbabg" src="/app/img/28gang/banker1.png" style="position: absolute; top: 10%; left: 10%; width: 82%; height: 82%; display: none;" />'
        html+='<img id="bankerAnimate1'+i+'" class="rtbabg1" src="/app/img/28gang/banker1.png" style="position: absolute; top: 10%; left: 10%; width: 82%; height: 82%; display: none;" />'
        html+='<img src="/app/img/28gang/fapai.png" class="fapaikuang" style="position: absolute; top: 10%; left: 10%; width: 82%; height: 82%; z-index: 1; display: none;" />'
        html+='<img src="/app/img/28gang/fapai1.png" class="fapaikuang1" style="position: absolute; top: 10%; left: 10%; width: 82%; height: 82%; z-index: 1; display: none;" />'
        html+='<div class="quitBack" ></div>'
        html+='<div class="majiang"></div>'
        html+='<div><div class="scorePlace" style="display: none;"><div class="back"></div> <div class="totalScore" data-val="0">总注：0</div><div class="myScore" data-val="0">下注：0</div></div><div class="scorePlace" style="display: none;"><div class="back"></div> <div class="totalScore" data-val="0">总注：0</div></div><div class="PKbox" onClick="xiazhu('+i+')" style="display: none;"><div class="PKboxBack"></div></div></div>'
        html+='<div class="gameStatus"><img src="/app/img/28gang/ready.png" class="ready" style="display: none;" /><img src="/app/img/28gang/robBanker1.png" class="banker" style="display: none;" /><img src="/app/img/28gang/robBanker.png" class="banker" style="display: none;" /><div class="memberScoreText memberScoreText1" style="display: none;"></div></div></div>';
        $j('#member').append(html);
    }
}
function initroom2(){
    // $j('#userfp').hide();
    $j('.pointArea').each(function(){
        $j(this).remove();
    })

    $j('.scorePlace').hide();
    $j('.totalScore').html('总注:0');
    $j('.myScore').html('下注:0');

    $j('.member .majiang').html('');

    $j('.memberScoreText').html('');
}

var inited = 0;
function gameinit(data) {
    if(data.card_code) {
        var keys = ['s','t','d','z'];
        var cards = {};
        var card_code = {};
        for(var key in keys) {
            var k = keys[key];
            if(!cards[k]) cards[k] = [];
            for (var kk in data.cards[k].card) {
                var value = data.cards[k].card[kk].card;
                if(data.cards[k].card[kk].card == 5)
                    value = 10;
                else
                    value = Math.ceil(data.cards[k].card[kk].card)/10;
                cards[k].push({"color":"3", "value":value.toString()});
            }

            var is_win = 0;
            if(k != 'z') {
                if(data.cards[k].cardmax > data.cards["z"].cardmax)
                    is_win = 1;
            }


            card_code[k] = {
                "card" : [cards[k][0]["value"], cards[k][1]["value"]],
                "point" : data.cards[k].type.toString(),
                "code" : data.cards[k].type.toString(),
                "multiple":data.cards[k].bs,
                "is_win":is_win
            };
        }
        data.cards = cards;
        data.card_code = card_code;
    }
    console.log(data);
    win.load(function () {
        win.ready();
        Page.gameInit({
            "number":data.room.id,
            "running":data.running,
            "room_users":data.user,
            "max_matches":data.zjs,
            "cur_match":data.js,
            "card_rule":"1",
            "room_rule":data.room_rule,
            "zhuang_value":"0",
            "chip":["1","5","10","30"],
            "zhuang_type":"1",
            "ante":data.ante ? data.ante : [],
            "cards":data.cards,
            "dices":data.dices,
            "card_code":data.card_code ? data.card_code : []
        });
        Game.gameRunning({"running":data.running,"cur_match":data.js,"users":[]});
        inited = 1;
    });
}

function initroom(){

}


function adduser(data){
    if(!inited) {
        return setTimeout(function () {
            adduser(data);
        }, 100);
    }
    Game.playerJoin({
        "user_id":data.user.id,
        "nickname":data.user.nickname,
        "path":data.user.img,
        "sex":data.user.sex,
        "position":data.user.index+1,
        "online":data.user.online,
        "value":data.user.dqjf
    });
}
function gxjifen(data){
    if(index>3){
        indexuser=data.index+1;
    }
    else if(data.index>3){
        indexuser=data.index+1;
    }
    else{
        var indexuser=data.index-index-(-1);
    }
    if(indexuser<=0){
        indexuser=indexuser-(-4);
    }

    $j('#member .member'+indexuser+' .score').html(data.dqjf);
}
function qbank(zt){
    var time=Math.ceil(new Date()/1000)-timewc;
    send('qbank',{zt:zt,time:time});
    qbankshow({
        "id":user.id,
        "zt":zt,
        "sex":user.sex,
        "running":"2"
    });
}


function qbankshow(data){
    var _data = {
        "user_id":data.id,
        "zhuang_multiple":data.zt,
        "sex":data.sex,
        "running":"2"
    };
    if (_data.zhuang_multiple == '1') {
        sound.play(101, _data.sex);
    } else if (_data.zhuang_multiple == '0') {
        sound.play(102, _data.sex);
    }
    Game.clearQiangZhuangBtn(_data);
    Game.showQiangZhuangTips(_data);
}


function zhunbei(){
    send('zhunbei',{});
}
function statclear(){
    $j('.gameStatus .ready').hide();
    $j('.gameStatus .banker').hide();
}
function sendfp(){
    operationButton('');
    var time=Math.ceil(new Date()/1000)-timewc;
    send('zhuangdeal',{time:time});
}
function operationButton(data){
    var html='';
    if(data=='1'){
        html+='<div class="buttonLeft buttonCenter" onclick="qbank(0);">不抢</div> '
        html+='<div class="buttonRight buttonCenter" onclick="qbank(1);">抢庄</div>';
    }
    if(data=='2'){
        html+='<div class="buttonMiddle buttonCenter">洗牌</div>';
    }
    if(data=='3'){
        html+='<div class="buttonCenter qiepai">'
        html+='<img src="/app/img/28gang/q1.png" class="buttonRound" />'
        html+='<img src="/app/img/28gang/q2.png" class="buttonRound" />'
        html+='<img src="/app/img/28gang/q3.png" class="buttonRound" />'
        html+='<img src="/app/img/28gang/q4.png" class="buttonRound" />'
        html+='</div>';
    }
    if(data=='4'){
        html+='<div class="buttonCenter fapai" onclick="sendfp();">'
        html+='<div style="display: none;">'
        html+='<img src="/app/img/28gang/f1.png" class="buttonRound" />'
        html+='<img src="/app/img/28gang/f2.png" class="buttonRound" />'
        html+='<img src="/app/img/28gang/f3.png" class="buttonRound" />'
        html+='<img src="/app/img/28gang/f4.png" class="buttonRound" />'
        html+='</div>'
        html+='<img src="/app/img/28gang/f5.png" class="buttonRound" />'
        html+='</div>';
    }
    if(data=='5'){
        if(index <4){
            html+='<div class="buttonMiddle buttonCenter" onclick="tanpai();">摊牌</div>';}
    }
    if(data=='6'){
        if(index <4){
            html+='<div><div class="buttonLeft buttonCenter">下庄</div> <div class="buttonRight buttonCenter">准备</div></div>';
        }
    }
    if(data=='7'){
        if(index <4){
            html+='<div class="buttonCenter"><div class="buttonMiddle buttonCenter"  onClick="zhunbei();">准备</div> <img src="/app/img/28gang/ready.png" class="ready" style="display: none;"></div>';
        }
    }

    if(data=='8'){
        if(index <4){
            html+='<div class="buttonCenter"><img src="/app/img/28gang/robBanker1.png" class="bankerStatus"></div>';
            //mp3play('buqiang')
        }
    }

    if(data=='9'){
        if(index <4){
            html+='<div class="buttonCenter" ><img src="/app/img/28gang/robBanker.png" class="bankerStatus"></div>';
            //mp3play('qiangzhuang')
        }
    }
    if(data=='10'){
        if(index <4){
            html+='<div class="buttonCenter"><img src="/app/img/28gang/pleaseBet.png" class="bankerStatus" style="height: 4vh;" /></div> ';
        }
    }
    if(data=='11'){
        if(index <4){
            html+='<div class="buttonCenter"><img src="/app/img/28gang/waitBet.png" class="bankerStatus" style="height: 4vh;" /></div>';
        }
    }
    if(data=='12'){
        if(index <4){
            html+='<div class="buttonCenter"><img src="/app/img/28gang/kp.png" class="bankerStatus" style="height: 4vh;" /></div>';
        }
    }
    $j('#operationButton').html(html);
}

















function jibi(data){



    if(data.win.index!=data.bank.index && data.zt!=1){
        if(data.fx==1){
            var kstime=1000;
        }
        else{
            var kstime=1000+200*8+1000;
        }
        data.zt=1;
        setTimeout('jibi('+JSON.stringify(data)+')',kstime);
        return false;
    }
    if(data.win.index==data.bank.index && data.zt!=1){
        var kstime=1000;
        data.zt=1;
        setTimeout('jibi('+JSON.stringify(data)+')',kstime);
        return false;
    }
    mp3play('mp3gold');

    if(index>3){
        var win=data.win.index+1;
    }
    else if(data.win.index>3){
        var win=data.win.index+1;
    }
    else{
        var win=data.win.index-index-(-1);
    }
    if(win<=0){
        win=win-(-4);
    }

    if(index>3){
        var lose=data.lose.index+1;
    }
    else if(data.lose.index>3){
        var lose=data.lose.index+1;
    }
    else{
        var lose=data.lose.index-index-(-1);
    }
    if(lose<=0){
        lose=lose-(-4);
    }
    // var win=data.win.index-indexuser;
    // var lose=data.lose.index-indexuser;
    // if(win<=0){
    //     win=win-(-4);
    // }
    // if(lose<=0){
    //     lose=lose-(-4);
    // }
    if (window.innerHeight)
        winHeight = window.innerHeight,
            winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight,
            winWidth = document.body.clientWidth;
// 金币宽
    var jinbiWidth = 7.5,
        loseTop = parseInt($j('.member'+lose).css('bottom')),
        loseHg  = parseInt($j('.member'+lose +' .avatar').css('height'))/1,
        loseLf  = parseInt($j('.member'+lose).css('left')),
        loseWt  = parseInt($j('.member'+lose).css('width')),
        loseMl  = parseInt($j('.member'+lose).css('margin-left')),
        winTop = parseInt($j('.member'+win).css('bottom')),
        winHg  = parseInt($j('.member'+win +' .avatar').css('height'))/1,
        winLf  = parseInt($j('.member'+win).css('left')),
        winWt  = parseInt($j('.member'+win).css('width')),
        winMl  = parseInt($j('.member'+win).css('margin-left'))

    if(typeof(winMl) == 'undefined'){
        winMl = 0;
    }

    var top  =loseTop-jinbiWidth+loseHg+'px';

    if(typeof(loseLf) == 'undefined' || !loseLf){
    }
    else{
        var left =loseLf-jinbiWidth+loseMl+loseWt/2+'px';
    }



    var ytop  =winTop-jinbiWidth+winHg+'px';
    if(typeof(winLf) == 'undefined' || !winLf){
    }
    else{
        var yleft =winLf-jinbiWidth+winMl+winWt/2+'px';
    }



    for(var i=0;i<8;i++){
        var html='<div class="memberCoin member'+win+lose+'"  ><img src="/app/img/28gang/coin.png" class="erba-memberCoin" /></div>'
        $j('#jinbi').append(html);
        $j('.member'+win+lose).eq(i).css('bottom',top);
        $j('.member'+win+lose).eq(i).css('left',left);
        $j('.member'+win+lose).eq(i).animate({
            bottom:ytop,
            left:yleft
        },0+i*150);
    }
    setTimeout('jibiover('+win+lose+')',2500);
}

function jibiover(data){
    $j('#jinbi .member'+data).remove();
}


function jibichange(data){
    for(var i=0;i<data.length;i++){
        var jifenxx=data[i];

        if(index>3){
            var indexuser=jifenxx.index+1;
        }
        else if(jifenxx.index>3){
            var indexuser=jifenxx.index+1;
        }
        else{
            var indexuser=jifenxx.index-index-(-1);
        }
        if(indexuser<=0){
            indexuser=indexuser-(-4);
        }
        if(indexuser<5){
            $j('.member'+indexuser+' .score').attr('data-val',jifenxx.dqjf);
        }
        else{
            $j('.memberUp'+indexuser+' .score').attr('data-val',jifenxx.dqjf);
        }
        // var html='<label class="erbashu">-0</label><label class="erbaying">+0</label>';
        // var html='<div class="memberScoreText'+userindex+'" data-dqjf="'+jifenxx.dqjf+'" data-index="'+userindex+'"></div>';
        // $j('.memberScoreText'+userindex+'').append(html);
        //var fx=jifenxx.fx;
    }

    setTimeout('jibiover2()',5000);
}
function clearmemberBull(){
    $j('#memberBull').html('');
}

function jibiover2(){
    // $j('#userfp').hide();
    $j('.pointArea').each(function(){
        $j(this).remove();
    })

    $j('.scorePlace').hide();
    $j('.totalScore').html('总注:0');
    $j('.myScore').html('下注:0');

    $j('.member .majiang').html('');

    $j('#member .member').each(function(){
        if(!$j(this).find('.avatar').is(':hidden')){
            var lsjf=parseInt($j(this).find('.score').html())+0;
            var dqjf=parseInt($j(this).find('.score').attr('data-val'))+0;
            $j(this).find('.score').html(dqjf);
            if(dqjf-lsjf>0){
                $j(this).find('.memberScoreText1').html('<label class="erbaying"  style="display: block;">+'+(dqjf-lsjf)+'</label>');
            }
            else{
                $j(this).find('.memberScoreText1').html('<label class="erbashu"  style="display: block;">'+(dqjf-lsjf)+'</label>');
            }
            $j(this).find('.memberScoreText1').show();
        }
    })


    $j('#member .memberUp').each(function(){

        if(!$j(this).find('.avatar').is(':hidden')){
            var lsjf=parseInt($j(this).find('.score').html());
            var dqjf=parseInt($j(this).find('.score').attr('data-val'));
            $j(this).find('.score').html(dqjf);
            if(dqjf-lsjf>0){
                $j(this).find('.memberScoreText1').html('<label class="erbaying1"  style="display: block;">+'+(dqjf-lsjf)+'</label>');
            }
            else{
                $j(this).find('.memberScoreText1').html('<label class="erbashu1"  style="display: block;">'+(dqjf-lsjf)+'</label>');
            }
            $j(this).find('.memberScoreText1').show();
        }
    })
}







function  shoupai(data){
    var html='';
    html='<div class="cards"><img src="/app/img/28gang/card'+data['0']['card']['0']['card']+'.png" class="inner"></div>'
    html+='<div class="cards"><img src="/app/img/28gang/card'+data['0']['card']['1']['card']+'.png" class="inner"></div>'
    html+='<div class="cards"><img src="/app/img/28gang/card'+data['1']['card']['0']['card']+'.png" class="inner"></div>'
    html+='<div class="cards"><img src="/app/img/28gang/card'+data['1']['card']['1']['card']+'.png" class="inner"></div>'
    html+='<div class="cards"><img src="/app/img/28gang/card'+data['2']['card']['0']['card']+'.png" class="inner"></div>'
    html+='<div class="cards"><img src="/app/img/28gang/card'+data['2']['card']['1']['card']+'.png" class="inner"></div>'
    html+='<div class="cards"><img src="/app/img/28gang/card'+data['3']['card']['0']['card']+'.png" class="inner"></div>'
    html+='<div class="cards"><img src="/app/img/28gang/card'+data['3']['card']['1']['card']+'.png" class="inner"></div>'
    $j('.first_half_cards').append(html);
}

function divRobBankerText(data){
    var html='';
    if(data=='0'){
        html+='准备开始';
    }
    if(data=='1'){
        html+='选择庄家';
    }
    if(data=='2'){
        html+='抢庄';
    }
    if(data=='3'){
        html+='等待下注';
    }
    if(data=='4'){
        html+='等待麻将摊牌';
    }
    if(data=='5'){
        html+='等待结束';
    }
    if(data=='6'){
        html+='庄家发牌';
    }
    if(data=='12'){
        html+='等待下一阶段';
    }
    if(data=='13'){
        html+='等待摊牌';
    }
    $j('#divRobBankerText').html(html);
}























function overroom(data){
    var _data = {
        "game_id":"14",
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
    console.log(_data);
    createRankingV2(_data,
        function(d) {
            var img = new Image();
            if (parseInt(_data.users.length) > 6) {
                img.className = 'room-gameover-ten  ranking-img';
            } else {
                img.className = 'room-gameover  ranking-img';
            }
            img.src = d;
            img.onload = function() {
                if (document.getElementsByClassName('body')[0]) {
                    document.body.removeChild(document.getElementsByClassName('body')[0]);
                }
                document.body.style.backgroundColor = '#000000';
                document.body.style.minHeight = 'initial';
                document.body.appendChild(img);
                var div = document.createElement('div');
                div.className = 'search-number-box';
                document.body.appendChild(div);
                var detailedBtn = '<a class="search-number-box-btn" href="#" style="position: absolute;"></a>';
                div.insertAdjacentHTML("beforeend", detailedBtn);
                win.closeLoading();
                getRankingSix();
            };
        });
}