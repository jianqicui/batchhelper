<?php
include_once( 'storage.php' );
include_once( 'mysql.php' );
include_once( 'saetv2.ex.class.php' );
include_once( 'saestorage.class.php' );

session_start();

$tClientV2;

if (isset($_SESSION['saeTClientV2'])) {
	$tClientV2 = $_SESSION['saeTClientV2'];
} else {
	header('Location: index.php');

	exit;
}

$storage = new SaeStorage();

$action = $_REQUEST['action'];

if ('getRateLimit' == $action) {
	$response = getRateLimit($tClientV2);

	echo json_encode($response);
} else if ('queryFriends' == $action || 'queryFollowers' == $action) {
	$userId = NULL;

	if (isset($_REQUEST['userId'])) {
		$userId = $_REQUEST['userId'];
	}

	$userName = NULL;

	if (isset($_REQUEST['userName'])) {
		$userName = $_REQUEST['userName'];
	}

	$cursor = $_REQUEST['cursor'];
	$count = $_REQUEST['count'];

	if ('queryFriends' == $action) {
		$response = queryFriends($tClientV2, $userId, $userName, $cursor, $count);
	} else if ('queryFollowers' == $action) {
		$response = queryFollowers($tClientV2, $userId, $userName, $cursor, $count);
	}

	echo $response;
} else if ('destroyFriendships' == $action) {
	$userIds = explode(',', $_REQUEST['userIds']);

	$response = destroyFriendships($tClientV2, $userIds);

	echo join(',', $response);
} else if ('createFriendships' == $action) {
	$userIds = explode(',', $_REQUEST['userIds']);

	$response = createFriendships($tClientV2, $userIds);

	echo join(',', $response);
} else if ('getEmotions' == $action) {
	$type = $_REQUEST['type'];
	
	$response = getEmotions($tClientV2, $type);
	
	echo json_encode($response);
} else if ('uploadPicture' == $action) {
	$fileElementName = $_REQUEST['fileElementName'];
	
	$response = uploadPicture($storage, $fileElementName);
	
	echo json_encode($response);
} else if ('saveStatus' == $action) {
	$userId = $_REQUEST['userId'];
	
	$text = $_REQUEST['text'];
	
	$pictureName = NULL;
	
	if (isset($_REQUEST['pictureName'])) {
		$pictureName = $_REQUEST['pictureName'];
	}
	
	$picturePath = NULL;
	
	if (isset($_REQUEST['picturePath'])) {
		$picturePath = $_REQUEST['picturePath'];
	}
	
	$datetime = $_REQUEST['datetime'];
	
	$response = saveStatus($tClientV2, $userId, $text, $pictureName, $picturePath, $datetime);
	
	echo json_encode($response);
} else if ('sendStatus' == $action) {
	$userId = $_REQUEST['userId'];
	$text = $_REQUEST['text'];
	
	$pictureName = NULL;
	
	if (isset($_REQUEST['pictureName'])) {
		$pictureName = $_REQUEST['pictureName'];
	}
	
	$picturePath = NULL;
	
	if (isset($_REQUEST['picturePath'])) {
		$picturePath = $_REQUEST['picturePath'];
	}
	
	$response = sendStatus($tClientV2, $userId, $text, $pictureName, $picturePath);
	
	echo json_encode($response);
} else if ('getStatuses' == $action) {
	$userId = $_REQUEST['userId'];
	
	$response = getStatuses($userId);
	
	echo json_encode($response);
} else if ('deleteToBeSentStatus' == $action) {
	$id = $_REQUEST['id'];
	
	$response = deleteToBeSentStatus($id);
	
	echo json_encode($response);
} else if ('updateToBeSentStatus' == $action) {
	$id = $_REQUEST['id'];
	$userId = $_REQUEST['userId'];
	$text = $_REQUEST['text'];
	
	$pictureName = NULL;
	
	if (isset($_REQUEST['pictureName'])) {
		$pictureName = $_REQUEST['pictureName'];
	}
	
	$picturePath = NULL;
	
	if (isset($_REQUEST['picturePath'])) {
		$picturePath = $_REQUEST['picturePath'];
	}
	
	$datetime = $_REQUEST['datetime'];
	
	$response = updateToBeSentStatus($id, $userId, $text, $pictureName, $picturePath, $datetime);
	
	echo json_encode($response);
} else if ('sendToBeSentStatus' == $action) {
	$id = $_REQUEST['id'];
	$userId = $_REQUEST['userId'];
	$text = $_REQUEST['text'];
	
	$pictureName = NULL;
	
	if (isset($_REQUEST['pictureName'])) {
		$pictureName = $_REQUEST['pictureName'];
	}
	
	$picturePath = NULL;
	
	if (isset($_REQUEST['picturePath'])) {
		$picturePath = $_REQUEST['picturePath'];
	}
	
	$response = sendToBeSentStatus($tClientV2, $id, $userId, $text, $pictureName, $picturePath);
	
	echo json_encode($response);
} else if ('deleteSentStatus' == $action) {
	$id = $_REQUEST['id'];
	
	$response = deleteSentStatus($id);
	
	echo json_encode($response);
} else if ('deleteStatus' == $action) {
	$id = $_REQUEST['id'];
	$statusId = $_REQUEST['statusId'];
	
	$response = deleteStatus($tClientV2, $id, $statusId);
	
	echo json_encode($response);
} else if ('uploadStatus' == $action) {
	$text = $_REQUEST['text'];
	
	$picturePath = NULL;
	
	if (isset($_REQUEST['picturePath'])) {
		$picturePath = $_REQUEST['picturePath'];
	}
	
	$response = uploadStatus($tClientV2, $text, $picturePath);
	
	echo json_encode($response);
} else if ('getTypes' == $action) {
	$response = getTypes();
	
	echo json_encode($response);
} else if ('getStatusesByTypeCode' == $action) {
	$typeCode = $_REQUEST['typeCode'];
	
	$page = $_REQUEST['page'];
	$count = $_REQUEST['count'];
	
	$response = getStatusesByTypeCode($typeCode, $page, $count);
	
	echo json_encode($response);
} else if ('queryStatuses' == $action) {
	$userId = $_REQUEST['userId'];
	
	$page = $_REQUEST['page'];
	$count = $_REQUEST['count'];
	
	$response = queryStatuses($tClientV2, $userId, $page, $count);
	
	echo json_encode($response);
} else if ('deleteStatuses' == $action) {
	$statusesIds = NULL;
	
	if (isset($_REQUEST['statusesIds'])) {
		$statusesIds = explode(',', $_REQUEST['statusesIds']);
	}
	
	$response = deleteStatuses($tClientV2, $statusesIds);
	
	echo join(',', $response);
} else if ('queryComments' == $action) {
	$page = $_REQUEST['page'];
	$count = $_REQUEST['count'];

	$response = queryComments($tClientV2, $page, $count);

	echo json_encode($response);
} else if ('deleteComments' == $action) {
	$commentsIds = NULL;
	
	if (isset($_REQUEST['commentsIds'])) {
		$commentsIds = explode(',', $_REQUEST['commentsIds']);
	}
	
	$response = deleteComments($tClientV2, $commentsIds);
	
	echo join(',', $response);
} else if ('queryFavs' == $action) {
	$page = $_REQUEST['page'];
	$count = $_REQUEST['count'];

	$response = queryFavs($tClientV2, $page, $count);

	echo json_encode($response);
} else if ('deleteFavs' == $action) {
	$favsIds = NULL;
	
	if (isset($_REQUEST['favsIds'])) {
		$favsIds = explode(',', $_REQUEST['favsIds']);
	}
	
	$response = deleteFavs($tClientV2, $favsIds);
	
	echo join(',', $response);
} else if ('queryDeadFriendsIds' == $action) {
	$userId = $_REQUEST['userId'];
	
	$response = queryDeadFriendsIds($tClientV2, $userId);
	
	echo json_encode($response);
} else if ('queryDeadFollowersIds' == $action) {
	$userId = $_REQUEST['userId'];
	
	$response = queryDeadFollowersIds($tClientV2, $userId);
	
	echo json_encode($response);
}

