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
		removeLast = ['.s4c8', '.s5c4', '.s8c4'],
		removeFirst = ['.s4c-1', '.s5c-1', '.s8c-1'],
		subArray = [4, 5, 8],
		animQueue = false,
		subSlide = false, 
		currentEle = null,
		animEle = null,
		animNode = null,
		slideEnd = true;

	$(window).load(function()
	{
//Loading initial settings & unbinding scroll event from window
		$('.noJS').hide();
		mobileDetect();
		promptUser();
		$('.toAuthorization').on('click', function()
		{
			if (animQueue === false)
			{
				$('.animating')
					.animate({opacity: 0}, 600, 'linear')
					.removeClass('animating');
				resetAnims();
				checkSlide();
				toAuthorization();
			}
		})
		$('.toSettlement').on('click', function()
		{
			if (animQueue === false)
			{
				$('.animating')
					.animate({opacity: 0}, 600, 'linear')
					.removeClass('animating');
				resetAnims();
				checkSlide();
				toSettlement();
			}
		})
		$('.toFunding').on('click', function()
		{
			if (animQueue === false)
			{
				$('.animating')
					.animate({opacity: 0}, 600, 'linear')
					.removeClass('animating');
				resetAnims();
				checkSlide();
				toFunding();
			}
		})
		$('[data-node]').on('click', function()
		{
			if (animQueue === false)
			{
				toNode();
			}
		})
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

//Re-binds scroll function to interactive element on mobile devices
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
//Re-binds scroll function to interactive element on mouse & trackpad devices
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
	}
//Directs navigation function calls via wheel delta event
	function handle(delta)
	{
		if (currentlyScrolling === false && animQueue === false)
		{
			currentlyScrolling = true;
			checkSlide();
			if(subSlide === false)
			{
				(delta < 0) ? nextFade() : previousFade();
				checkPosition();
				navigateSlides(url, time);
				setTimeout(animComplete, time);
			}
			else if ($(animEle).hasClass('last') && delta < 0)
			{
				resetAnims();
				nextFade();
				checkPosition();
				navigateSlides(url, time);
				setTimeout(animComplete, time);
			}
			else if ($(animEle).hasClass('first') && delta > 0)
			{
				resetAnims();
				previousFade();
				checkPosition();
				navigateSlides(url, time);
				setTimeout(animComplete, time);
			}
			else
			{
				(delta < 0) ? nextElement() : previousElement();
				setTimeout(animComplete, time);
			}
		}
	}

/******************************************************************
*	Scroll navigation functions
******************************************************************/

//Scroll initiated navigation
	function navigateSlides(loc, delay)
	{
		if(url === '.s4' || url === '.s5' || url === '.s8')
		{
			animEle = url +'c0';
			$(animEle).animate({opacity: 1}).addClass('animating');
			if(url === '.s8')
			{
				animNode = url + 'n0';
				$(animNode).animate({opacity: 1}).addClass('animating');
			}
		}
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
//Next Slide
	function nextFade()
	{
		animQueue = true;
		$(url).animate({opacity: 0}, 400, 'linear');
		currentSlide = parseInt(currentSlide + 1);
		url = '.s' + currentSlide + '';
	}
//Previous Slide
	function previousFade()
	{
		animQueue = true;
		$(url).animate({opacity: 0}, 400, 'linear');
		currentSlide = parseInt(currentSlide) - 1;
		url = '.s' + currentSlide + '';
	}
//Next subslide element
	function nextElement()
	{
		animQueue = true;
		slideEnd = false;
		eleLast();
		if(slideEnd === true && animEle !== null)
		{
			resetAnims();
			nextFade();
			checkPosition();
			navigateSlides(url, time);
			animEle = url + 'c0';
			animNode = url + 'n0';
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
		else
		{
			$('.animating')
				.animate({opacity: 0}, 600, 'linear')
				.removeClass('animating');
			currentEle = parseInt(currentEle + 1);
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
		}
	}
//Previous subslide element
	function previousElement()
	{
		animQueue = true;
		slideEnd = false;
		eleFirst();
		if(slideEnd === true && animEle !== null)
		{
			resetAnims();
			previousFade();
			checkPosition();
			navigateSlides(url, time);
			setTimeout(animComplete, time);
		}
		else
		{
			$('.animating')
				.animate({opacity: 0}, 600, 'linear')
				.removeClass('animating');
			currentEle = parseInt(currentEle - 1);
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
		}
	}

/******************************************************************
*	Click to navigation
******************************************************************/

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
		}
	}
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
		}
	}
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
		}
	}
	function toNode()
	{
		if (animQueue === false)
		{
			var el = $(event.currentTarget),
			anim = el.data('node');
			animQueue = true;
			animNode = anim;
				var subString = animNode.split('n');
					currentEle = parseInt(subString[1]);
			animEle = url + 'c' + currentEle + '';
			checkAnimating();
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
				if(currentSlide === 1)
				{
					arrowAnimate();
				}
				else
				{
					return
				}
			});
		};
	};
//Checks to see if value is in array
	function valueExists(array, value)
	{
		($.inArray(array, value)) ? slideEnd = false : slideEnd = true;
	}
//End of subanimation and navigating to next slide?
	function eleLast()
	{
		valueExists(removeLast, animEle);
	}
//End of subanimation and navigating to previous slide?
	function eleFirst()
	{
		valueExists(removeFirst, animEle);
	}
//Retrieves sub slides for animation
	function checkSlide()
	{
		subSlide = false;
		for(var i = 0; i < subArray.length; i++)
		{
			if(currentSlide === subArray[i])
			{
				subSlide = true;
				break;
			}
		}
	}
//Updates slide count on show recycle
	function checkPosition()
	{
		if (currentSlide === 0)
		{
			currentSlide = 9;
			url = '.s9';
		}
		else if (currentSlide === 10)
		{
			currentSlide = 1;
			url = '.s1'
		}
		else 
		{
			currentSlide = currentSlide;
		}
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
		})
	}
//Clears the animating class from each inactive animation element
	function checkAnimating()
	{
		$('.animating')
			.each(function()
			{
				if ($(this) !== animEle || animNode)
				{
					$(this)
						.removeClass('animating')
						.animate({opacity: 0}, 600, 'linear')
				}
			})
	}
//Animation reset function
	function animComplete()
	{
		currentlyScrolling = false;
		animQueue = false;
	}
	function resetAnims()
	{
		subSlide = false;
		currentEle = null;
		animEle = null;
		animNode = null;
		checkAnimating();
		slideEnd = true;
	}
})(jQuery);
//]]>