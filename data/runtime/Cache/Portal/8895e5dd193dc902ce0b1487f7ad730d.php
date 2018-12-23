<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
	<!-- Set render engine for 360 browser -->
	<meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- HTML5 shim for IE8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <![endif]-->

	<link href="/public/simpleboot/themes/<?php echo C('SP_ADMIN_STYLE');?>/theme.min.css" rel="stylesheet">
    <link href="/public/simpleboot/css/simplebootadmin.css" rel="stylesheet">
    <link href="/public/js/artDialog/skins/default.css" rel="stylesheet" />
    <link href="/public/simpleboot/font-awesome/4.4.0/css/font-awesome.min.css"  rel="stylesheet" type="text/css">
    <style>
		form .input-order{margin-bottom: 0px;padding:3px;width:40px;}
		.table-actions{margin-top: 5px; margin-bottom: 5px;padding:0px;}
		.table-list{margin-bottom: 0px;}
	</style>
	<!--[if IE 7]>
	<link rel="stylesheet" href="/public/simpleboot/font-awesome/4.4.0/css/font-awesome-ie7.min.css">
	<![endif]-->
	<script type="text/javascript">
	//全局变量
	var GV = {
	    ROOT: "/",
	    WEB_ROOT: "/",
	    JS_ROOT: "public/js/",
	    APP:'<?php echo (MODULE_NAME); ?>'/*当前应用名*/
	};
	</script>
    <script src="/public/js/jquery.js"></script>
    <script src="/public/js/wind.js"></script>
    <script src="/public/simpleboot/bootstrap/js/bootstrap.min.js"></script>
    <script>
    	$(function(){
    		$("[data-toggle='tooltip']").tooltip();
    	});
    </script>
<?php if(APP_DEBUG): ?><style>
		#think_page_trace_open{
			z-index:9999;
		}
	</style><?php endif; ?>
</head>
<body>
	<div class="wrap js-check-wrap">
		<ul class="nav nav-tabs">
			<li><a href="<?php echo U('AdminYouxi/RuleList');?>">游戏玩法</a></li>
			<li class="active"><a href="<?php echo U('AdminYouxi/Add_Rule');?>">添加玩法</a></li>
		</ul>
		<form class="form-horizontal js-ajax-form" action="<?php echo U('AdminYouxi/Edit_Rule_Post');?>" method="post">
			<fieldset>
                <div class="control-group" >
					<label class="control-label">所属游戏:</label>
					<div class="controls" >
						<select  name="type">
							<option value="">请选择</option>
							<?php if(is_array($game)): foreach($game as $key=>$vo): ?><option value="<?php echo ($vo["id"]); ?>"  <?php if($vo[id] == $post[type]): ?>selected<?php endif; ?> ><?php echo ($vo["name"]); ?></option><?php endforeach; endif; ?>
						</select>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">名称:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="name" value="<?php echo ($post["name"]); ?>" required >
					</div>
				</div>
				
				<div class="control-group" >
					<label class="control-label">底分:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="df" value="<?php echo ($post["df"]); ?>"  >
                        <span style="color: #fff">df</span>
					</div>
				</div>

				<div class="control-group" >
					<label class="control-label">单局最大下注:</label>
					<div class="controls" >
						<input type="text" style="color: red" name="zd" value="<?php echo ($post["zd"]); ?>"  >
						<span style="color: #fff">zd</span>
					</div>
				</div>

				<div class="control-group" >
					<label class="control-label">单选规则:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="gz" value="<?php echo ($post["gz"]); ?>"  >
                        <span style="color: #fff">gz</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">多选规则:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="gz2" value="<?php echo ($post["gz2"]); ?>"  >
                        <span style="color: #fff">gz2</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">牌型:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="px" value="<?php echo ($post["px"]); ?>"  >
                        <span style="color: #fff">px</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">局数:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="js" value="<?php echo ($post["js"]); ?>"  >
                        <span style="color: #fff">js</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">上庄:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="sz" value="<?php echo ($post["sz"]); ?>"  >
                        <span style="color: #fff">sz</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">筹码:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="cm" value="<?php echo ($post["cm"]); ?>"  >
                        <span style="color: #fff">cm</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">上限:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="sx" value="<?php echo ($post["sx"]); ?>"  >
                        <span style="color: #fff">sx</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">抓马:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="zm" value="<?php echo ($post["zm"]); ?>"  >
                        <span style="color: #fff">zm</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">鬼牌:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="gp" value="<?php echo ($post["gp"]); ?>"  >
                        <span style="color: #fff">gp</span>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label">锅底:</label>
					<div class="controls" >
                        <input type="text" style="color: red" name="gd" value="<?php echo ($post["gd"]); ?>"  >
                        <span style="color: #fff">gd</span>
					</div>
				</div>
                <div class="control-group">
					<label class="control-label">开启状态</label>
					<div class="controls">
						<?php $active_true_checked=($post['zt']==1)?"checked":""; ?>
						<label class="radio inline" for="status_yes">
							<input type="radio" name="zt" value="1" id="status_yes" <?php echo ($active_true_checked); ?> />开启
						</label>
						<?php $active_false_checked=($post['zt']==2)?"checked":""; ?>
						<label class="radio inline" for="status_no">
							<input type="radio" name="zt" value="2" id="status_no" <?php echo ($active_false_checked); ?>>关闭
						</label>
					</div>
				</div> 
				<div class="control-group" >
					<label class="control-label">排序:</label>
					<div class="controls" >
                        <input type="number" name="sort" value="<?php echo ($post["sort"]); ?>">
					</div>
				</div>                      
			</fieldset>
			<div class="form-actions">
				<input type="hidden" name="id" value="<?php echo ($post["id"]); ?>">
				<button type="submit" class="btn btn-primary  js-ajax-submit">修改</button>
				<a class="btn" href="javascript:history.back(-1);">返回</a>
			</div>
		</form>
	</div>
	<script src="/public/js/common.js"></script>
</body>
</html>