function minIntValue($intArray) {
	$minIntValue = $intArray[0];

	for ($i = 1; $i < count($intArray); $i++) {
		$intValue = $intArray[$i];

		if ($minIntValue > $intValue) {
			$minIntValue = $intValue;
		}
	}

	return $minIntValue;
}

//Get Rate Limit
function getRateLimit($tClientV2) {
	$response = $tClientV2->rate_limit_status();

	$remainingHourlyCreateFriendshipsLimit = 0;
	$hourlyCreateFriendshipsLimit = 0;

	$remainingDailyCreateFriendshipsLimit = 0;
	$dailyCreateFriendshipsLimit = 0;
	
	$remainingHourlyUserHitsLimit = 0;
	$hourlyUserHitsLimit = 0;
	
	$remainingHourlyIpHitsLimit = 0;
	$hourlyIpHitsLimit = 0;
	
	$resetDateTime = '';
	
	if (!isset($response['error']) && !isset($response['error_code'])) {
		$apiRateLimits = $response['api_rate_limits'];
		
		for ($i = 0; $i < count($apiRateLimits); $i++) {
			$apiRateLimit = $apiRateLimits[$i];
		
			if ('/friendships/create' == $apiRateLimit['api']) {
				if ('HOURS' == $apiRateLimit['limit_time_unit']) {
					$remainingHourlyCreateFriendshipsLimit = $apiRateLimit['remaining_hits'];
					$hourlyCreateFriendshipsLimit = $apiRateLimit['limit'];
				} else if ('DAYS' == $apiRateLimit['limit_time_unit']) {
					$remainingDailyCreateFriendshipsLimit = $apiRateLimit['remaining_hits'];
					$dailyCreateFriendshipsLimit = $apiRateLimit['limit'];
				}
			}
		}
		
		$remainingHourlyUserHitsLimit = $response['remaining_user_hits'];
		$hourlyUserHitsLimit = $response['user_limit'];
		
		$remainingHourlyIpHitsLimit = $response['remaining_ip_hits'];
		$hourlyIpHitsLimit = $response['ip_limit'];
		
		$resetDateTime = $response['reset_time'];
	}

	$rateLimit = array(
			'remainingHourlyCreateFriendshipsLimit' => $remainingHourlyCreateFriendshipsLimit,
			'hourlyCreateFriendshipsLimit' => $hourlyCreateFriendshipsLimit,

			'remainingDailyCreateFriendshipsLimit' => $remainingDailyCreateFriendshipsLimit,
			'dailyCreateFriendshipsLimit' => $dailyCreateFriendshipsLimit,

			'remainingHourlyUserHitsLimit' => $remainingHourlyUserHitsLimit,
			'hourlyUserHitsLimit' => $hourlyUserHitsLimit,

			'remainingHourlyIpHitsLimit' => $remainingHourlyIpHitsLimit,
			'hourlyIpHitsLimit' => $hourlyIpHitsLimit,

			'resetDateTime' => $resetDateTime,
	);

	return $rateLimit;
}

