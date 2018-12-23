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
class DateController extends HomebaseController {
			function kj(){
				ini_set('date.timezone','Asia/Shanghai');
				$id=I('get.id');
				$data=M('data')->find($id);
				$typelx=M('order_menu')->find($data['typeid']);
				eval("\$now=\$this->".$typelx['appear']."(\$typelx[data]);");//计算当前期数
				$planlist=M('plan')->where(array('type_id'=>$data['typeid']))->select();
				foreach ($planlist as $key => $value) {
					$location=M('order_menu')->find($value['location']);
					$sort=M('order_menu')->find($value['sort']);
					$plan_data=M('plan_data')->where(array('planid'=>$value[id],'now'=>array('eq',$data['num']),'sfuser'=>'0'))->order("id desc")->find();
					if($plan_data){
					eval("\$bjdata=\$this->".$location['appear']."(\$data[data],\$value[weizhi]);");//选出比较的值
					eval("\$zt=\$this->".$sort['appear']."(\$bjdata,\$plan_data[data],\$sort[method]);");//计算是否中奖
					if($zt==1){
						M('plan_data')->where(array('id'=>$plan_data[id]))->save(array('zt'=>'1','zjnum'=>$data['num'],'zjdata'=>$data['data']));
						M('plan')->where(array('id'=>$value[id]))->save(array('data_time'=>time()));
					}
					else{
						M('plan_data')->where(array('id'=>$plan_data[id]))->save(array('now'=>$now[num],'zt'=>'0','zjnum'=>$data['num'],'zjdata'=>$data['data']));
					}
					}
				}
				$plan_data=M('plan_data')->where(array('sfwc'=>'0','sfuser'=>array('gt',0),'now'=>array('eq',$data['num'])))->order("id desc")->select();
				foreach ($plan_data as $key => $value) {
					$plan=M('plan_user')->where(array('id'=>$value['planid']))->find();
					$location=M('order_menu')->find($plan['location']);
					$sort=M('order_menu')->find($plan['sort']);
					eval("\$bjdata=\$this->".$location['appear']."(\$data[data],\$value[weizhi]);");//选出比较的值
					eval("\$zt=\$this->".$sort['appear']."(\$bjdata,\$value[data],\$sort[method]);");//计算是否中奖
					$bz=$value['bz']+1;
					$data['zt']=$zt;
					if($zt==1 || $bz==$plan['stages']){
						M('plan_data')->where(array('id'=>$value[id]))->save(array('sfwc'=>'1','bz'=>json_encode($bz),'zt'=>$zt,'zjnum'=>$data['num'],'zjdata'=>$data['data']));
					}
					else{
						M('plan_data')->where(array('id'=>$plan_data[id]))->save(array('bz'=>$bz,'now'=>$now['num'],'zt'=>$zt,'zjnum'=>$data['num'],'zjdata'=>$data['data']));
					}
				}
				echo '计算成功';
			}
			//选中数值
			function wz($data,$weizhi){
				$sjlist=array();
				$datalist=explode(',',$data);
				$wz=explode('#', $weizhi);
				foreach($wz as $key=>$one){
					$sjlist[]=$datalist[$key];
				}
				return $sjlist;
			}
			//后几
			function last($data,$num){
				$sjlist=array();
				$datalist=explode(',',$data);
				$count=count($datalist);
				for($i=0;$i<$num;$i++){
					$sjlist[$i]=$datalist[$count-$num+$i];
				}
				return $sjlist;
			}
			//前几
			function first($data,$num){
				$sjlist=array();
				$datalist=explode(',',$data);
				for($i=0;$i<$num;$i++){
					$sjlist[$i]=$datalist[$i];
				}
				return $sjlist;
			}
			//第几
			function sort($data,$num){
				$sjlist=array();
				$datalist=explode(',',$data);
				$sjlist[0]=$datalist[$num-1];
				return $sjlist;
			}
			//冠军
			function pkgj($data,$num){
				$sjlist=array();
				$datalist=explode(',',$data);
				$count=count($datalist);
				$sjlist[0]=$datalist[$num-1];
				$sjlist[1]=$datalist[$count-1];
				return $sjlist;
			}
			function dans($data,$num,$cs){
				$cslist=explode(',',$cs);
				$result=0;
				if(in_array($data[0],$cslist)){
					$zt='单';
				}
				else{
					$zt='双';
				}
				if($zt==$num){
					$result=1;
				}
				return $result;
			}
			function dax($data,$num,$cs){
				$cslist=explode(',',$cs);
				$result=0;
				if(in_array($data[0],$cslist)){
					$zt='大';
				}
				else{
					$zt='小';
				}
				if($zt==$num){
					$result=1;
				}
				return $result;
			}
			function zhih($data,$num,$cs){
				$cslist=explode(',',$cs);
				$result=0;
				if(in_array($data[0],$cslist)){
					$zt='质';
				}
				else{
					$zt='合';
				}
				if($zt==$num){
					$result=1;
				}
				return $result;
			}
			function longh($data,$num,$cs){
				$result=0;
				if($data[0]>$data[1]){
					$zt='龙';
				}
				else{
					$zt='虎';
				}
				if($zt==$num){
					$result=1;
				}
				return $result;
			}
			function longh2($data,$num,$cs){
				$result=0;
				if($data[0]>$data[4]){
					$zt='龙';
				}
				else{
					$zt='虎';
				}
				if($zt==$num){
					$result=1;
				}
				return $result;
			}


