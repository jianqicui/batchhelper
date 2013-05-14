var otherFriendshipsMgntNamesCookieName = clientId + '_' + uid + '_OtherFriendshipsMgntNames';

var otherFriendshipsMgntInputNameModalOwner;

var otherFriendshipsMgntQueryName;

var myFriendsCursor = 0;
var myFollowersCursor = 0;
var otherFriendsCursor = 0;
var otherFollowersCursor = 0;

var myFriendsLoadedIds = [];
var myFollowersLoadedIds = [];
var otherFriendsLoadedIds = [];
var otherFollowersLoadedIds = [];

var myFriendsSelectedIds = [];
var myFollowersSelectedIds = [];
var otherFriendsSelectedIds = [];
var otherFollowersSelectedIds = [];

$(document).ready(function() {		
	// Friendships Management Tabs
	$('#friendshipsMgntTabsDiv a').click(function (e) {
		e.preventDefault();
		
        var friendshipsMgntTabId = $(this).attr('id');
		
		changeFriendshipsMgntTab(friendshipsMgntTabId);
    });

	// Friendships Management Input Name Modal
	$('#otherFriendshipsMgntInputNameModalDismissButton').click(function () {
		closeOtherFriendshipsMgntInputNameModal();
	});
	
	$('#otherFriendshipsMgntInputNameModalCloseButton').click(function () {
		closeOtherFriendshipsMgntInputNameModal();
	});

	$('#otherFriendshipsMgntInputNameModalSaveButton').click(function () {
		saveOtherFriendshipsMgntInputNameModal();
    });

	// Friendships Load Buttons
    $('#myFriendsLoadButton').click(function() {
		loadMyFriends();
	});

    $('#myFollowersLoadButton').click(function() {
    	loadMyFollowers();
	});

    $('#otherFriendsLoadButton').click(function() {
    	loadOtherFriends();
	});

    $('#otherFollowersLoadButton').click(function() {
    	loadOtherFollowers();
	});

    // Friendships Select/Deselect Loaded Buttons
    $('#myFriendsSelectLoadedButton').click(function() {
    	selectLoadedMyFriends();
	});

    $('#myFriendsDeselectLoadedButton').click(function() {
    	deselectLoadedMyFriends();
	});

    $('#myFollowersSelectLoadedButton').click(function() {
    	selectLoadedMyFollowers();
	});

    $('#myFollowersDeselectLoadedButton').click(function() {
    	deselectLoadedMyFollowers();
	});

    $('#otherFriendsSelectLoadedButton').click(function() {
    	selectLoadedOtherFriends();
	});

    $('#otherFriendsDeselectLoadedButton').click(function() {
    	deselectLoadedOtherFriends();
	});

    $('#otherFollowersSelectLoadedButton').click(function() {
    	selectLoadedOtherFollowers();
	});

    $('#otherFollowersDeselectLoadedButton').click(function() {
    	deselectLoadedOtherFollowers();
	});

    // Destroy/create Friendships Buttons
    $('#myFriendsDestroyFriendshipsButton').click(function() {
    	destroyMyFriendsFriendships();
	});

    $('#myFollowersCreateFriendshipsButton').click(function() {
    	createMyFollowersFriendships();
	});

    $('#otherFriendsCreateFriendshipsButton').click(function() {
    	createOtherFriendsFriendships();
	});

    $('#otherFollowersCreateFriendshipsButton').click(function() {
    	createOtherFollowersFriendships();
	});

    $('#myFriendsMgntTab').click();

	// Get Rate Limit
	getRateLimit();
	
	setInterval('getRateLimit()', 1000 * 60 * 5);
});

function getRateLimit() {
	$.ajax({
		async: false, 
		type: "GET", 
		dataType: "json", 
		url: 'action.php', 
		data: {'action' : 'getRateLimit'}, 
		success: function(data, textStatus) {
			var remainingHourlyCreateFriendshipsLimit = data['remainingHourlyCreateFriendshipsLimit'];
			var hourlyCreateFriendshipsLimit = data['hourlyCreateFriendshipsLimit'];

			var remainingDailyCreateFriendshipsLimit = data['remainingDailyCreateFriendshipsLimit'];
			var dailyCreateFriendshipsLimit = data['dailyCreateFriendshipsLimit'];
  			
			var remainingHourlyUserHitsLimit = data['remainingHourlyUserHitsLimit'];
			var hourlyUserHitsLimit = data['hourlyUserHitsLimit'];

			var remainingHourlyIpHitsLimit = data['remainingHourlyIpHitsLimit'];
  			var hourlyIpHitsLimit = data['hourlyIpHitsLimit'];

			var resetDateTime = data['resetDateTime'];

			$('#remainingHourlyCreateFriendshipsLimitSpan').text(remainingHourlyCreateFriendshipsLimit);
			$('#hourlyCreateFriendshipsLimitSpan').text(hourlyCreateFriendshipsLimit);

			$('#remainingDailyCreateFriendshipsLimitSpan').text(remainingDailyCreateFriendshipsLimit);
			$('#dailyCreateFriendshipsLimitSpan').text(dailyCreateFriendshipsLimit);

			$('#remainingHourlyUserHitsLimitSpan').text(remainingHourlyUserHitsLimit);
			$('#hourlyUserHitsLimitSpan').text(hourlyUserHitsLimit);

			$('#remainingHourlyIpHitsLimitSpan').text(remainingHourlyIpHitsLimit);
			$('#hourlyIpHitsLimitSpan').text(hourlyIpHitsLimit);

			$('#resetDateTimeSpan').text(resetDateTime);
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
			$('#remainingHourlyCreateFriendshipsLimitSpan').text('');
			$('#hourlyCreateFriendshipsLimitSpan').text('');

			$('#remainingDailyCreateFriendshipsLimitSpan').text('');
			$('#dailyCreateFriendshipsLimitSpan').text('');

			$('#remainingHourlyIpHitsLimitSpan').text('');
			$('#hourlyIpHitsLimitSpan').text('');

			$('#remainingHourlyUserHitsLimitSpan').text('');
			$('#hourlyUserHitsLimitSpan').text('');

			$('#resetDateTimeSpan').text('');
		}
	});
}
	