function convertFriendshipsToJson($response) {
	$nextCursor = 0;
	$totalNumber = 0;
	
	$users = array();
	
	if (!isset($response['error']) && !isset($response['error_code'])) {
		$nextCursor = $response['next_cursor'];
		$totalNumber = $response['total_number'];
		
		for ($i = 0; $i < count($response['users']); $i++) {
			$user = $response['users'][$i];
		
			$id = $user['idstr'];
			$screenName = $user['screen_name'];
			$friendsCount = $user['friends_count'];
			$followersCount = $user['followers_count'];
			$statusesCount = $user['statuses_count'];
			$profileImageUrl = $user['profile_image_url'];
		
			$users[$i] = array(
					'id' => $id,
					'screenName' => $screenName,
					'friendsCount' => $friendsCount,
					'followersCount' => $followersCount,
					'statusesCount' => $statusesCount,
					'profileImageUrl' => $profileImageUrl,
			);
		}
	}

	return json_encode(array(
			'nextCursor' => $nextCursor,
			'totalNumber' => $totalNumber,
			'users' => $users,
	));
}

//Query Friends
function queryFriends($tClientV2, $userId, $userName, $cursor, $count) {
	$response;
	
	if (isset($userId)) {
		$response = $tClientV2->friends_by_id($userId, $cursor, $count);
	} else if (isset($userName)) {
		$response = $tClientV2->friends_by_name($userName, $cursor, $count);
	}

	return convertFriendshipsToJson($response);
}

//Query Followers
function queryFollowers($tClientV2, $userId, $userName, $cursor, $count) {
	$response;
	
	if (isset($userId)) {
		$response = $tClientV2->followers_by_id($userId, $cursor, $count);
	} else if (isset($userName)) {
		$response = $tClientV2->followers_by_name($userName, $cursor, $count);
	}
	
	return convertFriendshipsToJson($response);
}

//Destroy Friendships
function destroyFriendships($tClientV2, $userIds) {
	$destroyedFriendshipIds = array();

	for ($i = 0; $i < count($userIds); $i++) {
		$userId = $userIds[$i];

		$response = $tClientV2->unfollow_by_id($userId);

		if (!isset($response['error']) && !isset($response['error_code'])) {
			array_push($destroyedFriendshipIds, $response['id']);
		}
	}

	return $destroyedFriendshipIds;
}

//Create Friendships
function createFriendships($tClientV2, $userIds) {
	$createdFriendshipIds = array();

	for ($i = 0; $i < count($userIds); $i++) {
		$userId = $userIds[$i];

		$response = $tClientV2->follow_by_id($userId);

		if (!isset($response['error']) && !isset($response['error_code'])) {
			array_push($createdFriendshipIds, $response['id']);
		}
	}

	return $createdFriendshipIds;
}

//Get Emotions
function getEmotions($tClientV2, $type) {
	$response = $tClientV2->emotions($type, 'cnname');
	
	$emotions = array();
	
	if (!isset($response['error']) && !isset($response['error_code'])) {
		$lastCategory;
		$hotInfo;
		$commonInfo;
		
		$length = count($response);
		
		for ($i = 0; $i < $length; $i++) {
			$emotion = $response[$i];
		
			$category = $emotion['category'];
			$value = $emotion['value'];
			$icon = $emotion['icon'];
			$hot = $emotion['hot'];
		
			if ($i == 0) {
				$lastCategory = $category;
					
				$hotInfo = array();
				$commonInfo = array();
			}
		
			if ($lastCategory != $category) {
				array_push($emotions, array(
						'category' => $lastCategory,
						'info' => array(
								'hotInfo' => $hotInfo,
								'commonInfo' => $commonInfo,
						),
				));
					
				$lastCategory = $category;
				$hotInfo = array();
				$commonInfo = array();
			}
		
			$info = array(
					'name' => substr($value, 1, (strlen($value) - 2)),
					'value' => $value,
					'icon' => $icon,
					'hot' => $hot,
			);
		
			if ($hot) {
				array_push($hotInfo, $info);
			} else {
				array_push($commonInfo, $info);
			}
		
			if ($i == ($length - 1)) {
				array_push($emotions, array(
						'category' => $lastCategory,
						'info' => array(
								'hotInfo' => $hotInfo,
								'commonInfo' => $commonInfo,
						),
				));
			}
		}
	}
	
	return $emotions;
}

