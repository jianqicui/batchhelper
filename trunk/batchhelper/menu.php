<div class="navbar navbar-inverse">
    <div class="navbar-inner">
    	<ul class="nav">
    		<?php
    			$menuItemsHtml = '';
    		
    			$friendshipsMgntMenuItemHtml = '<a href="friendshipsMgnt.php">关注/粉丝管理</a>';
    			$timerMenuItemHtml = '<a href="timer.php">定时器</a>';
    			$contentLibMenuItemHtml = '<a href="contentLib.php">内容库</a>';
    			$batchDeleteMenuItemHtml = '<a href="batchDelete.php#batchDeleteWeibo">批量删除</a>';
    			
    			if ('friendshipsMgnt' == $currentMenuItem) {
    				$menuItemsHtml .= '<li class="active">' . $friendshipsMgntMenuItemHtml . '</li>';
    			} else {
    				$menuItemsHtml .= '<li>' . $friendshipsMgntMenuItemHtml . '</li>';
    			}
    			
    			if ('timer' == $currentMenuItem) {
    				$menuItemsHtml .= '<li class="active">' . $timerMenuItemHtml . '</li>';
    			} else {
    				$menuItemsHtml .= '<li>' . $timerMenuItemHtml . '</li>';
    			}
    			
    			if ('contentLib' == $currentMenuItem) {
    				$menuItemsHtml .= '<li class="active">' . $contentLibMenuItemHtml . '</li>';
    			} else {
    				$menuItemsHtml .= '<li>' . $contentLibMenuItemHtml . '</li>';
    			}
    			
    			if ('batchDelete' == $currentMenuItem) {
    				$menuItemsHtml .= '<li class="active">' . $batchDeleteMenuItemHtml . '</li>';
    			} else {
    				$menuItemsHtml .= '<li>' . $batchDeleteMenuItemHtml . '</li>';
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