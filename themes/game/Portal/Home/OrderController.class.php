<?php
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2014 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Dean <zxxjjforever@163.com>
namespace Portal\Controller;

use Common\Controller\HomebaseController;

class OrderController extends HomebaseController {

    protected $user_model;

    public function __construct() {
        parent::__construct();
//        $this->uid = session('uid');

    }
    public function index(){
        if(is_mobile_request()){
            redirect(__ROOT__ . "/");
        }
        $list0=M('type')->order('sort desc')->limit(10)->select();
        $list=M('type')->order('sort desc')->select();
        $map['type']=1;
        $map['enable']='1';
        $list1=M('type')->where($map)->order('sort desc')->select();
        $map['type']=2;
        $map['enable']='1';
        $list2=M('type')->where($map)->order('sort desc')->select();
        $map['type']=3;
        $map['enable']='1';
        $list3=M('type')->where($map)->order('sort desc')->select();

        $map['type']=4;
        $map['enable']='1';
        $list4=M('type')->where($map)->order('sort desc')->select();


        $map['type']=5;
        $map['enable']='1';
        $list5=M('type')->where($map)->order('sort desc')->select();


        $map['type']=6;
        $map['enable']='1';
        $list6=M('type')->where($map)->order('sort desc')->select();


        $obtain=M('obtain_log')->order()->limit('9')->select();
        $this->assign('obtain',$obtain);
        $this->assign('list', $list);
        $this->assign('list0', $list0);
        $this->assign('list1', $list1);
        $this->assign('list2', $list2);
        $this->assign('list3', $list3);

        $this->assign('list4', $list4);

        $this->assign('list5', $list5);
         $this->assign('list6', $list6);
        $this->display();
    }
    public function wfsm(){
        $id=I('get.id');
        $post = M('type')->find($id);
        $this->assign('post', $post);
        $map['type']=$post['type'];
        $group=M('played_group')->where($map)->select();

        $played=M('played')->where($map)->select();
        $palylist=array();
        $grouplist=array();
        foreach ($group as $key => $value) {
            $grouplist[$value['top']][]=$value;
        }

        foreach ($played as $key => $value) {
            $palylist[$value['groupid']][]=$value;
        }

         $this->assign('palylist', $palylist);
        $this->assign('grouplist', $grouplist);
        $this->display('wfsm'.$post['type']);
    }
    public function agentpl(){
        $id=I('get.id');
        $this->assign('id', $id);
        $list=M('played')->where(array('type'=>$id))->select();
        $this->assign('list', $list);
        //print_r($list);
        $this->display();
    }
    public function  tender_chart(){
        $id = intval(I("get.id"));
        $page=I('get.page',30);
        $typelx=I('get.typelx',1);
        $_GET[typelx]=$typelx;
        $_GET[page]=$page;
        $post = M('type')->find($id);
        $list = M('data')->where(array('type'=>$id))->limit($page)->select();
        $this->assign('list', $list);
        $this->assign('post', $post);
        $this->display('tender_chart'.$post['type']);
    }
    public function page(){
         //中奖信息
        $obtain=M('obtain_log')->order('sort desc')->limit('4')->select();
        $this->assign('obtain',$obtain);

        $paihang=M('jiangjin_log')->order('money desc')->limit('4')->select();
        $this->assign('paihang',$paihang);
    	$this->check_login();
        $id = intval(I("get.id"));
        $post = M('type')->find($id);
        $map['type']=$post['type'];
        $map['enable']='1';
        $list=M('type')->where($map)->order('sort asc')->select();
        $xzwf=explode(',',$post['wf']);
        if(!$post['enable']){
            $this->msg('该采种不存在或未开启');
        }
        $this->assign('wfid', $xzwf[0]);
        $this->assign('list', $list);
        $this->assign('post', $post);
        $this->display('page'.$post['type']);
    }
    function tjbet(){
        header("Access-Control-Allow-Origin: *");
    	$this->check_login();
         $data=I('post.');
         if(!$this->user){
            $this->error('请登陆后在操作');
         }
         $zqs=count($data['zhorder']);
         if($zqs<=0){
            $zqs=1;
         }
        if($data['wfway']){
        foreach ($data['zhorder'] as $key3 => $value3) { 
         foreach ($data['type'] as $key => $value) {
            if($value!=$data['type'][$key-1]){
                $post = M('type')->find($value);
                $sj=explode(',',$post['data']);
                $no=1;
                $kjtime=strtotime(date('Y-m-d '.$sj[0],time()))-time();
                foreach($sj as $key2=>$one){
                    if(time()>strtotime(date('Y-m-d '.$one,time()))){
                        $no=$key2+2;
                        $kjtime=strtotime(date('Y-m-d '.$sj[$key2+1],time()))-time();
                    }
                }
                $day=0;
                if($no>$post[num]){
                    $no='1';
                    $day=1;
                }
                eval('$now=$this->'.$post[ongetnoed].'('.$no.',$day,$post[oncs]);');
            }
            if($post['enable']!='1'){
                $this->error('此彩种已经停止销售');
            }
            if($data['actionNo'][$key]<$now){
                $this->error('你购买的期数已经停止销售了');
            }
            $money=$money+$data['zhbs'][$key3]*$data['amount'][$key]*$data['actionNum'][$key]*$data['beiShu'][$key];
         }
     }
        }
        else{
                     foreach ($data['type'] as $key => $value) {
            if($value!=$data['type'][$key-1]){
                $post = M('type')->find($value);
                $sj=explode(',',$post['data']);
                $no=1;
                $kjtime=strtotime(date('Y-m-d '.$sj[0],time()))-time();
                foreach($sj as $key2=>$one){
                    if(time()>strtotime(date('Y-m-d '.$one,time()))){
                        $no=$key2+2;
                        $kjtime=strtotime(date('Y-m-d '.$sj[$key2+1],time()))-time();
                    }
                }
                $day=0;
                if($no>$post[num]){
                    $no='1';
                    $day=1;
                }
                eval('$now=$this->'.$post[ongetnoed].'('.$no.',$day,$post[oncs]);');
            }
            if($post['enable']!='1'){
                $this->error('此彩种已经停止销售');
            }
            if($data['actionNo'][$key]<$now){
                $this->error('你购买的期数已经停止销售了');
            }
            $money=$money+$data['amount'][$key]*$data['actionNum'][$key]*$data['beiShu'][$key];
         }
        }
         if($this->user['money']<$money){
            $this->error('余额不足');
         }
         $map=array();
         if($data['wfway']){
         $map['type']=$data['wfway'];
         }
         else{
            $map['type']=0;
         }
         $map['money']=$money;
         $map['zqs']=$zqs;
         $map['syqs']=0;
         $map['symoney']=0;
         $map['bz']=$data['sftz'];
         $map['time']=date("Y-m-d H:i:s",time());
         $tzid=M('order')->add($map);
         moneybh($this->user[id],0-$money,'投注',array('liqtype'=>'4'));
    if($data['wfway']){
       foreach ($data['zhorder'] as $key2 => $value2) {
        foreach ($data['type'] as $key => $value) {
             $map=array();
             $map['type']=$value;
             if($map['type']==1){
                $map['mode']=2;
             }
             else{
               $map['mode']=$data['amount'][$key];
            }
             $map['playedId']=$data['playedId'][$key];
             $map['actionNo']=$value2;
             $map['actionNum']=$data['actionNum'][$key];
             $map['actionData']=$data['actionData'][$key];
             $map['beiShu']=$data['zhbs'][$key2]*$data['beiShu'][$key];
             $map['amount']=$data['amount'][$key];
             $map['bonusProp']=$data['bonusProp'][$key];
             $map['uid']=$this->user['id'];
             $map['username']=$this->user['user_login'];
             $map['actionIP']=get_client_ip(0,true);
             $map['actionTime']=time();
             $map['tzid']=$tzid;
             M('bets')->add($map);
         }
     }
    }
    else{
         foreach ($data['type'] as $key => $value) {
             $map=array();
             $map['type']=$value;
             $map['playedId']=$data['playedId'][$key];
             $map['actionNo']=$data['actionNo'][$key];
             $map['actionNum']=$data['actionNum'][$key];
             $map['actionData']=$data['actionData'][$key];
             $map['beiShu']=$data['beiShu'][$key];
             $map['amount']=$data['amount'][$key];
             $map['bonusProp']=$data['bonusProp'][$key];
             $map['uid']=$this->user['id'];
             $map['username']=$this->user['user_login'];
             $map['actionIP']=get_client_ip(0,true);
             $map['actionTime']=time();
             $map['tzid']=$tzid;
             M('bets')->add($map);
         }
        }
        $this->success('下单成功');
    }
//时间类
function timelx($id,$day=0,$oncs){
    $cs=explode(',',$oncs);
    $id=$id-$cs[2];
    if($id<=0){
        $id=$id+$cs[3];
        $day=$day-1;
    }
    if($cs[1]){
        $ws=1;
        for($i=0;$i<$cs[1]-1;$i++){
            $ws=$ws*10;
            if($id<$ws){
                $id='0'.$id;
            }
        }
    }
    $no=date($cs[0],time()+$day*24*3600).$id;
    return $no;
}
//时间类
function addlx($id,$day=0,$oncs){
    $cs=explode(',',$oncs);
    $sjday=(strtotime(date('Y-m-d 00:00:00',time()))-strtotime($cs[0].' 00:00:00'))/3600/24;
    $no=$cs[1]+$sjday*$cs[2]+$day*$cs[2]+$id;
    return $no;
}

//时间类
function gdlx($id,$day=0,$oncs){
    $cs=explode(',',$oncs);
    $no=$cs[0];
    return $no;
}

}
