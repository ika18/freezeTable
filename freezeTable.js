//
// Description: 
// This plugin will hlep you implement a fixed columns table, which looks like freeze columns in excel
//
// Note:
// The plugin will reset your table's CELLSPACING and CELLPADDING to zero
//
// Author: Ika Wu
// Email: wunianzu515@gmail.com
//
//

(function( $ ){

  $.fn.freezeTable = function( options ) {  

    var settings = {
		'fixedColumn' : 3,
		'scrollWidth' : 400
    };

	return this.each(function() {        
		// If options exist, lets merge them
		// with our default settings
		if ( options ) { 
			$.extend( settings, options );
		}

		// plugin code here

		var $this = $(this);

		if ($this.attr("tagName") != "TABLE") {
			alert("This is not a TABLE element!");
			return false;
		}

		$this.attr({
			'cellspacing': 0,
			'cellpadding': 0
		});

		var fColumns = settings.fixedColumn;
		var sWidth = settings.scrollWidth;

		var tColumns = $this.find("td").length;

		var cWidth = 0;

		var container = "<div class='fa'><div class='ha'></div><div class='ra'></div><div style='clear:both;'></div><div class='ca'></div><div class='sa'></div><div style='clear:both'></div></div>";
		$(container).insertBefore($this);

		$this.prev("div.fa").find("div.sa").append($this);

		$root = $this.parents("div.fa");
		$sa = $root.find("div.sa");
		$ca = $root.find("div.ca");

		if (fColumns < 0){
			alert("Columns cann't be smaller than 0!");
			return false;
		} else if (fColumns == 0) {
			$sa.css({
				'overflow-x': 'scroll',
				width: sWidth
			});
		} else if (fColumns > 0 && fColumns < tColumns) {
			$cTable = $this.clone();
			$ca.append($cTable);

			for (var i = 1; i <= fColumns; i++) {
				cWidth += $ca.find("table tr td:nth-child(" + i + ")").outerWidth();
			}

			console.log(cWidth);

			$ca.css({
				'overflow': 'hidden',
				width: cWidth
			});

			$sa.css({
				'overflow-x': 'scroll',
				width: sWidth
			});
			$this.css({
				position: 'relative',
				left: - cWidth
			});

		} else {
			alert("Are you sure your table having such columns?");
			return false;
		}

		

	});

  };
})( jQuery );
