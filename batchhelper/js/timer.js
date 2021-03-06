var emotions;

$(document).ready(function() {
	//Status Text
	$('#statusFormCreateDiv #statusTextarea').on('keyup keydown input propertychange', function() {
		changeStatusText('statusFormCreateDiv');
	});
	
	//Extra Control Error
	$('#statusFormCreateDiv #extraControlErrorDivCloseButton').click(function() {
		$('#statusFormCreateDiv #extraControlErrorDiv').hide();
	});
	
	//Emotions
	$('#statusFormCreateDiv #emotionsLoadButton').click(function() {
		loadEmotions('statusFormCreateDiv');
	});
	
	$('#statusFormCreateDiv #emotionsDivCloseButton').click(function() {
		closeEmotionsDiv('statusFormCreateDiv');
	});
	
	//Picture
	$('#statusFormCreateDiv').on('change', '#pictureUploadInput', function() {
		uploadPicture('statusFormCreateDiv');
	});
	
	$('#statusFormCreateDiv #pictureThumbnailNameSpan').mouseover(function() {
		openPictureInfoDiv('statusFormCreateDiv');
	});
	
	$('#statusFormCreateDiv #pictureThumbnailNameSpan').mouseout(function() {
		closePictureInfoDiv('statusFormCreateDiv');
	});
	
	$('#statusFormCreateDiv #pictureDivCloseButton').click(function() {
		closePictureDiv('statusFormCreateDiv');
	});
	
	//DateTime
	$('#statusFormCreateDiv #date').datepicker({
	    format: 'yyyy-mm-dd',
	    language: 'zh-CN'
	});
	
	setDateTime('statusFormCreateDiv', new Date(new Date().getTime() + 10 * 60 * 1000));
	
	$('#statusFormCreateDiv #dateTimeErrorDivCloseButton').click(function() {
		$('#statusFormCreateDiv #dateTimeErrorDiv').hide();
	});
	
	$('#toBeSentStatusFormUpdateDivDismissButton').click(function() {
		closeToBeSentStatusFormUpdateDiv();
	});
	
	$('#toBeSentStatusFormUpdateDivCloseButton').click(function() {
		closeToBeSentStatusFormUpdateDiv();
	});
	
	$('#toBeSentStatusFormUpdateDivSaveButton').click(function() {
		updateToBeSentStatus();
	});
	
	$('#statusSendTiminglyButton').click(function() {
		sendStatusTimingly();
	});
	
	$('#statusSendImmediatelyButton').click(function() {
		sendStatusImmediately();
	});
	
	$('#statusSendErrorDivCloseButton').click(function() {
		$('#statusSendErrorDiv').hide();
	});
	
	showStatuses();
	
	//Status Text
	$('#toBeSentStatusFormUpdateDiv #statusTextarea').on('keyup keydown input propertychange', function() {
		changeStatusText('toBeSentStatusFormUpdateDiv');
	});
	
	//Extra Control Error
	$('#toBeSentStatusFormUpdateDiv #extraControlErrorDivCloseButton').click(function() {
		$('#toBeSentStatusFormUpdateDiv #extraControlErrorDiv').hide();
	});
	
	//Emotions
	$('#toBeSentStatusFormUpdateDiv #emotionsLoadButton').click(function() {
		loadEmotions('toBeSentStatusFormUpdateDiv');
	});
	
	$('#toBeSentStatusFormUpdateDiv #emotionsDivCloseButton').click(function() {
		closeEmotionsDiv('toBeSentStatusFormUpdateDiv');
	});
	
	//Picture
	$('#toBeSentStatusFormUpdateDiv').on('change', '#pictureUploadInput', function() {
		uploadPicture('toBeSentStatusFormUpdateDiv');
	});
	
	$('#toBeSentStatusFormUpdateDiv #pictureThumbnailNameSpan').mouseover(function() {
		openPictureInfoDiv('toBeSentStatusFormUpdateDiv');
	});
	
	$('#toBeSentStatusFormUpdateDiv #pictureThumbnailNameSpan').mouseout(function() {
		closePictureInfoDiv('toBeSentStatusFormUpdateDiv');
	});
	
	$('#toBeSentStatusFormUpdateDiv #pictureDivCloseButton').click(function() {
		closePictureDiv('toBeSentStatusFormUpdateDiv');
	});
	
	//DateTime
	$('#toBeSentStatusFormUpdateDiv #date').datepicker({
	    format: 'yyyy-mm-dd',
	    language: 'zh-CN'
	});
	
	$('#toBeSentStatusFormUpdateDiv #dateTimeErrorDivCloseButton').click(function() {
		$('#toBeSentStatusFormUpdateDiv #dateTimeErrorDiv').hide();
	});
});

function changeStatusText(containerDivId) {
	var currentStatusText = $('#' + containerDivId + ' #statusTextarea').val();
	
	var matcher = currentStatusText.match(/[^\x00-\xff]/g);
	var wlen  = (matcher && matcher.length) || 0;
	var remaining = Math.floor((140 * 2 - currentStatusText.length - wlen)/2);
	
	var buttonsDisabled;
	
	if (remaining >= 0) {
		$('#' + containerDivId + ' #statusTextRemainingWordsCountSpan').text(remaining);
		
		$('#' + containerDivId + ' #statusTextRemainingWordsCountDiv').show();
		$('#' + containerDivId + ' #statusTextExceedingWordsCountDiv').hide();
		
		if (remaining == 140) {
			buttonsDisabled = true;
		} else {
			buttonsDisabled = false;
		}
	} else {
		$('#' + containerDivId + ' #statusTextExceedingWordsCountSpan').text(Math.abs(remaining));
		
		$('#' + containerDivId + ' #statusTextRemainingWordsCountDiv').hide();
		$('#' + containerDivId + ' #statusTextExceedingWordsCountDiv').show();
		
		buttonsDisabled = true;
	}
	
	if ('statusFormCreateDiv' == containerDivId) {
		if (buttonsDisabled) {
			$('#statusSendTiminglyButton').attr('disabled', 'disabled');
			$('#statusSendImmediatelyButton').attr('disabled', 'disabled');
		} else {
			$('#statusSendTiminglyButton').removeAttr('disabled');
			$('#statusSendImmediatelyButton').removeAttr('disabled');
		}
	} else if ('toBeSentStatusFormUpdateDiv' == containerDivId) {
		if (buttonsDisabled) {
			$('#toBeSentStatusFormUpdateDivSaveButton').attr('disabled', 'disabled');
		} else {
			$('#toBeSentStatusFormUpdateDivSaveButton').removeAttr('disabled');
		}
	}
}

