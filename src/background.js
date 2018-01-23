chrome.omnibox.onInputEntered.addListener(
	function(searchText) {
		var docSubdir = localStorage['docSubdir']
		if (docSubdir == undefined) {
			docSubdir = 'qt-5' // Default to the latest version of Qt 5
		}

		var site = 'site:doc.qt.io/' + docSubdir + '/'
		chrome.tabs.create({'url': 'https://www.google.com/search?q=' + site + '+' + encodeURIComponent(searchText)})
	});
