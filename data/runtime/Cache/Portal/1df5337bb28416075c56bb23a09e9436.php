<?php if (!defined('THINK_PATH')) exit();?>
  <div class="createRoomBack"></div> 
  <div class="mainPart" style="height: 60vh;">
   <div class="createB"></div> 
   <div class="createTitle">
    <img src="/app/img/common/game_rule.png" />
   </div> 
   <img src="/app/img/common/cancel.png" class="cancelCreate" onclick="public('vroomRule')" /> 
   <div class="blueBack" style="height: 51vh;">
    <div class="selectPart" style="top: 0px; height: 4vh; line-height: 4.1vh;">
     <div class="selectTitle" style="width: 100%; font-size: 2vh; text-align: center; color: rgb(125, 217, 255); background-color: rgb(20, 57, 72); opacity: 1;">
      创建房间,游戏未进行,不消耗房卡
     </div>
    </div>
    <?php if(trim($room['wfname'])): ?><div class="selectPart" style="height: 4vh; line-height: 4vh; padding: 0.8vh 0px;">
     <div class="selectTitle">
      模式：
     </div> 
     <div class="selectList">
      <div class="selectItem" style="margin-left: 10px;">
       <div class="selectText">
        <?php echo ($room['wfname']); ?>
       </div>
      </div> 
     </div>
    </div><?php endif; ?>

    <?php if($room['df']): ?><div class="selectPart" style="height: 4vh; line-height: 4vh; padding: 0.8vh 0px;">
     <div class="selectTitle">
      底分：
     </div> 
     <div class="selectList">
      <div class="selectItem" style="margin-left: 10px;">
       <div class="selectText">
        <?php echo ($room['df']); ?>
       </div>
      </div> 
     </div>
    </div><?php endif; ?>




	 <?php if($room['px']): ?><div class="selectPart" style="height: 8vh; line-height: 4vh; padding: 0.8vh 0px;">
     <div class="selectTitle">
      牌型：
     </div> 
     <div class="selectList">
     <?php if(is_array($room['px'])): foreach($room['px'] as $key=>$one): ?><div class="selectItem" style="margin-left: 10px;">
       <div class="selectText">
        <?php echo ($one); ?>
       </div>
      </div><?php endforeach; endif; ?> 
     </div>
    </div><?php endif; ?>

    <?php if($room['gz2']): ?><div class="selectPart" style="height: 8vh; line-height: 4vh; padding: 0.8vh 0px;">
     <div class="selectTitle">
      规则：
     </div> 
     <div class="selectList">
     <?php if(is_array($room['gz2'])): foreach($room['gz2'] as $key=>$one): ?><div class="selectItem" style="margin-left: 10px;">
       <div class="selectText">
        <?php echo ($one); ?>
       </div>
      </div><?php endforeach; endif; ?> 
     </div>
    </div><?php endif; ?>  
  
  <?php if($room['cm']): ?><div class="selectPart" style="height: 4vh; line-height: 4vh; padding: 0.8vh 0px;">
     <div class="selectTitle">
      筹码：
     </div> 
     <div class="selectList">
      <div class="selectItem" style="margin-left: 10px;">
       <div class="selectText">
        <?php echo ($room['cm']); ?>
       </div>
      </div> 
      <!---->
     </div>
    </div><?php endif; ?> 


    <?php if($room['sx']): ?><div class="selectPart" style="height: 4vh; line-height: 4vh; padding: 0.8vh 0px;">
     <div class="selectTitle">
      上限：
     </div> 
     <div class="selectList">
      <div class="selectItem" style="margin-left: 10px;">
       <div class="selectText">
        <?php echo ($room['sx']); ?>
       </div>
      </div> 
      <!---->
     </div>
    </div><?php endif; ?>


    <?php if($room['gz']): ?><div class="selectPart" style="height: 12vh; line-height: 4vh; padding: 0.8vh 0px;">
      <div class="selectTitle">
       规则：
      </div>
      <div class="selectList">
       <div class="selectItem" style="margin-left: 10px;">
        <div class="selectText">
         <?php echo ($room['gz']); ?>
        </div>
       </div>
       <!---->
      </div>
     </div><?php endif; ?>

    <?php if($room['sz']): ?><div class="selectPart" style="height: 4vh; line-height: 4vh; padding: 0.8vh 0px;">
     <div class="selectTitle">
      上庄：
     </div> 
     <div class="selectList">
      <div class="selectItem" style="margin-left: 10px;">
       <div class="selectText">
        <?php echo ($room['sz']); ?>
       </div>
      </div> 
      <!---->
     </div>
    </div><?php endif; ?> 

    <div class="selectPart" style="height: 4vh; line-height: 4vh; padding: 0.8vh 0px;">
     <div class="selectTitle">
      局数：
     </div> 
     <div class="selectList">
      <div class="selectItem" style="margin-left: 10px;">
       <div class="selectText">
        <?php echo ($room['zjs']); ?>局X<?php echo ($room['fk']); ?>房卡
       </div>
      </div> 
      <!---->
     </div>
    </div> 
   </div>
  </div>