function getEmotionsGroupDivId(emotionsGroupDivIndex) {
	return 'emotionsGroupDiv_' + emotionsGroupDivIndex;
}

function getEmotionsCategoryDivId(emotionIndex) {
	return 'emotionsCategoryDiv_' + emotionIndex;
}

function getEmotionsInfoDivId(emotionIndex) {
	return 'emotionsInfoDiv_' + emotionIndex;
}

function assembleEmotionsGroupDivHtml(emotionsGroupDivIndex, categoryDivHtml, arrowDivHtml, infoDivHtml) {
	return emotionsGroupDivHtml = 
		'<div id=\'' + getEmotionsGroupDivId(emotionsGroupDivIndex) + '\' style=\'display: none;\'>' + 
			'<div name=\'emotionsTitleDiv\'>' + 
				'<div name=\'emotionsCategoryDiv\' class=\'pull-left\'>' +
					categoryDivHtml + 
				'</div>' + 
				'<div class=\'pull-right\' style=\'padding: 4px 0px;\'>' +
					arrowDivHtml + 
				'</div>' + 
				'<div class=\'clearfix\'></div>' + 
			'</div>' + 
			'<div name=\'emotionsInfoDiv\'>' +
				infoDivHtml + 
			'</div>' + 
		'</div>';
}

function addEmotions(containerDivId) {
	var length = emotions.length;
	
	var lastEmotionsGroupDivIndex;
	var emotionsGroupDivIndex;
	
	var arrowDivHtml;
	var categoryDivHtml;
	var infoDivHtml;
	
	for (var i = 0; i < length; i++) {
		var emotion = emotions[i];
		
		var category = emotion['category'];
		
		if (category == '') {
			category = '默认';
		}
		
		if (i % 5 == 0) {
			emotionsGroupDivIndex = i / 5;
			
			if (i == 0) {
				lastEmotionsGroupDivIndex = emotionsGroupDivIndex;
				
				if (length - i <= 5) {
					arrowDivHtml = 
						'<button class=\'btn\' style=\'padding: 0px 10px;\' type=\'button\' disabled=\'disabled\'>&lt;</button>' + 
						'&nbsp;&nbsp;' + 
			    		'<button class=\'btn\' style=\'padding: 0px 10px;\' type=\'button\' disabled=\'disabled\'>&gt;</button>'; 
				} else {
					arrowDivHtml = 
						'<button class=\'btn\' style=\'padding: 0px 10px;\' type=\'button\' disabled=\'disabled\'>&lt;</button>' + 
						'&nbsp;&nbsp;' + 
			    		'<button class=\'btn\' style=\'padding: 0px 10px;\' type=\'button\' onclick=\'showEmotionsGroupDiv("' + 
			    			containerDivId + '", ' + (emotionsGroupDivIndex + 1) + ')\'>&gt;</button>'; 
				}
			} else {
				$('#' + containerDivId + ' #emotionsGroupDiv').append(
					assembleEmotionsGroupDivHtml(lastEmotionsGroupDivIndex, categoryDivHtml, arrowDivHtml, infoDivHtml)
				);
				
				lastEmotionsGroupDivIndex = emotionsGroupDivIndex;
				
				if (length - i <= 5) {
					arrowDivHtml = 
						'<button class=\'btn\' style=\'padding: 0px 10px;\' type=\'button\' onclick=\'showEmotionsGroupDiv("' + 
							containerDivId + '", ' + (emotionsGroupDivIndex - 1) + ')\'>&lt;</button>' + 
						'&nbsp;&nbsp;' + 
			    		'<button class=\'btn\' style=\'padding: 0px 10px;\' type=\'button\' disabled=\'disabled\'>&gt;</button>'; 
				} else {
					arrowDivHtml = 
						'<button class=\'btn\' style=\'padding: 0px 10px;\' type=\'button\' onclick=\'showEmotionsGroupDiv("' + 
							containerDivId + '", ' + (emotionsGroupDivIndex - 1) + ')\'>&lt;</button>' + 
						'&nbsp;&nbsp;' + 
			    		'<button class=\'btn\' style=\'padding: 0px 10px;\' type=\'button\' onclick=\'showEmotionsGroupDiv("' + 
			    			containerDivId + '", ' + (emotionsGroupDivIndex + 1) + ')\'>&gt;</button>'; 
				}
			}
			
			categoryDivHtml = '';
			infoDivHtml = '';
		}
		
		categoryDivHtml += 
			'<div id=\'' + getEmotionsCategoryDivId(i) + '\' style=\'float: left; font-size:12px; padding: 4px 8px;\'>' + 
				'<a href="javascript:void(0);" onclick="showEmotionsInfoDiv(\'' + containerDivId + '\', ' + emotionsGroupDivIndex + ', ' + i + ');" >' + 
					category + 
				'</a>' + 
			'</div>';
		
		infoDivHtml += 
			'<div id=\'' + getEmotionsInfoDivId(i) + '\'>' + 
			'</div>';
		
		if (i == length - 1) {
			$('#' + containerDivId + ' #emotionsGroupDiv').append(
				assembleEmotionsGroupDivHtml(lastEmotionsGroupDivIndex, categoryDivHtml, arrowDivHtml, infoDivHtml)
			);
		}
	}
	
	showEmotionsGroupDiv(containerDivId, 0);
}

