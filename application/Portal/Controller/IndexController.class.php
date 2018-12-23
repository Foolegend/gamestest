<?php

/*
 *      _______ _     _       _     _____ __  __ ______
 *     |__   __| |   (_)     | |   / ____|  \/  |  ____|
 *        | |  | |__  _ _ __ | | _| |    | \  / | |__
 *        | |  | '_ \| | '_ \| |/ / |    | |\/| |  __|
 *        | |  | | | | | | | |   <| |____| |  | | |
 *        |_|  |_| |_|_|_| |_|_|\_\\_____|_|  |_|_|
 */
/*
 *     _________  ___  ___  ___  ________   ___  __    ________  _____ ______   ________
 *    |\___   ___\\  \|\  \|\  \|\   ___  \|\  \|\  \ |\   ____\|\   _ \  _   \|\  _____\
 *    \|___ \  \_\ \  \\\  \ \  \ \  \\ \  \ \  \/  /|\ \  \___|\ \  \\\__\ \  \ \  \__/
 *         \ \  \ \ \   __  \ \  \ \  \\ \  \ \   ___  \ \  \    \ \  \\|__| \  \ \   __\
 *          \ \  \ \ \  \ \  \ \  \ \  \\ \  \ \  \\ \  \ \  \____\ \  \    \ \  \ \  \_|
 *           \ \__\ \ \__\ \__\ \__\ \__\\ \__\ \__\\ \__\ \_______\ \__\    \ \__\ \__\
 *            \|__|  \|__|\|__|\|__|\|__| \|__|\|__| \|__|\|_______|\|__|     \|__|\|__|
 */
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2014 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Dean <zxxjjforever@163.com>
// +----------------------------------------------------------------------

namespace Portal\Controller;

use Common\Controller\HomebaseController;

/**
 * 首页
 */
class IndexController extends HomebaseController {

    //首页 小夏是老猫除外最帅的男人了
    public function getconfig(){
        import('Common.Lib.weixin');
        $this->weixin = new \weixin($this->extract[weixin_appid],$this->extract[weixin_key],$this->extract[access_token]);
        $data=array();
        $data['appId']=$this->extract[weixin_appid];
        $data['jsapi_ticket']=$this->weixin->get_jsapi_ticket();
        $data['nonceStr']='asd45631';
        $data['timestamp']=(string)time();
        $data['signature']=sha1('jsapi_ticket='.$data['jsapi_ticket'].'&noncestr='.$data['nonceStr'].'&timestamp='.$data['timestamp'].'&url='.urldecode($_GET['url']));
        $data['debug']=false;
        $data['jsApiList'][]='onMenuShareTimeline';
        $data['jsApiList'][]='onMenuShareAppMessage';
        echo json_encode($data);
    }
    public function index() {
        if(!$_SESSION['istongyi']){
            $this->display(":fangjian_tishi");
            exit();
        }
        $token=md5($this->user['id'].time());
        $save['token']=$token;
        M('user')->where(array('id'=>$this->user['id']))->save($save);
        // redirect("/app/index.html?token=".$token);
        $this->assign('token',$token);
        $this->assign('user',$user);
        $this->display('Index:'.$this->user['password']);
    }

    public function daoyou() {
        $_SESSION['istongyi'] = 1;
        $token=md5($this->user['id'].time());
        $save['token']=$token;
        M('user')->where(array('id'=>$this->user['id']))->save($save);
        // redirect("/static/index.html?token=".$token);
        $this->assign('token',$token);
        //$this->assign('user',$user);
        $this->display();
    }

    public function dasheng() {
        if(!$_SESSION['istongyi']){
            $this->display(":dashengfangjian_tishi");
            exit();
        }
        $token=md5($this->user['id'].time());
        $save['token']=$token;
        M('user')->where(array('id'=>$this->user['id']))->save($save);
        // redirect("/app/index.html?token=".$token);
        $this->assign('token',$token);
        $this->assign('user',$user);

        $this->display('Index:'.$this->user['password']);
    }

    public function tongyi() {
        $_SESSION['istongyi']=1;
        echo '1';
     }

