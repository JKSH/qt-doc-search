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
function loadOptions() {
	const docSubdir = localStorage['docSubdir'] ?? 'qt-5' // Default to the latest version of Qt 5
	const searchEngineBase = localStorage['searchEngineBase'] ?? 'duckduckgo.com/?q=' // Default to the privacy-centric DuckDuckGo
	const openInNewTab = (localStorage['openInNewTab'] ?? 'false') == 'true'

	const comboBox_qtSelection = document.getElementById('qtSelection')
	const comboBox_engineSelection = document.getElementById('engineSelection')
	const checkBox_tabSwitch = document.getElementById('tabSwitch')

	initComboBox(comboBox_qtSelection, docSubdir)
	initComboBox(comboBox_engineSelection, searchEngineBase)

	// Init checkbox
	checkBox_tabSwitch.checked = openInNewTab
}

// Designed to be called whenever the user changes the comboboxes
function saveOptions() {
	var box = document.getElementById('qtSelection')
	localStorage['docSubdir'] = box.options[box.selectedIndex].value
	
	box = document.getElementById('engineSelection')
	localStorage['searchEngineBase'] = box.options[box.selectedIndex].value
	
	box = document.getElementById('tabSwitch')
	localStorage['openInNewTab'] = box.checked // NOTE: Implicit stringification occurs
}

// Chrome extensions disallow inline event handlers, so we listen for the
// DOMContentLoaded event instead to initialize this tool at startup
document.addEventListener('DOMContentLoaded', function() {
	loadOptions()
	document.getElementById('qtSelection').addEventListener('change', saveOptions)
	document.getElementById('engineSelection').addEventListener('change', saveOptions)
	document.getElementById('tabSwitch').addEventListener('change', saveOptions)
})

// Allow popup.html to open links in a new tab.
document.addEventListener('click', function(e) {
	if (e.target.href !== undefined)
		chrome.tabs.create({url: e.target.href})
})