function showEmotionsGroupDiv(containerDivId, emotionsGroupDivIndex) {
	var expression;
	
	expression = $('#' + containerDivId + ' #emotionsGroupDiv > div');
	
	for (i = 0; i < expression.size(); i++) {
		var emotionsGroupDiv = expression.eq(i);
		
		var id = emotionsGroupDiv.attr('id');
		
		if (getEmotionsGroupDivId(emotionsGroupDivIndex) == id) {
			emotionsGroupDiv.show();
		} else {
			emotionsGroupDiv.hide();
		}
	}
	
	expression = $('#' + containerDivId + ' #' + getEmotionsGroupDivId(emotionsGroupDivIndex) + ' > div[name=emotionsInfoDiv] > div');
	
	empty = true;
	
	for (i = 0; i < expression.size(); i++) {
		var emotionsInfoDiv = expression.eq(i);
	
		if (emotionsInfoDiv.html() != '') {
			empty = false;
			break;
		}
	}
	
	if (empty) {
		showEmotionsInfoDiv(containerDivId, emotionsGroupDivIndex, emotionsGroupDivIndex * 5);
	}
}

function showEmotionsInfoDiv(containerDivId, emotionsGroupDivIndex, emotionIndex) {
	var expression;
	
	expression = $('#' + containerDivId + ' #' + getEmotionsGroupDivId(emotionsGroupDivIndex) + ' > div[name=emotionsTitleDiv] > div[name=emotionsCategoryDiv] > div');
	
	for (i = 0; i < expression.size(); i++) {
		var emotionsCategoryDiv = expression.eq(i);
		
		var id = emotionsCategoryDiv.attr('id');
		
		if (getEmotionsCategoryDivId(emotionIndex) == id) {
			$('#' + containerDivId + ' #' + id + ' > a').eq(0).css('color', '#ffffff');
			emotionsCategoryDiv.css('background', '#0088cc');
		} else {
			$('#' + containerDivId + ' #' + id + ' > a').eq(0).css('color', '#0088cc');
			emotionsCategoryDiv.css('background', '#ffffff');
		}
	}
	
	expression = $('#' + containerDivId + ' #' + getEmotionsGroupDivId(emotionsGroupDivIndex) + ' > div[name=emotionsInfoDiv] > div');
	
	var selectedEmotionsInfoDiv;
	
	for (i = 0; i < expression.size(); i++) {
		var emotionsInfoDiv = expression.eq(i);
		
		var id = emotionsInfoDiv.attr('id');
		
		if (getEmotionsInfoDivId(emotionIndex) == id) {
			selectedEmotionsInfoDiv = emotionsInfoDiv;
			
			emotionsInfoDiv.show();
		} else {
			emotionsInfoDiv.hide();
		}
	}
	
	if (selectedEmotionsInfoDiv.html() == '') {
		var info = emotions[emotionIndex]['info'];
		var hotInfo = info['hotInfo'];
		var commonInfo = info['commonInfo'];
		
		if (hotInfo.length > 0) {
			var hotInfoHtml = 
				'<div style=\'margin-top: 10px;\'>';
			
			for (var j = 0; j < hotInfo.length; j++) {
				var info = hotInfo[j];
				
				var name = info['name'];
				var value = info['value'];
				var icon = info['icon'];
				
				hotInfoHtml += 
					'<div style=\'float: left; border: 1px solid #fce089; background: #fef9e7; margin: 0px -1px -1px 0px; padding: 4px 2px; width: 26px; height: 22px; text-align: center;\'>' + 
						'<a href="javascript:void(0);" onclick="insertEmotionValueToStatusText(\'' + containerDivId + '\', \'' + value + '\');" title=\'' + name + '\'>' + 
							'<img src=\'' + icon + '\' style=\'width: 22px; height: 22px;\' />' + 
		            	'</a>' + 
	            	'</div>';
			}
			
			hotInfoHtml += 
				'</div>';
			
			selectedEmotionsInfoDiv.append(hotInfoHtml);
			
			selectedEmotionsInfoDiv.append('<div class=\'clearfix\'></div>');
		}
		
		if (commonInfo.length > 0) {
			var commonInfoHtml = 
				'<div style=\'margin-top: 10px;\'>';
			
			for (var j = 0; j < commonInfo.length; j++) {
				var info = commonInfo[j];
				
				var name = info['name'];
				var value = info['value'];
				var icon = info['icon'];
				
				commonInfoHtml += 
					'<div style=\'float: left; border: 1px solid #e8e8e8; margin: 0px -1px -1px 0px; padding: 4px 2px; width: 26px; height: 22px; text-align: center;\'>' + 
						'<a href="javascript:void(0);" onclick="insertEmotionValueToStatusText(\'' + containerDivId + '\', \'' + value + '\');" title=\'' + name + '\'>' + 
		            		'<img src=\'' + icon + '\' style=\'width: 22px; height: 22px;\' />' + 
		            	'</a>' + 
					'</div>';
			}
			
			commonInfoHtml += 
				'</div>';
			
			selectedEmotionsInfoDiv.append(commonInfoHtml);
			
			selectedEmotionsInfoDiv.append('<div class=\'clearfix\'></div>');
		}
	}
}

function insertEmotionValueToStatusText(containerDivId, emotionValue) {
	closeEmotionsDiv(containerDivId);
	
	var currentStatusText = $('#' + containerDivId + ' #statusTextarea').val();
	$('#' + containerDivId + ' #statusTextarea').val(currentStatusText + emotionValue);
	
	changeStatusText(containerDivId);
}

function closeEmotionsDiv(containerDivId) {
	$('#' + containerDivId + ' #emotionsDiv').hide();
}

