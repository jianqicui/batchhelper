var currentStatusesPage;
var currentCommentsPage;
var currentFavsPage;

var statusesLoadedIds = [];
var statusesSelectedIds = [];

var commentsLoadedIds = [];
var commentsSelectedIds = [];

var favsLoadedIds = [];
var favsSelectedIds = [];

function getArrayFromStr(data) {
	var array = [];
	
	var strArray = data.split(',');

	for (var i = 0; i < strArray.length; i++) {
		var str = strArray[i];
		
		if (str != '') {
			array.push(str);
		}
	}

	return array;
}

$(document).ready(function() {
	$('#statusesLoadingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });

    $('#statusesDeletingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });
    
    $('#commentsLoadingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });

    $('#commentsDeletingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });
    
    $('#favsLoadingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });

    $('#favsDeletingDiv').modal({
    	backdrop : false,
    	keyboard : false,
    	show : false
    });
    
    currentStatusesPage = 1;
    currentCommentsPage = 1;
    currentFavsPage = 1;
    
    var l = window.location.href;
    
    var tab = l.substring(l.indexOf('#'));
    
    if (tab == '#batchDeleteWeibo') {
    	$('#batchDeleteWeiboTab').click();
    } else if (tab == '#batchDeleteComments') {
    	$('#batchDeleteCommentsTab').click();
    } else if (tab == '#batchDeleteFavs') {
    	$('#batchDeleteFavsTab').click();
    } else {
    	$('#batchDeleteWeiboTab').click();
    }
});

function clickBatchDeleteWeiboTab() {
	$('#batchDeleteWeiboTab').tab('show');
	
	$('#batchDeleteWeiboDiv').show();
	$('#batchDeleteCommentsDiv').hide();
	$('#batchDeleteFavsDiv').hide();
	
	if ($('#statusesDiv').html() == '') {
		showStatuses();
	}
}

function clickBatchDeleteCommentsTab() {
	$('#batchDeleteCommentsTab').tab('show');
	
	$('#batchDeleteWeiboDiv').hide();
	$('#batchDeleteCommentsDiv').show();
	$('#batchDeleteFavsDiv').hide();
	
	if ($('#commentsDiv').html() == '') {
		showComments();
	}
}

function clickBatchDeleteFavsTab() {
	$('#batchDeleteFavsTab').tab('show');
	
	$('#batchDeleteWeiboDiv').hide();
	$('#batchDeleteCommentsDiv').hide();
	$('#batchDeleteFavsDiv').show();
	
	if ($('#favsDiv').html() == '') {
		showFavs();
	}
}

function getStatusCheckboxId(statusId) {
	return statusId + '_status_checkbox';
}

function getStatusDivId(statusId) {
	return statusId + '_status_div';
}

function addStatusIdToArray(statusesIds, statusId) {
	statusesIds.push(statusId);
}

function removeStatusIdFromArray(statusesIds, statusId) {
	var index = -1;
	
	for (var i = 0; i < statusesIds.length; i++) {
		if (statusId == statusesIds[i]) {
			index = i;
			break;
		}
	}

	if (index != -1) {
		statusesIds.splice(index, 1);
	}
}

function checkStatus(statusId) {
	var statusDivId = getStatusDivId(statusId);
	
	$('#' + statusDivId).css('background', '#D9EDF7');

	addStatusIdToArray(statusesSelectedIds, statusId);

	$("button[name='statusesDeleteButton']").attr('class', 'btn btn-primary').removeAttr('disabled');

	if (statusesSelectedIds.length == statusesLoadedIds.length) {
		$("input[name='statusesCheckbox']").prop('checked', true);
	}
}

function uncheckStatus(statusId) {
	var statusDivId = getStatusDivId(statusId);
	
	$('#' + statusDivId).css('background', '#FFFFFF');

	removeStatusIdFromArray(statusesSelectedIds, statusId);

	if (statusesSelectedIds.length == 0) {
		$("button[name='statusesDeleteButton']").attr('class', 'btn disabled').attr('disabled', 'disabled');
	}

	if (statusesSelectedIds.length != statusesLoadedIds.length) {
		$("input[name='statusesCheckbox']").prop('checked', false);
	}
}

function clickStatusCheckbox(statusId) {
	var statusCheckboxId = getStatusCheckboxId(statusId);

	var statusCheckboxChecked = $('#' + statusCheckboxId).prop('checked');
	
	if (statusCheckboxChecked) {
		checkStatus(statusId);
	} else {
		uncheckStatus(statusId);
	}
}

function clickStatusesCheckbox(statusesCheckboxChecked) {
	$("input[name='statusesCheckbox']").prop('checked', statusesCheckboxChecked);
	
	if (statusesCheckboxChecked) {
		for (var i = 0; i < statusesLoadedIds.length; i++) {
			var statusId = statusesLoadedIds[i];

			var statusCheckboxId = getStatusCheckboxId(statusId);

			$('#' + statusCheckboxId).prop('checked', true);
			
			checkStatus(statusId);
		}
	} else {
		for (var i = 0; i < statusesLoadedIds.length; i++) {
			var statusId = statusesLoadedIds[i];

			var statusCheckboxId = getStatusCheckboxId(statusId);

			$('#' + statusCheckboxId).prop('checked', false);
			
			uncheckStatus(statusId);
		}
	}
}

function deleteStatus(statusesIds) {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'text', 
		url: 'action.php', 
		data: {'action' : 'deleteStatuses', 'statusesIds' : statusesIds}, 
		beforeSend: function() {
			$('#statusesDeletingDiv').modal('show');
		},
		success: function(data, textStatus) {
			$('#statusesDeletingDiv').modal('hide');
			
			var deletedStatusesIds = getArrayFromStr(data);

			for (var i = 0; i < deletedStatusesIds.length; i++) {
				var statusId = deletedStatusesIds[i];
				
				uncheckStatus(statusId);
				
				var statusDivId = getStatusDivId(statusId);

				$('#' + statusDivId).remove();

				removeStatusIdFromArray(statusesLoadedIds, statusId);
			}
		}
	});
}

function clickStatusDeleteButton(statusId) {
	deleteStatus(statusId);
}

function clickStatusesDeleteButton() {
	deleteStatus(statusesSelectedIds.join(','));
}

function showStatuses() {
	$(window).scrollTop(0);
	
	var pageCount = 50;
	
	$.ajax({
		async: true, 
		type: 'GET', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'queryStatuses', 'userId' : uid, 'page' : currentStatusesPage, 'count' : pageCount}, 
		beforeSend: function() {
			$('#statusesLoadingDiv').modal('show');
		},
		success: function(data, textStatus) {
			$('#statusesLoadingDiv').modal('hide');
			
			$("input[name='statusesCheckbox']").prop('checked', false);

			$("button[name='statusesDeleteButton']").attr('class', 'btn disabled').attr('disabled', 'disabled');
			
			var totalNumber = data['totalNumber'];
			var statuses = data['statuses'];

			var totalPage = Math.ceil(totalNumber / pageCount);
			
			if (totalPage == 0) {
				return;
			}

			$('#statusesDiv').empty();
			
			statusesLoadedIds = [];
			statusesSelectedIds = [];
			
			for (var i = 0; i < statuses.length; i++) {
				var status = statuses[i];

				var id = status['id'];
				var text = status['text'];
				var thumbnailPic = status['thumbnailPic'];

				var statusCheckboxId = getStatusCheckboxId(id);
				var statusDivId = getStatusDivId(id);

				var thumbnailPicHtml = '';

				if (thumbnailPic != undefined && thumbnailPic != '') {
					thumbnailPicHtml = '<p>' + '<img src=\'' + thumbnailPic + '\' />' + '</p>';
				}

				var statusHtml = 
					'<div id=\'' + statusDivId + '\' class=\'row\' style=\'padding-top: 10px; border-bottom: 1px solid #DDDDDD;\'>'  + 
						'<div class=\'span1\'>' + 
							'<p style=\'text-align: center;\'>' + 
								'<input id=\'' + statusCheckboxId + '\' type=\'checkbox\' onclick=\'clickStatusCheckbox(' + id + ')\'/>' + 
							'</p>' + 
						'</div>' + 
						'<div class=\'span9\'>' + 
							'<p>' + 
								text + 
							'</p>' + 
							thumbnailPicHtml + 
						'</div>' + 
						'<div class=\'span2\'>' + 
							'<p style=\'text-align: center; \'>' + 
								'<button class=\'btn btn-primary\' onclick=\'clickStatusDeleteButton(' + id + ')\'>删除</button>' + 
							'</p>' + 
						'</div>' + 
					'</div>'

				$('#statusesDiv').append(statusHtml);

				addStatusIdToArray(statusesLoadedIds, id);
			}
		}
	});
}

function showPreviousStatuses() {
	currentStatusesPage--;
	
	showStatuses();
}

function showNextStatuses() {
	currentStatusesPage++;
	
	showStatuses();
}

function getCommentCheckboxId(commentId) {
	return commentId + '_comment_checkbox';
}

function getCommentDivId(commentId) {
	return commentId + '_comment_div';
}

function addCommentIdToArray(commentsIds, commentId) {
	commentsIds.push(commentId);
}

function removeCommentIdFromArray(commentsIds, commentId) {
	var index = -1;
	
	for (var i = 0; i < commentsIds.length; i++) {
		if (commentId == commentsIds[i]) {
			index = i;
			break;
		}
	}

	if (index != -1) {
		commentsIds.splice(index, 1);
	}
}

function checkComment(commentId) {
	var commentDivId = getCommentDivId(commentId);
	
	$('#' + commentDivId).css('background', '#D9EDF7');

	addCommentIdToArray(commentsSelectedIds, commentId);

	$("button[name='commentsDeleteButton']").attr('class', 'btn btn-primary').removeAttr('disabled');

	if (commentsSelectedIds.length == commentsLoadedIds.length) {
		$("input[name='commentsCheckbox']").prop('checked', true);
	}
}

function uncheckComment(commentId) {
	var commentDivId = getCommentDivId(commentId);
	
	$('#' + commentDivId).css('background', '#FFFFFF');

	removeCommentIdFromArray(commentsSelectedIds, commentId);

	if (commentsSelectedIds.length == 0) {
		$("button[name='commentsDeleteButton']").attr('class', 'btn disabled').attr('disabled', 'disabled');
	}

	if (commentsSelectedIds.length != commentsLoadedIds.length) {
		$("input[name='commentsCheckbox']").prop('checked', false);
	}
}

function clickCommentCheckbox(commentId) {
	var commentCheckboxId = getCommentCheckboxId(commentId);

	var commentCheckboxChecked = $('#' + commentCheckboxId).prop('checked');
	
	if (commentCheckboxChecked) {
		checkComment(commentId);
	} else {
		uncheckComment(commentId);
	}
}

function clickCommentsCheckbox(commentsCheckboxChecked) {
	$("input[name='commentsCheckbox']").prop('checked', commentsCheckboxChecked);
	
	if (commentsCheckboxChecked) {
		for (var i = 0; i < commentsLoadedIds.length; i++) {
			var commentId = commentsLoadedIds[i];

			var commentCheckboxId = getCommentCheckboxId(commentId);

			$('#' + commentCheckboxId).prop('checked', true);
			
			checkComment(commentId);
		}
	} else {
		for (var i = 0; i < commentsLoadedIds.length; i++) {
			var commentId = commentsLoadedIds[i];

			var commentCheckboxId = getCommentCheckboxId(commentId);

			$('#' + commentCheckboxId).prop('checked', false);
			
			uncheckComment(commentId);
		}
	}
}

function deleteComment(commentsIds) {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'text', 
		url: 'action.php', 
		data: {'action' : 'deleteComments', 'commentsIds' : commentsIds}, 
		beforeSend: function() {
			$('#commentsDeletingDiv').modal('show');
		},
		success: function(data, textStatus) {
			$('#commentsDeletingDiv').modal('hide');
			
			var deletedCommentsIds = getArrayFromStr(data);

			for (var i = 0; i < deletedCommentsIds.length; i++) {
				var commentId = deletedCommentsIds[i];
				
				uncheckComment(commentId);
				
				var commentDivId = getCommentDivId(commentId);

				$('#' + commentDivId).remove();

				removeCommentIdFromArray(commentsLoadedIds, commentId);
			}
		}
	});
}

