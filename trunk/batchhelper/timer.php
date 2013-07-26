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

$currentMenuItem = 'timer';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="utf-8">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>批量小助手</title>
<link rel="stylesheet" rev="stylesheet" type="text/css" media="all" href="css/bootstrap.min.css" />
<link rel="stylesheet" rev="stylesheet" type="text/css" media="all" href="css/datepicker.css" />

<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-transition.js"></script>
<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="js/locales/bootstrap-datepicker.zh-CN.js"></script>
<script type="text/javascript" src="js/ajaxfileupload.js"></script>

<script type="text/javascript">
	var uid = '<?php echo $uid ?>';
</script>

<script type="text/javascript" src="js/timer.js"></script>
</head>

<body>
	<div class="container">
		<?php include 'menu.php'; ?>
		
		<div class="row">
			<div id="statusFormCreateDiv" class="span12">
				<?php include 'loadedEmotions.html'; ?>
				<?php include 'uploadedPictureInfo.html'; ?>
		
				<div id="statusMainFormDiv" style="z-index: 0;">
					<?php include 'statusMainForm.php'; ?>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="span12" style="margin-top: 20px;">
				<div style="width: 555px; margin: auto;">
					<div id="statusSendErrorDiv" class="alert alert-error" style="margin-left: 150px; margin-right: 150px; margin-bottom: 10px; display: none;">
						<span id="statusSendFailedSpan"></span>
						<button id="statusSendErrorDivCloseButton" type="button" class="close">&times;</button>
					</div>
					<div>
						<div class="pull-left" style="margin-left: 150px;">
							<button id="statusSendTiminglyButton" class="btn btn-primary" type="button" disabled="disabled">定时发布</button>
						</div>
						<div class="pull-right" style="margin-right: 150px;">
							<button id="statusSendImmediatelyButton" class="btn" disabled="disabled">立即发布</button>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="toBeSentStatusFormUpdateDiv">
			<?php include 'loadedEmotions.html'; ?>
			<?php include 'uploadedPictureInfo.html'; ?>
			
			<div id="statusMainFormDiv" class="modal hide" style="position: absolute; width: 600px; margin-left: -300px; margin-top: -250px;">
				<div class="modal-header">
		    		<button id="toBeSentStatusFormUpdateDivDismissButton" type="button" class="close" style="margin: auto 0;">&times;</button>
		    		<span style="font-size: 16px; font-weight: bold; margin: auto 0;">修改定时微博</span>
		    	</div>
		    	<div class="modal-body">
		    		<?php include 'statusMainForm.php'; ?>
		    	</div>
		    	<div class="modal-footer">
		    		<div class="pull-left" style="margin-left:150px;">
						<button id="toBeSentStatusFormUpdateDivSaveButton" class="btn btn-primary" type="button">保存</button>
					</div>
					<div class="pull-right" style="margin-right: 150px;">
						<button id="toBeSentStatusFormUpdateDivCloseButton" class="btn">关闭</button>
					</div>
					<div class="clearfix"></div>
		    	</div>
			</div>
		</div>
	
		<div class="row">
			<div style="margin-top: 20px;" class="span12">
				<div style="margin: auto;">
					<table id="statusesTable" style="border-collapse:collapse; width: 100%;">
						<thead style="font-size: 12px;">
							<tr style="background: #e6e6e6; height: 35px;">
								<th colspan="4" style="border: gray; border-style: solid; border-width: 1px;">
									<span style="font-size: 14px;">发布记录</span>
								</th>
							</tr>
							<tr style="background: #f3f3f3; height: 30px;">
								<th style="border: gray; border-style: solid; border-width: 1px; width: 15%;">
									发布时间
								</th>
								<th style="border: gray; border-style: solid; border-width: 1px; width: 65%;">
									微博内容
								</th>
								<th style="border: gray; border-style: solid; border-width: 1px; width: 10%;%">
									状态
								</th>
								<th style="border: gray; border-style: solid; border-width: 1px; width: 10%;%">
									操作
								</th>
							</tr>
						</thead>
						<tbody id="toBeSentStatusesTbody" style="font-size: 12px; display: none;"></tbody>
						<tbody id="sentStatusesTbody" style="font-size: 12px; display: none;"></tbody>
		        	</table>
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