function loadEmotions(containerDivId) {
	var offset = $('#' + containerDivId + ' #emotionsLoadDiv').offset();
	$('#' + containerDivId + ' #emotionsDiv').css('top', offset.top + 20);
	$('#' + containerDivId + ' #emotionsDiv').css('left', offset.left);
	
	var zIndex = $('#' + containerDivId + ' #statusMainFormDiv').css('z-index');
	
	if ('auto' == zIndex) {
		$('#' + containerDivId + ' #emotionsDiv').css('z-index', 1);
	} else {
		$('#' + containerDivId + ' #emotionsDiv').css('z-index', parseInt(zIndex) + 1);
	}
	
	$('#' + containerDivId + ' #emotionsDiv').show();
	
	if ($('#' + containerDivId + ' #emotionsGroupDiv').html() == '') {
		var emotionsLoadingDivHtml = 
			'<div id=\'emotionsLoadingDiv\' style=\'margin: 20px 0px; text-align: center;\'>' + 
				'<img src=\'img/loading.gif\' />' + 
			'</div>';
		
		if (emotions == undefined) {
			$.ajax({
				async: true, 
				type: 'GET', 
				dataType: 'json', 
				url: 'action.php', 
				data: {'action' : 'getEmotions', 'type' : 'face'},
				beforeSend: function() {
					$('#' + containerDivId + ' #emotionsGroupDiv').append(emotionsLoadingDivHtml);
				},
				success: function(data, textStatus) {
					$('#' + containerDivId + ' #emotionsLoadingDiv').remove();
					
					var length = data.length;
						
					if (length > 0) {
						$('#' + containerDivId + ' #extraControlErrorDiv').hide();
						
						emotions = data;
						
						addEmotions(containerDivId);
					} else {
						$('#' + containerDivId + ' #emotionsDiv').hide();
						
						$('#' + containerDivId + ' #extraControlErrorSpan').text('加载表情失败');
						$('#' + containerDivId + ' #extraControlErrorDiv').show();
					}
				},
				error : function(xmlHttpRequest, textStatus, errorThrown) {
					$('#' + containerDivId + ' #emotionsLoadingDiv').remove();
					$('#' + containerDivId + ' #emotionsDiv').hide();
					
					$('#' + containerDivId + ' #extraControlErrorSpan').text('加载表情失败');
					$('#' + containerDivId + ' #extraControlErrorDiv').show();
				}
			});
		} else {
			addEmotions(containerDivId);
		}
	}
}

function addPicture(containerDivId, pictureName, picturePath, 
		pictureThumbnailWidth, pictureThumbnailHeight) {
	var pictureThumbnailName;
	
	if (pictureName.length <= 10) {
		pictureThumbnailName = pictureName;
	} else {
		pictureThumbnailName = '...' + 
			pictureName.substring(pictureName.length - 10, pictureName.length);
	}
	
	$('#' + containerDivId + ' #pictureNameSpan').text(pictureName);
	$('#' + containerDivId + ' #pictureThumbnailNameSpan').text(pictureThumbnailName);
	$('#' + containerDivId + ' #pictureTitleDiv').show();
	
	$('#' + containerDivId + ' #pictureInfoImg').attr('src', picturePath);
	
	$('#' + containerDivId + ' #pictureInfoDiv').css('width', pictureThumbnailWidth);
	$('#' + containerDivId + ' #pictureInfoDiv').css('height', pictureThumbnailHeight);
	
	var offset = $('#' + containerDivId + ' #pictureTitleDiv').offset();
	$('#' + containerDivId + ' #pictureInfoDiv').css('top', offset.top + 20);
	$('#' + containerDivId + ' #pictureInfoDiv').css('left', offset.left);
	
	var zIndex = $('#' + containerDivId + ' #statusMainFormDiv').css('z-index');
	
	if ('auto' == zIndex) {
		$('#' + containerDivId + ' #pictureInfoDiv').css('z-index', 1);
	} else {
		$('#' + containerDivId + ' #pictureInfoDiv').css('z-index', parseInt(zIndex) + 1);
	}
	
	$('#' + containerDivId + ' #pictureInfoDiv').slideDown(1000).delay(1000).slideUp(1000);
}

function uploadPicture(containerDivId) {
	$('#' + containerDivId + ' #pictureUploadDiv').hide();
	$('#' + containerDivId + ' #pictureUploadingDiv').show();
	
	$.ajaxFileUpload({
		url: 'action.php',
		secureuri: false,
		fileElementId: containerDivId + ' #pictureUploadInput',
		dataType: 'json',
		data: {'action' : 'uploadPicture', 'fileElementName' : 'pictureUploadInput'},
		success: function(data, textStatus) {
			$('#' + containerDivId + ' #pictureUploadingDiv').hide();
			
			var error = data['error'];
			
			if (error != undefined) {
				if ('upload file failed' == error) {
					$('#' + containerDivId + ' #pictureUploadDiv').show();
					
					$('#' + containerDivId + ' #extraControlErrorSpan').text('上传图片失败');
					$('#' + containerDivId + ' #extraControlErrorDiv').show();
				} else if ('bad format' == error) {
					$('#' + containerDivId + ' #pictureUploadDiv').show();
					
					$('#' + containerDivId + ' #extraControlErrorSpan').text('仅支持JPEG、GIF、PNG格式');
					$('#' + containerDivId + ' #extraControlErrorDiv').show();
				} else if ('too large size' == error) {
					$('#' + containerDivId + ' #pictureUploadDiv').show();
					
					$('#' + containerDivId + ' #extraControlErrorSpan').text('图片大小必须小于5M');
					$('#' + containerDivId + ' #extraControlErrorDiv').show();
				}
			} else {
				$('#' + containerDivId + ' #extraControlErrorDiv').hide();
				
				var pictureName = data['pictureName'];
				var picturePath = data['picturePath'];
				var pictureThumbnailWidth = data['pictureThumbnailWidth'];
				var pictureThumbnailHeight = data['pictureThumbnailHeight'];
				
				addPicture(containerDivId, pictureName, picturePath, 
						pictureThumbnailWidth, pictureThumbnailHeight);
			}
        },
        error : function(xmlHttpRequest, textStatus, errorThrown) {
        	$('#' + containerDivId + ' #pictureUploadingDiv').hide();
        	$('#' + containerDivId + ' #pictureUploadDiv').show();
			
        	$('#' + containerDivId + ' #extraControlErrorSpan').text('上传图片失败');
        	$('#' + containerDivId + ' #extraControlErrorDiv').show();
		}
    });
}

