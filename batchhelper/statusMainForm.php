<div style="width: 555px; margin: auto;">
	<input id="statusSendIdInput" type="hidden" />

	<div>
		<div style="margin-bottom: 10px;">
			<div class="pull-left">
				<img src="img/publish-title.png" />
			</div>
			<div class="pull-right" style="line: 34px; line-height: 34px;">
				<div id="statusTextRemainingWordsCountDiv" style="font-size: 12px; color: #808080;">
					发言请遵守社区公约，还可以输入
					<span id="statusTextRemainingWordsCountSpan" style="font-style: italic; font-family: Constantia, Georgia; font-size: 22px; font-weight: 700;">140</span>
					字
				</div>
				<div id="statusTextExceedingWordsCountDiv" style="font-size: 12px; color: #808080; display: none;">
					发言请遵守社区公约，已经超过
					<span id="statusTextExceedingWordsCountSpan" style="font-style: italic; font-family: Constantia, Georgia; font-size: 22px; font-weight: 700; color: #e44443;">0</span>
					字
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div style="position: relative;">
			<textarea id="statusTextarea" style="width: 540px; height: 80px;"></textarea>
			<div id="statusSendSuccessfullyDiv" style="position: absolute; top: 0px; width: 555px; height: 90px; text-align: center; margin: 23px 0; display: none;">
				<img src="img/send-ok.png" />
			</div>
		</div>
	</div>
	
	<div>
		<div id="extraControlErrorDiv" class="alert alert-error" style="margin-bottom: 10px; width: 225px; display: none;">
			<span id="extraControlErrorSpan"></span>
			<button id="extraControlErrorDivCloseButton" type="button" class="close">&times;</button>
		</div>
		<div>
			<div class="pull-left" style="margin-right:10px; ">
				<div id="emotionsLoadDiv">
					<a id="emotionsLoadButton" href="javascript:void(0);" style="background: url('img/emotion.gif') no-repeat; padding-left: 15px;">
						表情
					</a>
				</div>
			</div>
			<div class="pull-left" style="margin-right:10px;">
				<div id="pictureUploadDiv" style="position: relative;">
					<a style="background: url('img/picture.gif') no-repeat; padding-left: 15px;">
						图片
					</a>
					<div style="position: absolute; top: 0; left: 0; overflow: hidden; width: 45px; height: 20px;">
						<input id="pictureUploadInput" name="pictureUploadInput" type="file" style="position: absolute; top: -5px; right: 0; opacity: 0; filter: alpha(opacity=0); cursor: pointer;" />
					</div>
				</div>
				<div id="pictureUploadingDiv" style="display: none;">
					<img src="img/loading.gif" />
				</div>
				<div id="pictureTitleDiv" style="display: none;">
					<span id="pictureNameSpan" style="display: none;"></span>
				    <span id="pictureThumbnailNameSpan" style="cursor: pointer; font-weight: bold;"></span>
				    <button id="pictureDivCloseButton" type="button" class="close" style="margin-left: 5px; float: none;">&times;</button>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
		
	<div style="margin-top: 10px;">
		<div id="dateTimeErrorDiv" class="alert alert-error" style="margin-bottom: 10px; width: 225px; display: none;">
			<span id="dateTimeErrorSpan"></span>
			<button id="dateTimeErrorDivCloseButton" type="button" class="close">&times;</button>
		</div>
		<div>
			<span>定时发布时间：</span>
			<input id="date" type="text" style="width: 100px; margin-bottom: 0px;" />
			日
			<select id="hour" style="width: 60px; margin-bottom: 0px;">
				<?php
				for ($hour = 0; $hour < 24; $hour++) {
					if ($hour < 10) {
						echo '<option value="' . $hour . '">' . '0' . $hour . '</option>';
					} else {
						echo '<option value="' . $hour . '">' . $hour . '</option>';
					}
				}
				?>
			</select>
			<span>时</span>
			<select id="minute" style="width: 60px; margin-bottom: 0px;">
				<?php
				for ($minute = 0; $minute < 60; $minute++) {
					if ($minute < 10) {
						echo '<option value="' . $minute . '">' . '0' . $minute . '</option>';
					} else {
						echo '<option value="' . $minute . '">' . $minute . '</option>';
					}
				}
				?>
			</select>
			<span>分</span>
		</div>
	</div>
</div>