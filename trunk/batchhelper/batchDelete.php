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

$currentMenuItem = 'batchDelete';
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

<script type="text/javascript" src="js/batchDelete.js"></script>
</head>

<body>
	<div class="container">
		<?php include 'menu.php'; ?>
		
		<div class="row">
			<div class="span12">
				<ul class="nav nav-tabs" style="cursor: pointer;">
					<li><a id="batchDeleteWeiboTab" href="#batchDeleteWeibo" onclick="clickBatchDeleteWeiboTab()">批量删微博</a></li>
					<li><a id="batchDeleteCommentsTab" href="#batchDeleteComments" onclick="clickBatchDeleteCommentsTab()">批量删评论</a></li>
				</ul>
			</div>
		</div>
		
		<div id="batchDeleteWeiboDiv">
			<div id="statusesLoadingDiv" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: 200px; background: #DDDDDD;">
				<p style="text-align: center; padding-top: 10px;">
					加载微博中，请稍候...
				</p>
		    </div>
		    
		    <div id="statusesDeletingDiv" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: 200px; background: #DDDDDD;">
				<p style="text-align: center; padding-top: 10px;">
					删除微博中，请稍候...
				</p>
		    </div>
			
			<div class="row" style="padding-top: 10px; border-bottom: 2px solid #DDDDDD;">
				<div class="span1">
					<p style="text-align: center;">
						<input name="statusesCheckbox" type="checkbox" onclick="clickStatusesCheckbox(this.checked)"/>
					</p>
				</div>
				<div class="span9">
					<p style="font-size: 18px; font-weight: bold;">
						我的微博列表
					</p>
				</div>
				<div class="span2">
					<p style="text-align: center;">
						<button name="statusesDeleteButton" class="btn disabled" disabled="disabled" onclick="clickStatusesDeleteButton()">删除</button>
					</p>
				</div>
			</div>
			
			<div id="statusesDiv"></div>
			
			<div class="row" style="padding-top: 10px; border-bottom: 2px solid #DDDDDD;">
				<div class="span1">
					<p style="text-align: center;">
						<input name="statusesCheckbox" type="checkbox" onclick="clickStatusesCheckbox(this.checked)"/>
					</p>
				</div>
				<div class="span9">
				</div>
				<div class="span2">
					<p style="text-align: center;">
						<button name="statusesDeleteButton" class="btn disabled" disabled="disabled" onclick="clickStatusesDeleteButton()">删除</button>
					</p>
				</div>
			</div>
			
			<div class="row">
				<div class="span12">
					<ul class="pager">
						<li style="margin-right: 10px;"><a href="javascript:void(0);" onclick="showPreviousStatuses()">前一页</a></li>
						<li style="margin-left: 10px;"><a href="javascript:void(0);" onclick="showNextStatuses()">后一页</a></li>
					</ul>
				</div>
			</div>
		</div>
		
		<div id="batchDeleteCommentsDiv">
			<div id="commentsLoadingDiv" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: 200px; background: #DDDDDD;">
				<p style="text-align: center; padding-top: 10px;">
					加载评论中，请稍候...
				</p>
		    </div>
		    
		    <div id="commentsDeletingDiv" class="modal hide fade" style="width: 300px; margin-left: -150px; margin-top: 200px; background: #DDDDDD;">
				<p style="text-align: center; padding-top: 10px;">
					删除评论中，请稍候...
				</p>
		    </div>
		    
		    <div class="row" style="padding-top: 10px; border-bottom: 2px solid #DDDDDD;">
				<div class="span1">
					<p style="text-align: center;">
						<input name="commentsCheckbox" type="checkbox" onclick="clickCommentsCheckbox(this.checked)"/>
					</p>
				</div>
				<div class="span9">
					<p style="font-size: 18px; font-weight: bold;">
						我发出的评论列表
					</p>
				</div>
				<div class="span2">
					<p style="text-align: center;">
						<button name="commentsDeleteButton" class="btn disabled" disabled="disabled" onclick="clickCommentsDeleteButton()">删除</button>
					</p>
				</div>
			</div>
			
			<div id="commentsDiv"></div>
			
			<div class="row" style="padding-top: 10px; border-bottom: 2px solid #DDDDDD;">
				<div class="span1">
					<p style="text-align: center;">
						<input name="commentsCheckbox" type="checkbox" onclick="clickCommentsCheckbox(this.checked)"/>
					</p>
				</div>
				<div class="span9">
				</div>
				<div class="span2">
					<p style="text-align: center;">
						<button name="commentsDeleteButton" class="btn disabled" disabled="disabled" onclick="clickCommentsDeleteButton()">删除</button>
					</p>
				</div>
			</div>
			
			<div class="row">
				<div class="span12">
					<ul class="pager">
						<li style="margin-right: 10px;"><a href="javascript:void(0);" onclick="showPreviousComments()">前一页</a></li>
						<li style="margin-left: 10px;"><a href="javascript:void(0);" onclick="showNextComments()">后一页</a></li>
					</ul>
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
