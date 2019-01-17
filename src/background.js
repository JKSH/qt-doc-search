chrome.omnibox.onInputEntered.addListener(
	function(searchText) {
		// NOTE: We can't assume that the popup window has been opened before this point
		var docSubdir = localStorage['docSubdir']
		if (docSubdir == undefined)
			docSubdir = 'qt-5' // Default to the latest version of Qt 5

		var searchEngineBase = localStorage['searchEngineBase']
		if (searchEngineBase == undefined)
			searchEngineBase = 'duckduckgo.com/?q=' // Default to the privacy-centric DuckDuckGo

		var openInNewTab = localStorage['openInNewTab']
		if (openInNewTab == undefined)
			openInNewTab = 'true' // Default to historical behaviour

		var site = 'site:doc.qt.io/' + docSubdir + '/'
		var urlObj = {'url': 'https://' + searchEngineBase + site + '+' + encodeURIComponent(searchText)}

		if (openInNewTab == 'true')
			chrome.tabs.create(urlObj)
		else
			chrome.tabs.update(urlObj)
	}
)