function clickCommentDeleteButton(commentId) {
	deleteComment(commentId);
}

function clickCommentsDeleteButton() {
	deleteComment(commentsSelectedIds.join(','));
}

function clickFavsDeleteButton() {
	deleteFav(favsSelectedIds.join(','));
}

function showComments() {
	$(window).scrollTop(0);
	
	var pageCount = 50;
	
	$.ajax({
		async: true, 
		type: 'GET', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'queryComments', 'page' : currentCommentsPage, 'count' : pageCount}, 
		beforeSend: function() {
			$('#commentsLoadingDiv').modal('show');
		},
		success: function(data, textStatus) {
			$('#commentsLoadingDiv').modal('hide');
			
			$("input[name='commentsCheckbox']").prop('checked', false);

			$("button[name='commentsDeleteButton']").attr('class', 'btn disabled').attr('disabled', 'disabled');
			
			var totalNumber = data['totalNumber'];
			var comments = data['comments'];

			var totalPage = Math.ceil(totalNumber / pageCount);
			
			if (totalPage == 0) {
				return;
			}
			
			$('#commentsDiv').empty();
			
			commentsLoadedIds = [];
			commentsSelectedIds = [];
			
			for (var i = 0; i < comments.length; i++) {
				var comment = comments[i];

				var replyStatus = comment['replyStatus'];
				
				var id = comment['id'];
				var text = comment['text'];
				
				var statusId = comment['statusId'];
				var statusUserId = comment['statusUserId'];
				
				var commentedText = comment['commentedText'];
				
				var commentedUserId = comment['commentedUserId'];
				var commentedUserName = comment['commentedUserName'];
				var commentedUserProfileImageUrl = comment['commentedUserProfileImageUrl'];
				
				var commentCheckboxId = getCommentCheckboxId(id);
				var commentDivId = getCommentDivId(id);

				var textHtml;
				
				if (replyStatus) {
					textHtml = text;
				} else {
					var matches = text.match('(.+)@(.+):(.+)');
					var atName = matches[2];
					
					var commentedUserHtml = 
						'<a href=\'http://weibo.com/n/' + atName + '\' target=\'_blank\' >' + 
							'@' + atName + 
						'</a>';
					
					textHtml = text.replace('@' + atName, commentedUserHtml);
				}
				
				var commentHtml = 
					'<div id=\'' + commentDivId + '\' class=\'row\' style=\'padding-top: 10px; border-bottom: 1px solid #DDDDDD;\'>'  + 
						'<div class=\'span1\'>' + 
							'<p style=\'text-align: center;\'>' + 
								'<input id=\'' + commentCheckboxId + '\' type=\'checkbox\' onclick=\'clickCommentCheckbox(' + id + ')\'/>' + 
							'</p>' + 
						'</div>' + 
						'<div class=\'span1\'>' + 
							'<p style=\'text-align: center;\'>' + 
								'<a href=\'http://weibo.com/u/' + commentedUserId + '\' title=\'' + commentedUserName + '\' target=\'_blank\' >' + 
									'<img src=\'' + commentedUserProfileImageUrl + '\' />' + 
								'</a>' + 
							'</p>' + 
						'</div>' + 
						'<div class=\'span8\'>' + 
							'<p>' + 
								textHtml + 
							'</p>' + 
							'<p>' + 
								'<span style=\'color: gray\'>' + (replyStatus ? '评论' : '回复') + '</span>' + 
								'<a href=\'http://weibo.com/u/' + commentedUserId + '\' target=\'_blank\' >' + 
									commentedUserName + 
								'</a>' + 
								'<span style=\'color: gray\'>' + '的' + (replyStatus ? '微博' : '评论') + '：' + '</span>' + 
								'<a href=\'http://api.t.sina.com.cn/' + statusUserId + '/statuses/' + statusId + '\' target=\'_blank\' >' + 
									'“' + commentedText + '”' + 
								'</a>' + 
							'</p>' + 
						'</div>' + 
						'<div class=\'span2\'>' + 
							'<p style=\'text-align: center; \'>' + 
								'<button class=\'btn btn-primary\' onclick=\'clickCommentDeleteButton(' + id + ')\'>删除</button>' + 
							'</p>' + 
						'</div>' + 
					'</div>'

				$('#commentsDiv').append(commentHtml);

				addCommentIdToArray(commentsLoadedIds, id);
			}
		}
	});
}

