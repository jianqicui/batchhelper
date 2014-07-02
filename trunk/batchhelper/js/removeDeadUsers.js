var deadFriendLoadedIds;
var deadFriendSelectedIds = [];

var deadFollowerLoadedIds;
var deadFollowerSelectedIds = [];

function addIdToArray(ids, id) {
	ids.push(id);
}

function removeIdFromArray(ids, id) {
	var index = -1;
	
	for (var i = 0; i < ids.length; i++) {
		if (id == ids[i]) {
			index = i;
			break;
		}
	}

	if (index != -1) {
		ids.splice(index, 1);
	}
}

$(document).ready(function() {
	$('#deadFriendsLoadingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });

    $('#deadFriendsRemovingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });
    
    $('#deadFollowersLoadingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });
    
    $('#deadFollowersRemovingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });
    
    var l = window.location.href;
    
    var tab = l.substring(l.indexOf('#'));
    
    if (tab == '#removeDeadFriends') {
    	$('#removeDeadFriendsTab').click();
    } else if (tab == '#removeDeadFollowers') {
    	$('#removeDeadFollowersTab').click();
    } else {
    	$('#removeDeadFriendsTab').click();
    }
});

function clickRemoveDeadFriendsTab() {
	$('#removeDeadFriendsTab').tab('show');
	
	$('#removeDeadFriendsDiv').show();
	$('#removeDeadFollowersDiv').hide();
	
	if ($('#deadFriendsDiv').html() == '') {
		showDeadFriendsIds();
	}
}

function clickRemoveDeadFollowersTab() {
	$('#removeDeadFollowersTab').tab('show');
	
	$('#removeDeadFriendsDiv').hide();
	$('#removeDeadFollowersDiv').show();
	
	if ($('#deadFollowersDiv').html() == '') {
		showDeadFollowersIds();
	}
}

function getDeadFriendDivId(deadFriendsId) {
	return deadFriendsId + '_deadFriend_div';
}

function clickDeadFriend(deadFriendsId, checked) {
	var checkbox = $('#' + getDeadFriendDivId(deadFriendsId)).children('input[type=checkbox]').eq(0);
	
	if (checked == undefined) {
		checked = checkbox.prop('checked');
	} else {
		checkbox.prop('checked', checked);
	}
	
	if (checked) {
		addIdToArray(deadFriendSelectedIds, deadFriendsId);
	} else {
		removeIdFromArray(deadFriendSelectedIds, deadFriendsId);
	}
	
	if (deadFriendSelectedIds.length > 0) {
		$('#deadFriendsRemoveButton').attr('class', 'btn btn-primary btn-block').removeAttr('disabled');
	} else {
		$('#deadFriendsRemoveButton').attr('class', 'btn btn-primary btn-block disabled').attr('disabled', 'disabled');
	}
}

function showDeadFriendsIds() {
	$(window).scrollTop(0);
	
	$.ajax({
		async: true, 
		type: 'GET', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'queryDeadFriendsIds', 'userId' : uid}, 
		beforeSend: function() {
			$('#deadFriendsLoadingDiv').modal('show');
		},
		success: function(data, textStatus) {
			$('#deadFriendsLoadingDiv').modal('hide');
			
			deadFriendLoadedIds = data;
			
			$('#deadFriendsTotalCountSpan').text(deadFriendLoadedIds.length);
			
			for (var i = 0; i < deadFriendLoadedIds.length; i++) {
				var deadFriendsId = deadFriendLoadedIds[i];
				
				var deadFriendsUrl = 'http://www.weibo.com/u/' + deadFriendsId;
				
				var deadFriendDivId = getDeadFriendDivId(deadFriendsId);
				
				var deadFriendHtml = 
					'<div id=\'' + deadFriendDivId + '\' style=\'cursor: pointer; position: relative; display: inline-block; margin: 5px; width: 105px;\'>' + 
						'<input type=\'checkbox\' style=\'margin-top: 0px; margin-right: 5px;\' onclick=\'clickDeadFriend(' + deadFriendsId + ')\' />' + 
						'<a href=\'' + deadFriendsUrl + '\'>' + 
							deadFriendsId
						'</a>' + 
					'</div>';
				
				$('#deadFriendsDiv').append(deadFriendHtml);
			}
			
			if (deadFriendLoadedIds.length > 0) {
				$('#deadFriendsOperationDiv').css('display', 'block');
			}
		}
	});
}

function selectLoadedDeadFriends() {
	for (var i = 0; i < deadFriendLoadedIds.length; i++) {
		var deadFriendsId = deadFriendLoadedIds[i];
		
		clickDeadFriend(deadFriendsId, true);
	}
}

function deselectLoadedDeadFriends() {
	for (var i = 0; i < deadFriendLoadedIds.length; i++) {
		var deadFriendsId = deadFriendLoadedIds[i];
		
		clickDeadFriend(deadFriendsId, false);
	}
}

function removeDeadFriends() {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'text', 
		url: 'action.php', 
		data: {'action' : 'destroyFriendships', 'userIds' : deadFriendSelectedIds.join(',')}, 
		beforeSend: function() {
			$('#deadFriendsRemovingDiv').modal('show');
		},
		success: function(data, textStatus) {
			$('#deadFriendsRemovingDiv').modal('hide');
			
			var vDeadFriendSelectedIds = [];
			
			for (var i = 0; i < deadFriendSelectedIds.length; i++) {
				var deadFriendsId = deadFriendSelectedIds[i];
				
				vDeadFriendSelectedIds.push(deadFriendsId);
			}
			
			for (var i = 0; i < vDeadFriendSelectedIds.length; i++) {
				var deadFriendsId = vDeadFriendSelectedIds[i];
				
				clickDeadFriend(deadFriendsId, false);

				$('#' + getDeadFriendDivId(deadFriendsId)).remove();
				
				removeIdFromArray(deadFriendLoadedIds, deadFriendsId);
			}
			
			if (deadFriendLoadedIds.length == 0) {
				$('#deadFriendsOperationDiv').css('display', 'none');
			}
			
			$('#deadFriendsTotalCountSpan').text(deadFriendLoadedIds.length);
		}
	});
}

function getDeadFollowerDivId(deadFollowersId) {
	return deadFollowersId + '_deadFollower_div';
}

function clickDeadFollower(deadFollowersId, checked) {
	var checkbox = $('#' + getDeadFollowerDivId(deadFollowersId)).children('input[type=checkbox]').eq(0);
	
	if (checked == undefined) {
		checked = checkbox.prop('checked');
	} else {
		checkbox.prop('checked', checked);
	}
	
	if (checked) {
		addIdToArray(deadFollowerSelectedIds, deadFollowersId);
	} else {
		removeIdFromArray(deadFollowerSelectedIds, deadFollowersId);
	}
	
	if (deadFollowerSelectedIds.length > 0) {
		$('#deadFollowersRemoveButton').attr('class', 'btn btn-primary btn-block').removeAttr('disabled');
	} else {
		$('#deadFollowersRemoveButton').attr('class', 'btn btn-primary btn-block disabled').attr('disabled', 'disabled');
	}
}

function showDeadFollowersIds() {
	$(window).scrollTop(0);
	
	$.ajax({
		async: true, 
		type: 'GET', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'queryDeadFollowersIds', 'userId' : uid}, 
		beforeSend: function() {
			$('#deadFollowersLoadingDiv').modal('show');
		},
		success: function(data, textStatus) {
			$('#deadFollowersLoadingDiv').modal('hide');
			
			deadFollowerLoadedIds = data;
			
			$('#deadFollowersTotalCountSpan').text(deadFollowerLoadedIds.length);
			
			for (var i = 0; i < deadFollowerLoadedIds.length; i++) {
				var deadFollowersId = deadFollowerLoadedIds[i];
				
				var deadFollowersUrl = 'http://www.weibo.com/u/' + deadFollowersId;
				
				var deadFollowerDivId = getDeadFollowerDivId(deadFollowersId);
				
				var deadFollowerHtml = 
					'<div id=\'' + deadFollowerDivId + '\' style=\'cursor: pointer; position: relative; display: inline-block; margin: 5px; width: 105px;\'>' + 
						'<input type=\'checkbox\' style=\'margin-top: 0px; margin-right: 5px;\' onclick=\'clickDeadFollower(' + deadFollowersId + ')\' />' + 
						'<a href=\'' + deadFollowersUrl + '\'>' + 
							deadFollowersId
						'</a>' + 
					'</div>';
				
				$('#deadFollowersDiv').append(deadFollowerHtml);
			}
			
			if (deadFollowerLoadedIds.length > 0) {
				$('#deadFollowersOperationDiv').css('display', 'block');
			}
		}
	});
}