    public function room() {
        $user=$this->user;
        $token=md5($this->user['id'].time());
        $save['token']=$token;
        M('user')->where(array('id'=>$this->user['id']))->save($save);
        $room=I('room');
        $mapxx['id']=$room;
        $dkxx=M('room')->where($mapxx)->find();
        if(!$_SESSION['istongyi'] && $dkxx['type'] < 18){
            $this->display(":fangjian_tishi");
            exit();
        }
        $fzuser=M('user')->where(array('id'=>$dkxx['uid']))->find();
        $qun=M('qun')->where(array('open'=>$dkxx['uid']))->select();
        $mayuser=array();
        $mayuser[$fzuser['id']]=1;
        foreach ($qun as $key => $value) {
            if($value['zt']==1){
            $mayuser[$value['uid']]='1';
            }
        }
        $rule=json_decode($dkxx['rule'],true);


        $dfxx=explode(',',$rule['play']['df']);
        $gzxx=explode(',',$rule['play']['gz']);
        $pxxx=explode(',',$rule['play']['px']);
        $gz2xx=explode(',',$rule['play']['gz2']);

        $szxx=explode(',',$rule['play']['sz']);
        $sxxx=explode(',',$rule['play']['sx']);
        $cmxx=explode(',',$rule['play']['cm']);

        $dkxx['df']=$dfxx[$rule['df']];
        $dkxx['gz']=$gzxx[$rule['gz']];
        $dkxx['sz']=$szxx[$rule['sz']];
        $dkxx['sx']=$sxxx[$rule['sx']];
        $dkxx['cm']=$cmxx[$rule['cm']];
        $dkxx['wfname']=$rule['play']['name'];
        $dkxx['userlist']=json_decode($dkxx['user'],true);
        foreach ($pxxx as $key => $value) {
            if($rule['px'][$key]==1){
                $dkxx['px'][]=$value;
            }
        }

        foreach ($gz2xx as $key => $value) {
            if($rule['gz2'][$key]==1){
                $dkxx['gz2'][]=$value;
            }
        }

        $this->assign('fzuser',$fzuser);
        $this->assign('mayuser',$mayuser);

        $this->assign('room',$dkxx);
        $this->assign('token',$token);
        $this->assign('user',$user);

        $this->display('game'.$dkxx['type']);
    }

    public function dashengroom() {
        if(!$_SESSION['istongyi']){
            $this->display(":dashengfangjian_tishi");
            exit();
        }
        //$this->display(":login");
        // if($_SESSION['uid']){
        //     $map['id']=$_SESSION['uid'];
        //     $user=M('user')->where($map)->find();
        // }
        // if(!$user){
        //     $last= M('user')->order('id desc')->find();
        //     $add=array();
        //     $add['user_login']='test'.($last['id']+1);
        //     $add['password']='test';
        //     $add['create_time']=$this->time;
        //     $add['last_time']=$this->time;
        //     $add['reg_ip']=get_client_ip(0, true);
        //     $add['img']="http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKCadqSJdzKVwmdwQZzqYtgfLvaZjf8kC1iaibodApB7GQMMP30mm7zzulNXRqVhEBz4VkHJostRUTQ/0";
        //     $add['nickname']='测试用户'.($last['id']+1);
        //     $add['fk']='10';
        //     $res=M('user')->add($add);
        //     $map['id']=$res;
        //     $user=M('user')->where($map)->find();
        //     session('uid', $user["id"]);
        //     session('user_login', $user["user_login"]);
        //     session('user', $user);
        //     $result['last_login_ip'] = get_client_ip(0, true);
        //     $result['last_login_time'] = date("Y-m-d H:i:s");
        //     $user->save($result);
        //     cookie("user_login", $name, 3600 * 24 * 30);
        // }

        // redirect("/app/index.html?token=".$token);
        $room=I('room');
        $mapxx['id']=$room;
        $dkxx=M('room')->where($mapxx)->find();
        $fzuser=M('user')->where(array('id'=>$dkxx['uid']))->find();
        $qun=M('qun')->where(array('open'=>$dkxx['uid']))->select();
        $mayuser=array();
        $mayuser[$fzuser['id']]=1;
        foreach ($qun as $key => $value) {
            if($value['zt']==1){
                $mayuser[$value['uid']]='1';
            }
        }
        $rule=json_decode($dkxx['rule'],true);

        $user=$this->user;
        $token=md5($this->user['id'].time());
        $save['token']=$token;
        $save['password'] = $user['password'];
        // 如果第一次进入没有主题，则使用房主的主题
        if(empty($save['password']) || stristr('dasheng', $save['password']) === FALSE) {
            $save['password'] = $fzuser['password'];
            $user['password'] = $save['password'];
        }
        M('user')->where(array('id'=>$this->user['id']))->save($save);

        $dfxx=explode(',',$rule['play']['df']);
        $gzxx=explode(',',$rule['play']['gz']);
        $pxxx=explode(',',$rule['play']['px']);
        $gz2xx=explode(',',$rule['play']['gz2']);

        $szxx=explode(',',$rule['play']['sz']);
        $sxxx=explode(',',$rule['play']['sx']);
        $cmxx=explode(',',$rule['play']['cm']);

        $dkxx['df']=$dfxx[$rule['df']];
        $dkxx['gz']=$gzxx[$rule['gz']];
        $dkxx['sz']=$szxx[$rule['sz']];
        $dkxx['sx']=$sxxx[$rule['sx']];
        $dkxx['cm']=$cmxx[$rule['cm']];
        $dkxx['wfname']=$rule['play']['name'];
        $dkxx['userlist']=json_decode($dkxx['user'],true);
        foreach ($pxxx as $key => $value) {
            $dkxx['px'][]=$value;
        }
        
        foreach ($gz2xx as $key => $value) {
            if($rule['gz2'][$key]==1){
                $dkxx['gz2'][]=$value;
            }
        }

        $this->assign('fzuser',$fzuser);
        $this->assign('mayuser',$mayuser);

        $this->assign('room',$dkxx);
        $this->assign('token',$token);
        $this->assign('user',$user);

        $this->display('game'.$dkxx['type']);
    }

