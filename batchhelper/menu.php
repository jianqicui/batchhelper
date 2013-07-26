<div class="navbar navbar-inverse">
    <div class="navbar-inner">
    	<ul class="nav">
    		<?php
    			$menuItemsHtml;
    		
    			if ('friendshipsMgnt' == $currentMenuItem) {
    				$menuItemsHtml = 
    					'<li class="active"><a href="friendshipsMgnt.php">关注/粉丝管理</a></li>
    					<li><a href="timer.php">定时器</a></li>';
    			} else if ('timer' == $currentMenuItem) {
    				$menuItemsHtml =
	    				'<li><a href="friendshipsMgnt.php">关注/粉丝管理</a></li>
				    	<li class="active"><a href="timer.php">定时器</a></li>';
    			}
    			
    			echo $menuItemsHtml;
    		?>
	    </ul>
	    <ul class="nav pull-right">
			<li class="dropdown">
				<a href="javascript:void(0);" data-toggle="dropdown" class="dropdown-toggle">
					<?php echo isset($user_message['screen_name']) ? $user_message['screen_name'] : '' ?><b class="caret"></b>
				</a>
				<ul class="dropdown-menu">
					<li><a href="http://weibo.com" target="_blank"><i class="icon-home"></i>我的微博首页</a></li>
					<li><a href="logout.php"><i class="icon-off"></i>退出</a></li>
				</ul>
			</li>
		</ul>
    </div>
</div>