//Get Thumbnail Picture Size
function getPictureThumbnailSize($width, $height) {
	$maxWidth = 120;
	$maxHeight = 120;
	
	$thumbnailWidth;
	$thumbnailHeight;
	
	if ($width >$maxWidth || $height > $maxHeight) {
	    if($width >= $height) {
	        $thumbnailWidth = $maxWidth;
	        $thumbnailHeight = $thumbnailWidth * $height / $width;
	    } else {
	        $thumbnailHeight = $maxHeight;
	        $thumbnailWidth = $thumbnailHeight * $width / $height;
	    }
	} else {
		$thumbnailWidth = $width;
	    $thumbnailHeight = $height;
	}
	
	return array(
			'thumbnailWidth' => $thumbnailWidth,
			'thumbnailHeight' => $thumbnailHeight,
	);
}

//Generate Serial Number
function generateSerialNumber() {
	$date = date('Ymd');
	$rand = rand(1000000, 9999999);
	$time = mb_substr(time(), 5, 5, 'utf-8');
	$serialNumber = $date . $time . $rand;
	return $serialNumber;
}

//Save Picture
function savePicture($storage, $fileTmpName, $pictureName) {
	return $storage->upload(DOMAIN_TIMER, $pictureName, $fileTmpName);
}

//Upload Picture
function uploadPicture($storage, $fileElementName) {
	$fileName = $_FILES[$fileElementName]['name'];
	$fileType = $_FILES[$fileElementName]['type'];
	$fileSize = $_FILES[$fileElementName]['size'];
	$fileTmpName = $_FILES[$fileElementName]["tmp_name"];
	$fileError = $_FILES[$fileElementName]["error"];
	
	if ($fileError > 0) {
		return array(
				'error' => 'upload file failed',
		);
	} else if ('image/jpeg' != $fileType && 'image/pjpeg' != $fileType && 
			'image/png' != $fileType && 'image/x-png' != $fileType && 
			'image/gif' != $fileType) {
		return array(
				'error' => 'bad format',
		);
	} else if ($fileSize >= (1024 * 1024)) {
		return array(
				'error' => 'too large size',
		);
	}

	$picturePath;
	$pictureThumbnailSize;
	
	if ('image/jpeg' == $fileType || 'image/pjpeg' == $fileType) {
		$picturePath = savePicture($storage, $fileTmpName, generateSerialNumber() . '.jpg');
		
		if ($picturePath == FALSE) {
			return array(
					'error' => 'upload file failed',
			);
		}
		
		$image = imagecreatefromjpeg($picturePath);
		$pictureThumbnailSize = getPictureThumbnailSize(imagesx($image), imagesy($image));
	} else if ('image/png' == $fileType || 'image/x-png' == $fileType) {
		$picturePath = savePicture($storage, $fileTmpName, generateSerialNumber() . '.png');
		
		if ($picturePath == FALSE) {
			return array(
					'error' => 'upload file failed',
			);
		}
		
		$image = imagecreatefrompng($picturePath);
		$pictureThumbnailSize = getPictureThumbnailSize(imagesx($image), imagesy($image));
	} else if ('image/gif' == $fileType) {
		$picturePath = savePicture($storage, $fileTmpName, generateSerialNumber() . '.gif');
		
		if ($picturePath == FALSE) {
			return array(
					'error' => 'upload file failed',
			);
		}
		
		$image = imagecreatefromgif($picturePath);
		$pictureThumbnailSize = getPictureThumbnailSize(imagesx($image), imagesy($image));
	}
	
	return array(
			'pictureName' => $fileName,
			'picturePath' => $picturePath,
			'pictureThumbnailWidth' => $pictureThumbnailSize['thumbnailWidth'],
			'pictureThumbnailHeight' => $pictureThumbnailSize['thumbnailHeight'],
	);
}

//Assemble To Be Sent Status
function assembleToBeSentStatus($id, $statusText, $statusPictureName, $statusPicturePath, $statusDateTime) {
	if ($statusPictureName != '' && $statusPicturePath != '') {
		$imageSize = getimagesize($statusPicturePath);
		$pictureThumbnailSize = getPictureThumbnailSize($imageSize[0], $imageSize[1]);
	
		return array(
					'id' => $id,
					'statusText' => $statusText,
					'statusPictureName' => $statusPictureName,
					'statusPicturePath' => $statusPicturePath,
					'statusPictureThumbnailWidth' => $pictureThumbnailSize['thumbnailWidth'],
					'statusPictureThumbnailHeight' => $pictureThumbnailSize['thumbnailHeight'],
					'statusDateTime' => $statusDateTime,
			);
	} else {
		return array(
					'id' => $id,
					'statusText' => $statusText,
					'statusDateTime' => $statusDateTime,
			);
	}
}

//Save Status
function saveStatus($tClientV2, $userId, $text, $pictureName, $picturePath, $datetime) {
	$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
	mysql_query("SET NAMES 'UTF8'");
	
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db(MYSQL_DB, $con);
	
	$accessToken = $tClientV2->get_oauth()->access_token;
	
	$sql = 'insert into timer_tobesent_statuses (
		user_id, status_text, status_picture_name, status_picture_path, status_datetime, access_token)
		values (\'' . $userId . '\', \'' . mysql_escape_string($text). '\', \'' . 
		$pictureName . '\', \'' . $picturePath. '\', \'' . $datetime . '\', \'' . $accessToken . '\')';
	
	$saveStatusResponse;
	
	if (mysql_query($sql)) {
		$saveStatusResponse = assembleToBeSentStatus(mysql_insert_id(), $text, $pictureName, $picturePath, $datetime);
	} else {
		$saveStatusResponse = array(
				'error' => 'save status failed',
		);
	}
	
	mysql_close($con);
	
	return $saveStatusResponse;
}