function openPictureInfoDiv(containerDivId) {
	$('#' + containerDivId + ' #pictureInfoDiv').show();
}

function closePictureInfoDiv(containerDivId) {
	$('#' + containerDivId + ' #pictureInfoDiv').hide();
}

function closePictureDiv(containerDivId) {
	$('#' + containerDivId + ' #pictureUploadInput').val('');
	$('#' + containerDivId + ' #pictureNameSpan').text('');
	$('#' + containerDivId + ' #pictureThumbnailNameSpan').text('');
	$('#' + containerDivId + ' #pictureInfoImg').removeAttr("style");
	$('#' + containerDivId + ' #pictureInfoImg').removeAttr('src');
	
	$('#' + containerDivId + ' #pictureTitleDiv').hide();
	$('#' + containerDivId + ' #pictureUploadDiv').show();
}

function setDateTime(containerDivId, dateTime) {
	var datepicker = $('#' + containerDivId + ' #date').data('datepicker');
	
	datepicker.setDate(dateTime);
	
	$('#' + containerDivId + ' #hour').val(dateTime.getHours());
	$('#' + containerDivId + ' #minute').val(dateTime.getMinutes());
}

function getDateTime(containerDivId) {
	var datepicker = $('#' + containerDivId + ' #date').data('datepicker');
	
	var dateTime = datepicker.getDate();
	
	dateTime.setHours($('#' + containerDivId + ' #hour').val());
	dateTime.setMinutes($('#' + containerDivId + ' #minute').val());
	dateTime.setSeconds(0);
	dateTime.setMilliseconds(0);
	
	return dateTime;
}

function getToBeSentStatusPictureDivId(id) {
	return 'toBeSentStatus_pictureDiv_' + id;
}

function openToBeSentStatusPictureDiv(id) {
	$('#' + getToBeSentStatusPictureDivId(id)).show();
}

function closeToBeSentStatusPictureDiv(id) {
	$('#' + getToBeSentStatusPictureDivId(id)).hide();
}

function getToBeSentStatusTrId(id) {
	return 'toBeSentStatus_tr_' + id;
}

function removeToBeSentStatus(id) {
	$('#' + getToBeSentStatusTrId(id)).remove();
	
	if ($('#toBeSentStatusesTbody').html() == '') {
		$('#toBeSentStatusesTbody').hide();
	}
}

function deleteToBeSentStatus(id) {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'deleteToBeSentStatus', 'id' : id},
		success: function(data, textStatus) {
			var error = data['error'];
			
			if (error == undefined) {
				removeToBeSentStatus(id);
			}
		}
	});
}

function openToBeSentStatusFormUpdateDiv(id, statusText, 
		statusPictureName, statusPicturePath, statusPictureThumbnailWidth, statusPictureThumbnailHeight, 
		statusDateTime) {
	$('#toBeSentStatusFormUpdateDiv #statusMainFormDiv').modal('show');
	
	$('#toBeSentStatusFormUpdateDiv #statusSendIdInput').val(id);
	
	$('#toBeSentStatusFormUpdateDiv #statusTextarea').val(statusText);
	changeStatusText('toBeSentStatusFormUpdateDiv');
	
	if (statusPictureName != undefined && 
			statusPicturePath != undefined && 
			statusPictureThumbnailWidth != undefined && 
			statusPictureThumbnailHeight != undefined) {
		$('#toBeSentStatusFormUpdateDiv #pictureUploadDiv').hide();
		
		addPicture('toBeSentStatusFormUpdateDiv', statusPictureName, statusPicturePath, 
				statusPictureThumbnailWidth, statusPictureThumbnailHeight);
	}
	
	setDateTime('toBeSentStatusFormUpdateDiv', new Date(statusDateTime.replace(/-/g, '/')));
}

function closeToBeSentStatusFormUpdateDiv() {
	$('#toBeSentStatusFormUpdateDiv #statusTextarea').val('');
	changeStatusText('toBeSentStatusFormUpdateDiv');
	
	closeEmotionsDiv('toBeSentStatusFormUpdateDiv');
	closePictureDiv('toBeSentStatusFormUpdateDiv');
	
	$('#toBeSentStatusFormUpdateDiv #extraControlErrorDiv').hide();
	$('#toBeSentStatusFormUpdateDiv #dateTimeErrorDiv').hide();
	
	$('#toBeSentStatusFormUpdateDiv #statusMainFormDiv').modal('hide');
}

function checkStatus(containerDivId) {
	var dateTime = getDateTime(containerDivId);
	
	var currentDate = new Date();
	currentDate.setSeconds(0);
	currentDate.setMilliseconds(0);
	
	var startDate = currentDate;
	var endDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
	
	if (dateTime < startDate) {
		$('#' + containerDivId + ' #dateTimeErrorSpan').text('定时时间不能早于当前时间');
		$('#' + containerDivId + ' #dateTimeErrorDiv').show();
		
		return -1;
	} else if (dateTime - currentDate == 0) {
		return 0;
	} else if (dateTime > endDate) {
		$('#' + containerDivId + ' #dateTimeErrorSpan').text('定时时间不能晚于两周');
		$('#' + containerDivId + ' #dateTimeErrorDiv').show();
		
		return -1;
	}
	
	return 1;
}

