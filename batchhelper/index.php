<?php
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

session_start();

if (isset($_SESSION['saeTClientV2'])) {
	header('Location: main.php');
	
	exit;
} else {
	$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );
	
	if (isset($_REQUEST['code'])) {
		$keys = array();
		$keys['code'] = $_REQUEST['code'];
		$keys['redirect_uri'] = WB_CALLBACK_URL;
		
		$token = $o->getAccessToken( 'code', $keys ) ;
		$o->access_token = $token['access_token'];
		
		$_SESSION['saeTClientV2'] = new SaeTClientV2( $o );
		
		setcookie( 'weibojs_'.$o->client_id, http_build_query($token) );
		
		header('Location: main.php');
		
		exit;
	} else {
		$forcelogin = FALSE;
		
		if (isset($_REQUEST['forcelogin'])) {
			$forcelogin = TRUE;
		}
		
		$codeUrl = $o->getAuthorizeURL( WB_CALLBACK_URL, 'code', NULL, NULL, $forcelogin );
	}
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="utf-8">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>批量小助手</title>
<link rel="stylesheet" rev="stylesheet" type="text/css" media="all" href="css/bootstrap.min.css" />
</head>

<body>
	<div class="container">
		<div class="row" style="margin-top: 10px">
			<div class="span12">
				<h1>批量小助手</h1>
				<hr />
			</div>
		</div>
		
		<div class="row">
			<div class="span8">
				<p><img src="img/wallpaper.png" /></p>
			</div>
			<div class="span4">
				<div>
					<p>
						批量小助手是一款非常好用的微博应用。使用批量小助手，帮您轻松玩转微博。
					</p>
				</div>
				<div style="margin-top: 20px;">
					<div class="row">
						<div class="span2">
							<i class="icon-ok"></i><span style="margin-left: 10px;">查询我的关注</span>
						</div>
						<div class="span2">
							<i class="icon-ok"></i><span style="margin-left: 10px;">查询我的粉丝</span>
						</div>
					</div>
					<div class="row">
						<div class="span2">
							<i class="icon-ok"></i><span style="margin-left: 10px;">查询TA的关注</span>
						</div>
						<div class="span2">
							<i class="icon-ok"></i><span style="margin-left: 10px;">查询TA的粉丝</span>
						</div>
					</div>
					<div class="row">
						<div class="span2">
							<i class="icon-ok"></i><span style="margin-left: 10px;">批量取消关注</span>
						</div>
						<div class="span2">
							<i class="icon-ok"></i><span style="margin-left: 10px;">批量关注</span>
						</div>
					</div>
				</div>
				<div style="margin-top: 20px; text-align: center;">
					<p>
						<a href="<?php echo $codeUrl ?>"><img src="img/weibo-login.png" title="点击进入授权页面" alt="点击进入授权页面" border="0" /></a>
					</p>
				</div>
			</div>
		</div>
	</div>
</body>
</html>