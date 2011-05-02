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

  $.fn.freezeTable_fixedRow = function( options ) {  

    var settings = {
		'fixedRow' : 3,
		'scrollHight' : 400
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

		var fRows = settings.fixedRow;
		var sHeight = settings.scrollHight;

		var tRows = $this.find("tr").length;

		var cHeight = 0;

		var container = "<div class='fa'><div class='ha'></div><div class='ra'></div><div style='clear:both;'></div><div class='ca'></div><div class='sa'></div><div style='clear:both'></div></div>";
		$(container).insertBefore($this);

		$this.prev("div.fa").find("div.sa").append($this);

		$root = $this.parents("div.fa");
		$sa = $root.find("div.sa");
		$ca = $root.find("div.ca");
		$ra = $root.find("div.ra");

		if (fRows < 0){
			alert("Rows cann't be smaller than 0!");
			return false;
		} else if (fRows == 0) {
			$sa.css({
				'overflow-y': 'scroll',
				height: sHeight 
			});
		} else if (fRows > 0 && fRows < tRows) {
			$cTable = $this.clone();
			$ra.append($cTable);

			for (var i = 1; i <= fRows; i++) {
				cHeight += $ra.find("table tr:nth-child(" + i + ")").outerHeight();
			}

			console.log(cHeight);

			$ra.css({
				'overflow': 'hidden',
				height: cHeight
			});

			$sa.css({
				'overflow-y': 'scroll',
				height: sHeight
			});
			$this.css({
				position: 'relative',
				top: - cHeight
			})

		} else {
			alert("Are you sure your table having such columns?");
			return false;
		}

		

	});

  };
})( jQuery );