			function zx($data,$num,$cs){
				$result=0;
				$zjws=0;
				$list=explode('-',$num);
				foreach ($data as $key => $value) {
					$list2=str_split($list[$key]);
					if(in_array($value,$list2)){
						$zjws=$zjws+1;
					}
				}
				if($zjws>=count($data)){
					$result=1;
				}
				return $result;
			}


			function hz($data,$num,$cs){
				$hz=0;
				$result=0;
				$list=explode(' ',$num);
				foreach ($data as $key => $value) {
					$hz=$value+$hz;
				}
				if(in_array($hz,$list)){
						$result=1;
				}
				return $result;
				return $result;
			}
			function kd($data,$num,$cs){
				$kd=0;
				$result=0;
				$kd=$data[1]-$data[0];
				$list=explode(' ',$num);
				if($kd<0){
					$kd=0-$kd;
				}
				if(in_array($kd,$list)){
						$result=1;
				}
				return $result;
			}
			function dx($data,$num,$cs){
				$result=0;
				$list=explode(' ',$num);
				$zjhm='';
				foreach ($data as $key => $value) {
					$zjhm=$zjhm.$value;
				}
				if(in_array($zjhm,$list)){
						$result=1;
					}
				return $result;
			}
			function rxdx($data,$num,$cs){
				$result=0;
				$list=explode(' ',$num);
				$cs=array_count_values($data);
				foreach ($list as $key => $value) {
					$list2=str_split($value);
					$cs2=array_count_values($list2);
					$zjws=0;
					foreach ($list2 as $key2 => $value2) {
							if(in_array($value2,$data)){
								if($cs2[$value2]>=$cs[$value2]){
									$zjws=$zjws+1;
								}
							}
					}
					if($zjws>=3){
						$result=1;
					}
				}
				return $result;
			}
			function dx2($data,$num,$cs){
				$result=0;
				$list=explode(' ',$num);
				$zjhm='';
				foreach ($data as $key => $value) {
					$zjhm=$zjhm.$value;
				}
				if(in_array($zjhm,$list)){
						$result=1;
					}
				return $result;
			}

			function fx($data,$num,$cs){
				$result=0;
				$zjws=0;
				$list=str_split($num);
				foreach ($data as $key => $value) {
					if(in_array($value,$list)){
						$zjws=$zjws+1;
					}
				}
				if($zjws>=count($data)){
					$result=1;
				}
				return $result;
			}