function trim(str) {
　　  return str.replace(/(^\s*)|(\s*$)/g, '');
}
	
function addCookieArray(name, value) {
		var values = $.cookie(name);

		if (values != null) {
			var existed = false;
			
			var valueArray = values.split(',');
		
		for (var i = 0; i < valueArray.length; i++) {
			var val = valueArray[i];

			if (val == value) {
				existed = true;
				break;
			}
		}

		if (existed == false) {
			values += ',' + value;
		}
	} else {
		values = value;
	}
	
	$.cookie(name, values, {expires: 7});
}

function getCookieArray(name) {
	var values = $.cookie(name);
	
	var valueArray;
	
	if (values != null) {
		valueArray = values.split(',');
	} else {
		valueArray = [];
	}

	return valueArray;
}

function isContainCookieArray(name, value) {
	var valueArray = getCookieArray(name);

	var existed = false;
	
	for (var i = 0; i < valueArray.length; i++) {
		var val = valueArray[i];

		if (val == value) {
			existed = true;
			break;
		}
	}

	return existed;
}

function addFriendshipIdToArray(friendshipsIds, userId) {
	friendshipsIds.push(userId);
}

function removeFriendshipIdFromArray(friendshipsIds, userId) {
	var index = -1;
	
	for (var i = 0; i < friendshipsIds.length; i++) {
		if (userId == friendshipsIds[i]) {
			index = i;
			break;
		}
	}

	if (index != -1) {
		friendshipsIds.splice(index, 1);
	}
}

function changeFriendshipsMgntTab(friendshipsMgntTabId) {
    if ('myFriendsMgntTab' == friendshipsMgntTabId) {
        // My Friends Management Tab
    	$('#myFriendsMgntTab').tab('show');

    	//Friendships Content Div
    	$('#myFriendsContentDiv').show();
    	$('#myFollowersContentDiv').hide();
    	$('#otherFriendsContentDiv').hide();
    	$('#otherFollowersContentDiv').hide();
    	
        // Friendships Status Progress and Result Div
    	$('#myFriendsStatusProgressDiv').show();
    	$('#myFriendsStatusResultDiv').show();

    	$('#myFollowersStatusProgressDiv').hide();
    	$('#myFollowersStatusResultDiv').hide();

    	$('#otherFriendsStatusProgressDiv').hide();
    	$('#otherFriendsStatusResultDiv').hide();

    	$('#otherFollowersStatusProgressDiv').hide();
    	$('#otherFollowersStatusResultDiv').hide();

		// Friendships Select and Deselect Loaded Div
    	$('#myFriendsSelectLoadedDiv').show();
    	$('#myFriendsDeselectLoadedDiv').show();

    	$('#myFollowersSelectLoadedDiv').hide();
    	$('#myFollowersDeselectLoadedDiv').hide();

    	$('#otherFriendsSelectLoadedDiv').hide();
    	$('#otherFriendsDeselectLoadedDiv').hide();

    	$('#otherFollowersSelectLoadedDiv').hide();
    	$('#otherFollowersDeselectLoadedDiv').hide();

    	// Friendships Create and Destroy Div
    	$('#myFriendsDestroyFriendshipsDiv').show();
    	$('#myFollowersCreateFriendshipsDiv').hide();
    	$('#otherFriendsCreateFriendshipsDiv').hide();
    	$('#otherFollowersCreateFriendshipsDiv').hide();
	} else if ('myFollowersMgntTab' == friendshipsMgntTabId) {
		// My Followers Management Tab
		$('#myFollowersMgntTab').tab('show');

    	//Friendships Content Div
    	$('#myFriendsContentDiv').hide();
    	$('#myFollowersContentDiv').show();
    	$('#otherFriendsContentDiv').hide();
    	$('#otherFollowersContentDiv').hide();

    	// Friendships Status Progress and Result Div
    	$('#myFriendsStatusProgressDiv').hide();
    	$('#myFriendsStatusResultDiv').hide();

    	$('#myFollowersStatusProgressDiv').show();
    	$('#myFollowersStatusResultDiv').show();

    	$('#otherFriendsStatusProgressDiv').hide();
    	$('#otherFriendsStatusResultDiv').hide();

    	$('#otherFollowersStatusProgressDiv').hide();
    	$('#otherFollowersStatusResultDiv').hide();

    	// Friendships Select and Deselect Loaded Div
    	$('#myFriendsSelectLoadedDiv').hide();
    	$('#myFriendsDeselectLoadedDiv').hide();

    	$('#myFollowersSelectLoadedDiv').show();
    	$('#myFollowersDeselectLoadedDiv').show();

    	$('#otherFriendsSelectLoadedDiv').hide();
    	$('#otherFriendsDeselectLoadedDiv').hide();

    	$('#otherFollowersSelectLoadedDiv').hide();
    	$('#otherFollowersDeselectLoadedDiv').hide();

    	// Friendships Create and Destroy Div
    	$('#myFriendsDestroyFriendshipsDiv').hide();
    	$('#myFollowersCreateFriendshipsDiv').show();
    	$('#otherFriendsCreateFriendshipsDiv').hide();
    	$('#otherFollowersCreateFriendshipsDiv').hide();
	} else if ('otherFriendsMgntTab' == friendshipsMgntTabId) {
		otherFriendshipsMgntInputNameModalOwner = 'otherFriendsMgntTab';
		
		openOtherFriendshipsMgntInputNameModal();
	} else if ('otherFollowersMgntTab' == friendshipsMgntTabId) {
		otherFriendshipsMgntInputNameModalOwner = 'otherFollowersMgntTab';
		
		openOtherFriendshipsMgntInputNameModal();
	}
}

