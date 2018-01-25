chrome.omnibox.onInputEntered.addListener(
	function(searchText) {
		var docSubdir = localStorage['docSubdir']
		if (docSubdir == undefined) {
			docSubdir = 'qt-5' // Default to the latest version of Qt 5
		}
		var searchEngineBase = localStorage['searchEngineBase']
		if (searchEngineBase == undefined) {
			searchEngineBase = 'duckduckgo.com/?q=' // Default to the privacy-centric DuckDuckGo
		}
		var site = 'site:doc.qt.io/' + docSubdir + '/'
		chrome.tabs.create({'url': 'https://' + searchEngineBase + site + '+' + encodeURIComponent(searchText)})
	});
