<?php
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

session_start();

$c;

if (isset($_SESSION['saeTClientV2'])) {
	$c = $_SESSION['saeTClientV2'];
} else {
	header('Location: index.php');
	
	exit;
}

$uid_get = $c->get_uid();
$uid = $uid_get['uid'];
$user_message = $c->show_user_by_id($uid);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="utf-8">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>批量小助手</title>
<link rel="stylesheet" rev="stylesheet" type="text/css" media="all" href="css/bootstrap.min.css" />

<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-transition.js"></script>
<script type="text/javascript" src="js/bootstrap-modal.js"></script>
<script type="text/javascript" src="js/bootstrap-popover.js"></script>
<script type="text/javascript" src="js/bootstrap-tab.js"></script>
<script type="text/javascript" src="js/bootstrap-typeahead.js"></script>

<script type="text/javascript">
	var clientId = '<?php echo $c->get_oauth()->client_id ?>';
	var uid = '<?php echo $uid ?>';
</script>

<script type="text/javascript" src="js/batchhelper.friendshipsmgnt.js"></script>
</head>

<body>
	<div class="container">
		<div id="otherFriendshipsMgntInputNameModal" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: -100px">
			<div class="modal-header">
	    		<button id="otherFriendshipsMgntInputNameModalDismissButton" type="button" class="close">&times;</button>
	    		<h4 style="color: #3A87AD">输入TA的昵称</h4>
	    	</div>
	    	<div class="modal-body">
	    		<span>昵称</span>
    			<input id="otherFriendshipsMgntNameInput" type="text" style="width: 200px"/>
    			<label id="otherFriendshipsMgntNameEmptySpan" class="hide" style="color: #B94A48">请输入TA的昵称!</label>
	    	</div>
	    	<div class="modal-footer" style="cursor: pointer;">
	    		<a id="otherFriendshipsMgntInputNameModalCloseButton" class="btn">关闭</a>
	    		<a id="otherFriendshipsMgntInputNameModalSaveButton" class="btn btn-primary">保存</a>
	    	</div>
	    </div>
	
		<div class="row" style="margin-top: 10px">
			<div id="friendshipsMgntTabsDiv" class="span8">
				<ul class="nav nav-tabs" style="cursor: pointer;">
					<li><a id="myFriendsMgntTab">我的关注</a></li>
					<li><a id="myFollowersMgntTab">我的粉丝</a></li>
					<li><a id="otherFriendsMgntTab">TA的关注</a></li>
					<li><a id="otherFollowersMgntTab">TA的粉丝</a></li>
				</ul>
			</div>
			<div class="span4">
				<p style="height: 36px; line-height: 36px;">
					欢迎您，
					<a title="我的微博首页" href="<?php echo ('http://weibo.com/' . $uid) ?>" target="_blank"><?php echo $user_message['screen_name'] ?></a>
					 ! 
					<a title="退出" href="logout.php">退出</a>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="span8">
				<div style="background: #D9EDF7; padding: 5px 10px; min-height: 600px;">
					<div class="clearfix">
						<div id="myFriendsDiv" ></div>
						<div id="myFollowersDiv"></div>
						<div id="otherFriendsDiv"></div>
						<div id="otherFollowersDiv"></div>
					</div>
					
					<div style="margin: 5px 0px; text-align: center;">
						<div id="myFriendsLoadButtonDiv">
							<button id="myFriendsLoadButton" class="btn btn-info btn-large">加载100个</button>
						</div>
						
						<div id="myFollowersLoadButtonDiv">
							<button id="myFollowersLoadButton" class="btn btn-info btn-large">加载100个</button>
						</div>
						
						<div id="otherFriendsLoadButtonDiv">
							<button id="otherFriendsLoadButton" class="btn btn-info btn-large">加载100个</button>
						</div>
						
						<div id="otherFollowersLoadButtonDiv">
							<button id="otherFollowersLoadButton" class="btn btn-info btn-large">加载100个</button>
						</div>
					</div>
				</div>
			</div>
			<div id="friendshipsMgntStatusAndOperationDiv" class="span4">
				<div>
					<h3 style="color: #3A87AD">状态</h3>
				
					<div id="myFriendsStatusProgressDiv" class="alert alert-info" style="margin-bottom: 10px;">
						准备就绪。请点击“加载100个”。
					</div>
					<div id="myFriendsStatusResultDiv" class="muted" style="font-size: 16px;">
						<p>
							总计<b><span id="myFriendsTotalCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							加载<b><span id="myFriendsLoadedCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							选中<b><span id="myFriendsSelectedCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							取消关注<b><span id="myFriendsDestroyedFriendshipsCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
					</div>
					
					<div id="myFollowersStatusProgressDiv" class="alert alert-info" style="margin-bottom: 10px;">
						准备就绪。请点击“加载100个”。
					</div>
					<div id="myFollowersStatusResultDiv" class="muted" style="font-size: 16px;">
						<p>
							总计<b><span id="myFollowersTotalCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							加载<b><span id="myFollowersLoadedCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							选中<b><span id="myFollowersSelectedCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							关注<b><span id="myFollowersCreatedFriendshipsCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
					</div>
					
					<div id="otherFriendsStatusProgressDiv" class="alert alert-info" style="margin-bottom: 10px;">
						准备就绪。请点击“加载100个”。
					</div>
					<div id="otherFriendsStatusResultDiv" class="muted" style="font-size: 16px;">
						<p>
							总计<b><span id="otherFriendsTotalCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							加载<b><span id="otherFriendsLoadedCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							选中<b><span id="otherFriendsSelectedCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							关注<b><span id="otherFriendsCreatedFriendshipsCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
					</div>
					
					<div id="otherFollowersStatusProgressDiv" class="alert alert-info" style="margin-bottom: 10px;">
						准备就绪。请点击“加载100个”。
					</div>
					<div id="otherFollowersStatusResultDiv" class="muted" style="font-size: 16px;">
						<p>
							总计<b><span id="otherFollowersTotalCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							加载<b><span id="otherFollowersLoadedCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							选中<b><span id="otherFollowersSelectedCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
						<p>
							关注<b><span id="otherFollowersCreatedFriendshipsCountSpan" style="color: #3A87AD">0</span></b>个
						</p>
					</div>
				</div>

				<div>
					<h3 style="color: #3A87AD">操作</h3>
				
					<div id="myFriendsSelectLoadedDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="myFriendsSelectLoadedButton" class="btn btn-block">全选</button>
						</div>
					</div>
					<div id="myFriendsDeselectLoadedDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="myFriendsDeselectLoadedButton" class="btn btn-block">取消全选</button>
						</div>
					</div>
					
					<div id="myFollowersSelectLoadedDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="myFollowersSelectLoadedButton" class="btn btn-block">全选</button>
						</div>
					</div>
					<div id="myFollowersDeselectLoadedDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="myFollowersDeselectLoadedButton" class="btn btn-block">取消全选</button>
						</div>
					</div>
					
					<div id="otherFriendsSelectLoadedDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="otherFriendsSelectLoadedButton" class="btn btn-block">全选</button>
						</div>
					</div>
					<div id="otherFriendsDeselectLoadedDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="otherFriendsDeselectLoadedButton" class="btn btn-block">取消全选</button>
						</div>
					</div>
					
					<div id="otherFollowersSelectLoadedDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="otherFollowersSelectLoadedButton" class="btn btn-block">全选</button>
						</div>
					</div>
					<div id="otherFollowersDeselectLoadedDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="otherFollowersDeselectLoadedButton" class="btn btn-block">取消全选</button>
						</div>
					</div>
							
					<div id="myFriendsDestroyFriendshipsDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="myFriendsDestroyFriendshipsButton" class="btn btn-primary btn-block">取消关注</button>
						</div>
					</div>
					
					<div id="myFollowersCreateFriendshipsDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="myFollowersCreateFriendshipsButton" class="btn btn-primary btn-block">关注</button>
						</div>
					</div>
					
					<div id="otherFriendsCreateFriendshipsDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="otherFriendsCreateFriendshipsButton" class="btn btn-primary btn-block">关注</button>
						</div>
					</div>
					
					<div id="otherFollowersCreateFriendshipsDiv" class="row" style="margin-bottom: 10px;">
						<div class="span2">
							<button id="otherFollowersCreateFriendshipsButton" class="btn btn-primary btn-block">关注</button>
						</div>
					</div>
				</div>
				
				<div>
					<h3 style="color: #3A87AD">限制</h3>
				
					<div class="muted" style="font-size: 16px;">
						<p>
							本小时关注请求频次：
							<b><span id="remainingHourlyCreateFriendshipsLimitSpan" style="color: #3A87AD"></span></b>
							/
							<b><span id="hourlyCreateFriendshipsLimitSpan" style="color: #3A87AD"></span></b>
						</p>
						<p>
							本日关注请求频次：
							<b><span id="remainingDailyCreateFriendshipsLimitSpan" style="color: #3A87AD"></span></b>
							/
							<b><span id="dailyCreateFriendshipsLimitSpan" style="color: #3A87AD"></span></b>
						</p>
						<p>
							本小时用户请求频次：
							<b><span id="remainingHourlyUserHitsLimitSpan" style="color: #3A87AD"></span></b>
							/
							<b><span id="hourlyUserHitsLimitSpan" style="color: #3A87AD"></span></b>
						</p>
						<p>
							本小时IP请求频次：
							<b><span id="remainingHourlyIpHitsLimitSpan" style="color: #3A87AD"></span></b>
							/
							<b><span id="hourlyIpHitsLimitSpan" style="color: #3A87AD"></span></b>
						</p>
						<p>
							重置时间：
							<b><span id="resetDateTimeSpan" style="color: #3A87AD"></span></b>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="span12">
				<div style="margin: 10px 0px; text-align: center;">
					意见反馈
					<a href="http://weibo.com/u/3436273750" target="_blank">@批量小助手</a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
