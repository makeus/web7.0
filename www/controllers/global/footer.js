footer = {

	findfooter: function() {
		return $("#index footer");
	},

	show: function() {
		footer.findfooter().show();		
	},

	hide: function() {
		footer.findfooter().hide();
	}
}