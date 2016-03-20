chrome.omnibox.onInputEntered.addListener(
	function(searchText) {
		// Format: "5", "5.2", "4.7", etc.
		var qtVersion = localStorage['qtver']
		if (qtVersion == undefined) {
			qtVersion = '5'
		}

		var site;
		switch (qtVersion) {
			// Archive type 1
			case '4.7':
				site = 'site%3Adoc.qt.io%2Farchives%2Fqt-' + qtVersion + '%2F'
				break

			// Archive type 2
			case '4.6':
			case '4.3':
			case '3.3':
			case '2.3':
				site = 'site%3Adoc.qt.io%2Farchives%2F' + qtVersion + '%2F'
				break

			// Docs for the latest versions of Qt 5 and Qt 4
			default:
				site = 'site%3Adoc.qt.io%2Fqt-' + qtVersion + '%2F'
		}

		chrome.tabs.create({'url': 'https://www.google.com/search?q=' + site + '+' + searchText})
	});

