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
		time = 1000;

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
				$(url).animate({opacity: 0}, 1000, 'easeInCirc');
				$(url).removeClass('active');
				currentSlide = parseInt(currentSlide) + 1;
				url = '.s' + currentSlide + '';
				navigateSlides(url, time);
			}
			else
			{
				$(url).animate({opacity: 0}, 1000, 'easeInCirc');
				$(url).removeClass('active');
				currentSlide = parseInt(currentSlide) - 1;
				url = '.s' + currentSlide + '';
				navigateSlides(url, time);
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
		}
	}

	function navigateSlides(loc, delay)
	{
		if (url === '.s10')
		{
			$('.s9').animate({opacity: 0}, 1000, 'easeInCirc');
			$('.s9').removeClass('active');
			url = '.s1';
			currentSlide = 1;
			$(url).addClass('active');
			$('.active').animate({opacity: 1}, 1000, 'easeInCirc');
			setTimeout(doneScrolling, time);
		}
		else if (url === '.s0')
		{
			$('.s1').animate({opacity: 0}, 1000, 'easeInCirc');
			$('.s1').removeClass('active');
			url = '.s9';
			currentSlide = 9;
			$(url).addClass('active');
			$('.active').animate({opacity: 1}, 1000, 'easeInCirc');
			setTimeout(doneScrolling, time);
		}
		else
		{
			$(url).addClass('active');
			$('.active').animate({opacity: 1}, 1000, 'easeInCirc');
			setTimeout(doneScrolling, time);
		}

		$('.toAuthorization').on('click', function()
		{
			$(url).animate({opacity: 0}, 1000, 'easeInCirc');
			$(url).removeClass('active');
			url = '.s3';
			currentSlide = 3;
			$(url).addClass('active');
			$('.active').animate({opacity: 1}, 1000, 'easeInCirc');
			setTimeout(doneScrolling, time);
		});
		$('.toSettlement').on('click', function()
		{
			$(url).animate({opacity: 0}, 1000, 'easeInCirc');
			$(url).removeClass('active');
			url = '.s6';
			currentSlide = 6;
			$(url).addClass('active');
			$('.active').animate({opacity: 1}, 1000, 'easeInCirc');
			setTimeout(doneScrolling, time);
		});
		$('.toFunding').on('click', function()
		{
			$(url).animate({opacity: 0}, 1000, 'easeInCirc');
			$(url).removeClass('active');
			url = '.s9';
			currentSlide = 9;
			$(url).addClass('active');
			$('.active').animate({opacity: 1}, 1000, 'easeInCirc');
			setTimeout(doneScrolling, time);
		})
	}

	function doneScrolling() {
		currentlyScrolling = false;
		clearTimeout(doneScrolling, time);
	}
})(jQuery);

//Other blocks to be implemented
	//A
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).hide();
				// })
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).delay(1000*i).fadeIn();
				// })
	//B
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).hide();
				// })
				// $(thisSlide).find(".copy").each(function(e, i)
				// {
				// 	$(element).delay(1000*i).fadeIn();
				// })