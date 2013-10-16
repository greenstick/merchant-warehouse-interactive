/****************************
*							*
*	Merchant Warehouse		*
*	interactive.js			*
*	Column Five Media, Inc.	*
*							*
****************************/
//<![CDATA[
(function($)
{
//Declare vars
	var isMobile = true,
		currentlyScrolling = false,
		currentSlide = 1,
		url = '.s1',
		time = 1200,
		slidesArray = [],
		subArray = [4, 5, 8],
		animQueue = false,
		subSlide = false, 
		currentEle = 0,
		subAnim = false,
		animEle = null,
		animNode = null;

	$(window).load(function()
	{
//Loading initial settings & unbinding scroll event from window
		$('.noJS').hide();
		mobileDetect();
		promptUser();
		$(document).scroll(function()
		{
			window.scrollTo(0, 0);
			$(document).unbind("scroll");
		});
		bindScrollControl();
	});

/******************************************************************
*	Core functions
******************************************************************/

//Re-binds scroll function to interactive element for mobile devices
	function bindScrollControl()
	{
		if (isMobile === true)
		{
			if (window.addEventListener)
			{
				window.addEventListener("touchstart", touchStart, false);
				window.addEventListener("touchmove", touchMove, false);
			}
			var start = {x: 0, y: 0};
			function touchStart(e)
			{
				start.x = event.touches[0].pageX;
				start.y = event.touches[0].pageY;
			}
			function touchMove(e)
			{
				offset = {};
				offset.y = start.y - event.touches[0].pageY;
				delta = (offset.y);
				if (Math.abs(delta) >= 10)
				{
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
					handle(delta);
				}
			}
		}
//Re-binds scroll function to interactive element for mouse & trackpad devices
		else
		{
			function wheel(event)
			{
				var delta = 0;
				if (!event) event = window.event;
				if (event.wheelDelta)
				{
					delta = event.wheelDelta / 120;
				}
				else if (event.detail)
				{
					delta = -event.detail / 3;
				}
				if (delta)
				{
					handle(delta);
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
				}
			}
		}
//Initialize
		if (window.addEventListener) $('.interactive')[0].addEventListener('DOMMouseScroll', wheel, false);
		window.onmousewheel = $('.interactive')[0].onmousewheel = wheel;
	};
//Directs navigation function calls via wheel delta event
	function handle(delta)
	{
		if (currentlyScrolling === false && animQueue === false)
		{
			promptUser();
			currentlyScrolling = true;
			checkSubslides();
			if(subSlide === false)
			{
				if (delta < 0)
				{
						animQueue = true;
						$(url).animate({opacity: 0}, 400, 'linear');
						currentSlide = parseInt(currentSlide + 1);
						url = '.s' + currentSlide + '';
						navigateSlides(url, time);
						checkPosition();
						setTimeout(animComplete, time);
				}
				else
				{
						animQueue = true;
						$(url).animate({opacity: 0}, 400, 'linear');
						currentSlide = parseInt(currentSlide) - 1;
						url = '.s' + currentSlide + '';
						navigateSlides(url, time);
						checkPosition();
						setTimeout(animComplete, time);
				}
			}
			else
			{
				if (delta < 0)
				{
					animQueue = true;
					$('.animating').animate({opacity: 0}, 600, 'linear');
					$('.animating').removeClass('animating');
					currentEle = parseInt(currentEle + 1);
					animEle = url + 'c' + currentEle + '';
					animNode = url + 'n' + currentEle + '';
					$(animEle).addClass('animating');
					$(animNode).addClass('animating');
					$('.animating').animate({opacity: 1}, 600, 'linear')
						.animate({opacity: 1}, 600, 'linear')
						.delay(600)
							.queue(function(next)
								{
									next();
								})
							.dequeue();
					setTimeout(animComplete, time);
				}
				else
				{
					animQueue = true;
					$('.animating').animate({opacity: 0}, 600, 'linear');
					currentEle = parseInt(currentEle -1);
					$('.animating').removeClass('animating');
					animEle = url + 'c' + currentEle + '';
					animNode = url + 'n' + currentEle + '';
					$(animEle).addClass('animating');
					$(animNode).addClass('animating');
					$('.animating')
						.animate({opacity: 1}, 600, 'linear')
						.delay(600)
							.queue(function(next)
								{
									next();
								})
							.dequeue();
					setTimeout(animComplete, time);
				}
			}
		}
	};

/******************************************************************
*	Navigation functions
******************************************************************/

//Scroll initiated navigation
	function navigateSlides(loc, delay)
	{
		if (url === '.s10')
		{
			url = '.s1';
			currentSlide = 1;
			promptUser();
			$(url)
				.addClass('active')
				.animate({opacity: 1}, 400, 'linear')
					.delay(400)
					.queue(function(next)
						{
							checkActive();
							next();
						})
					.dequeue();
		}
		else if (url === '.s0')
		{
			url = '.s9';
			currentSlide = 9;
			promptUser();
			$(url)
				.addClass('active')
				.animate({opacity: 1}, 400, 'linear')
					.delay(400)
					.queue(function(next)
						{
							checkActive();
							next();
						})
					.dequeue();
		}
		else
		{
			promptUser();
			$(url)
				.addClass('active')
				.animate({opacity: 1}, 400, 'linear')
					.delay(400)
					.queue(function(next)
						{
							checkActive();
							next();
						})
					.dequeue();
		}
//Direct click-to navigation (slide 2 -> slides 3, 6, & 9 and header menu)
		$('.toAuthorization').on('click', function()
		{
			checkSubslides();
			toAuthorization();
		});
		$('.toSettlement').on('click', function()
		{
			checkSubslides();
			toSettlement();
		});
		$('.toFunding').on('click', function()
		{
			checkSubslides();
			toFunding();
		});
	};

/******************************************************************
*	Utility functions
******************************************************************/

//Check whether user is mobile
	function mobileDetect()
	{
		(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) ? isMobile = true : isMobile = false;
	};
//Controls arrow to prompt user scroll
	function promptUser()
	{
		if(currentSlide === 1)
		{
			setTimeout(arrowAnimate, 4800);
		}
		else
		{
			clearTimeout(arrowAnimate);
			$('.arrow').animate({opacity: 0}, 0);
		};
//Animates arrow on slide 1
		function arrowAnimate()
		{
			$('.arrow').animate({opacity: 1}, 1000, 'linear');
			$('.arrow').fadeIn(1000).delay(200).fadeOut(1000, function()
			{
				arrowAnimate();
			});
		}
	};
//Retrieves sub slides for animation
	function checkSubslides()
	{
		for(var i = 0; i < subArray.length; i++)
		{
			if(currentSlide === subArray[i])
			{
				if(animEle === '.s4c7')
				{
					animEle = '.s5c0';
					resetSub();
				}
				else if(animEle === '.s4c0')
				{
					resetSub();
				}
				else if(animEle ==='.s5c4')
				{
					resetSub();
				}
				else
				{
					subSlide = true;
				}
			}
		}
	};
//Resets to normal slide sequence
	function resetSub()
	{
		if (url === '.s4')
		{ 
			subSlide = false;
			currentEle = 0;
			subAnim = true;
			animNode = 0;
			animEle = 0;
		}
		else
		{
			subSlide = false;
			currentEle = 0;
			subAnim = true;
			animNode = 0;
			animEle = 0;
		}
	}
//Direct navigation functions
		function toAuthorization()
		{
			if (animQueue === false)
			{
				animQueue = true;
				$(url).animate({opacity: 0}, 400, 'linear');
				url = '.s3';
				currentSlide = 3;
				$(url)
					.addClass('active')
					.animate({opacity: 1}, 400, 'linear')
						.delay(400)
						.queue(function(next)
							{
								checkActive();
								next();
							})
						.dequeue();
				setTimeout(animComplete, time);
			};
		};
		function toSettlement()
		{
			if (animQueue === false)
			{
				animQueue = true;
				$(url).animate({opacity: 0}, 400, 'linear');
				url = '.s6';
				currentSlide = 6;
				$(url)
					.addClass('active')
					.animate({opacity: 1}, 400, 'linear')
						.delay(400)
						.queue(function(next)
							{
								checkActive();
								next();
							})
						.dequeue();
				setTimeout(animComplete, time);
			};
		};
		function toFunding()
		{
			if (animQueue === false)
			{
				animQueue = true;
				$(url).animate({opacity: 0}, 400, 'linear');
				url = '.s9';
				currentSlide = 9;
				$(url)
					.addClass('active')
					.animate({opacity: 1}, 400, 'linear')
						.delay(400)
						.queue(function(next)
							{
								checkActive();
								next();
							})
						.dequeue();
				setTimeout(animComplete, time);
			};
		};
//Updates slide count on show recycle
	function checkPosition()
	{
		if (currentSlide === 0){currentSlide = 9;}
		else if (currentSlide === 10){currentSlide = 1;}
		else currentSlide = currentSlide;
	};
//Clears the active class from each inactive slide
	function checkActive()
	{
		$('.active').each(function()
		{
			$(this)
				.not(url)
				.removeClass('active')
				.animate({opacity: 0});
		});
	};
//Verifies which elements are animating
	function checkSelected()
	{
		$('.animating').each(function()
		{
			if ($(this) !== animElement || animNode)
			{
				$(this)
					.removeClass('animating')
					.animate({opacity: 0}, 600, 'linear')
			}
		})
	};
//Anb imation reset function
	fun+
	..3
	.







	.ction animComplete()
	{
		currentlyScrolling = false;
		animQueue = false;
	};
//navigate subcontent via click
		// $('.s4n1').on('click', function()
		// {
		// 	if(animQueue === false)
		// 	{
		// 		animQueue = true;
		// 		currentAnim = 1;
		// 		animElement = url + 'c' + currentAnim + '';
		// 		animNode = url + 'n' + currentAnim + '';
		// 		$('.s4c0').fadeOut(500);
		// 		$(animNode)
		// 			.addClass('animating')
		// 			.animate({opacity: 1}, 400, 'linear');
		// 		$(animElement)
		// 			.addClass('animating')
		// 			.animate({opacity: 1}, 400, 'linear')
		// 			.delay(400)
		// 			.queue(function(next)
		// 				{
		// 					checkSelected();
		// 					next();
		// 				})
		// 			.dequeue();
		// 		setTimeout(animComplete, time);
		// 	}
		// })

})(jQuery);
//]]>