function getDateTimeStr(dateTime) {
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	var day = dateTime.getDate();
	var hour = dateTime.getHours();
	var minute = dateTime.getMinutes();
	var second = dateTime.getSeconds();
	
	var yearStr = year;
	var monthStr = month >= 10 ? month : '0' + month;
	var dayStr = day >= 10 ? day : '0' + day;
	var hourStr = hour >= 10 ? hour : '0' + hour;
	var minuteStr = minute >= 10 ? minute : '0' + minute;
	var secondStr = second >= 10 ? second : '0' + second;
	
	return yearStr + '-' + monthStr + '-' + dayStr + ' ' + hourStr + ':' + minuteStr + ':' + secondStr;
}

function updateToBeSentStatus() {
	var id = $('#toBeSentStatusFormUpdateDiv #statusSendIdInput').val();
	var text = $('#toBeSentStatusFormUpdateDiv #statusTextarea').val();
	var pictureName = $('#toBeSentStatusFormUpdateDiv #pictureNameSpan').text();
	var picturePath = $('#toBeSentStatusFormUpdateDiv #pictureInfoImg').attr('src');
	
	if (pictureName == '') {
		pictureName = undefined;
	}
	
	var dateTime = getDateTime('toBeSentStatusFormUpdateDiv');
	
	var statusType = checkStatus('toBeSentStatusFormUpdateDiv');
	
	if (statusType == -1) {
		return;
	} else if (statusType == 0) {
		closeToBeSentStatusFormUpdateDiv();
		
		sendToBeSentStatus(id, text, pictureName, picturePath);
		
		return;
	}
	
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'updateToBeSentStatus', 'id' : id , 'userId' : uid, 'text' : text, 
			'pictureName' : pictureName, 'picturePath' : picturePath, 'datetime' : getDateTimeStr(dateTime)},
		beforeSend: function() {
			$('#toBeSentStatusFormUpdateDivSaveButton').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			$('#toBeSentStatusFormUpdateDivSaveButton').removeAttr('disabled');
			
			var error = data['error'];
			
			if (error == undefined) {
				closeToBeSentStatusFormUpdateDiv();
				
				removeToBeSentStatus(id);
				
				$('#toBeSentStatusesTbody').show();
				addToBeSentStatus(data);
			}
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			$('#toBeSentStatusFormUpdateDivSaveButton').removeAttr('disabled');
		}
	});
}

function sendToBeSentStatus(id, statusText, statusPictureName, statusPicturePath) {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'sendToBeSentStatus', 'id' : id , 'userId' : uid, 'text' : statusText, 
			'pictureName' : statusPictureName, 'picturePath' : statusPicturePath},
		success: function(data, textStatus) {
			var error = data['error'];
			
			if (error == undefined) {
				removeToBeSentStatus(id);
				
				$('#sentStatusesTbody').show();
				addSentStatus(data);
			}
		}
	});
}

function addToBeSentStatus(toBeSentStatus) {
	var id = toBeSentStatus['id'];
	var statusText = toBeSentStatus['statusText'];
	var statusPictureName = toBeSentStatus['statusPictureName'];
	var statusPicturePath = toBeSentStatus['statusPicturePath'];
	var statusPictureThumbnailWidth = toBeSentStatus['statusPictureThumbnailWidth'];
	var statusPictureThumbnailHeight = toBeSentStatus['statusPictureThumbnailHeight'];
	var statusDateTime = toBeSentStatus['statusDateTime'];
	
	var pictureHtml;
	var openToBeSentStatusFormUpdateHtml;
	
	var toBeSentStatusDeleteButtonId = 'toBeSentStatus_delete_button_' + id;
	var toBeSentStatusSendButtonId = 'toBeSentStatus_send_button_' + id;
	
	if (statusPicturePath != undefined && 
			statusPictureThumbnailWidth != undefined && 
			statusPictureThumbnailHeight != undefined) {
		pictureHtml = 
			'<div style="position: relative;">' + 
				'<a target="_blank" href="' + statusPicturePath + '" ' + 
					'onmouseover="openToBeSentStatusPictureDiv(' + id + ')"' + 
					'onmouseout="closeToBeSentStatusPictureDiv(' + id + ')">查看图片</a>' +
				'<div id="' + getToBeSentStatusPictureDivId(id) + '" class="thumbnail" ' + 
					'style="position: absolute; width: ' + 
						statusPictureThumbnailWidth + 'px; height: ' + statusPictureThumbnailHeight + 'px; z-index: 1; display: none;">' + 
					'<img src="' + statusPicturePath + '"/>' + 
				'</div>' + 
			'</div>';
			
		openToBeSentStatusFormUpdateHtml = 
			'<div>' + 
				'<a href="javascript:void(0);" onclick="openToBeSentStatusFormUpdateDiv(' + 
					id + ', \'' + statusText + '\', \'' + statusPictureName + '\', \'' + statusPicturePath + '\', ' + 
					statusPictureThumbnailWidth + ', ' + statusPictureThumbnailHeight + ', \'' + 
					statusDateTime + '\')">修改记录</a>' + 
			'</div>';
	} else {
		pictureHtml = '';
			
		openToBeSentStatusFormUpdateHtml = 
			'<div>' + 
				'<a href="javascript:void(0);" onclick="openToBeSentStatusFormUpdateDiv(' + 
					id + ', \'' + statusText + '\', ' + statusPictureName + ', ' + statusPicturePath + ', ' + 
					statusPictureThumbnailWidth + ', ' + statusPictureThumbnailHeight + ', \'' + 
					statusDateTime + '\')">修改记录</a>' + 
			'</div>';
	}
	
	var toBeSentStatusTrHtml = 
		'<tr id="' + getToBeSentStatusTrId(id) + '">' + 
			'<td style="border: gray; border-style: solid; border-width: 1px; text-align: center;">' + 
				'<div>' + 
					statusDateTime.substring(0, statusDateTime.length - 3) + 
				'</div>' + 
			'</td>' + 
			'<td style="border: gray; border-style: solid; border-width: 1px;">' + 
				'<div style="width: 600px; word-wrap: break-word;">' + 
					statusText + 
        		'</div>' + 
        		pictureHtml + 
      		'</td>' + 
			'<td style="border: gray; border-style: solid; border-width: 1px; text-align: center;">' + 
				'<div>' + 
					'等待发布' + 
				'</div>' + 
			'</td>' + 
			'<td style="border: gray; border-style: solid; border-width: 1px; text-align: center;">' + 
				'<div>' + 
					'<a id="' + toBeSentStatusSendButtonId + '" href="javascript:void(0);">立即发布</a>' + 
				'</div>' + 
				openToBeSentStatusFormUpdateHtml + 
				'<div>' + 
					'<a id="' + toBeSentStatusDeleteButtonId + '" href="javascript:void(0);">删除记录</a>' + 
				'</div>' + 
			'</td>' + 
		'</tr>';
	
	$('#toBeSentStatusesTbody').prepend(toBeSentStatusTrHtml);
	
	$('#' + toBeSentStatusDeleteButtonId).confirm({
		'title' : '删除记录确认',
		'message' : '<div style="width: 530px; word-wrap: break-word;">' + statusText + '</div>',
		'action' : function() {
			deleteToBeSentStatus(id);
			
			$('.confirm-modal').modal('hide');
		}
	});
	
	$('#' + toBeSentStatusSendButtonId).confirm({
		'title' : '立即发布确认',
		'message' : '<div style="width: 530px; word-wrap: break-word;">' + statusText + '</div>',
		'action' : function() {
			sendToBeSentStatus(id, statusText, statusPictureName, statusPicturePath);
			
			$('.confirm-modal').modal('hide');
		}
	});
}

