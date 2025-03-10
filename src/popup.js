function initComboBox(combobox, value) {
	for (var i = 0; i < combobox.options.length; i++) {
		var child = combobox.options[i]
		if (child.value == value) {
			child.selected = 'true'
			return
		}
	}
}

// Designed to be called when the popup window is opened
function initOptions() {
	const docSubdir = localStorage['docSubdir'] ?? 'qt-5' // Default to the latest version of Qt 5
	const searchEngineBase = localStorage['searchEngineBase'] ?? 'duckduckgo.com/?q=' // Default to the privacy-centric DuckDuckGo
	const openInNewTab = (localStorage['openInNewTab'] ?? 'false')

	const comboBox_qtSelection = document.getElementById('qtSelection')
	const comboBox_engineSelection = document.getElementById('engineSelection')
	const checkBox_tabSwitch = document.getElementById('tabSwitch')

	initComboBox(comboBox_qtSelection, docSubdir)
	initComboBox(comboBox_engineSelection, searchEngineBase)

	// Init checkbox
	checkBox_tabSwitch.checked = openInNewTab

	// Save user selections whenever they are changed
	comboBox_qtSelection.addEventListener('change', function() {
		localStorage['docSubdir'] = comboBox_qtSelection.options[comboBox_qtSelection.selectedIndex].value
	})
	comboBox_engineSelection.addEventListener('change', function() {
		localStorage['searchEngineBase'] = comboBox_engineSelection.options[comboBox_engineSelection.selectedIndex].value
	})
	checkBox_tabSwitch.addEventListener('change', function() {
		localStorage['openInNewTab'] = checkBox_tabSwitch.checked // NOTE: Implicit stringification occurs
	})
}

// Chrome extensions disallow inline event handlers, so we listen for the
// DOMContentLoaded event instead to initialize this tool at startup
document.addEventListener('DOMContentLoaded', initOptions)

// Allow popup.html to open links in a new tab.
document.addEventListener('click', function(e) {
	if (e.target.href !== undefined)
		chrome.tabs.create({url: e.target.href})
})
