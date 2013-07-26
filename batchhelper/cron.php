<?php
include_once( 'storage.php' );
include_once( 'mysql.php' );
include_once( 'saetv2.ex.class.php' );
include_once( 'saestorage.class.php' );

$action = $_REQUEST['action'];

if ('sendStatuses' == $action) {
	$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
	mysql_query("SET NAMES 'UTF8'");
	
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db(MYSQL_DB, $con);
	
	/*
	$sql = 'select id, user_id, status_text, status_picture_name, status_picture_path, access_token from timer_to_be_sent_statuses
		where \'2013-07-25 14:38\' = date_format(status_datetime, \'%Y-%m-%d %H:%i\')';
	*/
	
	$sql = 'select id, user_id, status_text, status_picture_path, access_token from timer_to_be_sent_statuses
		where date_format(now(), \'%Y-%m-%d %H:%i\') = date_format(status_datetime, \'%Y-%m-%d %H:%i\')';
	
	$result = mysql_query($sql);
	
	$tOAuthV2 = new SaeTOAuthV2(NULL, NULL);
	$tClientV2 = new SaeTClientV2($tOAuthV2);
	
	$successfulCount = 0;
	$failedCount = 0;
	
	while ($row = mysql_fetch_array($result)) {
		$id = $row['id'];
		$userId = $row['user_id'];
		$statusText = $row['status_text'];
		$statusPictureName = $row['status_picture_name'];
		$statusPicturePath = $row['status_picture_path'];
		$accessToken = $row['access_token'];
		
		$tOAuthV2->access_token = $accessToken;
		
		if ($statusPicturePath != '') {
			$response = $tClientV2->upload($statusText, $statusPicturePath);
		} else {
			$response = $tClientV2->update($statusText);
		}
			
		if (!isset($response['error']) && !isset($response['error_code'])) {
			$statusId = $response['idstr'];
			$statusText = $response['text'];
				
			$statusPicturePath = NULL;
				
			if (isset($response['original_pic'])) {
				$statusPicturePath = $response['original_pic'];
			}
				
			$statusDateTime = $response['created_at'];
				
			$sql = 'insert into timer_sent_statuses (user_id, status_id, status_text, status_picture_name, status_picture_path, status_datetime)
				values (\'' . $userId . '\', \'' . $statusId . '\', \'' . $statusText . '\', \'' . 
				$statusPictureName . '\', \'' . $statusPicturePath . '\', \'' . 
				date('Y-m-d H:i:s', strtotime($statusDateTime)) . '\')';
				
			mysql_query($sql);
			
			$successfulCount++;
		} else {
			$failedCount++;
		}
		
		$sql = 'delete from timer_to_be_sent_statuses where id = ' . $id;
			
		mysql_query($sql);
	}
	
	$message = 'sent_statuses, successful ' . $successfulCount . ', failed ' . $failedCount . '.';
	echo $message;
	
	$sql = 'insert into timer_sent_statuses_logs (message, created_datetime)
		values (\'' . $message . '\', now())';
	mysql_query($sql);
	
	mysql_close($con);
} else if ('cleanPictures' == $action) {
	$storage = new SaeStorage(ACCESS_KEY, SECRET_KEY, STORE_HOST, APP_NAME, CDN_ENABLED);
	
	//$storage->delete(DOMAIN_TIMER, $pictureName);
	
	echo json_encode($storage->getList(DOMAIN_TIMER));
}
?>