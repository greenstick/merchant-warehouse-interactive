/****************************
*							*
*	Merchant Warehouse		*
*	interactive.js			*
*	Column Five Media, Inc.	*
*							*
****************************/

 /**
  * parallax.js API info:
  *
  * .start()   anim-pause
  *	.focus()   anim-detached
  * .to()      anim-speed
  * .end()     data-nav
  * onBlur     onFocus
  **/
(function($)
{
	var currentlyScrolling = false,
		currentSlide = 1,
		url = '.s1', 
		time = 1200;

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
				if(currentSlide === 10)
				{
					$(url).removeClass('active');
					lastScrollTop = $('.interactive').scrollTop();
					currentSlide = 1;
					url = '.s1';
					currentlyScrolling = false;
				}
				else
				{
					time = 1200;
					$(url).removeClass('active');
					currentSlide = parseInt(currentSlide) + 1;
					url = '.s' + currentSlide + '';
					navigateSlides(url, time);
				}
			}
			else
			{
				if (currentSlide === 0)
				{
					$(url).removeClass('active');
					lastScrollTop = $('.interactive').scrollTop();
					currentlyScrolling = false;
				}
				else
				{
					time = 1200;
					$(url).removeClass('active');
					currentSlide = parseInt(currentSlide) - 1;
					url = '.s' + currentSlide + '';
					navigateSlides(url, time);
				}
			}
//Redirect to Start or End
			if (currentSlide === 0)
			{
				currentSlide = 9;
			}
			else if (currentSlide === 10)
			{
				currentSlide = 1;
			}
			else currentSlide = currentSlide;
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
			// 			setTimeout($('.arrow').fadeOut(), 1000)
			// 			showArrow();
			// 			clearInterval();
			// 		}
			// 	}, 5000);
			// }
			// else
			// {
			// 	clearInterval();
			// }
		}
	}

	function navigateSlides(loc, delay)
	{
		if (url === '.s10')
		{
			time = 3000;
			$('.interactive').scrollTo($('.s1'), time, 'easeInCirc');
			url = '.s1';
			currentSlide = 1;
			$(url).addClass('active');
			setTimeout(doneScrolling, delay);
		}
		else if (url === '.s0')
		{
			time = 3000;
			$('.interactive').scrollTo($('.s9'), time, 'easeInCirc');
			url = '.s9';
			currentSlide = 9;
			$(url).addClass('active');
			setTimeout(doneScrolling, delay);
		}
		else
		{
			$('.interactive').scrollTo($(url), time, 'easeInCirc');
			$(url).addClass('active');
			setTimeout(doneScrolling, delay);
		}

		$('.toAuthorization').on('click', function()
		{
			time = 1600;
			$(url).removeClass('active');
			$('.interactive').scrollTo($('.s3'), time, 'easeInCirc');
			url = '.s3';
			currentSlide = 3;
			$(url).addClass('active');
			setTimeout(doneScrolling, delay);
		});
		$('.toSettlement').on('click', function()
		{
			time = 2400;
			$(url).removeClass('active');
			$('.interactive').scrollTo($('.s6'), time, 'easeInCirc');
			url = '.s6';
			currentSlide = 6;
			$(url).addClass('active');
			setTimeout(doneScrolling, delay);
		});
		$('.toFunding').on('click', function()
		{
			time = 3000;
			$(url).removeClass('active');
			$('.interactive').scrollTo($('.s9'), time, 'easeInCirc');
			url = '.s9';
			currentSlide = 9;
			$(url).addClass('active');
			setTimeout(doneScrolling, delay);
		})
	}

	function doneScrolling() {
		lastScrollTop = $(window).scrollTop();
		currentlyScrolling = false;
		clearTimeout(doneScrolling);
	}
})(jQuery);

//Other blocks to be implemented
	//A
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).fadeOut();
				// })
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).delay(1000*i).fadeIn();
				// })
	//B
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).fadeOut();
				// })
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).delay(1000*i).fadeIn();
				// })