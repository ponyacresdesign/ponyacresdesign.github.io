var wpOffset = 60;
var layout =  {
	doneAnimateSkill : false,
	init : function() {
		this.initHeader();
		this.initParallax();
		this.initChart();
		this.initFlexslider();
		this.initStickyMenu();
		this.initProjecFilter();
		this.initCenterBackground();
		this.initClickScrollTo();
		this.initFeatureSection();
		this.initPortfolioGallery();
		this.initExperienceSection();
	},
	initHeader : function() {
		var $img 	= $('header .big-header:visible');
		$('header').height($(window).height());
		// $('#overlay').height($(window).height());
		$(window).resize(function() {
			$img 	= $('header .big-header:visible');

			if ($img[0] == undefined)
				return;

			var nW = $img[0].naturalWidth;
			var nH = $img[0].naturalHeight;

			var css_obj = {};
			var dim 	= '';

			if (nW > $(window).width() && nH <= $(window).height()) {
				dim = 'height';
			} else if (nH > $(window).height() && nW <= $(window).width()) {
				dim = 'width';
			} else {
				var w_diff		= $(window).width() - nW;
				var h_diff 		= $(window).height() - nH;
				var n_height 	= nH * $(window).width() / nW;

				//compute by width
				if (n_height > $(window).height())
					dim = 'width';
				else
					dim = 'height';
			}

			if (dim == 'width') {
				var n_height = nH * $(window).width() / nW;
				css_obj = {
					'width'		: $(window).width(),
					'top'	: $(window).height() - n_height
				}
			} else {
				var n_width = $(window).height() * nW / nH;
				css_obj = {
					'height'	: $(window).height(),
					'left'		: ($(window).width() - n_width)/2
				}
			}

			$('header').height($(window).height());
			$img.removeAttr('style');
			$img.css(css_obj);
			//alert($img.height());
		});
		imagesLoaded($img, function(){
			$('#overlay').fadeOut();
			setTimeout(function(){
				$(window).trigger('resize');
			},500)
		});
		//$(window).trigger('resize');
	},
	initParallax : function() {
		if (isMobileDevice())
			return;
		
		$('.parallax').addClass('active');
	},
	initChart : function() {
		if (isMobileDevice()) {
			$('.chart').easyPieChart({
		        size:130,
				animate: 2000,
				lineCap:'butt',
				scaleColor: false,
				barColor: '#d69f89',
				lineWidth: 10
		    });
		} else {
			$('#skill .percent').addClass('vis-hidden');
			$('#skill').waypoint({
				offset: wpOffset,
				handler : function(direction) {
					if (this.doneAnimateSkill)
						return;

					$('#skill .percent').removeClass('vis-hidden');
				 	//Init pie chart
					$('.chart').easyPieChart({
				        size:130,
						animate: 2000,
						lineCap:'butt',
						scaleColor: false,
						barColor: '#d69f89',
						lineWidth: 10
				    });

				    this.doneAnimateSkill = true;
				}
			});
		}
	},
	initFlexslider: function(){
		$('.flexslider').flexslider({
			prevText: "",           //String: Set the text for the "previous" directionNav item
			nextText: "",
		});	
	},
	initStickyMenu: function() {
		//Sticky menu
	    
		$(document).scroll(function() {
			var $menu 		= $('#menu');
		    var $header 	= $('header');
			var origOffsetY = $menu.offset().top;


			if ($(window).scrollTop() >= origOffsetY) {
				$menu.find('nav').addClass('navbar-fixed-top');
			} else {
				$menu.find('nav').removeClass('navbar-fixed-top');
			}  

		});
		$(document).trigger('scroll');
	},
	initProjecFilter : function() {
		//Quick sand filtering
		var $proj_wrap 	= $('#proj-wrapper');
		var $data 		= $proj_wrap.clone();
		$('.proj-nav a').click(function(e) {
			
			e.preventDefault();

			$('.proj-nav li').removeClass('active');
			$(this).parent().addClass('active');

			var $fData 	= $data.find('li');
			var fVal 	= $(this).attr('data-filter');
			if (fVal != 'all') {
				$fData = $data.find('li[data-type="' + fVal + '"]');
			}
			
			// finally, call quicksand
		    $proj_wrap.quicksand($fData, {
				duration: 800,
				adjustHeight : 'auto',
				adjustWidth : false

				// easing: 'easeInOutQuad'
		    }, function() {
			  	$proj_wrap.removeAttr('style');
			  	$proj_wrap.find('li').removeAttr('style');

			  	layout.initPortfolioGallery();
			});
		});
	},
	initCenterBackground : function() {
		var $eles = $('.center-back');
		$(window).resize(function() {
			$eles.each(function(){
				var $el 	= $(this);
				var $text 	= $el.find('.center-text');
				var top = 50 -($text.height() * 100 /$el.height())/2;
				
				$text.css({top : top + '%'});
			})
		});
		$(window).trigger('resize');
	},
	initClickScrollTo : function() {
		$('#menu nav a, .s-menu a').click(function(){
			var id = $(this).attr('href');
			$('#menu-content').collapse('hide');

			if (id != '#') {
				$(id).ScrollTo({
					duration: 1000
				});
			} else {
				$('header').ScrollTo({
					duration: 1000
				});
			}
		});
	},
	initFeatureSection : function() {
		if (isMobileDevice())
			$('.feature .item').addClass('ani-scale');
		else {
			$('.feature').waypoint({
				offset: wpOffset, 
				handler: function(direction) {
					$('.feature .item').addClass('ani-scale');
				}
			});
		}
	},
	initExperienceSection : function() {
		$(window).resize(function(){
			if ($(window).width() < 768) {
				var cssObj =  {
					'margin-left' : ($('#experience').width() - $('#experience .flex-direction-nav').width())/2
				}
				$('#experience .flex-direction-nav').css(cssObj);
			} else {
				$('#experience .flex-direction-nav').removeAttr('style');
			}
		});
		$(window).trigger('resize');
	},
	initPortfolioGallery : function() {
		$("#proj-wrapper a[rel^='prettyPhoto']").prettyPhoto({
			animation_speed:'normal',
			theme:'light_square',
			slideshow:3000, 
			autoplay_slideshow: false,
			social_tools : '',
			modal : true,
			markup : '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<div class="pp-nav-wrapper"> \
													<a href="#" class="pp_arrow_previous">Previous</a> \
													<p class="currentTextHolder">0/0</p> \
													<a href="#" class="pp_arrow_next"></a> \
												</div> \
											</div> \
											<p class="pp_description"></p> \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>', 
			changepicturecallback : function() {
				if ($(window).width() > 640)
					return;

				$('.pp_pic_holder').css({
					'width' : $(window).width() - 20,
					'left'	: '10px'
				});
				var innerWidth = $('.pp_pic_holder').width() - 40;
				$('.pp_content').width(innerWidth);
				$('.pp_details').width(innerWidth);
				$('.pp_hoverContainer').css({
					width: innerWidth,
					height: innerWidth * $('#fullResImage').height() / $('#fullResImage').width()
				});
				$('#fullResImage').css({
					width: innerWidth,
					height: innerWidth * $('#fullResImage').height() / $('#fullResImage').width()
				});
				$('.pp_right .pp_content').height($('#fullResImage').height() + $('.pp_details').height() + 10);
			}			
		});
	}
};
$(document).ready(function() {	
	layout.init();	
});

function isMobileDevice() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}