function showPreviousComments() {
	currentCommentsPage--;
	
	showComments();
}

function showNextComments() {
	currentCommentsPage++;
	
	showComments();
}

function getFavCheckboxId(favId) {
	return favId + '_fav_checkbox';
}

function getFavDivId(favId) {
	return favId + '_fav_div';
}

function addFavIdToArray(favsIds, favId) {
	favsIds.push(favId);
}

function removeFavIdFromArray(favsIds, favId) {
	var index = -1;
	
	for (var i = 0; i < favsIds.length; i++) {
		if (favId == favsIds[i]) {
			index = i;
			break;
		}
	}

	if (index != -1) {
		favsIds.splice(index, 1);
	}
}

function checkFav(favId) {
	var favDivId = getFavDivId(favId);
	
	$('#' + favDivId).css('background', '#D9EDF7');

	addFavIdToArray(favsSelectedIds, favId);

	$("button[name='favsDeleteButton']").attr('class', 'btn btn-primary').removeAttr('disabled');

	if (favsSelectedIds.length == favsLoadedIds.length) {
		$("input[name='favsCheckbox']").prop('checked', true);
	}
}

function uncheckFav(favId) {
	var favDivId = getFavDivId(favId);
	
	$('#' + favDivId).css('background', '#FFFFFF');

	removeFavIdFromArray(favsSelectedIds, favId);

	if (favsSelectedIds.length == 0) {
		$("button[name='favsDeleteButton']").attr('class', 'btn disabled').attr('disabled', 'disabled');
	}

	if (favsSelectedIds.length != favsLoadedIds.length) {
		$("input[name='favsCheckbox']").prop('checked', false);
	}
}