function openOtherFriendshipsMgntInputNameModal() {
	var otherFriendshipsMgntNames = getCookieArray(otherFriendshipsMgntNamesCookieName);

	$('#otherFriendshipsMgntNameInput').typeahead({
		source: otherFriendshipsMgntNames, items: 2
	});
	
	$('#otherFriendshipsMgntInputNameModal').modal('show');
}

function closeOtherFriendshipsMgntInputNameModal() {
	$('#otherFriendshipsMgntNameEmptySpan').hide();
	$('#otherFriendshipsMgntInputNameModal').modal('hide');
}

function saveOtherFriendshipsMgntInputNameModal() {
	var otherFriendshipsMgntQueryNameValue = $('#otherFriendshipsMgntNameInput').val();
	otherFriendshipsMgntQueryNameValue = trim(otherFriendshipsMgntQueryNameValue);
	$('#otherFriendshipsMgntNameInput').val(otherFriendshipsMgntQueryNameValue);
	
	if (otherFriendshipsMgntQueryNameValue != '') {
		closeOtherFriendshipsMgntInputNameModal();
		
		// Add Other Friendships Name to Cookie
		if (!isContainCookieArray(otherFriendshipsMgntNamesCookieName, otherFriendshipsMgntQueryNameValue)) {
			addCookieArray(otherFriendshipsMgntNamesCookieName, otherFriendshipsMgntQueryNameValue);
		}

		// Change Tab Name of Other Friends and Other Followers Management
		$('#otherFriendsMgntTab').text('[' + otherFriendshipsMgntQueryNameValue + ']的关注');
		$('#otherFollowersMgntTab').text('[' + otherFriendshipsMgntQueryNameValue + ']的粉丝');

    	if (otherFriendshipsMgntQueryName != otherFriendshipsMgntQueryNameValue) {
        	// Other Friends
        	$('#otherFriendsLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
        	
    		$('#otherFriendsDiv').html('');

    		$('#otherFriendsStatusProgressDiv').text('准备就绪。请点击“加载100个”。');

    		$('#otherFriendsTotalCountSpan').text('0');
    		$('#otherFriendsLoadedCountSpan').text('0');
    		$('#otherFriendsSelectedCountSpan').text('0');
    		$('#otherFriendsCreatedFriendshipsCountSpan').text('0');

    		// Other Followers
    		$('#otherFollowersLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
    		
    		$('#otherFollowersDiv').html('');

    		$('#otherFollowersStatusProgressDiv').text('准备就绪。请点击“加载100个”。');

    		$('#otherFollowersTotalCountSpan').text('0');
    		$('#otherFollowersLoadedCountSpan').text('0');
    		$('#otherFollowersSelectedCountSpan').text('0');
    		$('#otherFollowersCreatedFriendshipsCountSpan').text('0');
		}

		otherFriendshipsMgntQueryName = otherFriendshipsMgntQueryNameValue;
		
		if ('otherFriendsMgntTab' == otherFriendshipsMgntInputNameModalOwner) {
			// Other Friends Management Tab
			$('#otherFriendsMgntTab').tab('show');

	    	//Friendships Content Div
	    	$('#myFriendsContentDiv').hide();
	    	$('#myFollowersContentDiv').hide();
	    	$('#otherFriendsContentDiv').show();
	    	$('#otherFollowersContentDiv').hide();

        	// Friendships Status Progress and Result Div
        	$('#myFriendsStatusProgressDiv').hide();
        	$('#myFriendsStatusResultDiv').hide();

        	$('#myFollowersStatusProgressDiv').hide();
        	$('#myFollowersStatusResultDiv').hide();

        	$('#otherFriendsStatusProgressDiv').show();
        	$('#otherFriendsStatusResultDiv').show();

        	$('#otherFollowersStatusProgressDiv').hide();
        	$('#otherFollowersStatusResultDiv').hide();

        	// Friendships Select and Deselect Loaded Div
        	$('#myFriendsSelectLoadedDiv').hide();
        	$('#myFriendsDeselectLoadedDiv').hide();

        	$('#myFollowersSelectLoadedDiv').hide();
        	$('#myFollowersDeselectLoadedDiv').hide();

        	$('#otherFriendsSelectLoadedDiv').show();
        	$('#otherFriendsDeselectLoadedDiv').show();

        	$('#otherFollowersSelectLoadedDiv').hide();
        	$('#otherFollowersDeselectLoadedDiv').hide();

        	// Friendships Create and Destroy Div
        	$('#myFriendsDestroyFriendshipsDiv').hide();
        	$('#myFollowersCreateFriendshipsDiv').hide();
        	$('#otherFriendsCreateFriendshipsDiv').show();
        	$('#otherFollowersCreateFriendshipsDiv').hide();
		} else if ('otherFollowersMgntTab' == otherFriendshipsMgntInputNameModalOwner) {
			// Other Followers Management Tab
			$('#otherFollowersMgntTab').tab('show');

	    	//Friendships Content Div
	    	$('#myFriendsContentDiv').hide();
	    	$('#myFollowersContentDiv').hide();
	    	$('#otherFriendsContentDiv').hide();
	    	$('#otherFollowersContentDiv').show();

        	// Friendships Status Progress and Result Div
        	$('#myFriendsStatusProgressDiv').hide();
        	$('#myFriendsStatusResultDiv').hide();

        	$('#myFollowersStatusProgressDiv').hide();
        	$('#myFollowersStatusResultDiv').hide();

        	$('#otherFriendsStatusProgressDiv').hide();
        	$('#otherFriendsStatusResultDiv').hide();

        	$('#otherFollowersStatusProgressDiv').show();
        	$('#otherFollowersStatusResultDiv').show();

        	// Friendships Select and Deselect Loaded Div
        	$('#myFriendsSelectLoadedDiv').hide();
        	$('#myFriendsDeselectLoadedDiv').hide();

        	$('#myFollowersSelectLoadedDiv').hide();
        	$('#myFollowersDeselectLoadedDiv').hide();

        	$('#otherFriendsSelectLoadedDiv').hide();
        	$('#otherFriendsDeselectLoadedDiv').hide();

        	$('#otherFollowersSelectLoadedDiv').show();
        	$('#otherFollowersDeselectLoadedDiv').show();

        	// Friendships Create and Destroy Div
        	$('#myFriendsDestroyFriendshipsDiv').hide();
        	$('#myFollowersCreateFriendshipsDiv').hide();
        	$('#otherFriendsCreateFriendshipsDiv').hide();
        	$('#otherFollowersCreateFriendshipsDiv').show();
		}
	} else {
		$('#otherFriendshipsMgntNameEmptySpan').show();
	}
}

function getFriendshipDivId(friendshipsType, userId) {
	return friendshipsType + '_' + userId;
}

function addFriendship(friendshipsType, userId, userName, friendsCount, followersCount, statusesCount, profileImageUrl) {
	var friendshipDivId = getFriendshipDivId(friendshipsType, userId);
	
	var friendshipsLoadedIds;
	var clickFriendshipFunctionName;
	var friendshipsDivId;
	var friendshipsLoadedCountSpan;

	if ('myFriends'== friendshipsType) {
		friendshipsLoadedIds = myFriendsLoadedIds;
		clickFriendshipFunctionName = 'clickMyFriend';
		friendshipsDivId = 'myFriendsDiv';
		friendshipsLoadedCountSpan = 'myFriendsLoadedCountSpan';
	} else if ('myFollowers'== friendshipsType) {
		friendshipsLoadedIds = myFollowersLoadedIds;
		clickFriendshipFunctionName = 'clickMyFollower';
		friendshipsDivId = 'myFollowersDiv';
		friendshipsLoadedCountSpan = 'myFollowersLoadedCountSpan';
	} else if ('otherFriends' == friendshipsType) {
		friendshipsLoadedIds = otherFriendsLoadedIds;
		clickFriendshipFunctionName = 'clickOtherFriend';
		friendshipsDivId = 'otherFriendsDiv';
		friendshipsLoadedCountSpan = 'otherFriendsLoadedCountSpan';
	} else if ('otherFollowers' == friendshipsType) {
		friendshipsLoadedIds = otherFollowersLoadedIds;
		clickFriendshipFunctionName = 'clickOtherFollower';
		friendshipsDivId = 'otherFollowersDiv';
		friendshipsLoadedCountSpan = 'otherFollowersLoadedCountSpan';
	}
	
	var friendshipPopoverTitle = userName;
	var friendshipPopoverContent = 
		'关注' + friendsCount + ' ' + 
		'粉丝 ' + followersCount + ' ' + 
		'微博 ' + statusesCount;
	
	var friendshipHtml = 
		'<div ' + 
			'id=\'' + friendshipDivId + '\' ' + 
			'style=\'cursor: pointer; display: inline-block; width: 50px; margin: 5px; position: relative;\'>' + 
			'<a ' + 
				'title=\'' + friendshipPopoverTitle + '\' ' + 
				'data-content=\'' + friendshipPopoverContent + '\' ' + 
				'onclick=\'' + clickFriendshipFunctionName + '(' + userId + ')\'' + ' >' + 
				'<img style=\'width: 50px; height: 50px;\' ' + 
					'src=\'' + profileImageUrl + '\' />' + 
			'</a>' + 
			'<span style=\'background: url(img/selected.png) no-repeat; ' + 
				'width: 16px; height: 16px; position: absolute; top: 34px; left: 34px; display: none;\' />' + 
		'</div>';

	$('#' + friendshipsDivId).append(friendshipHtml);

	$('div#' + friendshipDivId + ' a').popover({
		placement : 'top',
		trigger: 'hover'
	});

	addFriendshipIdToArray(friendshipsLoadedIds, userId);

	$('#' + friendshipsLoadedCountSpan).text(friendshipsLoadedIds.length);
}

function removeFriendship(friendshipsType, userId) {
	var friendshipDivId = getFriendshipDivId(friendshipsType, userId);

	var friendshipsLoadedIds;
	var friendshipsLoadedCountSpan;
	var friendshipsTotalCountSpan;

	if ('myFriends'== friendshipsType) {
		friendshipsLoadedIds = myFriendsLoadedIds;
		friendshipsLoadedCountSpan = 'myFriendsLoadedCountSpan';
		friendshipsTotalCountSpan = 'myFriendsTotalCountSpan';
	} else if ('myFollowers'== friendshipsType) {
		friendshipsLoadedIds = myFollowersLoadedIds;
		friendshipsLoadedCountSpan = 'myFollowersLoadedCountSpan';
		friendshipsTotalCountSpan = 'myFollowersTotalCountSpan';
	} else if ('otherFriends' == friendshipsType) {
		friendshipsLoadedIds = otherFriendsLoadedIds;
		friendshipsLoadedCountSpan = 'otherFriendsLoadedCountSpan';
		friendshipsTotalCountSpan = 'otherFriendsTotalCountSpan';
	} else if ('otherFollowers' == friendshipsType) {
		friendshipsLoadedIds = otherFollowersLoadedIds;
		friendshipsLoadedCountSpan = 'otherFollowersLoadedCountSpan';
		friendshipsTotalCountSpan = 'otherFollowersTotalCountSpan';
	}

	$('#' + friendshipDivId).remove();
	removeFriendshipIdFromArray(friendshipsLoadedIds, userId);
	$('#' + friendshipsLoadedCountSpan).text(friendshipsLoadedIds.length);

	var friendshipsTotalCount = parseInt($('#' + friendshipsTotalCountSpan).text());
	friendshipsTotalCount--;
	$('#' + friendshipsTotalCountSpan).text(friendshipsTotalCount);
}

function clickMyFriend(userId, flag) {
	var myFriendDivId = getFriendshipDivId('myFriends', userId);
	var myFriendSpan = $('#' + myFriendDivId).children('span');
	var myFriendSpanDisplay = myFriendSpan.css('display');

	if (flag == undefined) {
		if ('none' == myFriendSpanDisplay) {
			flag = true;
		} else if ('block' == myFriendSpanDisplay) {
			flag = false;
		}
	} else if (true == flag) {
		if ('block' == myFriendSpanDisplay) {
			return;
		}
	} else if (false == flag) {
		if ('none' == myFriendSpanDisplay) {
			return;
		}
	}
	
	if (true == flag) {
		myFriendSpan.css('display', 'block');

		addFriendshipIdToArray(myFriendsSelectedIds, userId);
	} else {
		myFriendSpan.css('display', 'none');

		removeFriendshipIdFromArray(myFriendsSelectedIds, userId);
	}
	
	$('#myFriendsSelectedCountSpan').text(myFriendsSelectedIds.length);
}

function clickMyFollower(userId, flag) {
	var myFollowerDivId = getFriendshipDivId('myFollowers', userId);
	var myFollowerSpan = $('#' + myFollowerDivId).children('span');
	var myFollowerSpanDisplay = myFollowerSpan.css('display');

	if (flag == undefined) {
		if ('none' == myFollowerSpanDisplay) {
			flag = true;
		} else if ('block' == myFollowerSpanDisplay) {
			flag = false;
		}
	} else if (true == flag) {
		if ('block' == myFollowerSpanDisplay) {
			return;
		}
	} else if (false == flag) {
		if ('none' == myFollowerSpanDisplay) {
			return;
		}
	}
	
	if (true == flag) {
		myFollowerSpan.css('display', 'block');

		addFriendshipIdToArray(myFollowersSelectedIds, userId);
	} else {
		myFollowerSpan.css('display', 'none');

		removeFriendshipIdFromArray(myFollowersSelectedIds, userId);
	}
	
	$('#myFollowersSelectedCountSpan').text(myFollowersSelectedIds.length);
}

function clickOtherFriend(userId, flag) {
	var otherFriendDivId = getFriendshipDivId('otherFriends', userId);
	var otherFriendSpan = $('#' + otherFriendDivId).children('span');
	var otherFriendSpanDisplay = otherFriendSpan.css('display');

	if (flag == undefined) {
		if ('none' == otherFriendSpanDisplay) {
			flag = true;
		} else if ('block' == otherFriendSpanDisplay) {
			flag = false;
		}
	} else if (true == flag) {
		if ('block' == otherFriendSpanDisplay) {
			return;
		}
	} else if (false == flag) {
		if ('none' == otherFriendSpanDisplay) {
			return;
		}
	}

	if (true == flag) {
		otherFriendSpan.css('display', 'block');

		addFriendshipIdToArray(otherFriendsSelectedIds, userId);
	} else {
		otherFriendSpan.css('display', 'none');

		removeFriendshipIdFromArray(otherFriendsSelectedIds, userId);
	}
	
	$('#otherFriendsSelectedCountSpan').text(otherFriendsSelectedIds.length);
}

function clickOtherFollower(userId, flag) {
	var otherFollowerDivId = getFriendshipDivId('otherFollowers', userId);
	var otherFollowerSpan = $('#' + otherFollowerDivId).children('span');
	var otherFollowerSpanDisplay = otherFollowerSpan.css('display');

	if (flag == undefined) {
		if ('none' == otherFollowerSpanDisplay) {
			flag = true;
		} else if ('block' == otherFollowerSpanDisplay) {
			flag = false;
		}
	} else if (true == flag) {
		if ('block' == otherFollowerSpanDisplay) {
			return;
		}
	} else if (false == flag) {
		if ('none' == otherFollowerSpanDisplay) {
			return;
		}
	}
	
	if (true == flag) {
		otherFollowerSpan.css('display', 'block');

		addFriendshipIdToArray(otherFollowersSelectedIds, userId);
	} else {
		otherFollowerSpan.css('display', 'none');

		removeFriendshipIdFromArray(otherFollowersSelectedIds, userId);
	}
	
	$('#otherFollowersSelectedCountSpan').text(otherFollowersSelectedIds.length);
}

function addFriendships(friendshipsType, users) {
	for (var i = 0; i < users.length; i++) {
		var user = users[i];

		var id = user['id'];
		var name = user['screen_name'];
		var friendsCount = user['friends_count'];
		var followersCount = user['followers_count'];
		var statusesCount = user['statuses_count'];
		var profileImageUrl = user['profile_image_url'];

		addFriendship(friendshipsType, id, name, friendsCount, followersCount, statusesCount, profileImageUrl);
	}
}

function loadMyFriends() {
	$.ajax({
		async: true, 
		type: "GET", 
		dataType: "json", 
		url: 'action.php', 
		data: {'action' : 'queryFriends', 'userId' : uid, 'cursor' : myFriendsCursor, 'count' : 100},
		beforeSend: function() {
			$('#myFriendsStatusProgressDiv').attr('class', 'alert alert-info').text('加载中，请稍候...');
			
			$('#myFriendsLoadButton').attr('class', 'btn btn-info btn-large disabled').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			var users = data['users'];

			var nextCursor = data['next_cursor'];
			var total = data['total_number'];
			
			// Update My Friends Cursor
			myFriendsCursor = nextCursor;

			// Show My Friends Total Count
			$('#myFriendsTotalCountSpan').text(total);
			
			// Add My Friends
			addFriendships('myFriends', users);
			$('#myFriendsContentDiv').scrollTop($('#myFriendsContentDiv')[0].scrollHeight);

			if (nextCursor != 0) {
				$('#myFriendsLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
			}

			$('#myFriendsStatusProgressDiv').attr('class', 'alert alert-success').text('我的关注，加载成功。');
		}, 
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			$('#myFriendsLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
			
			$('#myFriendsStatusProgressDiv').attr('class', 'alert alert-error').text('我的关注，加载失败。');
		}
	});
}

function loadMyFollowers() {
	$.ajax({
		async: true, 
		type: "GET", 
		dataType: "json", 
		url: 'action.php', 
		data: {'action' : 'queryFollowers', 'userId' : uid, 'cursor' : myFollowersCursor, 'count' : 100}, 
		beforeSend: function() {
			$('#myFollowersStatusProgressDiv').attr('class', 'alert alert-info').text('加载中，请稍候...');
			
			$('#myFollowersLoadButton').attr('class', 'btn btn-info btn-large disabled').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			var users = data['users'];

			var nextCursor = data['next_cursor'];
			var total = data['total_number'];

			// Update My Followers Cursor
			myFollowersCursor = nextCursor;

			// Show My Followers Total Count
			$('#myFollowersTotalCountSpan').text(total);
			
			// Add My Followers
			addFriendships('myFollowers', users);
			$('#myFollowersContentDiv').scrollTop($('#myFollowersContentDiv')[0].scrollHeight);

			if (nextCursor != 0) {
				$('#myFollowersLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
			}

			$('#myFollowersStatusProgressDiv').attr('class', 'alert alert-success').text('我的粉丝，加载成功。');
		}, 
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			$('#myFollowersLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
			
			$('#myFollowersStatusProgressDiv').attr('class', 'alert alert-error').text('我的粉丝，加载失败。');
		}
	});
}

function loadOtherFriends() {
	$.ajax({
		async: true, 
		type: "GET", 
		dataType: "json", 
		url: 'action.php', 
		data: {'action' : 'queryFriends', 'userName' : otherFriendshipsMgntQueryName, 'cursor' : otherFriendsCursor, 'count' : 100}, 
		beforeSend: function() {
			$('#otherFriendsStatusProgressDiv').attr('class', 'alert alert-info').text('加载中，请稍候...');
			
			$('#otherFriendsLoadButton').attr('class', 'btn btn-info btn-large disabled').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			var users = data['users'];

			var nextCursor = data['next_cursor'];
			var total = data['total_number'];

			// Update Other Friends Cursor
			otherFriendsCursor = nextCursor;

			// Show Other Friends Total Count
			$('#otherFriendsTotalCountSpan').text(total);

			// Add Other Friends
			addFriendships('otherFriends', users);
			$('#otherFriendsContentDiv').scrollTop($('#otherFriendsContentDiv')[0].scrollHeight);

			if (nextCursor != 0) {
				$('#otherFriendsLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
			}

			$('#otherFriendsStatusProgressDiv').attr('class', 'alert alert-success').text('[' + otherFriendshipsMgntQueryName + ']的关注，加载成功。');
		}, 
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			$('#otherFriendsLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
			
			$('#otherFriendsStatusProgressDiv').attr('class', 'alert alert-error').text('[' + otherFriendshipsMgntQueryName + ']的关注，加载失败。');
		}
	});
}

function loadOtherFollowers() {
	$.ajax({
		async: true, 
		type: "GET", 
		dataType: "json", 
		url: 'action.php', 
		data: {'action' : 'queryFollowers', 'userName' : otherFriendshipsMgntQueryName, 'cursor' : otherFollowersCursor, 'count' : 100}, 
		beforeSend: function() {
			$('#otherFollowersStatusProgressDiv').attr('class', 'alert alert-info').text('加载中，请稍候...');
			
			$('#otherFollowersLoadButton').attr('class', 'btn btn-info btn-large disabled').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			var users = data['users'];

			var nextCursor = data['next_cursor'];
			var total = data['total_number'];

			// Update Other Followers Cursor
			otherFollowersCursor = nextCursor;

			// Show Other Followers Total Count
			$('#otherFollowersTotalCountSpan').text(total);
			
			// Add Other Followers
			addFriendships('otherFollowers', users);
			$('#otherFollowersContentDiv').scrollTop($('#otherFollowersContentDiv')[0].scrollHeight);

			if (nextCursor != 0) {
				$('#otherFollowersLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
			}

			$('#otherFollowersStatusProgressDiv').attr('class', 'alert alert-success').text('[' + otherFriendshipsMgntQueryName + ']的粉丝，加载成功。');
		}, 
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			$('#otherFollowersLoadButton').attr('class', 'btn btn-info btn-large').removeAttr('disabled');
			
			$('#otherFollowersStatusProgressDiv').attr('class', 'alert alert-error').text('[' + otherFriendshipsMgntQueryName + ']的粉丝，加载失败。');
		}
	});
}

function selectLoadedMyFriends() {
	if (myFriendsSelectedIds.length < myFriendsLoadedIds.length) {
		for (var i = 0; i < myFriendsLoadedIds.length; i++) {
			clickMyFriend(myFriendsLoadedIds[i], true);
		}
	}
}

function deselectLoadedMyFriends() {
	for (var i = 0; i < myFriendsLoadedIds.length; i++) {
		clickMyFriend(myFriendsLoadedIds[i], false);
	}
}

function selectLoadedMyFollowers() {
	if (myFollowersSelectedIds.length < myFollowersLoadedIds.length) {
		for (var i = 0; i < myFollowersLoadedIds.length; i++) {
			clickMyFollower(myFollowersLoadedIds[i], true);
		}
	}
}

function deselectLoadedMyFollowers() {
	for (var i = 0; i < myFollowersLoadedIds.length; i++) {
		clickMyFollower(myFollowersLoadedIds[i], false);
	}
}

function selectLoadedOtherFriends() {
	if (otherFriendsSelectedIds.length < otherFriendsLoadedIds.length) {
		for (var i = 0; i < otherFriendsLoadedIds.length; i++) {
			clickOtherFriend(otherFriendsLoadedIds[i], true);
		}
	}
}

function deselectLoadedOtherFriends() {
	for (var i = 0; i < otherFriendsLoadedIds.length; i++) {
		clickOtherFriend(otherFriendsLoadedIds[i], false);
	}
}

function selectLoadedOtherFollowers() {
	if (otherFollowersSelectedIds.length < otherFollowersLoadedIds.length) {
		for (var i = 0; i < otherFollowersLoadedIds.length; i++) {
			clickOtherFollower(otherFollowersLoadedIds[i], true);
		}
	}
}

function deselectLoadedOtherFollowers() {
	for (var i = 0; i < otherFollowersLoadedIds.length; i++) {
		clickOtherFollower(otherFollowersLoadedIds[i], false);
	}
}

function getIntArrayFromStr(data) {
	var intArray = [];
	
	var strArray = data.split(',');

	for (var i = 0; i < strArray.length; i++) {
		var str = strArray[i];
		
		if (str != '') {
			intArray.push(parseInt(str));
		}
	}

	return intArray;
}

function destroyMyFriendsFriendships() {
	// Destroy Friendships
	$.ajax({
		async: true, 
		type: "POST", 
		dataType: "text", 
		url: 'action.php', 
		data: {'action' : 'destroyFriendships', 'userIds' : myFriendsSelectedIds.join(',')}, 
		beforeSend: function() {
			$('#myFriendsStatusProgressDiv').attr('class', 'alert alert-info').text('取消关注中，请稍候...');
			
			$('#myFriendsDestroyFriendshipsButton').attr('class', 'btn btn-primary btn-block disabled').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			var myFriendsDestroyedFriendshipsIds = getIntArrayFromStr(data);
			
			// Deselect and Remove Selected Friendshipss
			for (var i = 0; i < myFriendsDestroyedFriendshipsIds.length; i++) {
				var userId = myFriendsDestroyedFriendshipsIds[i];
				
				clickMyFriend(userId, false);
				removeFriendship('myFriends', userId);
			}

			// Show My Friends Destroyed Friendships Count
			var myFriendsDestroyedFriendshipsCount = parseInt($('#myFriendsDestroyedFriendshipsCountSpan').text());
			myFriendsDestroyedFriendshipsCount += myFriendsDestroyedFriendshipsIds.length;
			$('#myFriendsDestroyedFriendshipsCountSpan').text(myFriendsDestroyedFriendshipsCount);
			
			$('#myFriendsDestroyFriendshipsButton').attr('class', 'btn btn-primary btn-block').removeAttr('disabled');
			
			$('#myFriendsStatusProgressDiv').attr('class', 'alert alert-info').text('取消关注完成。');
		}
	});
}

function createMyFollowersFriendships() {
	// Create Friendships
	$.ajax({
		async: true, 
		type: "POST", 
		dataType: "text", 
		url: 'action.php', 
		data: {'action' : 'createFriendships', 'userIds' : myFollowersSelectedIds.join(',')}, 
		beforeSend: function() {
			$('#myFollowersStatusProgressDiv').attr('class', 'alert alert-info').text('关注中，请稍候...');
			
			$('#myFollowersCreateFriendshipsButton').attr('class', 'btn btn-primary btn-block disabled').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			var myFollowersCreatedFriendshipsIds = getIntArrayFromStr(data);
			
			// Deselect and Remove Selected Friendshipss
			for (var i = 0; i < myFollowersCreatedFriendshipsIds.length; i++) {
				var userId = myFollowersCreatedFriendshipsIds[i];
				
				clickMyFollower(userId, false);
				removeFriendship('myFollowers', userId);
			}

			// Show My Followers Created Friendships Count
			var myFollowersCreatedFriendshipsCount = parseInt($('#myFollowersCreatedFriendshipsCountSpan').text());
			myFollowersCreatedFriendshipsCount += myFollowersCreatedFriendshipsIds.length;
			$('#myFollowersCreatedFriendshipsCountSpan').text(myFollowersCreatedFriendshipsCount);
			
			$('#myFollowersCreateFriendshipsButton').attr('class', 'btn btn-primary btn-block').removeAttr('disabled');
			
			$('#myFollowersStatusProgressDiv').attr('class', 'alert alert-info').text('关注完成。');
		}
	});
}

function createOtherFriendsFriendships() {
	// Create Friendships
	$.ajax({
		async: true, 
		type: "POST", 
		dataType: "text", 
		url: 'action.php', 
		data: {'action' : 'createFriendships', 'userIds' : otherFriendsSelectedIds.join(',')}, 
		beforeSend: function() {
			$('#otherFriendsStatusProgressDiv').attr('class', 'alert alert-info').text('关注中，请稍候...');
			
			$('#otherFriendsCreateFriendshipsButton').attr('class', 'btn btn-primary btn-block disabled').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			var otherFriendsCreatedFriendshipsIds = getIntArrayFromStr(data);
			
			// Deselect and Remove Selected Friendshipss
			for (var i = 0; i < otherFriendsCreatedFriendshipsIds.length; i++) {
				var userId = otherFriendsCreatedFriendshipsIds[i];
				
				clickOtherFriend(userId, false);
				removeFriendship('otherFriends', userId);
			}

			// Show Other Friends Created Friendships Count
			var otherFriendsCreatedFriendshipsCount = parseInt($('#otherFriendsCreatedFriendshipsCountSpan').text());
			otherFriendsCreatedFriendshipsCount += otherFriendsCreatedFriendshipsIds.length;
			$('#otherFriendsCreatedFriendshipsCountSpan').text(otherFriendsCreatedFriendshipsCount);
			
			$('#otherFriendsCreateFriendshipsButton').attr('class', 'btn btn-primary btn-block').removeAttr('disabled');
			
			$('#otherFriendsStatusProgressDiv').attr('class', 'alert alert-info').text('关注完成。');
		}
	});
}

function createOtherFollowersFriendships() {
	// Create Friendships
	$.ajax({
		async: true, 
		type: "POST", 
		dataType: "text", 
		url: 'action.php', 
		data: {'action' : 'createFriendships', 'userIds' : otherFollowersSelectedIds.join(',')}, 
		beforeSend: function() {
			$('#otherFollowersStatusProgressDiv').attr('class', 'alert alert-info').text('关注中，请稍候...');
			
			$('#otherFollowersCreateFriendshipsButton').attr('class', 'btn btn-primary btn-block disabled').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			var otherFollowersCreatedFriendshipsIds = getIntArrayFromStr(data);
			
			// Deselect and Remove Selected Friendshipss
			for (var i = 0; i < otherFollowersCreatedFriendshipsIds.length; i++) {
				var userId = otherFollowersCreatedFriendshipsIds[i];
				
				clickOtherFollower(userId, false);
				removeFriendship('otherFollowers', userId);
			}

			// Show Other Followers Created Friendships Count
			var otherFollowersCreatedFriendshipsCount = parseInt($('#otherFollowersCreatedFriendshipsCountSpan').text());
			otherFollowersCreatedFriendshipsCount += otherFollowersCreatedFriendshipsIds.length;
			$('#otherFollowersCreatedFriendshipsCountSpan').text(otherFollowersCreatedFriendshipsCount);
			
			$('#otherFollowersCreateFriendshipsButton').attr('class', 'btn btn-primary btn-block').removeAttr('disabled');
			
			$('#otherFollowersStatusProgressDiv').attr('class', 'alert alert-info').text('关注完成。');
		}
	});
}