function sendStatusTimingly() {
	var statusType = checkStatus('statusFormCreateDiv');
	
	if (statusType == -1) {
		return;
	} else if (statusType == 0) {
		sendStatusImmediately();
		
		return;
	}
	
	var text = $('#statusFormCreateDiv #statusTextarea').val();
	var pictureName = $('#statusFormCreateDiv #pictureNameSpan').text();
	var picturePath = $('#statusFormCreateDiv #pictureInfoImg').attr('src');
	
	if (pictureName == '') {
		pictureName = undefined;
	}
	
	var dateTime = getDateTime('statusFormCreateDiv');
	
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'saveStatus', 'userId' : uid, 'text' : text, 
			'pictureName' : pictureName, 'picturePath' : picturePath, 'datetime' : getDateTimeStr(dateTime)},
		beforeSend: function() {
			$('#statusSendTiminglyButton').attr('disabled', 'disabled');
			$('#statusSendImmediatelyButton').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			$('#statusSendTiminglyButton').removeAttr('disabled');
			$('#statusSendImmediatelyButton').removeAttr('disabled');
			
			var error = data['error'];
			
			if (error == undefined) {
				$('#statusFormCreateDiv #statusTextarea').val('');
				changeStatusText('statusFormCreateDiv');
				
				closeEmotionsDiv('statusFormCreateDiv');
				closePictureDiv('statusFormCreateDiv');
				
				$('#statusFormCreateDiv #extraControlErrorDiv').hide();
				$('#statusFormCreateDiv #dateTimeErrorDiv').hide();
				$('#statusSendErrorDiv').hide();
				
				$('#toBeSentStatusesTbody').show();
				addToBeSentStatus(data);
				
				setDateTime('statusFormCreateDiv', new Date(dateTime.getTime() + 10 * 60 * 1000));
				
				$('#statusFormCreateDiv #statusSendSuccessfullyDiv').fadeIn(1000).delay(1000).fadeOut(1000);
			} else {
				if ('save status failed' == error) {
					$('#statusSendFailedSpan').text('发布失败');
					$('#statusSendErrorDiv').show();
				}
			}
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			$('#statusSendTiminglyButton').removeAttr('disabled');
			$('#statusSendImmediatelyButton').removeAttr('disabled');
			
			$('#statusSendFailedSpan').text('发布失败');
			$('#statusSendErrorDiv').show();
		}
	});
}

function getSentStatusPictureDivId(id) {
	return 'sentStatus_pictureDiv_' + id;
}

function openSentStatusPictureDiv(id) {
	$('#' + getSentStatusPictureDivId(id)).show();
}

function closeSentStatusPictureDiv(id) {
	$('#' + getSentStatusPictureDivId(id)).hide();
}

function getSentStatusTrId(id) {
	return 'sentStatus_tr_' + id;
}

function removeSentStatus(id) {
	$('#' + getSentStatusTrId(id)).remove();
	
	if ($('#sentStatusesTbody').html() == '') {
		$('#sentStatusesTbody').hide();
	}
}

function deleteSentStatus(id) {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'deleteSentStatus', 'id' : id},
		success: function(data, textStatus) {
			var error = data['error'];
			
			if (error == undefined) {
				removeSentStatus(id);
			}
		}
	});
}

function deleteStatus(id, statusId) {
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'deleteStatus', 'id' : id , 'statusId' : statusId},
		success: function(data, textStatus) {
			var error = data['error'];
			
			if (error == undefined) {
				removeSentStatus(id);
			}
		}
	});
}

