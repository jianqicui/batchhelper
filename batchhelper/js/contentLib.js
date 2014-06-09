var statuses;

$(document).ready(function() {
	showTypes();
});

function showTypes() {
	$('#typesUl').html('');
	
	$.ajax({
		async: true, 
		type: 'GET', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'getTypes'},
		success: function(data, textStatus) {
			for (var i = 0; i < data.length; i++) {
				var type = data[i];
				
				var code = type['code'];
				var name = type['name'];
				
				var typeHtml = 
					'<li>' + 
						'<a href="javascript:void(0);" onclick="showStatuses(' + code + ', 0)">' + 
							'<div style="text-align: center;">' + name + '</div>' + 
						'</a>' + 
					'</li>';
				
				$('#typesUl').append(typeHtml);
			}
			
			showStatuses(1, 0);
		}
	});
}

function setTypeActive(typeId) {
	var typeLis = $('#typesUl > li');
	
	for (i = 0; i < typeLis.size(); i++) {
		var typeLi = typeLis.eq(i);
		
		if (i + 1 == typeId) {
			typeLi.attr('class', 'active');
		} else {
			typeLi.removeAttr('class');
		}
	}
}

function showStatuses(typeCode, page) {
	setTypeActive(typeCode);
	
	$('#statusesDiv').html('');
	
	var count = 5;
	
	$.ajax({
		async: true, 
		type: 'GET', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'getStatusesByTypeCode', 'typeCode' : typeCode, 'page' : page, 'count' : count},
		success: function(data, textStatus) {
			statuses = data['statuses'];
			var totalNumber = data['totalNumber'];
			
			for (var i = 0; i < statuses.length; i++) {
				var status = statuses[i];
				
				var statusId = status['statusId'];
				var statusText = status['statusText'];
				var statusPicturePath = status['statusPicturePath'];
				
				var statusHtml = 
					'<div style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #BBBBBB;">' +
						'<div class="row">' + 
							'<div class="span8">' + 
								'<p class="thumbnail" style="width: 100%; height: 80px;">' + statusText + '</p>' + 
							'</div>' + 
							'<div class="span2" >' + 
								'<a class="thumbnail" href="javascript:void(0);" onclick="showStatusPictureDiv(\'' + statusPicturePath + '\')">' + 
									'<img src="' + statusPicturePath + '" style="width: 100%; height: 80px;" />' + 
								'</a>' + 
							'</div>' + 
						'</div>' + 
						'<div class="row">' + 
							'<div class="span10" style="text-align: center;">' + 
								'<button type="button" class="btn" onclick="sendStatusImmediately(' + typeCode + ', ' + statusId + ')">立即发布</button>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
				$('#statusesDiv').append(statusHtml);
			}
			
			var totalPage = Math.ceil(totalNumber / count);
			
			if (totalPage != 0) {
				var paginationHtml = '';
				
				paginationHtml += 
					'<div class="row">' + 
						'<div class="span10" style="text-align: center;">' + 
					    	'<div class="pagination">' + 
					    		'<ul>';
				
				var firstPaginationHtml = '<a href="javascript:void(0);" onclick="showStatuses(' + typeCode + ', 0)">&lt;&lt;</a>';
				
				if (page == 0) {
					paginationHtml += '<li class="disabled">' + firstPaginationHtml + '</li>';
				} else {
					paginationHtml += '<li>' + firstPaginationHtml + '</li>';
				}
				
				var prevPageRange = 5;
				var nextPageRange = 5;
				
				var beginPaginationPage;
				var endPaginationPage;
				
				if (page - prevPageRange > 0 && totalPage - page > nextPageRange) {
					beginPaginationPage = page - prevPageRange;
					endPaginationPage = page + nextPageRange;
				} else if (page - prevPageRange > 0) {
					beginPaginationPage = totalPage - prevPageRange - nextPageRange > 0 ? totalPage - prevPageRange - nextPageRange : 0;
					endPaginationPage = totalPage;
				} else if (totalPage - page > nextPageRange) {
					beginPaginationPage = 0;
					endPaginationPage = prevPageRange + nextPageRange  < totalPage ? prevPageRange + nextPageRange : totalPage;
				} else {
					beginPaginationPage = 0;
					endPaginationPage = totalPage;
				}
				
				for (var i = beginPaginationPage; i < endPaginationPage; i++) {
					var onePaginationHtml = '<a href="javascript:void(0);" onclick="showStatuses(' + typeCode + ', ' + i + ')">' + (i + 1) + '</a>';
					
					if (page == i) {
						paginationHtml += '<li class="disabled">' + onePaginationHtml + '</li>';
					} else {
						paginationHtml += '<li>' + onePaginationHtml + '</li>';
					}
				}
				
				var lastPaginationHtml = '<a href="javascript:void(0);" onclick="showStatuses(' + typeCode + ', ' + (totalPage - 1) + ')">&gt;&gt;</a>';
				
				if (page == totalPage - 1) {
					paginationHtml += '<li class="disabled">' + lastPaginationHtml + '</li>';
				} else {
					paginationHtml += '<li>' + lastPaginationHtml + '</li>';
				}
				
				paginationHtml += 
					    		'</ul>' + 
					    	'</div>' + 
						'</div>' + 
					'</div>';
				
				$('#statusesDiv').append(paginationHtml);
			}
		}
	});
}

function showStatusPictureDiv(statusPicturePath) {
	var statusPictureImg = $('#statusPictureDiv > div > img').eq(0);
	statusPictureImg.removeAttr('src');
	statusPictureImg.attr('src', statusPicturePath);
	
	$('#statusPictureDiv').modal('show');
}

function sendStatusImmediately(typeCode, statusId) {
	var text;
	var picturePath;
	
	for (var i = 0; i < statuses.length; i++) {
		var status = statuses[i];
		
		text = status['statusText'];
		picturePath = status['statusPicturePath'];
		
		if (status['statusId'] == statusId) {
			break;
		}
	}
	
	if (text == undefined || picturePath == undefined) {
		return;
	}
	
	var pictureName = picturePath.substring((picturePath.lastIndexOf('/') + 1), picturePath.length);
	
	var alertBodyDiv = $('#alertDiv > div').eq(0);
	
	$.ajax({
		async: true, 
		type: 'POST', 
		dataType: 'json', 
		url: 'action.php', 
		data: {'action' : 'sendStatus', 'userId' : uid, 'text' : text, 'pictureName' : pictureName, 'picturePath' : picturePath},
		success: function(data, textStatus) {
			var error = data['error'];
			
			if (error == undefined) {
				alertBodyDiv.text('发布成功');
			} else {
				alertBodyDiv.text('发布失败');
			}
			
			$('#alertDiv').modal('show');
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			alertBodyDiv.text('发布失败');
			
			$('#alertDiv').modal('show');
		}
	});
}