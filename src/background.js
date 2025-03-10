chrome.omnibox.onInputEntered.addListener((searchText) => {
	chrome.storage.local.get(['docSubdir', 'searchEngineBase', 'openInNewTab']).then((localStorage) => {
		// NOTE: We can't assume that the popup window has been opened before this point
		const docSubdir = localStorage['docSubdir'] ?? 'qt-6' // Default to the latest version of Qt 6
		const searchEngineBase = localStorage['searchEngineBase'] ?? 'ecosia.org/search?q=' // Default to the conservation-supporting Ecosia
		const openInNewTab = (localStorage['openInNewTab'] ?? false)

		var site = 'site:doc.qt.io/' + docSubdir + '/'
		var urlObj = {'url': 'https://' + searchEngineBase + site + '+' + encodeURIComponent(searchText)}

		if (openInNewTab)
			chrome.tabs.create(urlObj)
		else
			chrome.tabs.update(urlObj)
	})
})
