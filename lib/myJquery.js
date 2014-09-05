$(function () {
	/* 布局调整 */
	var resetWindow = function () {
		var $windowHeight = $(window).height(),
			$windowWidth = $(window).width(),
			$mainArea = $('section[role="main"]'),
			$titleArea = $('hgroup.title_area'),
			$titleAreaHeight = $titleArea.height(),
			$headerWallPaper = $('#header_wall_paper'),
			$photoBox = $('#photo_album div.photo_box');
		$mainArea.css('top',$windowHeight);
		$headerWallPaper.css("margin-top",'-' + $headerWallPaper.height()/2 + 'px'); 
		$photoBox.css({'width':$windowWidth+'px','height':$windowWidth/2.15+'px'});
		$photoBox.find('li').css({'width':$windowWidth+'px','height':$windowWidth/2.15+'px'});
	};
	resetWindow();
	window.onresize=function(){  
		resetWindow();  
	}  
	/*滚动event	*/
	var $header = $('header[role="title"]'),$main = $('section[role="main"]'),$nav = $main.find('nav'),navHeight = $nav.height(),positionFlag = $(window).height() - navHeight > $(window).scrollTop();
	var scrollEvent  = function () {
		var windowTop = $(window).scrollTop(),windowHeight = $(window).height(),scrollFlag = windowHeight - navHeight > windowTop;
		if(scrollFlag && !positionFlag){
			positionFlag = !positionFlag;
			$header.removeClass('title_current_transition');
			$header.addClass('title_current');
			$nav.removeClass('current');
		};
		if(!scrollFlag && positionFlag){
			positionFlag = !positionFlag;
			$header.addClass('title_current_transition');
			$header.removeClass('title_current');
			$nav.addClass('current');
		}	
	};
	$(window).bind('scroll',function () {
		scrollEvent();
	});
	
	/* 滚屏function */
	var toScroll = function (top) {
		$('body,html').animate({scrollTop:top},1000,'easeInOutExpo' );
	};
	/* 初始化event */
	$header.addClass('title_current');
	$('#down_arrow').click(function () {
		toScroll($(window).height() - navHeight);
	});
	$('#nav_home span').click(function () {
		toScroll(0);
	});
	
	
	var imgMap = [
		{ 
			imgUrl : './images/photos/winner_slide1.jpg'
		},
		{ 
			imgUrl : './images/photos/winner_slide2.jpg'
		},
		{ 
			imgUrl : './images/photos/winner_slide3.jpg'
		},
		{ 
			imgUrl : './images/photos/winner_slide4.jpg'
		}
	];
	var windowWidth = $(window).width();
	$('#photo_album').buildPhotos({
		imgMap : imgMap,
		automatic : 0,
		animateStyle : 'move',
		photoWidth : windowWidth,
		photoHeight : windowWidth/2.15
	});
});

$(function () {
	var $dragUl = $('.drag_photo_album ul'),$lastItem = $dragUl.find('li:last'),$endFlag = $lastItem.offset().left,$widthFlag = $lastItem.width(),$windowWidth = $(window).width();
	$dragUl.draggable({ axis: 'x',stop : function (event,ui) {
		var $this = $(this),$left = $this.find('li:first').offset().left,$lastChild = $this.find('li:last');
		if($left>0){
			$this.animate({'left':'0px'},{easing:'easeInOutExpo',queue:false,duration :1000});
		}
		if($lastChild.width() + $lastChild.offset().left < $windowWidth){
			$this.animate({'left': '-'+ ($endFlag - $windowWidth + $widthFlag) +'px'},{easing:'easeInOutExpo',queue:false,duration :1000});
		}
	} });
});