function clickFavCheckbox(favId) {
	var favCheckboxId = getFavCheckboxId(favId);

	var favCheckboxChecked = $('#' + favCheckboxId).prop('checked');
	
	if (favCheckboxChecked) {
		checkFav(favId);
	} else {
		uncheckFav(favId);
	}
}

function clickFavsCheckbox(favsCheckboxChecked) {
	$("input[name='favsCheckbox']").prop('checked', favsCheckboxChecked);
	
	if (favsCheckboxChecked) {
		for (var i = 0; i < favsLoadedIds.length; i++) {
			var favId = favsLoadedIds[i];

			var favCheckboxId = getFavCheckboxId(favId);

			$('#' + favCheckboxId).prop('checked', true);
			
			checkFav(favId);
		}
	} else {
		for (var i = 0; i < favsLoadedIds.length; i++) {
			var favId = favsLoadedIds[i];

			var favCheckboxId = getFavCheckboxId(favId);

			$('#' + favCheckboxId).prop('checked', false);
			
			uncheckFav(favId);
		}
	}
}

function deleteFav(favsIds) {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'text', 
		url: 'action.php', 
		data: {'action' : 'deleteFavs', 'favsIds' : favsIds}, 
		beforeSend: function() {
			$('#favsDeletingDiv').modal('show');
		},
		success: function(data, textFav) {
			$('#favsDeletingDiv').modal('hide');
			
			var deletedFavsIds = getArrayFromStr(data);

			for (var i = 0; i < deletedFavsIds.length; i++) {
				var favId = deletedFavsIds[i];
				
				uncheckFav(favId);
				
				var favDivId = getFavDivId(favId);

				$('#' + favDivId).remove();

				removeFavIdFromArray(favsLoadedIds, favId);
			}
		}
	});
}

