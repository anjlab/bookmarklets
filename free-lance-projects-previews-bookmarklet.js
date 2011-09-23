(function() {
	if(typeof jQuery=='undefined') {
		var s = document.createElement('script');
		s.setAttribute('src','http://jquery.com/src/jquery-latest.js');
		document.getElementsByTagName('head')[0].appendChild(s);
	}

	var waitForJQueryID = setInterval(function(){	// wait until jQuery loaded
		if(typeof jQuery=='undefined') {
			return;
		}

		clearInterval(waitForJQueryID);

		var projects = new Array();

		jQuery(document).ready(function(){
			jQuery(".even").each(function(){
				var $link = jQuery(this).find("a");
				var $div = $link.after("<div href='" + $link.attr("href") + "'>Loading...</div>");
				projects.push($link.next());
			});
		});

		var index = 0;

		var intervalID = setInterval(function(){
			if (index >= projects.length) {
				clearInterval(intervalID);
				return;
			}

			var $div = projects[index];
			$div.load($div.attr("href") + " #proj_pict", function(response, status, xhr) {
				if (status == "success") {
					var $img = $div.find("img");

					var w = $img.attr("width");
					var h = $img.attr("height");

					var maxSize = 200;

					if (w > h) {
						h = (maxSize / w) * h;
						w = maxSize;
					} else {
						w = (maxSize / h) * w;
						h = maxSize;
					}

					$img.attr("width", w);
					$img.attr("height", h);
				}
			});

			index++;
		}, 500);		
	}, 100);
})();