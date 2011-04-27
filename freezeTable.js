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

		var $table = $(this);

		var $container = $("<div class='ztable'><div class='fixedTable'></div><div class='scrollTable'></div></div>");
		// insert container
		$container.insertAfter($("table.ztable"));

		var $current_root = $table.parents().find('div.ztable');
		// append original table to div.scrollTable
		$("div.scrollTable").append($table);

		var $scrollTable = $current_root.find("div.scrollTable table");
		// append copy of oringil table to div.fixedTable
		$("div.ztable div.fixedTable").append($scrollTable.clone());

		var fixedColumn = settings.fixedColumn;
		var scrollWidth = settings.scrollWidth;

		var fixedWidth = 0;
		for (var i = 1; i <= fixedColumn; i++) {
			fixedWidth = fixedWidth + $current_root.find("div.fixedTable thead th:nth-child(" + i + ")").outerWidth(true);
		}

		// set specific width to div.fixedTable, then it looks like have frozen columns
		$current_root.find("div.fixedTable").width(fixedWidth);
		// hide frozen columns in scroll table
		$current_root.find("div.scrollTable table").width(fixedWidth).css({
			position:"relative",
			left: - fixedWidth
		});
		// set scroll area width
		$current_root.find("div.scrollTable").css({
			width:scrollWidth
		});

	});

  };
})( jQuery );
