chrome.omnibox.onInputEntered.addListener(
	function(searchText) {
		// Format: "5.2", "4.7", etc.
		var qtVersion = localStorage['qtver'];

		// Earlier URL prefixes were like "http://qt-project.org/doc/qt-5.1/"
		var versionId = qtVersion
		if (qtVersion == undefined || qtVersion == '5.2') {
			// Qt 5.2 introduced canonized URLs, with the prefix "http://qt-project.org/doc/qt-5/"
			versionId = '5'
		}

		var site = 'site%3Aqt-project.org%2Fdoc%2Fqt-' + versionId + '%2F'
		if (versionId == '5') {
			// Google's punctuation parser lets older versions through. Need to explicitly exclude them.
			site += '+-site%3Aqt-project.org%2Fdoc%2Fqt-5.1%2F'
			site += '+-site%3Aqt-project.org%2Fdoc%2Fqt-5.0%2F'
		}

		chrome.tabs.create({'url': 'https://www.google.com/search?q=' + site + '+' + searchText});
	});

