chrome.omnibox.onInputEntered.addListener((searchText) => {
	chrome.storage.local.get(['docSubdir', 'searchEngineBase', 'openInNewTab']).then((localStorage) => {
		// NOTE: We can't assume that the popup window has been opened before this point
		const docSubdir = localStorage['docSubdir'] ?? 'qt-5' // Default to the latest version of Qt 5
		const searchEngineBase = localStorage['searchEngineBase'] ?? 'duckduckgo.com/?q=' // Default to the privacy-centric DuckDuckGo
		const openInNewTab = (localStorage['openInNewTab'] ?? false) // Default to historical behaviour

		var site = 'site:doc.qt.io/' + docSubdir + '/'
		var urlObj = {'url': 'https://' + searchEngineBase + site + '+' + encodeURIComponent(searchText)}

		if (openInNewTab)
			chrome.tabs.create(urlObj)
		else
			chrome.tabs.update(urlObj)
	})
})
