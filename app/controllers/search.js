document.addEventListener("DOMContentLoaded", function() {
	setPage({
		bar: true
	});

	$("#searchInput").focus();

	$("#back").click(function() {
		popView();
	});
});