    public function fangjian_tishi(){
        $this->display();
    }
    public function fangjian_fanhuisy(){
        $this->display();
    }
    public function fangjian_kj(){
        $this->display();
    }
    public function fangjian_nobanker_kj(){
        $this->display();
    }
    public function fangjian_yinyue(){
        $this->display();
    }
    public function fangjian_gz(){
        $room=I('room');
        $mapxx['id']=$room;
        $dkxx=M('room')->where($mapxx)->find();

        $rule=json_decode($dkxx['rule'],true);


        $dfxx=explode(',',$rule['play']['df']);
        $gzxx=explode(',',$rule['play']['gz']);
        $pxxx=explode(',',$rule['play']['px']);
        $gz2xx=explode(',',$rule['play']['gz2']);

        $szxx=explode(',',$rule['play']['sz']);
        $sxxx=explode(',',$rule['play']['sx']);
        $cmxx=explode(',',$rule['play']['cm']);

        $dkxx['df']=$dfxx[$rule['df']];
        $dkxx['gz']=$gzxx[$rule['gz']];
        $dkxx['sz']=$szxx[$rule['sz']];
        $dkxx['sx']=$sxxx[$rule['sx']];
        $dkxx['cm']=$cmxx[$rule['cm']];
        $dkxx['wfname']=$rule['play']['name'];
        $dkxx['userlist']=json_decode($dkxx['user'],true);
        foreach ($pxxx as $key => $value) {
            if($rule['px'][$key]==1){
                $dkxx['px'][]=$value;
            }
        }

        foreach ($gz2xx as $key => $value) {
            if($rule['gz2'][$key]==1){
                $dkxx['gz2'][]=$value;
            }
        }
        $this->assign('room',$dkxx);
        $this->display();
    }
    public function gamejs() {
        //$this->display(":login");
        $map['type']=0;
        $map['zt']=1;
        $server=M('server')->where($map)->order('num asc')->find();
        $content = "var dkxx='".$server['dk']."'";
        $expire = 604800;
        header ( 'Content-type: application/x-javascript' );
        header ( 'Cache-Control: max-age=' . $expire );
        header ( 'Accept-Ranges: bytes' );
        header ( 'Content-Length: ' . strlen ( $content ) );
        echo $content;
    }

    public function download(){
        $post=M('danye')->where("id='1'")->find();
        $this->assign('post',$post);
        $this->display();
    }
    public function logout() {
        session('uid', null);
        session('user_login', null);
        redirect(__ROOT__ . "/");
    }
    public function dologin() {

        $name = I("post.user_login");
        if (empty($name)) {
            $this->error(L('USERNAME_OR_EMAIL_EMPTY'));
        }
        $pass = I("post.user_pass");
        if (empty($pass)) {
            $this->error(L('PASSWORD_REQUIRED'));
        }
        $verrify = I("post.verify");
        if (empty($verrify)) {
            $this->error(L('CAPTCHA_REQUIRED'));
        }
        //验证码
        if (!sp_check_verify_code()) {
            $this->error(L('CAPTCHA_NOT_RIGHT'));
        } else {
            $user = D("Protal/User");
            $where['user_login'] = $name;
            $result = $user->where($where)->find();
            if (!empty($result)) {
                if($result['user_status']==1){
                    $this->error('账号被封');
                }
//                if($result['user_status']==2){
//                    $this->error('账号未激活');
//                }
                if (md5($pass) == $result['user_pass']) {
                    //登入成功页面跳转
                    session('uid', $result["id"]);
                    session('user_login', $result["user_login"]);
                    session('user', $result);
                    $result['last_login_ip'] = get_client_ip(0, true);
                    $result['last_login_time'] = date("Y-m-d H:i:s");
                    $user->save($result);
                    cookie("user_login", $name, 3600 * 24 * 30);
                    $this->success(L('LOGIN_SUCCESS'), U("Home/index"));
                } else {
                    $this->error(L('PASSWORD_NOT_RIGHT'));
                }
            } else {
                $this->error(L('USERNAME_NOT_EXIST'));
            }
        }
    }

}
