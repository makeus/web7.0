document.addEventListener("DOMContentLoaded",function(){
	if (isToken()) {
		$("#searchText").focus();

		$("#back").click(function() {
			hideModal();
		});
	}
});