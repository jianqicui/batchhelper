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

$currentMenuItem = 'contentLib';
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

<script type="text/javascript">
	var accessToken = '<?php echo $tClientV2->get_oauth()->access_token ?>';

	var uid = '<?php echo $uid ?>';
</script>

<script type="text/javascript" src="js/contentLib.js"></script>
</head>

<body>
	<div class="container">
		<?php include 'menu.php'; ?>
		
		<div id="alertDiv" class="modal hide fade">
		    <div class="modal-body" style="text-align: center;">
		    </div>
		</div>
		
		<div class="row">
			<div class="span2">
				<ul id="typesUl" class="nav nav-pills nav-stacked">
				</ul>
			</div>
			<div id="statusesDiv" class="span10">
			</div>
			<div id="statusPictureDiv" class="modal hide fade">
				<div class="modal-body" style="text-align: center;">
					<img />
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