function clickFavDeleteButton(favId) {
	deleteFav(favId);
}

function showFavs() {
	$(window).scrollTop(0);
	
	var pageCount = 50;
	
	$.ajax({
		async: true, 
		type: 'GET', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'queryFavs', 'page' : currentFavsPage, 'count' : pageCount}, 
		beforeSend: function() {
			$('#favsLoadingDiv').modal('show');
		},
		success: function(data, textFav) {
			$('#favsLoadingDiv').modal('hide');
			
			$("input[name='favsCheckbox']").prop('checked', false);

			$("button[name='favsDeleteButton']").attr('class', 'btn disabled').attr('disabled', 'disabled');
			
			var totalNumber = data['totalNumber'];
			var favs = data['favs'];

			var totalPage = Math.ceil(totalNumber / pageCount);
			
			if (totalPage == 0) {
				return;
			}
			
			$('#favsDiv').empty();
			
			favsLoadedIds = [];
			favsSelectedIds = [];
			
			for (var i = 0; i < favs.length; i++) {
				var fav = favs[i];

				var id = fav['id'];
				
				var statusText = fav['statusText'];
				var statusThumbnailPic = fav['statusThumbnailPic'];
				
				var statusUserId = fav['statusUserId'];
				var statusUserName = fav['statusUserName'];
				var statusUserProfileImageUrl = fav['statusUserProfileImageUrl'];

				var statusThumbnailPicHtml = '';

				if (statusThumbnailPic != undefined && statusThumbnailPic != '') {
					statusThumbnailPicHtml = '<p>' + '<img src=\'' + statusThumbnailPic + '\' />' + '</p>';
				}
				
				var favCheckboxId = getFavCheckboxId(id);
				var favDivId = getFavDivId(id);

				var favHtml = 
					'<div id=\'' + favDivId + '\' class=\'row\' style=\'padding-top: 10px; border-bottom: 1px solid #DDDDDD;\'>'  + 
						'<div class=\'span1\'>' + 
							'<p style=\'text-align: center;\'>' + 
								'<input id=\'' + favCheckboxId + '\' type=\'checkbox\' onclick=\'clickFavCheckbox(' + id + ')\'/>' + 
							'</p>' + 
						'</div>' + 
						'<div class=\'span1\'>' + 
							'<p style=\'text-align: center;\'>' + 
								'<a href=\'http://weibo.com/u/' + statusUserId + '\' title=\'' + statusUserName + '\' target=\'_blank\' >' + 
									'<img src=\'' + statusUserProfileImageUrl + '\' />' + 
								'</a>' + 
							'</p>' + 
						'</div>' + 
						'<div class=\'span8\'>' + 
							'<p>' + 
								'<a href=\'http://weibo.com/u/' + statusUserId + '\' target=\'_blank\' >' + 
									statusUserName + 
								'</a>' + 
							'</p>' + 
							'<p>' + 
								statusText + 
							'</p>' + 
							statusThumbnailPicHtml + 
						'</div>' + 
						'<div class=\'span2\'>' + 
							'<p style=\'text-align: center; \'>' + 
								'<button class=\'btn btn-primary\' onclick=\'clickFavDeleteButton(' + id + ')\'>删除</button>' + 
							'</p>' + 
						'</div>' + 
					'</div>'

				$('#favsDiv').append(favHtml);

				addFavIdToArray(favsLoadedIds, id);
			}
		}
	});
}

function showPreviousFavs() {
	currentFavsPage--;
	
	showFavs();
}

function showNextFavs() {
	currentFavsPage++;
	
	showFavs();
}