function selectLoadedDeadFollowers() {
	for (var i = 0; i < deadFollowerLoadedIds.length; i++) {
		var deadFollowersId = deadFollowerLoadedIds[i];
		
		clickDeadFollower(deadFollowersId, true);
	}
}

function deselectLoadedDeadFollowers() {
	for (var i = 0; i < deadFollowerLoadedIds.length; i++) {
		var deadFollowersId = deadFollowerLoadedIds[i];
		
		clickDeadFollower(deadFollowersId, false);
	}
}

function removeDeadFollowers() {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'text', 
		url: 'action.php', 
		data: {'action' : 'destroyFriendships', 'userIds' : deadFollowerSelectedIds.join(',')}, 
		beforeSend: function() {
			$('#deadFollowersRemovingDiv').modal('show');
		},
		success: function(data, textStatus) {
			$('#deadFollowersRemovingDiv').modal('hide');
			
			var vDeadFollowerSelectedIds = [];
			
			for (var i = 0; i < deadFollowerSelectedIds.length; i++) {
				var deadFollowersId = deadFollowerSelectedIds[i];
				
				vDeadFollowerSelectedIds.push(deadFollowersId);
			}
			
			for (var i = 0; i < vDeadFollowerSelectedIds.length; i++) {
				var deadFollowersId = vDeadFollowerSelectedIds[i];
				
				clickDeadFollower(deadFollowersId, false);

				$('#' + getDeadFollowerDivId(deadFollowersId)).remove();
				
				removeIdFromArray(deadFollowerLoadedIds, deadFollowersId);
			}
			
			if (deaFollowerLoadedIds.length == 0) {
				$('#deadFollowersOperationDiv').css('display', 'none');
			}
			
			$('#deadFollowersTotalCountSpan').text(deadFollowerLoadedIds.length);
		}
	});
}