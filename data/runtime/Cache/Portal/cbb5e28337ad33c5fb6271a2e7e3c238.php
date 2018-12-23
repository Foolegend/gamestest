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
            <li class="active"><a href="javascript:;">游戏玩法</a></li>
            <li><a href="<?php echo U('AdminYouxi/Add_Rule');?>">添加玩法</a></li>
        </ul>
        <form class="well form-search" method="post" action="<?php echo U('Portal/AdminYouxi/RuleList');?>">
           <div style="float:left;">
                游戏种类： 
                <select  name="type" style="width: 120px;">
                    <option value=''>请选择</option>
                    <?php if(is_array($game)): foreach($game as $key=>$vo): ?><option value='<?php echo ($vo["id"]); ?>' <?php if($vo[id] == $_GET[type]): ?>selected<?php endif; ?>><?php echo ($vo["name"]); ?></option><?php endforeach; endif; ?>
                </select> &nbsp;&nbsp;
            </div>
                玩法名：
            <input type="text" name="name" style="width: 200px;" value="<?php echo ($_GET[name]); ?>" placeholder="请输入玩法名">
            <input type="submit" class="btn btn-primary js-ajax-submit" value="查找" />
        </form>
        <form class="js-ajax-form" action="" method="post">

            <table class="table table-hover table-bordered table-list">
                <thead>
                <tr>    
                <th width="50">ID</th>
                <th>所属游戏</th>
                <th>玩法名</th>
                <th>状态</th>
                <th>操作</th>
                </tr>
                </thead>
                <?php $status['1']='开启'; $status['2']='关闭'; ?>
                <?php if(is_array($posts)): foreach($posts as $key=>$vo): ?><tr>
                    <td><b><?php echo ($vo["id"]); ?></b></td>
                    <td><?php echo (gamename($vo["type"])); ?></td>
                    <td><?php echo ($vo["name"]); ?></td>
                    <td><?php echo ($status[$vo['zt']]); ?></td>
                    <td>
                        <!-- <a href="<?php echo U('AdminPost/edit',array('id'=>$vo['id']));?>"><?php echo L('EDIT');?></a> | --> 
                    
                        <a href="<?php echo U('AdminYouxi/Edit_Rule',array('id'=>$vo['id']));?>" >修改</a> 

                        <a href="<?php echo U('AdminYouxi/Del_Rule',array('id'=>$vo['id']));?>" class="js-ajax-delete">删除</a>
                    </td>
                    </tr><?php endforeach; endif; ?>
               
            </table>
            <div class="pagination"><?php echo ($page); ?></div>
        </form>
    </div>
    <script src="/public/js/common.js"></script>
    <script>
        function refersh_window() {
            var refersh_time = getCookie('refersh_time');
            if (refersh_time == 1) {
                window.location = "<?php echo U('AdminPost/index',$formget);?>";
            }
        }
        setInterval(function() {
            refersh_window();
        }, 2000);
        $(function() {
            setCookie("refersh_time", 0);
            Wind.use('ajaxForm', 'artDialog', 'iframeTools', function() {
                //批量复制
                $('.js-articles-copy').click(function(e) {
                    var ids = [];
                    $("input[name='ids[]']").each(function() {
                        if ($(this).is(':checked')) {
                            ids.push($(this).val());
                        }
                    });

                    if (ids.length == 0) {
                        art.dialog.through({
                            id: 'error',
                            icon: 'error',
                            content: '您没有勾选信息，无法进行操作！',
                            cancelVal: '关闭',
                            cancel: true
                        });
                        return false;
                    }

                    ids = ids.join(',');
                    art.dialog.open("/index.php?g=portal&m=AdminPost&a=copy&ids=" + ids, {
                        title: "批量复制",
                        width: "300px"
                    });
                });
                //批量移动
                $('.js-articles-move').click(function(e) {
                    var ids = [];
                    $("input[name='ids[]']").each(function() {
                        if ($(this).is(':checked')) {
                            ids.push($(this).val());
                        }
                    });

                    if (ids.length == 0) {
                        art.dialog.through({
                            id: 'error',
                            icon: 'error',
                            content: '您没有勾选信息，无法进行操作！',
                            cancelVal: '关闭',
                            cancel: true
                        });
                        return false;
                    }

                    ids = ids.join(',');
                    art.dialog.open("/index.php?g=portal&m=AdminPost&a=move&old_term_id=<?php echo ((isset($term["term_id"]) && ($term["term_id"] !== ""))?($term["term_id"]):0); ?>&ids=" + ids, {
                        title: "批量移动",
                        width: "300px"
                    });
                });
            });
        });
    </script>
    <script type="text/javascript">
var xzid;
function xztype(value,id) {
    if(value){
    var html="";
    $('#'+id+' select').html("");
    xzid=id;
    $.ajax({
        type:'post',
        url:"<?php echo U('Portal/AdminOrder/ajaxtype');?>",
        data:{id:value},
        dataType:'json',
        success:function(data){
            $('#'+id+' select').append("<option value=''>请选择</option>");
            $.each(data,function(i,n){
                $('#'+id+' select').append("<option value='"+n.id+"'>"+n.name+"</option>");
            })
            $('#'+xzid).show();
        }
    })
    }
} 
</script>
</body>
</html>