//Assemble Sent Statuses
function assembleSentStatus($id, $statusId, $statusText, $statusPictureName, $statusPicturePath, $statusDateTime) {
	if ($statusPictureName != '' && $statusPicturePath != '') {
		$imageSize = getimagesize($statusPicturePath);
		$pictureThumbnailSize = getPictureThumbnailSize($imageSize[0], $imageSize[1]);
	
		return array(
					'id' => $id,
					'statusId' => $statusId,
					'statusText' => $statusText,
					'statusPictureName' => $statusPictureName,
					'statusPicturePath' => $statusPicturePath,
					'statusPictureThumbnailWidth' => $pictureThumbnailSize['thumbnailWidth'],
					'statusPictureThumbnailHeight' => $pictureThumbnailSize['thumbnailHeight'],
					'statusDateTime' => $statusDateTime,
			);
	} else {
		return array(
					'id' => $id,
					'statusId' => $statusId,
					'statusText' => $statusText,
					'statusDateTime' => $statusDateTime,
			);
	}
}

//Send Status
function sendStatus($tClientV2, $userId, $text, $pictureName, $picturePath) {
	$response;
	
	if (isset($picturePath)) {
		$response = $tClientV2->upload($text, $picturePath);
	} else {
		$response = $tClientV2->update($text);
	}
	
	$sendStatusResponse;
	
	if (!isset($response['error']) && !isset($response['error_code'])) {
		$statusId = $response['idstr'];
		$statusText = $response['text'];
		
		$statusPicturePath = NULL;
		
		if (isset($response['original_pic'])) {
			$statusPicturePath = $response['original_pic'];
		}
		
		$statusDateTime = $response['created_at'];
		$statusDateTime = date('Y-m-d H:i:s', strtotime($statusDateTime));
		
		$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
		mysql_query("SET NAMES 'UTF8'");
		
		if (!$con) {
			die('Could not connect: ' . mysql_error());
		}
		
		mysql_select_db(MYSQL_DB, $con);
		
		$sql = 'insert into timer_sent_statuses (
			user_id, status_id, status_text, status_picture_name, status_picture_path, status_datetime)
			values (\'' . $userId . '\', \'' . $statusId . '\', \'' . mysql_escape_string($statusText) . '\', \'' . 
			$pictureName . '\', \'' . $statusPicturePath . '\', \'' . $statusDateTime . '\')';
		
		if (mysql_query($sql)) {
			$sendStatusResponse = assembleSentStatus(mysql_insert_id(), $statusId, $statusText, 
					$pictureName, $statusPicturePath, $statusDateTime);
		} else {
			$sendStatusResponse = array(
					'error' => 'send status failed',
			);
		}
	} else {
		$sendStatusResponse = array(
				'error' => 'send status failed',
		);
	}
	
	mysql_close($con);
	
	return $sendStatusResponse;
}

//Get Statuses
function getStatuses($userId) {
	$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
	mysql_query("SET NAMES 'UTF8'");
	
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db(MYSQL_DB, $con);
	
	//To Be Sent Statuses
	$sql = 'select id, status_text, status_picture_name, status_picture_path, status_datetime from timer_tobesent_statuses
		where user_id = \'' . $userId . '\'';
	
	$result = mysql_query($sql);
	
	$toBeSentStatuses = array();
	
	while ($row = mysql_fetch_array($result)) {
		$id = $row['id'];
		$statusText = $row['status_text'];
		$statusPictureName = $row['status_picture_name'];
		$statusPicturePath = $row['status_picture_path'];
		$statusDateTime = $row['status_datetime'];
	
		array_push($toBeSentStatuses, assembleToBeSentStatus($id, $statusText, 
				$statusPictureName, $statusPicturePath, $statusDateTime));
	}
	
	//Sent Statuses
	$sql = 'select id, status_id, status_text, status_picture_name, status_picture_path, status_datetime from timer_sent_statuses
		where user_id = \'' . $userId . '\'';
	
	$result = mysql_query($sql);
	
	$sentStatuses = array();

	while ($row = mysql_fetch_array($result)) {
		$id = $row['id'];
		$statusId = $row['status_id'];
		$statusText = $row['status_text'];
		$statusPictureName = $row['status_picture_name'];
		$statusPicturePath = $row['status_picture_path'];
		$statusDateTime = $row['status_datetime'];

		array_push($sentStatuses, assembleSentStatus($id, $statusId, $statusText, 
				$statusPictureName, $statusPicturePath, $statusDateTime));
	}
	
	mysql_close($con);
	
	return array(
			'toBeSentStatuses' => $toBeSentStatuses,
			'sentStatuses' => $sentStatuses,
	);
}

