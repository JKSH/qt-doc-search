function loadLocalStorage(key, defaultValue) {
	var value = localStorage[key]
	if (value == undefined)
		return defaultValue
	return value
}

function initComboBox(elementId, value) {
	var combobox = document.getElementById(elementId)
	for (var i = 0; i < combobox.children.length; i++) {
		var child = combobox.children[i]
		if (child.value == value) {
			child.selected = 'true'
			return
		}
	}
}

// Designed to be called when the popup window is opened
function loadOptions() {
	var docSubdir = loadLocalStorage('docSubdir', 'qt-5') // Default to the latest version of Qt 5
	var searchEngineBase = loadLocalStorage('searchEngineBase', 'duckduckgo.com/?q=') // Default to the privacy-centric DuckDuckGo
	
	initComboBox('qtSelection', docSubdir)
	initComboBox('engineSelection', searchEngineBase)
}

// Designed to be called whenever the user changes the comboboxes
function saveOptions() {
	var combobox = document.getElementById('qtSelection')
	localStorage['docSubdir'] = combobox.children[combobox.selectedIndex].value
	
	combobox = document.getElementById('engineSelection')
	localStorage['searchEngineBase'] = combobox.children[combobox.selectedIndex].value
}

// Chrome extensions disallow inline event handlers, so we listen for the
// DOMContentLoaded event instead to initialize this tool at startup
document.addEventListener('DOMContentLoaded', function() {
	loadOptions()
	document.getElementById('qtSelection').addEventListener('change', saveOptions)
	document.getElementById('engineSelection').addEventListener('change', saveOptions)
});