function addSentStatus(sentStatus) {
	var id = sentStatus['id'];
	var statusId = sentStatus['statusId'];
	var statusText = sentStatus['statusText'];
	var statusPictureName = sentStatus['statusPictureName'];
	var statusPicturePath = sentStatus['statusPicturePath'];
	var statusPictureThumbnailWidth = sentStatus['statusPictureThumbnailWidth'];
	var statusPictureThumbnailHeight = sentStatus['statusPictureThumbnailHeight'];
	var statusDateTime = sentStatus['statusDateTime'];
	
	var pictureHtml;
	
	var sentStatusDeleteButtonId = 'sentStatus_delete_button_' + id;
	var statusDeleteButtonId = 'status_delete_button_' + id;
	
	if (statusPicturePath != undefined && 
			statusPictureThumbnailWidth != undefined && 
			statusPictureThumbnailHeight != undefined) {
		pictureHtml = 
			'<div style="position: relative;">' + 
				'<a target="_blank" href="' + statusPicturePath + '" ' + 
					'onmouseover="openSentStatusPictureDiv(' + id + ')"' + 
					'onmouseout="closeSentStatusPictureDiv(' + id + ')">查看图片</a>' +
				'<div id="' + getSentStatusPictureDivId(id) + '" class="thumbnail" ' + 
					'style="position: absolute; width: ' + 
						statusPictureThumbnailWidth + 'px; height: ' + statusPictureThumbnailHeight + 'px; z-index: 1; display: none;">' + 
					'<img src="' + statusPicturePath + '"/>' + 
				'</div>' + 
			'</div>';
	} else {
		pictureHtml = '';
	}
	
	var sentStatusTrHtml = 
		'<tr id="' + getSentStatusTrId(id) + '">' + 
			'<td style="border: gray; border-style: solid; border-width: 1px; text-align: center;">' + 
				'<div>' + 
					statusDateTime.substring(0, statusDateTime.length - 3) + 
				'</div>' + 
			'</td>' + 
			'<td style="border: gray; border-style: solid; border-width: 1px;">' + 
				'<div style="width: 600px; word-wrap: break-word;">' + 
					statusText + 
        		'</div>' + 
        		pictureHtml + 
      		'</td>' + 
			'<td style="border: gray; border-style: solid; border-width: 1px; text-align: center;">' + 
				'<div>' + 
					'发布成功' + 
				'</div>' + 
			'</td>' + 
			'<td style="border: gray; border-style: solid; border-width: 1px; text-align: center;">' + 
				'<div>' + 
					'<a href="http://api.t.sina.com.cn/' + uid + '/statuses/' + statusId + '" target="_blank">查看微博</a>' + 
				'</div>' + 
				'<div>' + 
					'<a id="' + statusDeleteButtonId + '" href="javascript:void(0);">删除微博</a>' + 
				'</div>' + 
				'<div>' + 
					'<a id="' + sentStatusDeleteButtonId + '" href="javascript:void(0);">删除记录</a>' + 
				'</div>' + 
			'</td>' + 
		'</tr>';
	
	$('#sentStatusesTbody').prepend(sentStatusTrHtml);
	
	$('#' + sentStatusDeleteButtonId).confirm({
		'title' : '删除记录确认',
		'message' : '<div style="width: 530px; word-wrap: break-word;">' + statusText + '</div>',
		'action' : function() {
			deleteSentStatus(id);
			
			$('.confirm-modal').modal('hide');
		}
	});
	
	$('#' + statusDeleteButtonId).confirm({
		'title' : '删除微博确认',
		'message' : '<div style="width: 530px; word-wrap: break-word;">' + statusText + '</div>',
		'action' : function() {
			deleteStatus(id, statusId);
			
			$('.confirm-modal').modal('hide');
		}
	});
}

function sendStatusImmediately() {
	var text = $('#statusFormCreateDiv #statusTextarea').val();
	var pictureName = $('#statusFormCreateDiv #pictureNameSpan').text();
	var picturePath = $('#statusFormCreateDiv #pictureInfoImg').attr('src');
	
	if (pictureName == '') {
		pictureName = undefined;
	}
	
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'sendStatus', 'userId' : uid, 'text' : text, 'pictureName' : pictureName, 'picturePath' : picturePath},
		beforeSend: function() {
			$('#statusSendTiminglyButton').attr('disabled', 'disabled');
			$('#statusSendImmediatelyButton').attr('disabled', 'disabled');
		},
		success: function(data, textStatus) {
			$('#statusSendTiminglyButton').removeAttr('disabled');
			$('#statusSendImmediatelyButton').removeAttr('disabled');
			
			var error = data['error'];
			
			if (error == undefined) {
				$('#statusFormCreateDiv #statusTextarea').val('');
				changeStatusText('statusFormCreateDiv');
				
				closeEmotionsDiv('statusFormCreateDiv');
				closePictureDiv('statusFormCreateDiv');
				
				$('#statusFormCreateDiv #extraControlErrorDiv').hide();
				$('#statusFormCreateDiv #dateTimeErrorDiv').hide();
				$('#statusSendErrorDiv').hide();
				
				$('#sentStatusesTbody').show();
				addSentStatus(data);
				
				$('#statusFormCreateDiv #statusSendSuccessfullyDiv').fadeIn(1000).delay(1000).fadeOut(1000);
			} else {
				if ('send status failed' == error) {
					$('#statusSendFailedSpan').text('发布失败');
					$('#statusSendErrorDiv').show();
				}
			}
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			$('#statusSendTiminglyButton').removeAttr('disabled');
			$('#statusSendImmediatelyButton').removeAttr('disabled');
			
			$('#statusSendFailedSpan').text('发布失败');
			$('#statusSendErrorDiv').show();
		}
	});
}

function showStatuses() {
	$.ajax({
		async: true, 
		type: 'GET', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'getStatuses', 'userId' : uid},
		success: function(data, textStatus) {
			//To Be Sent Statuses
			var toBeSentStatuses = data['toBeSentStatuses'];
			
			if (toBeSentStatuses.length > 0) {
				$('#toBeSentStatusesTbody').show();
				
				for (var i = 0; i < toBeSentStatuses.length; i++) {
					var toBeSentStatus = toBeSentStatuses[i];
					
					addToBeSentStatus(toBeSentStatus);
				}
			}
			
			//Sent Statuses
			var sentStatuses = data['sentStatuses'];
			
			if (sentStatuses.length > 0) {
				$('#sentStatusesTbody').show();
				
				for (var i = 0; i < sentStatuses.length; i++) {
					var sentStatus = sentStatuses[i];
					
					addSentStatus(sentStatus);
				}
			}
		}
	});
}