//Delete To Be Sent Status
function deleteToBeSentStatus($id) {
	$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
	mysql_query("SET NAMES 'UTF8'");
	
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db(MYSQL_DB, $con);
	
	$sql = 'delete from timer_tobesent_statuses where id = ' . $id;
	
	$deleteToBeSentStatusResponse;
	
	if (mysql_query($sql)) {
		$deleteToBeSentStatusResponse = '';
	} else {
		$deleteToBeSentStatusResponse = array(
				'error' => 'delete To Be Sent Status failed',
		);
	}
	
	mysql_close($con);
	
	return $deleteToBeSentStatusResponse;
}

//Update To Be Sent Status
function updateToBeSentStatus($id, $userId, $text, $pictureName, $picturePath, $datetime) {
	$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
	mysql_query("SET NAMES 'UTF8'");
	
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db(MYSQL_DB, $con);
	
	$sql = 'update timer_tobesent_statuses 
		set user_id = \'' . $userId . '\', status_text = \'' . mysql_escape_string($text) . '\', 
		status_picture_name = \'' . $pictureName . '\', status_picture_path = \'' . $picturePath . '\', 
		status_datetime = \'' . $datetime . '\'
		where id = ' . $id;
	
	$updateStatusResponse;
	
	if (mysql_query($sql)) {
		$updateStatusResponse = assembleToBeSentStatus($id, $text, $pictureName, $picturePath, $datetime);
	} else {
		$updateStatusResponse = array(
				'error' => 'update To Be Sent Status failed',
		);
	}
	
	mysql_close($con);
	
	return $updateStatusResponse;
}

//Send To Be Sent Status
function sendToBeSentStatus($tClientV2, $id, $userId, $text, $pictureName, $picturePath) {
	$response;
	
	if (isset($picturePath)) {
		$response = $tClientV2->upload($text, $picturePath);
	} else {
		$response = $tClientV2->update($text);
	}
	
	$sendToBeSentStatusResponse;
	
	if (!isset($response['error']) && !isset($response['error_code'])) {
		$statusId = $response['idstr'];
		$statusText = $response['text'];
	
		$statusPicturePath = NULL;
	
		if (isset($response['original_pic'])) {
			$statusPicturePath = $response['original_pic'];
		}
	
		$statusDateTime = $response['created_at'];
		$statusDateTime = date('Y-m-d H:i:s', strtotime($statusDateTime));
	
		$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
		mysql_query("SET NAMES 'UTF8'");
	
		if (!$con) {
			die('Could not connect: ' . mysql_error());
		}
	
		mysql_select_db(MYSQL_DB, $con);
	
		$sql = 'insert into timer_sent_statuses (
			user_id, status_id, status_text, status_picture_name, status_picture_path, status_datetime)
			values (\'' . $userId . '\', \'' . $statusId . '\', \'' . mysql_escape_string($statusText) . '\', \'' .
			$pictureName . '\', \'' . $statusPicturePath . '\', \'' . $statusDateTime . '\')';
	
		if (mysql_query($sql)) {
			$sentStatusId = mysql_insert_id();
			
			$sql = 'delete from timer_tobesent_statuses where id = ' . $id;
			
			if (mysql_query($sql)) {
				$sendToBeSentStatusResponse = assembleSentStatus($sentStatusId, $statusId, $statusText,
						$pictureName, $statusPicturePath, $statusDateTime);
			} else {
				$sendToBeSentStatusResponse = array(
						'error' => 'send To Be Sent Status failed',
				);
			}
		} else {
			$sendToBeSentStatusResponse = array(
					'error' => 'send To Be Sent Status failed',
			);
		}
	} else {
		$sendToBeSentStatusResponse = array(
				'error' => 'send To Be Sent Status failed',
		);
	}
	
	mysql_close($con);
	
	return $sendToBeSentStatusResponse;
}

//Delete Sent Status
function deleteSentStatus($id) {
	$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
	mysql_query("SET NAMES 'UTF8'");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db(MYSQL_DB, $con);

	$sql = 'delete from timer_sent_statuses where id = ' . $id;

	$deleteSentStatusResponse;

	if (mysql_query($sql)) {
		$deleteSentStatusResponse = '';
	} else {
		$deleteSentStatusResponse = array(
				'error' => 'delete Sent Status failed',
		);
	}

	mysql_close($con);

	return $deleteSentStatusResponse;
}

//Delete Status
function deleteStatus($tClientV2, $id, $statusId) {
	$response = $tClientV2->delete($statusId);

	$deleteStatusResponse;

	if (!isset($response['error']) && !isset($response['error_code'])) {
		$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
		mysql_query("SET NAMES 'UTF8'");

		if (!$con) {
			die('Could not connect: ' . mysql_error());
		}

		mysql_select_db(MYSQL_DB, $con);

		$sql = 'delete from timer_sent_statuses where id = ' . $id;

		if (mysql_query($sql)) {
			$deleteStatusResponse = '';
		} else {
			$deleteStatusResponse = array(
					'error' => 'delete Status failed',
			);
		}
	} else {
		$deleteStatusResponse = array(
				'error' => 'delete Status failed',
		);
	}

	mysql_close($con);

	return $deleteStatusResponse;
}

//Upload Status
function uploadStatus($tClientV2, $text, $picturePath) {
	$response;
	
	if (isset($picturePath)) {
		$response = $tClientV2->upload($text, $picturePath);
	} else {
		$response = $tClientV2->update($text);
	}
	
	return $response;
}

