/****************************
*							*
*	Merchant Warehouse		*
*	interactive.js			*
*	Column Five Media, Inc.	*
*							*
****************************/

(function($)
{
	var currentlyScrolling = false,
		currentSlide = 1,
		url = '.s1',
		time = 1000,
		slidesArray = [],
		subArray = [4, 5, 8];

	$(window).load(function()
	{
		$(document).scroll(function()
		{
			window.scrollTo(0, 0);
//unbind the scroll event
			$(document).unbind("scroll");
		});
		bindScrollControl();
	});

	function bindScrollControl()
	{
		// if ($isMobile === true) { // mobile devices
		// 	/* Initialization code. */

		// 	if (window.addEventListener) {
		// 		window.addEventListener("touchstart", touchStart, false);
		// 		window.addEventListener("touchmove", touchMove, false);
		// 	}

		// 	var start = {
		// 		x: 0,
		// 		y: 0
		// 	};

		// 	function touchStart(e) {
		// 		start.x = event.touches[0].pageX;
		// 		start.y = event.touches[0].pageY;
		// 	}

		// 	function touchMove(e) {
		// 		offset = {};
		// 		offset.y = start.y - event.touches[0].pageY;
		// 		delta = (offset.y * (-1));

		// 		if (Math.abs(delta) >= 10) {
		// 			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		// 			handle(delta);

		// 		}
		// 	}
		// } else { // not mobile

		function wheel(event) {
			var delta = 0;
			if (!event) event = window.event;
			if (event.wheelDelta)
			{
				delta = event.wheelDelta / 60;
			}
			else if (event.detail) {
				delta = -event.detail / 10;
			}
			if (delta) {
				handle(delta);
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
			}
		}


		/* Initialization code. */
		if (window.addEventListener) $('.interactive')[0].addEventListener('DOMMouseScroll', wheel, false);
		window.onmousewheel = $('.interactive')[0].onmousewheel = wheel;
	}

	function handle(delta)
	{
		if (currentlyScrolling === false)
		{
			currentlyScrolling = true;
			if (delta < 0)
			{
				$(url).animate({opacity: 0}, 1000, 'linear');
				currentSlide = parseInt(currentSlide) + 1;
				url = '.s' + currentSlide + '';
				navigateSlides(url, time);
				checkPosition();
			}
			else
			{
				$(url).animate({opacity: 0}, 1000, 'linear');
				currentSlide = parseInt(currentSlide) - 1;
				url = '.s' + currentSlide + '';
				navigateSlides(url, time);
				checkPosition();
			}
//C
		}
	}
//Scroll initiated navigation
	function navigateSlides(loc, delay)
	{
		if (url === '.s10')
		{
			url = '.s1';
			currentSlide = 1;
			$(url).addClass('active')
			$(url).animate({opacity: 1}, 1000, 'linear')
					.delay(600)
					.queue(function(next)
						{
							checkActive();
							next();
						});
			setTimeout(doneScrolling, time);
		}
		else if (url === '.s0')
		{
			url = '.s9';
			currentSlide = 9;
			$(url).addClass('active');
			$(url).animate({opacity: 1}, 1000, 'linear')
					.delay(600)
					.queue(function(next)
						{
							checkActive();
							next();
						});
			setTimeout(doneScrolling, time);
		}
		else
		{
			$(url).addClass('active');
			$(url).animate({opacity: 1}, 1000, 'linear');$(url)
					.delay(600)
					.queue(function(next)
						{
							checkActive();
							next();
						});
			setTimeout(doneScrolling, time);
		}
//Direct click-to navigation (located on slide 2)
		$('.toAuthorization').on('click', function()
		{
			$('.s2').animate({opacity: 0}, 1000, 'linear');
			url = '.s3';
			currentSlide = 3;
			$(url).addClass('active');
			$(url).animate({opacity: 1}, 1000, 'linear')
					.delay(600)
					.queue(function(next)
						{
							checkActive();
							next();
						});
			setTimeout(doneScrolling, time);
		});
		$('.toSettlement').on('click', function()
		{
			$('.s2').animate({opacity: 0}, 1000, 'linear');
			url = '.s6';
			currentSlide = 6;
			$(url).addClass('active');
			$(url).animate({opacity: 1}, 1000, 'linear')
					.delay(600)
					.queue(function(next)
						{
							checkActive();
							next();
						});
			setTimeout(doneScrolling, time);
		});
		$('.toFunding').on('click', function()
		{
			$('.s2').animate({opacity: 0}, 1000, 'linear');
			url = '.s9';
			currentSlide = 9;
			$(url).addClass('active');
			$(url).animate({opacity: 1}, 1000, 'linear')
					.delay(600)
					.queue(function(next)
						{
							checkActive();
							next();
						});
			setTimeout(doneScrolling, time);
		})
	}
//Is navigation scroll finished?
	function doneScrolling()
	{
		currentlyScrolling = false;
		clearTimeout(doneScrolling, time);
	}
//What slides are active?
	function checkActive()
	{
		$('.active').each(function()
				{
					$(this).not(url).removeClass('active');
				});
	}
//Has the user reached the end of the show?
	function checkPosition()
	{
		if (currentSlide === 0){currentSlide = 9;}
		else if (currentSlide === 10){currentSlide = 1;}
		else currentSlide = currentSlide;
	}
	function getsubSlides()
	{
		for(var i = 0; i < subArray.length; i++)
		{
			if(currentSlide == subArray[i])
			{
				animationQueue = 'getAnim' + subArray[i] + '();'
			}
		}
	};
})(jQuery);

//Other blocks to be implemented
	//A
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).hide();
				// })
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).delay(600*i).fadeIn();
				// })
	//B
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).hide();
				// })
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).delay(600*i).fadeIn();
	//C
				//Redirect to Start or End
//Directs user to scroll down by showing/hiding arrow element
			// if(url = ".s1")
			// {
			// 	setInterval(function()
			// 	{
			// 		function showArrow()
			// 		{
			// 			setInterval($('.arrow').fadeIn(), 1000)
			// 			hideArrow();
			// 			clearInterval();
			// 		}
			// 		function hideArrow()
			// 		{
			// 			setTimeout($('.arrow').hide(), 1000)
			// 			showArrow();
			// 			clearInterval();
			// 		}
			// 	}, 5000);
			// }
			// else
			// {
			// 	clearInterval();
			// }
				// })