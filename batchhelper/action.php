<?php
include_once( 'saetv2.ex.class.php' );

session_start();

$c;

if (isset($_SESSION['saeTClientV2'])) {
	$c = $_SESSION['saeTClientV2'];
} else {
	header('Location: index.php');

	exit;
}

$action = $_REQUEST['action'];

if ('getRateLimit' == $action) {
	$response = getRateLimit($c);

	echo json_encode($response);
} else if ('queryFriends' == $action || 'queryFollowers' == $action) {
	$rateLimit = getRateLimit($c);

	$remainingHourlyUserHitsLimit = $rateLimit['remainingHourlyUserHitsLimit'];
	$remainingHourlyIpHitsLimit = $rateLimit['remainingHourlyIpHitsLimit'];

	$minLimit = minIntValue(array($remainingHourlyUserHitsLimit, $remainingHourlyIpHitsLimit));

	if ($minLimit >= 1) {
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
			$response = queryFriends($c, $userId, $userName, $cursor, $count);
		} else if ('queryFollowers' == $action) {
			$response = queryFollowers($c, $userId, $userName, $cursor, $count);
		}

		echo $response;
	}
} else if ('destroyFriendships' == $action) {
	$userIds = explode(',', $_REQUEST['userIds']);

	$response = destroyFriendships($c, $userIds);

	echo join(',', $response);
} else if ('createFriendships' == $action) {
	$rateLimit = getRateLimit($c);

	$remainingHourlyUserHitsLimit = $rateLimit['remainingHourlyUserHitsLimit'];
	$remainingHourlyIpHitsLimit = $rateLimit['remainingHourlyIpHitsLimit'];
	$remainingHourlyCreateFriendshipsLimit = $rateLimit['remainingHourlyCreateFriendshipsLimit'];
	$remainingDailyCreateFriendshipsLimit = $rateLimit['remainingDailyCreateFriendshipsLimit'];

	$minLimit = minIntValue(array($remainingHourlyUserHitsLimit, $remainingHourlyIpHitsLimit,
	$remainingHourlyCreateFriendshipsLimit, $remainingDailyCreateFriendshipsLimit));

	$userIds = explode(',', $_REQUEST['userIds']);

	$ids;

	if ($minLimit >= count($userIds)) {
		$ids = $userIds;
	} else {
		$ids = array_slice($userIds, 0, $minLimit);
	}

	$response = createFriendships($c, $ids);

	echo join(',', $response);
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
function getRateLimit($c) {
	$response = $c->rate_limit_status();

	$apiRateLimits = $response['api_rate_limits'];

	$remainingHourlyCreateFriendshipsLimit = 0;
	$hourlyCreateFriendshipsLimit = 0;

	$remainingDailyCreateFriendshipsLimit = 0;
	$dailyCreateFriendshipsLimit = 0;

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

//Query Friends
function queryFriends($c, $userId, $userName, $cursor, $count) {
	$params = array();
	$params['cursor'] = $cursor;
	$params['count'] = $count;

	if (isset($userId)) {
		$params['uid'] = $userId;
	} else if (isset($userName)) {
		$params['screen_name'] = $userName;
	}

	return $c->get_oauth()->oAuthRequest('friendships/friends', 'GET', $params);
}

//Query Followers
function queryFollowers($c, $userId, $userName, $cursor, $count) {
	$params = array();
	$params['cursor'] = $cursor;
	$params['count'] = $count;

	if (isset($userId)) {
		$params['uid'] = $userId;
	} else if (isset($userName)) {
		$params['screen_name'] = $userName;
	}

	return $c->get_oauth()->oAuthRequest('friendships/followers', 'GET', $params);
}

//Destroy Friendships
function destroyFriendships($c, $userIds) {
	$destroyedFriendshipIds = array();

	for ($i = 0; $i < count($userIds); $i++) {
		$userId = $userIds[$i];

		$response = $c->unfollow_by_id($userId);

		if (!isset($response['error']) && !isset($response['error_code'])) {
			array_push($destroyedFriendshipIds, $response['id']);
		}
	}

	return $destroyedFriendshipIds;
}

//Create Friendships
function createFriendships($c, $userIds) {
	$createdFriendshipIds = array();

	for ($i = 0; $i < count($userIds); $i++) {
		$userId = $userIds[$i];

		$response = $c->follow_by_id($userId);

		if (!isset($response['error']) && !isset($response['error_code'])) {
			array_push($createdFriendshipIds, $response['id']);
		}
	}

	return $createdFriendshipIds;
}
?>