//Get Types
function getTypes() {
	$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
	mysql_query("SET NAMES 'UTF8'");
	
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db(MYSQL_DB, $con);
	
	$sql = 'select code, name from contentlib_types order by id';
	
	$result = mysql_query($sql);
	
	$types = array();
	
	while ($row = mysql_fetch_array($result)) {
		$code = $row['code'];
		$name = $row['name'];
	
		array_push($types, array(
				'code' => $code,
				'name' => $name,
		));
	}
	
	mysql_close($con);
	
	return $types;
}

//Get Statuses By Type Code
function getStatusesByTypeCode($typeCode, $page, $count) {
	$con = mysql_connect(MYSQL_HOST . ':' . MYSQL_PORT, MYSQL_USER, MYSQL_PASS);
	mysql_query("SET NAMES 'UTF8'");
	
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db(MYSQL_DB, $con);
	
	$sql = 'select id, status_text, status_picture_path from contentlib_type' . $typeCode . '_statuses order by id desc limit ' . $page * $count . ', ' . $count;
	
	$result = mysql_query($sql);
	
	$statuses = array();
	
	while ($row = mysql_fetch_array($result)) {
		$id = $row['id'];
		$statusText = $row['status_text'];
		$statusPicturePath = $row['status_picture_path'];
	
		array_push($statuses, array(
				'statusId' => $id,
				'statusText' => $statusText,
				'statusPicturePath' => $statusPicturePath,
		));
	}
	
	$sql = 'select count(*) as num from contentlib_type' . $typeCode . '_statuses';
	
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$totalNumber = $row['num'];
	
	mysql_close($con);
	
	return array(
			'statuses' => $statuses,
			'totalNumber' => $totalNumber,
	);
}

//Query Statuses
function queryStatuses($tClientV2, $userId, $page, $count) {
	$response = $tClientV2->user_timeline_by_id(NUll, $userId, $page, $count);

	$statuses = array();
	$totalNumber = 0;

	if (!isset($response['error']) && !isset($response['error_code'])) {
		for ($i = 0; $i < count($response['statuses']); $i++) {
			$status = $response['statuses'][$i];

			$id = $status['idstr'];
			$text = $status['text'];
			$thumbnailPic = NULL;

			if (isset($status['thumbnail_pic'])) {
				$thumbnailPic = $status['thumbnail_pic'];
			}

			$statuses[$i] = array(
					'id' => $id,
					'text' => $text,
					'thumbnailPic' => $thumbnailPic,
			);
		}

		$totalNumber = $response['total_number'];
	}

	return array(
			'statuses' => $statuses,
			'totalNumber' => $totalNumber,
	);
}

//Delete Statuses
function deleteStatuses($tClientV2, $statusesIds) {
	$deletedStatusesIds = array();

	for ($i = 0; $i < count($statusesIds); $i++) {
		$statusId = $statusesIds[$i];

		$response = $tClientV2->delete($statusId);

		if (!isset($response['error']) && !isset($response['error_code'])) {
			array_push($deletedStatusesIds, $response['idstr']);
		}
	}

	return $deletedStatusesIds;
}

//Query Comments
function queryComments($tClientV2, $page, $count) {
	$response = $tClientV2->comments_by_me($page, $count);

	$comments = array();
	$totalNumber = 0;

	if (!isset($response['error']) && !isset($response['error_code'])) {
		for ($i = 0; $i < count($response['comments']); $i++) {
			$comment = $response['comments'][$i];

			$replyStatus;
				
			$id = $comment['idstr'];
			$text = $comment['text'];
				
			$status = $comment['status'];
			$statusUser = $status['user'];
				
			$statusId = $status['idstr'];
			$statusUserId = $statusUser['idstr'];
				
			$commentedText;
				
			$commentedUserId;
			$commentedUserName;
			$commentedUserProfileImageUrl;
				
			if (!isset($comment['reply_comment'])) {
				$replyStatus = TRUE;

				$commentedText = $status['text'];

				$commentedUserId = $statusUser['idstr'];
				$commentedUserName = $statusUser['screen_name'];
				$commentedUserProfileImageUrl = $statusUser['profile_image_url'];
			} else {
				$replyStatus = FALSE;

				$repliedComment = $comment['reply_comment'];

				$commentedText = $repliedComment['text'];

				$repliedCommentUser = $repliedComment['user'];

				$commentedUserId = $repliedCommentUser['idstr'];
				$commentedUserName = $repliedCommentUser['screen_name'];
				$commentedUserProfileImageUrl = $repliedCommentUser['profile_image_url'];
			}
				
			$comments[$i] = array(
					'replyStatus' => $replyStatus,
					'id' => $id,
					'text' => $text,
					'statusId' => $statusId,
					'statusUserId' => $statusUserId,
					'commentedText' => $commentedText,
					'commentedUserId' => $commentedUserId,
					'commentedUserName' => $commentedUserName,
					'commentedUserProfileImageUrl' => $commentedUserProfileImageUrl,
			);
		}

		$totalNumber = $response['total_number'];
	}

	return array(
			'comments' => $comments,
			'totalNumber' => $totalNumber,
	);
}