			function rx2($data,$num,$cs){
				$result=0;
				$zjws=0;
				$list=str_split($num);
				foreach ($data as $key => $value) {
					if(in_array($value,$list)){
						$zjws=$zjws+1;
					}
				}
				if($zjws>=2){
					$result=1;
				}
				return $result;
			}


			function bdw($data,$num,$cs){
				$result=0;
				$zjws=0;
				$list=str_split($num);
				foreach ($data as $key => $value) {
					if(in_array($value,$list)){
						$zjws=$zjws+1;
					}
				}
				if($zjws>=1){
					$result=1;
				}
				return $result;
			}


			function zx6($data,$num,$cs){
				$result=0;
				$zjws=0;
				$dzsl=0;
				$list=str_split($num);
				foreach ($data as $key => $value) {
					if(in_array($value,$list)){
						$zjws=$zjws+1;
					}
				}
				$cs=array_count_values($data);
				foreach ($cs as $key => $value) {
					if($value>1){
						$dzsl=$dzsl+1;
					}
				}
				if($zjws>=count($data) && $dzsl==0){
					$result=1;
				}
				return $result;
			}


			function rxzx6($data,$num,$cs){
				$result=0;
				$zjws=0;
				$dzsl=0;
				$list=str_split($num);
				$cs=array_count_values($data);
				foreach ($cs as $key => $value) {
					$zjws=$zjws-$value+1;
				}
				foreach ($data as $key => $value) {
					if(in_array($value,$list)){
						$zjws=$zjws+1;
					}
				}
				if($zjws>=3){
					$result=1;
				}
				return $result;
			}
			function rxzx3($data,$num,$cs){
				$result=0;
				$zjws=0;
				$zjws2=0;
				$zjws3=0;
				$list=str_split($num);
				$cs=array_count_values($data);
				foreach ($cs as $key => $value) {
					if($value>1){
						$zjws2=$zjws2-$value+1;
					}
				}
				foreach ($data as $key => $value) {
					if(in_array($value,$list)){
						if($cs[$value]==1){
							$zjws=$zjws+1;
						}
						if($cs[$value]>1){
							$zjws2=$zjws2+1;
						}
					}
				}
				if($zjws==1 && $zjws2==1){
					$result=1;
				}
				return $result;
			}

			function zx12($data,$num,$cs){
				$result=0;
				$zjws2=0;
				$zjws=0;
				$list=explode('-',$num);
				$list2=str_split($list[0]);
				$list3=str_split($list[1]);
				$cs=array_count_values($data);
				foreach ($cs as $key => $value) {
					if($value==2){
						$dzsl=$dzsl+1;
						if(in_array($key,$list2)){
							$zjws2=$zjws2+1;
						}
					}
					if($value>1){
						$dzsl2=$dzsl2+1;
						if(in_array($key,$list3)){
							$zjws=$zjws+1;
						}
					}
				}
				if($zjws2==1 && $zjws==2){
					$result=1;
				}
				return $result;
			}
			function zx3($data,$num,$cs){
				$result=0;
				$zjws=0;
				$dzsl=0;
				$dzsl2=0;
				$list=str_split($num);
				foreach ($data as $key => $value) {
					if(in_array($value,$list)){
						$zjws=$zjws+1;
					}
				}
				$cs=array_count_values($data);
				foreach ($cs as $key => $value) {
					if($value==2){
						$dzsl=$dzsl+1;
					}
					if($value>1){
						$dzsl2=$dzsl2+1;
					}
				}
				if($zjws>=count($data) && $dzsl==1 && $dzsl2==1){
					$result=1;
				}
				return $result;
			}

			function dm($data,$num,$cs){
				$result=0;
				$list1=explode('-',$num);
				$list2=explode(' ',$list1[0]);
				if(array_intersect($data,$list2)){
						$result=1;
					}
				return $result;
			}
			function wxdm($data,$num,$cs){
				$result=0;
				$list=explode(' ',$num);
				if(array_intersect($data,$list)){
						$result=1;
					}
				return $result;
			}


