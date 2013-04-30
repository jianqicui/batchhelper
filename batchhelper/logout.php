<?php
include_once( 'saetv2.ex.class.php' );

session_start();

if (isset($_SESSION['saeTClientV2'])) {
	$_SESSION['saeTClientV2']->end_session();
	
	session_destroy();
	
	header('Location: index.php?forcelogin=true');
} else {
	header('Location: main.php');
}

exit;
?>