//Delete Comments
function deleteComments($tClientV2, $commentsIds) {
	$deletedCommentsIds = array();

	for ($i = 0; $i < count($commentsIds); $i++) {
		$commentId = $commentsIds[$i];

		$response = $tClientV2->comment_destroy($commentId);

		if (!isset($response['error']) && !isset($response['error_code'])) {
			array_push($deletedCommentsIds, $response['idstr']);
		}
	}

	return $deletedCommentsIds;
}

//Query Favs
function queryFavs($tClientV2, $page, $count) {
	$response = $tClientV2->get_favorites($page, $count);

	$favs = array();
	$totalNumber = 0;

	if (!isset($response['error']) && !isset($response['error_code'])) {
		for ($i = 0; $i < count($response['favorites']); $i++) {
			$fav = $response['favorites'][$i];

			$status = $fav['status'];
			$id = $status['idstr'];
			$statusText = $status['text'];
				
			$statusThumbnailPic = NULL;
				
			if (isset($status['thumbnail_pic'])) {
				$statusThumbnailPic = $status['thumbnail_pic'];
			}
				
			$statusUser = $status['user'];
			$statusUserId = $statusUser['idstr'];
			$statusUserName = $statusUser['screen_name'];
			$statusUserProfileImageUrl = $statusUser['profile_image_url'];

			$favs[$i] = array(
					'id' => $id,
					'statusText' => $statusText,
					'statusThumbnailPic' => $statusThumbnailPic,
					'statusUserId' => $statusUserId,
					'statusUserName' => $statusUserName,
					'statusUserProfileImageUrl' => $statusUserProfileImageUrl,
			);
		}

		$totalNumber = $response['total_number'];
	}

	return array(
			'favs' => $favs,
			'totalNumber' => $totalNumber,
	);
}

//Delete Favs
function deleteFavs($tClientV2, $favsIds) {
	$deletedFavsIds = array();

	for ($i = 0; $i < count($favsIds); $i++) {
		$favId = $favsIds[$i];

		$response = $tClientV2->remove_from_favorites($favId);

		if (!isset($response['error']) && !isset($response['error_code'])) {
			array_push($deletedFavsIds, $response['status']['idstr']);
		}
	}

	return $deletedFavsIds;
}

//Query Dead Friends Ids
function queryDeadFriendsIds($tClientV2, $userId) {
	$userCount = $tClientV2->users_counts($userId);
	
	$friendsCount = $userCount[0]['friends_count'];
	
	$times;
	
	$count = 200;
	
	if ($friendsCount > 2000) {
		$times = 10;
	} else {
		$times = ceil($friendsCount / $count);
	}
	
	$normalFriendsIds = array();
	
	$cursor = 0;
	
	for ($i = 0; $i < $times; $i++) {
		$vFriends = $tClientV2->friends_by_id($userId, $cursor, $count);
		
		for ($j = 0; $j < count($vFriends['users']); $j++) {
			array_push($normalFriendsIds, $vFriends['users'][$j]['idstr']);
		}
		
		$cursor += $count;
	}
	
	$vFriendsIds = $tClientV2->friends_ids_by_id($userId, 0, 2000);
	
	$friendsIds = $vFriendsIds['ids'];
	
	$deadFriendsIds = array();
	
	$j = 0;
	
	if (count($friendsIds) > count($normalFriendsIds)) {
		for ($i = 0; $i < count($friendsIds); $i++) {
			$friendsId = $friendsIds[$i];
		
			if ($j < count($normalFriendsIds)) {
				$normalFriendsId = $normalFriendsIds[$j];
					
				if ($friendsId == $normalFriendsId) {
					$j++;
				} else {
					array_push($deadFriendsIds, $friendsId);
				}
			} else {
				array_push($deadFriendsIds, $friendsId);
			}
		}
	}
	
	return $deadFriendsIds;
}

//Query Dead Followers Ids
function queryDeadFollowersIds($tClientV2, $userId) {
	$userCount = $tClientV2->users_counts($userId);
	
	$followersCount = $userCount[0]['followers_count'];
	
	$times;
	
	$count = 200;
	
	if ($followersCount > 2000) {
		$times = 10;
	} else {
		$times = ceil($followersCount / $count);
	}
	
	$normalFollowersIds = array();
	
	$cursor = 0;
	
	for ($i = 0; $i < $times; $i++) {
		$vFollowers = $tClientV2->followers_by_id($userId, $cursor, $count);
	
		for ($j = 0; $j < count($vFollowers['users']); $j++) {
			array_push($normalFollowersIds, $vFollowers['users'][$j]['idstr']);
		}
	
		$cursor += $count;
	}
	
	$vFollowersIds = $tClientV2->followers_ids_by_id($userId, 0, 2000);
	
	$followersIds = $vFollowersIds['ids'];
	
	$deadFollowersIds = array();
	
	$j = 0;
	
	if (count($followersIds) > count($normalFollowersIds)) {
		for ($i = 0; $i < count($followersIds); $i++) {
			$followersId = $followersIds[$i];
	
			if ($j < count($normalFollowersIds)) {
				$normalFollowersId = $normalFollowersIds[$j];
					
				if ($followersId == $normalFollowersId) {
					$j++;
				} else {
					array_push($deadFollowersIds, $followersId);
				}
			} else {
				array_push($deadFollowersIds, $followersId);
			}
		}
	}
	
	return $deadFollowersIds;
}
?>