			function shah($data,$num,$cs){
				$result=1;
				$list=explode(' ',$num);
				if(array_intersect($data,$list)){
						$result=0;
					}
				return $result;
			}


			function k3rx($data,$num,$cs){
				$result=0;
				$list=explode(' ',$num);
				if(array_intersect($data,$list)){
						$result=1;
					}
				return $result;
			}

			function zxhz($data,$num,$cs){
				$result=0;
				$hz=$data[0]+$data[1]+$data[2];
				$list=explode(' ',$num);
				if(in_array($hz,$list)){
						$result=1;
					}
				return $result;
			}
			function hzdx($data,$num,$cs){
				$result=0;
				$hz=$data[0]+$data[1]+$data[2];
				if($hz>10){
						$jie='大';
					}
				else{
					$jie='小';
				}
				if($jie==$num){
					$result=1;
				}
				return $result;
			}

			function hzds($data,$num,$cs){
				$result=0;
				$hz=$data[0]+$data[1]+$data[2];
				if($hz%2==0){
						$jie='双';
					}
				else{
					$jie='单';
				}
				if($jie==$num){
					$result=1;
				}
				return $result;
			}



		function ssc($data){
       $timelist=explode(',', $data);
       $qs=1;
       $end='';
       foreach ($timelist as $key => $value) {
           if(time()>strtotime(date("Y-m-d",time())." ".$value)){
                $qs=$key+2;
           }
       }
       $time=strtotime(date("Y-m-d",time())." ".$timelist[$qs-1]);
       $now=date('ymd',time()).$this->zhws($qs,3);
       $res['now']=$now;
       $res['num']=$now.$end;
       $res['time']=$time;
       return $res;
    }

    function jsk3($data){
       $timelist=explode(',', $data);
       $qs=1;
       $end='';
       foreach ($timelist as $key => $value) {
           if(time()>strtotime(date("Y-m-d",time())." ".$value)){
                $qs=$key+2;
           }
       }
       $time=strtotime(date("Y-m-d",time())." ".$timelist[$qs-1]);
       $now=date('ymd',time()).$this->zhws($qs,2);
       $res['now']=$now;
       $res['num']=$now.$end;
       $res['time']=$time;
       return $res;
    }

    function fc3d($data){
    	 $type=M('order_menu')->find('127');
       $timelist=explode(',', $data);
       $qs=1;
       $end='';
       $bz=(strtotime(date("Y-m-d 00:00:00",time()))-strtotime(date("Y-1-1 00:00:00",time())))/(24*3600)-$type['method'];
       foreach ($timelist as $key => $value) {
           if(time()>strtotime(date("Y-m-d",time())." ".$value)){
                $qs=$key+2;
           }
       }
       $time=strtotime(date("Y-m-d",time())." ".$timelist[$qs-1]);
       $now=date('Y',strtotime('+'.($qs-1).' days')).$this->zhws(($qs+$bz),3);
       $res['now']=$now;
       $res['num']=$now.$end;
       $res['time']=$time;
       return $res;
    }

    function pk10($data){
    	$type=M('order_menu')->find('16');
    	$cs=explode(',', $type['method']);
        $day=(strtotime(date("Y-m-d 00:00:00",time()))-strtotime($cs[0].' 00:00:00'))/24/3600;
        $timelist=explode(',', $data);
       $qs=1;
       $end='';
       foreach ($timelist as $key => $value) {
           if(time()>strtotime(date("Y-m-d",time())." ".$value)){
                $qs=$key+2;
           }
       }
       $time=strtotime(date("Y-m-d",time())." ".$timelist[$qs-1]);
       $now=$qs+$cs[1]+$day*179;
       $res['num']=$now.$end;
       $res['time']=$time;
       return $res;
    }
    function zhws($num,$ws){
            $sz=$num;
            $j=1;
            for($i=1;$i<$ws;$i++){
                $j=$j*10;
                if($num<$j){
                        $sz='0'.$sz;
                }
            }
            return $sz;
    } 
}
