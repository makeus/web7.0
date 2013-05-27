document.addEventListener("DOMContentLoaded",function(){
	if (isToken()) {
		$("#searchText").focus();

		$("#back").hammer().on("tap", function() {
			hideModal();
		});
	}
});