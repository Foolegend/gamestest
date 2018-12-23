var fapaizt=0;
function allfapai(data){
        fapaizt=1;
        $('#userfp').html('');
        $('.isReady').hide();
        for(var i=0;i<data.user.length;i++){
            var user=data['user'][i];
            var indexuser=user.index-index-(-1);
            var html='';
            if(indexuser<=0){
                indexuser=indexuser-(-9);
            }
            html=html+'<div class="cardss cards card'+indexuser+'" style="display: none;" data="'+indexuser+'"><div class="card card'+indexuser+'1 sangong9-index1" ></div> <div class="card card'+indexuser+'2 sangong9-index2" ></div> <div class="card card'+indexuser+'3 sangong9-index3" ></div></div>';
            $('#userfp').append(html);
        }
        $('#userfp .cards').show();
        setTimeout(function(){
        $('#userfp .sangong9-index1').show();
        fapaizt=0;
        },1000);
        setTimeout(function(){
        $('#userfp .sangong9-index2').show();
        },800);
        setTimeout(function(){
        $('#userfp .sangong9-index3').show();
        },600);
        $('.myCards').eq(0).show();
        if(data.card){
            for(var i=0;i<data.card.length;i++){
                var card=data['card'][i];
                $('.card'+i+'  .back').removeClass('cardundefined').addClass('card'+card.card);
                setTimeout('showmycard('+i+')',1500);
            }
        }
}
function fapaistart(){
    for(i=1;i<9;i++){
           $('.card1'+i).attr('onclick','send("fapai",{id:'+i+'})');
    }
}

function tanpaixx(data){
    for(var i=0;i<data.card.length;i++){
        var card=data['card'][i];
        $('.card0'+i+'  .back').removeClass('cardundefined').addClass('card'+card.card);
    }
   



    $('.cardDeal .card1').hide();
    $('.myCards').eq(0).hide();
    $('.myCards').eq(1).show();
    var left=['34','40','46','61','68'];
    for(var i=0;i<data.card.length;i++){
        $('.myCards  .card0'+i).animate({
                    left: left[i]+'%',
              },500)
    }
}

function tanpaixx2(data){
    for(var i=0;i<data.card.length;i++){
        var card=data['card'][i];
        $('.card0'+i+'  .back').removeClass('cardundefined').addClass('card'+card.card);
    }
    $('.cardDeal .card1').hide();
    $('.myCards').eq(0).hide();
    $('.myCards').eq(2).show();

    var left=['33','42','51','60','69'];
    for(var i=0;i<data.card.length;i++){
        $('.myCards .card0'+i).animate({
                    left: left[i]+'%',
              },500)
    }
}


