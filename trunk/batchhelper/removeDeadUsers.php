<?php
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

session_start();

$tClientV2;

if (isset($_SESSION['saeTClientV2'])) {
	$tClientV2 = $_SESSION['saeTClientV2'];
} else {
	header('Location: index.php');
	
	exit;
}

$uid_get = $tClientV2->get_uid();
$uid = isset($uid_get['uid']) ? $uid_get['uid'] : NULL;
$user_message = $tClientV2->show_user_by_id($uid);

$currentMenuItem = 'removeDeadUsers';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="utf-8">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>批量小助手</title>
<link rel="stylesheet" rev="stylesheet" type="text/css" media="all" href="css/bootstrap.min.css" />

<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-transition.js"></script>
<script type="text/javascript" src="js/bootstrap-modal.js"></script>
<script type="text/javascript" src="js/bootstrap-tab.js"></script>

<script type="text/javascript">
	var accessToken = '<?php echo $tClientV2->get_oauth()->access_token ?>';

	var uid = '<?php echo $uid ?>';
</script>

<script type="text/javascript" src="js/removeDeadUsers.js"></script>
</head>

<body>
	<div class="container">
		<?php include 'menu.php'; ?>
	
		<div class="row">
			<div class="span12">
				<ul class="nav nav-tabs" style="cursor: pointer;">
					<li><a id="removeDeadFriendsTab" href="#removeDeadFriends" onclick="clickRemoveDeadFriendsTab()">清除死亡关注</a></li>
					<li style="display: none;"><a id="removeDeadFollowersTab" href="#removeDeadFollowers" onclick="clickRemoveDeadFollowersTab()">清除死亡粉丝</a></li>
				</ul>
			</div>
		</div>
		
		<div id="removeDeadFriendsDiv">
			<div id="deadFriendsLoadingDiv" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: 200px; background: #DDDDDD;">
				<p style="text-align: center; padding-top: 10px;">
					加载死亡关注中，请稍候...
				</p>
		    </div>
		    
		    <div id="deadFriendsRemovingDiv" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: 200px; background: #DDDDDD;">
				<p style="text-align: center; padding-top: 10px;">
					清除死亡关注中，请稍候...
				</p>
		    </div>
		    
		    <div class="row">
		    	<div class="span12">
		    		<h3 style="text-align: center;">
		    			死亡关注数量：<b><span id="deadFriendsTotalCountSpan" style="color: red">0</span></b>
		    		</h3>
		    	</div>
		    </div>
		    
		    <div class="row">
		    	<div class="span12">
		    		<div id="deadFriendsDiv" class="clearfix" style="width: 920px; margin: 0px auto;"></div>
		    	</div>
		    </div>
		    
		    <div id="deadFriendsOperationDiv" class="row" style="margin-top: 10px; display: none;">
		    	<div class="span3">
		    	</div>
		    	<div class="span2">
		    		<button class="btn btn-block" onclick="selectLoadedDeadFriends()">全选</button>
		    	</div>
		    	<div class="span2">
		    		<button class="btn btn-block" onclick="deselectLoadedDeadFriends()">取消全选</button>
		    	</div>
		    	<div class="span2">
		    		<button id="deadFriendsRemoveButton" class="btn btn-primary btn-block disabled" disabled="disabled" onclick="removeDeadFriends()">清除</button>
		    	</div>
		    	<div class="span3">
		    	</div>
		    </div>
		</div>
		
		<div id="removeDeadFollowersDiv">
			<div id="deadFollowersLoadingDiv" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: 200px; background: #DDDDDD;">
				<p style="text-align: center; padding-top: 10px;">
					加载死亡粉丝中，请稍候...
				</p>
		    </div>
		    
		    <div id="deadFollowersRemovingDiv" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: 200px; background: #DDDDDD;">
				<p style="text-align: center; padding-top: 10px;">
					清除死亡粉丝中，请稍候...
				</p>
		    </div>
		    
		    <div class="row">
		    	<div class="span12">
		    		<h3 style="text-align: center;">
		    			死亡粉丝数量：<b><span id="deadFollowersTotalCountSpan" style="color: red">0</span></b>
		    		</h3>
		    	</div>
		    </div>
		    
		    <div class="row">
		    	<div class="span12">
		    		<div id="deadFollowersDiv" class="clearfix" style="width: 920px; margin: 0px auto;"></div>
		    	</div>
		    </div>
		    
		    <div id="deadFollowersOperationDiv" class="row" style="margin-top: 10px; display: none;">
		    	<div class="span3">
		    	</div>
		    	<div class="span2">
		    		<button class="btn btn-block" onclick="selectLoadedDeadFollowers()">全选</button>
		    	</div>
		    	<div class="span2">
		    		<button class="btn btn-block" onclick="deselectLoadedDeadFollowers()">取消全选</button>
		    	</div>
		    	<div class="span2">
		    		<button id="deadFollowersRemoveButton" class="btn btn-primary btn-block disabled" disabled="disabled" onclick="removeDeadFollowers()">清除</button>
		    	</div>
		    	<div class="span3">
		    	</div>
		    </div>
		</div>
	
		<div class="row">
			<div class="span12">
				<?php include 'footer.html'; ?>
			</div>
		</div>
	</div>
</body>
</html>
