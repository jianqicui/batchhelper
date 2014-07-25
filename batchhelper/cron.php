<?php
include_once( 'storage.php' );
include_once( 'mysql.php' );
include_once( 'saetv2.ex.class.php' );
include_once( 'saestorage.class.php' );

$storage = new SaeStorage();

$action = $_REQUEST['action'];

$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
mysql_query("SET NAMES 'UTF8'");

if (!$con) {
	die('Could not connect: ' . mysql_error());
}

mysql_select_db(MYSQL_DB, $con);

if ('sendStatuses' == $action) {
	/*
	$sql = 'select id, user_id, status_text, status_picture_name, status_picture_path, access_token from timer_tobesent_statuses
	where \'2013-07-25 14:38\' >= date_format(status_datetime, \'%Y-%m-%d %H:%i\')';
	*/

	$sql = 'select id, user_id, status_text, status_picture_name, status_picture_path, access_token from timer_tobesent_statuses
		where date_format(now(), \'%Y-%m-%d %H:%i\') >= date_format(status_datetime, \'%Y-%m-%d %H:%i\')';

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
				values (\'' . $userId . '\', \'' . $statusId . '\', \'' . mysql_escape_string($statusText) . '\', \'' .
				$statusPictureName . '\', \'' . $statusPicturePath . '\', \'' .
				date('Y-m-d H:i:s', strtotime($statusDateTime)) . '\')';

			mysql_query($sql);

			$successfulCount++;
		} else {
			$failedCount++;
		}

		$sql = 'delete from timer_tobesent_statuses where id = ' . $id;
			
		mysql_query($sql);
	}

	$message = 'sent statuses, successful ' . $successfulCount . ', failed ' . $failedCount . '.';
	echo $message;
} else if ('cleanPictures' == $action) {
	$pictureNames = $storage->getList(DOMAIN_TIMER);

	$cleanPicturesCount = 0;

	for ($i = 0; $i < count($pictureNames); $i++) {
		$pictureName = $pictureNames[$i];

		$sql = 'select count(*) as num from timer_tobesent_statuses where status_picture_path like \'%' . $pictureName . '\'';
		$result = mysql_query($sql);
		$row = mysql_fetch_array($result);
		$num = $row['num'];

		if ($num == 0) {
			$storage->delete(DOMAIN_TIMER, $pictureName);

			$cleanPicturesCount++;
		}
	}

	$message = 'clean pictures, clean ' . $cleanPicturesCount . '.';
	echo $message;
} else if ('collectStatuses' == $action) {
	$collectStatusesCount = 0;
	
	$domain = DOMAIN_BLOGS;
	
	$types = getTypes();
	
	for ($i = 0; $i < count($types); $i++) {
		$type = $types[$i];

		$id = $type['id'];
		$code = $type['code'];
		$statusIndex = $type['statusIndex'];

		$entrance = 'type' . $code . '/type' . $code . '_' . ($statusIndex + 1);
		
		$statusTextPicturePathes = $storage->read($domain, $entrance);
		
		if ($statusTextPicturePathes != false) {
			$statusTextPicturePathArray = explode(',', $statusTextPicturePathes);
			
			$statusTextPath = $statusTextPicturePathArray[0];
			$statusPicturePath = $statusTextPicturePathArray[1];
			
			$statusText = $storage->read($domain, $statusTextPath);
			
			if ($statusText != false) {
				$statusPicturePath = 'http://' .  APP_NAME . '-' .  $domain . '.stor.sinaapp.com/' . $statusPicturePath;
				
				$statusIndex++;
				
				$sql = 'insert into contentlib_type' . $code . '_statuses (id, status_text, status_picture_path) values (' . $statusIndex . ', \'' . mysql_escape_string($statusText) . '\', \'' . $statusPicturePath . '\')';
				
				mysql_query($sql);
				
				if ($statusIndex > 0) {
					$previousStatusTextPath = 'type' . $code . '/type' . $code . '_' . $statusIndex . '.txt';
					$previousEntrance = 'type' . $code . '/type' . $code . '_' . $statusIndex;
					
					$storage->delete($domain, $previousStatusTextPath);
					$storage->delete($domain, $previousEntrance);
				}
				
				if (updateTypeStatusIndex($id, $statusIndex)) {
					$collectStatusesCount++;
				}
			}
		}
	}
	
	$message = 'collect statuses, collect ' . $collectStatusesCount . '.';
	echo $message;
}

mysql_close($con);

function getTypes() {
	$types = array();

	$sql = 'select id, code, status_index from contentlib_types order by id';

	$result = mysql_query($sql);

	while ($row = mysql_fetch_array($result)) {
		$id = $row['id'];
		$code = $row['code'];
		$statusIndex = $row['status_index'];

		array_push($types, array(
				'id' => $id,
				'code' => $code,
				'statusIndex' => $statusIndex,
		));
	}

	return $types;
}

function updateTypeStatusIndex($id, $statusIndex) {
	$sql = 'update contentlib_types set status_index = ' . $statusIndex . ' where id = ' . $id;
	
	$result = mysql_query($sql);
	
	return $result;
}

?>