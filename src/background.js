chrome.omnibox.onInputEntered.addListener(
	function(searchText) {
		// Format: "5", "5.2", "4.7", etc.
		var qtVersion = localStorage['qtver']
		if (qtVersion == undefined) {
			qtVersion = '5'
		}

		var site;
		switch (qtVersion) {
			// Docs for older versions of Qt 5 are archived at doc.qt.digia.com
			case '5.2':
			case '5.1':
			case '5.0':
				site = 'site%3Adoc.qt.digia.com%2Fqt-' + qtVersion + '%2F'
				break

			// Docs for Qt 4.7, 4.8, and the latest Qt 5 are hosted at qt-project.org
			default:
				site = 'site%3Aqt-project.org%2Fdoc%2Fqt-' + qtVersion + '%2F'
		}

		chrome.tabs.create({'url': 'https://www.google.com/search?q=' + site + '+' + searchText})
	});

