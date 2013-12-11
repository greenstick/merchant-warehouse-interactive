/********************
*					*
*	utility.js		*
*					*
********************/

/**
*	Browser & Device Detection Utility
**/

	//Check whether user is mobile and sets a boolean - feature detection is preferable to this
	function mobileDetect() {
		(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) ? isMobile = true : isMobile = false;
	};

/**
*	Text Formatting Utility
**/

	//HTML conversion functions
	function escapeHtml(text) {
	  return text
	      .replace(/&/g, "&amp;")
	      .replace(/</g, "&lt;")
	      .replace(/>/g, "&gt;")
	      .replace(/"/g, "&quot;")
	      .replace(/'/g, "&#039;")
	      .replace(/-/g, "&ndash;")
	      .replace(/—/g, "&mdash;")
	      .replace(/©/g, "&copy;")
	      .replace(/™/g, "&trade;")
	      .replace(/®/g, "&reg;");
	}
	function convertHtml(text) {
	  return text
	      .replace(/&amp;/g, "&")
	      .replace(/&lt;/g, "<")
	      .replace(/&gt;/g, ">")
	      .replace(/&quot;/g, "\"")
	      .replace(/&#039;/g, "\'")
	      .replace(/&ndash;/g, "-")
	      .replace(/&mdash;/g, "—")
	      .replace(/&copy;/g, "©")
	      .replace(/&trade;/g, "™")
	      .replace(/&reg;/g, "®");
	}
	//Formats numbers to display commas
	function comma(num) {
	    var str = num.toString().split('.');
	    if (str[0].length >= 4)
	    {
	        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	    }
	    if (str[1] && str[1].length >= 5)
	    {
	        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
	    }
	    return str.join('.');
	}

/**
*	Mathematical Utility
**/

	//Turns A Number Into A Percentage
	function percentage (value) {return value / 100;}

	//Rounds Number Up to Specified Multiple - Number(input).roundUpTo(multiple)
	Number.prototype.roundUpTo = function(number) {
		return Math.ceil(this/number)*number;
	}

	//Calculates Percent Difference of Two Numbers
	function normalize (a, b) {
		if(a < b) {
			return Math.round(((a/b)-1)*-100);
		} else {
			return Math.round(((b/a)-1)*-100);
		};
	}

	//A basic remapping function
	function remapValue(x, a, b, c, d) {
	    if(a == b) { 
	        return x >= b ? d : c;
	    }
	    return (c + (d - c) * (x - a) / (b - a));
	}
	//A basic remapping function - with rounding
	function remapValueNice(x, a, b, c, d) {
	    if(a == b) { 
	        return x >= b ? d : c;
	    }
	    return Math.round(c + (d - c) * (x - a) / (b - a));
	}

/**
*	Logging Functions
**/

	