function tanpaixxother(data){
    var indexuser=data.user.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    var html='<div>';
    var hz=0;
   
    for(var i=0;i<data.card.length;i++){
        var card=data['card'][4-i];
        var card2=data['card'][i];
        if(i<3){
            hz=hz-(0-card2.val);
        }
        html=html+'<div class="cards card'+indexuser+' card'+indexuser+(i-(-1))+'1 sangong9-index'+(4-i)+' card-flipped"><div class="face front"></div> <div class="face back card'+indexuser+' card'+card.card+' card-flipped"></div></div>';
    }
    html=html+'</div>';
    $('.cardOver').append(html);
    $('.cardDeal .card'+indexuser).hide();
    $('.cardOver .card'+indexuser).show();
    if(hz%10==0){
        var left=['28','22','12','6','0'];
        var left1=['62','56','46','40','34'];
        var right=['0','6','16','22','28'];
    }
    else{
        var left=['24','18','12','6','0'];
        var left1=['62','56','50','44','38'];
        var right=['0','6','12','18','24'];
    }
    for(var i=0;i<data.card.length;i++){
     
        if(indexuser >4){
            $(' .cardOver .card'+indexuser+'.card'+indexuser+(i-(-1))+'1').animate({
                 left: left[i]+'%',
                
                   
              },500)
            console.log(888)
        }
       else if(indexuser ==4){
            $(' .cardOver .card'+indexuser+'.card'+indexuser+(i-(-1))+'1').animate({
                     left: left1[i]+'%',
              },500)  
        }
        else{
            $(' .cardOver .card'+indexuser+'.card'+indexuser+(i-(-1))+'1').animate({
                     right: right[i]+'%',
              },500)  
        }


     }

}
function fapxx(data){
    $('.card'+(data.id-1)+'  .back').removeClass('cardundefined').addClass('card'+data.card.card);
    $('.card1'+data.id).hide();
    $('.card'+(data.id-1)).show();
    $('.card'+(data.id-1)).addClass('card-flipped');
}
function showmycard(id){
    $('.card1'+(id-(-1))).hide();
    $('.card'+id).show();
    $('.card'+id).addClass('card-flipped');
}
function roomxx(data){

}
function adduser(data){
    var indexuser=data.user.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    if($('.member'+indexuser+' .quitBack').length>0){
        $('.member'+indexuser+' .quitBack').hide();
    }
    else{
        if(data.user.online=='-1'){
            var onlinezt='display:block';
        }
        else{
            var onlinezt='display:none';
        }

    if(indexuser==1){
        var actxx='onclick="send(\'zhunbei\',{})"';
    }
    else{
        var actxx='style="display:none"';
    }

    var html='<div class="member member'+indexuser+'">'
     html+='<img src="/app/img/sangong/player.png" class="background"> '
     html+='<img src="/app/img/sangong/playerWin.png" class="background" style="display: none;"> '
     html+='<div class="title">'+data.user.nickname+'</div> '
     html+='<img class="avatar" src="'+data.user.img+'"> '
     html+='<div class="score">'+data.user.dqjf+'</div> '
     html+='<img id="banker0 " src="/app/img/sangong/bull_banker_bg.png" class="background sangong9-banker0"> '
     html+='<img src="/app/img/sangong/bull_banker_icon.png" class="background sangong9-background"> '
     html+='<img id="bankerAnimate'+indexuser+'" class="sangong9-bankerAnimate1" src="/app/img/bull/bull_banker_animate.png"> '
     html+='<img id="bankerAnimate1'+indexuser+'" class="sangong9-bankerAnimate1" src="/app/img/bull/bull_banker_animate.png"> '
     html+='<div class="quitBack" style="'+onlinezt+'"></div> '
     html+='<div class="isReady">'
     html+='<img src="/app/img/sangong/readyButton.png" class="unready" '+actxx+'>' 
     html+='<img src="/app/img/sangong/ready.png" class="ready" style="display: none;" ></div></div>'
    
     $('#member').append(html);
     if(data.user.zt==1){
        $('.member'+indexuser+' .ready').show();
     }
    }
}
function zbuser(data){
     var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    $('.member'+indexuser+' .unready').hide();
    $('.member'+indexuser+' .ready').show();
}
function removeuser(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    $('.member'+indexuser+' .quitBack').show();
    $('.member'+indexuser+' .ready').hide();
}

function removeuser2(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    $('#member .member'+indexuser).remove();
}
function showmemberTimesText(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    var html='<div class="memberTimesText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; top: 0px; left: 0px; width: 30px; height: 16px;" /></div>';
    $('#memberTimesText').append(html);
}
function showmemberTimesText2(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    if(indexuser==6){
        var html='<div class="memberTimesText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; width: 100%;" /></div>'; 
    }
    else if(indexuser >= 5){
   
    var html='<div class="memberTimesText'+indexuser+'" style="display: block;left:16vh;" ><img src="'+data.img+'" style="position: absolute; width: 100%;" /></div>';

}else{
    var html='<div class="memberTimesText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; width: 100%;" /></div>';
}
  $('#memberTimesText2').append(html);
}

function showmemberRobText(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    var html='<div class="memberRobText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; top: 0px; left: 0px; width: 30px; height: 16px;"></div>';
    $('#memberRobText').append(html);
}
function showmemberRobText2(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    var html='<div class="memberFreeRobText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; width: 100%;"></div>';
    $('#memberFreeRobText').append(html);
}

function showmemberBull(data){
     var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
    var html='<div class="memberBull'+indexuser+'" style="display: block;"><img src="'+data.img+'" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"/></div>';
    $('#memberBull').append(html);
}
function clearmemberBull(){
    $('#memberBull').html('');
}
function clearmemberTimesText(){
    $('#memberTimesText').html('');
}
function clearmemberRobText(){
    $('#memberRobText').html('');
}
function clearmemberRobText2(){
    $('#memberFreeRobText').html('');
}
function qzcard(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }

    if(data.bd){
        $('#userfp .qzcard').removeClass('qzcard');
    }
    $('#userfp .card'+indexuser).addClass('qzcard');
}
function showqz(data){
    if($('#userfp .qzcard').length==0){
        $('#userfp .cardss').addClass('qzcard');
    }
    var userindex=data['user'][data.index]-index-(-1);
    if(userindex<0){
        userindex=userindex-(-9);
    }
  $('.liurenniuniu-banker0').hide();
  $('.member'+userindex+' .liurenniuniu-banker0').show();

  data.index=data.index-(-1);
  if(data.index>=data.user.length){
    data.index=0;
  }
  ji=setTimeout('showqz('+JSON.stringify(data)+')',4000/(data.user.length*4));
}

