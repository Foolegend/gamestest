$(function() {
window.onload = function(){
	$('#menu ul li').each(function(j){
		$('#menu ul li').eq(j).removeClass("on");
		var height=$('#menu ul li span').eq(j).height()+72;
		$('#menu ul li span').eq(j).animate({bottom:-height},100);
	});
}

$('#menu ul li').each(function(i){
	$(this).click(function(){
		if($(this).attr("class")!="on"){
			
			var onheight=$('#menu ul .on span').height()+72;
			$('#menu ul .on span').animate({bottom:-onheight},200);
			$('#menu ul .on').removeClass("on");
			$(this).addClass("on");
			$('#menu ul li span').eq(i).animate({bottom:3.2+"rem"},200);
			$('.footer_front').show();


		}else{
			
			var heigt=$('#menu ul li span').eq(i).height()+72;
			$('#menu ul li span').eq(i).animate({bottom:-heigt},200);
			$(this).removeClass("on");
			$('.footer_front').hide();


		}
	});
});

$('.footer_front').click(function(){
	$('#menu ul .on span').animate({bottom:-20+"rem"},200);
	$('#menu ul .on').removeClass("on");
	$(this).hide();
});


})