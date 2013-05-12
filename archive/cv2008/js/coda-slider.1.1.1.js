/*

	jQuery Coda-Slider v1.1 - http://www.ndoherty.com/coda-slider

	

	Copyright (c) 2007 Niall Doherty

	

	Inspired by the clever folks at http://www.panic.com/coda

	Many thanks to Gian Carlo Mingati. Coda-Slider is a heavily modified version of his slideViewer, which can be found at  http://www.gcmingati.net/wordpress/wp-content/lab/jquery/imagestrip/imageslide-plugin.html

	

	Requirements:

	-  jQuery 1.2 ... available via  http://www.jquery.com

	-  jQuery easing plugin (1.2) ... available via  http://gsgd.co.uk/sandbox/jquery/easing/

	- jQuery easing compatability plugin ... available via  http://gsgd.co.uk/sandbox/jquery/easing/

	- CSS included in index.html

*/

function hashIndex(){

	return ( $("div.panel").index($(location.hash)) + 1 );

}



var j = 0;

$.fn.codaSlider = function(settings) {

	 settings = $.extend({

     easeFunc: "easeInOutExpo",

     easeTime: 750,

     toolTip: false

  }, settings);

	return this.each(function(){

		var container = $(this);

		

		// Self-explanatory...

		container.removeClass("csw").addClass("stripViewer");

		// Get the width of a panel, set from CSS...

		var panelWidth = container.find("div.panel").width();

		// panelCount gives us a count of the panels in the container...

		var panelCount = container.find("div.panel").size();

		// Calculate the width of all the panels when lined up end-to-end...

		var stripViewerWidth = panelWidth*panelCount;

		// Use the above width to specify the CSS width for the panelContainer element...

		container.find("div.panelContainer").css("width" , stripViewerWidth);

		// Set the navWidth as a multiple of panelCount to account for margin-right on each li

		var navWidth = panelCount*2;

		

		alert(location.hash + " : " + ( $("div.panel").index($(location.hash)) + 1 ));

	

		// Specify the current panel.

		// If the loaded URL has a hash (cross-linking), we're going to use that hash to give the slider a specific starting position...

		if (location.hash && $("div.panel").index($(location.hash)) != -1) {



			var cPanel =  $("div.panel").index($(location.hash)) ;

			

			var cnt = - (panelWidth*cPanel);

			$("div.panelContainer").animate({ left: cnt}, settings.easeTime, settings.easeFunc);

		// Otherwise, we'll just set the current panel to 1...

		} else { 

			var cPanel = 1;

		};

		

		// Create appropriate nav

		container.each(function(i) {

			

			// Create the Left and Right arrows

			//$(this).before("<div class='stripNavL' id='stripNavL" + j + "'><a href='#'>Left</a><\/div>");

			//$(this).after("<div class='stripNavR' id='stripNavR" + j + "'><a href='#'>Right</a><\/div>");

			

			// Create the Tabs

			//$(this).before("<div class='stripNav' id='stripNav" + j + "'><ul><\/ul><\/div>");
/*
			$(this).find("div.panel").each(function(n) {

						$("div#stripNav" + j + " ul").append("<li class='tab" + (n+1) + "'><a href='#" + (n+1) + "'>" + $(this).attr("title") + "<\/a><\/li>");												

			});

			
*/

		$("#menu li a").click(function(){
				$("div.panel").index($(this.href));
				//calcul du decalage a appliquer
				z = $("div.panel").index($(this.href)) ;
				var cnt = - (panelWidth*z);
				//paneau courant
				cPanel = z + 1;
				//animation des slides
				$("div.panelContainer").animate({ left: cnt}, settings.easeTime, settings.easeFunc);

		});

			

			// Left nav

			$("div#stripNavL" + j + " a").click(function(){

				if (cPanel == 1) {

					var cnt = - (panelWidth*(panelCount - 1));

					cPanel = panelCount;

					$(this).parent().parent().find("div.stripNav a.current").removeClass("current").parent().parent().find("li:last a").addClass("current");

				} else {

					cPanel -= 1;

					var cnt = - (panelWidth*(cPanel - 1));

					$(this).parent().parent().find("div.stripNav a.current").removeClass("current").parent().prev().find("a").addClass("current");

				};

				$(this).parent().parent().find("div.panelContainer").animate({ left: cnt}, settings.easeTime, settings.easeFunc);

				// Change the URL hash (cross-linking)...

				location.hash = cPanel;

				return false;

			});

			

			// Right nav

			$("div#stripNavR" + j + " a").click(function(){

				if (cPanel == panelCount) {

					var cnt = 0;

					cPanel = 1;

					$(this).parent().parent().find("div.stripNav a.current").removeClass("current").parent().parent().find("a:eq(0)").addClass("current");

				} else {

					var cnt = - (panelWidth*cPanel);

					cPanel += 1;

					$(this).parent().parent().find("div.stripNav a.current").removeClass("current").parent().next().find("a").addClass("current");

				};

				$(this).parent().parent().find("div.panelContainer").animate({ left: cnt}, settings.easeTime, settings.easeFunc);

				// Change the URL hash (cross-linking)...

				location.hash = cPanel;

				return false;

			});

			

			// Same-page cross-linking

			$("a.cross-link").click(function(){

				$(this).parents().find(".stripNav ul li a:eq(" + (parseInt($(this).attr("href").slice(1)) - 1) + ")").trigger('click');

			});	

			

			// Set the width of the nav using the navWidth figure we calculated earlier. This is so the nav can be centred above the slider

			$("div#stripNav" + j).css("width" , navWidth);

			

			// Specify which tab is initially set to "current". Depends on if the loaded URL had a hash or not (cross-linking).

			if (location.hash && parseInt(location.hash.slice(1)) <= panelCount) {

				$("div#stripNav" + j + " a:eq(" + (location.hash.slice(1) - 1) + ")").addClass("current");

			} else {

				$("div#stripNav" + j + " a:eq(0)").addClass("current");

			}

			

		});

		

		j++;

  });

};