// 抢庄结束动画
function sss(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }

    clearTimeout(ji);
  $('.liurenniuniu-banker0').hide();

 $("#bankerAnimate"+indexuser).show(),
            $("#bankerAnimate"+indexuser).show(),
            $("#bankerAnimate1"+indexuser).animate({
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%"
            },
            400,
            function() {
                $("#bankerAnimate1"+indexuser).animate({
                    top: "10%",
                    left: "10%",
                    width: "80%",
                    height: "80%"
                },
                400,
                function() {
                  $('.member'+indexuser+' .liurenniuniu-background').hide();
                  $('.member'+indexuser+' .liurenniuniu-background').show();
                    
                })
            }),
            $("#bankerAnimate"+indexuser).animate({
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%"
            },400),
                $("#bankerAnimate"+indexuser).animate({
                    top: "10%",
                    left: "10%",
                    width: "80%",
                    height: "80%"
              },400)

        }


        function jibi(data){
            mp3play('mp3gold');
            if(data.win.index!=data.bank.index && data.zt!=1){
                var kstime=200*8;
                data.zt=1;
                setTimeout('jibi('+JSON.stringify(data)+')',kstime);
                return false;
            }
            var win=data.win.index-index-(-1);
        var lose=data.lose.index-index-(-1);
        if(win<=0){
            win=win-(-9);
        }
        if(lose<=0){
            lose=lose-(-9);
        }   
  if (window.innerHeight)
winHeight = window.innerHeight,
winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientHeight))
winHeight = document.body.clientHeight,
winWidth = document.body.clientWidth;
var Hpx=winHeight*(1/100);
var Wpx=winWidth*(1/100);

  var top  =parseInt($('.member'+lose).css('top'))+parseInt(Hpx)*2.5+'px';
  if(lose<=3 && lose>1){
    var right =parseInt($('.member'+lose).css('right'))-parseInt(Wpx)*2;
    var left=parseInt(winWidth)-right-parseInt($('.member'+lose).css('width'))+'px';
  }
  else{
    var left =parseInt($('.member'+lose).css('left'))+parseInt(Wpx)*2+'px';
  }
  var ytop  =parseInt($('.member'+win).css('top'))+parseInt(Hpx)*2.5+'px';
  if(win<=3 && win>1){
    var yright =parseInt($('.member'+win).css('right'))-parseInt(Wpx)*2;
    var yleft=parseInt(winWidth)-yright-parseInt($('.member'+win).css('width'))+'px';
  }
  else{
    var yleft =parseInt($('.member'+win).css('left'))+parseInt(Wpx)*2+'px';
  }
  for(var i=0;i<8;i++){
     var html='<div class="memberCoin member'+win+lose+'"  ><img src="/app/img/bull9/bull_coin.png" class="liurenniuniu-memberCoin" /></div>'
     $('#jinbi').append(html);
     $('.member'+win+lose).eq(i).css('top',top);
     $('.member'+win+lose).eq(i).css('left',left);
     $('.member'+win+lose).eq(i).animate({
       top:ytop,
       left:yleft
    },0+i*250); 
}
    setTimeout('jibiover('+win+lose+')',3000);
  //  $('#member .member'+win+' .bscore').html(data.win.dqjf);
  // $('#member .member'+lose+' .bscore').html(data.lose.dqjf);
}


function jibiover(data){
    $('#jinbi .member'+data).remove();
    clearmemberBull();
}


function jibichange(data){
    for(var i=0;i<data.length;i++){
        var jifenxx=data[i];
        var userindex=jifenxx.index-index-(-1);
        if(userindex<=0){
            userindex=userindex-(-9);
        }
        var html='<div class="memberScoreText'+userindex+'" data-dqjf="'+jifenxx.dqjf+'" data-index="'+userindex+'"></div>';
        $('#memberScoreText1').append(html);   
    }
    setTimeout('jibiover2()',3000);
}
function jibiover2(){
    clearmemberBull();
    clearmemberTimesText();
    $('#memberScoreText1 div').each(function(){
        var userindex=$(this).attr('data-index');
        var dqjf=parseInt($(this).attr('data-dqjf'));
        var lsjf=parseInt($('#member .member'+userindex+' .score').html());
        $('#member .member'+userindex+' .bscore').html(dqjf);
        if(dqjf-lsjf>0){
            $(this).html('<label class="sangong9-memberScoreText2"  style="display: block;">+'+(dqjf-lsjf)+'</label>');
        }
        else{
            $(this).html('<label class="sangong9-memberScoreText1"  style="display: block;">'+(dqjf-lsjf)+'</label>');
        }
    })
    $('.cardDeal').html('');
    $('.cardOver').html('');
    $('.myCards').hide();
    $('.myCards').eq(0).html(' <div class="cards3D"><div class="cards card0" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card1" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card2" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card3" style="display: none;" ><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card4" style="display: none;" ><div class="face front"></div> <div class="face back cardundefined"></div></div></div>')
    $('.myCards').eq(1).html('<div class="cards card00" style="left: 34%;" ><div class="face back card-1 cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card01" style="left: 40%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card02" style="left: 46%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card03" style="left: 61%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card04" style="left: 68%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div>');
    $('.myCards').eq(2).html('<div class="cards card00" style="left: 33%;" ><div class="face back card-1 cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card01" style="left: 42%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card02" style="left: 51%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card03" style="left: 60%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card04" style="left: 69%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div>');
    $('#memberScoreText1').show();
}



function initroom(){
    
    $('.cardDeal').html('');
    $('.cardOver').html('');

    $('.myCards').hide();
    $('.myCards').eq(0).html(' <div class="cards3D"><div class="cards card0" style="display: none; transition: left 1s;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card1" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card2" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card3" style="display: none;" ><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card4" style="display: none;" ><div class="face front"></div> <div class="face back cardundefined"></div></div></div>')
    $('.myCards').eq(1).html('<div class="cards card00" ><div class="face back card-1 cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card01" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card02" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card03" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card04" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div>');
    $('.myCards').eq(2).html('<div class="cards card00"  ><div class="face back card-1 cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card01" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card02" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card03" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card04" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div>');
    
    
    $('#memberScoreText1').html('');
    $('#memberScoreText1').hide();
    $('.liurenniuniu-background').hide();
    $('.liurenniuniu-banker0').hide();
    $('.liurenniuniu-bankerAnimate1').hide();
    clearmemberBull();
    clearmemberTimesText();
    clearmemberRobText();
    $('.isReady').show();
    $('.ready').hide();
    $('.member1 .unready').show();
}
function qbank(zt){
    if(fapaizt==1){
        return false;
    }
    send('qbank',{zt:zt});
}
function overroom(data){


    overzt=0;
    $('#table').hide();
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");

    
    var img=new Image()
    var img1=new Image()
    img.src="sangong9.png";
    img1.src="dyj.png";
    var sj=data;
    img.onload = function(){
        console.log(sj);
        ctx.drawImage(img,0,0,800,1297);
        ctx.drawImage(img1,142,306,60,72);
        //ctx.drawImage(img1,87,156,50,34)
        //ctx.drawImage(img2,87,193,50,34)
        var time1=sj.time.substring(0,sj.time.length-3);
        ctx.font = "22px bold songti";
        ctx.fillStyle = "#d8cb66";
        ctx.fillText("房间号:193"+sj.id, 185,280);
        ctx.fillText(time1, 400, 280);
        ctx.fillText(sj.zjs+"局", 580, 280);

        for(var i=0;i<sj.user.length;i++){
            if(i>1){
                ctx.fillStyle = "#054945";
                ctx.fillRect(142,469-(0-(i-2)*105),516,70);
            }
            var user=sj['user'][i];
            ctx.font = "32px bolder songti";
            ctx.fillStyle = "#d8cb66";
            ctx.fillText(user.nickname.substring(0, 8), 225, 362+(i*75));
            if(user.dqjf>0){
                user.dqjf='+'+user.dqjf;
            }else{
                ctx.fillStyle = "#fff";
                ctx.fillText(user.nickname.substring(0, 8), 225, 362+(i*75));
                ctx.fillText(user.dqjf, 531, 362+(i*75));
            }
            ctx.fillText(user.dqjf, 531, 362+(i*75));
        }

    var dataURL = c.toDataURL();
    $('#overtime').html('<div onclick="location.href=\'/index.php/portal/user/index.html\'" style="z-index: 9999;position: absolute;width: 28%;height: 6%;bottom: 8%;right: 15%;" ></div><div style="background: #000;width: 100%;height: 100%;position: absolute;z-index: 200;""></div> <img src="'+dataURL+'" style="width: 100%;height:100%;position: absolute;z-index: 201;">')
    $('#overtime').show();
    }
}


function msgshow(data){
      var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-9);
    }
       var html='<div class="messageSay messageSay'+indexuser+'" ><div>'+data.msg+'</div> <div class="triangle"></div></div>'
      $('#messageSay').append(html);
      mp3play(data.mp3);
      setTimeout(function(){
            console.log(indexuser);
            $('.messageSay'+indexuser).remove();
      },1500);
}