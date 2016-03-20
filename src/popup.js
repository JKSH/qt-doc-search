// Designed to be called at startup
function loadOptions() {
	var docSubdir = localStorage['docSubdir']
	if (docSubdir == undefined) {
		docSubdir = 'qt-5' // Default to the latest version of Qt 5
	}

	// Highlight the last selected version (or the default)
	var combobox = document.getElementById('qtSelection')
	for (var i = 0; i < combobox.children.length; i++) {
		var child = combobox.children[i]
		if (child.value == docSubdir) {
			child.selected = 'true'
			break
		}
	}
}

// Designed to be called whenever the user changes the combobox
function saveOptions() {
	var combobox = document.getElementById('qtSelection')
	localStorage['docSubdir'] = combobox.children[combobox.selectedIndex].value
}

// Chrome extensions disallow inline event handlers, so we listen for the
// DOMContentLoaded event instead to initialize this tool at startup
document.addEventListener('DOMContentLoaded', function() {
	loadOptions()
	document.getElementById('qtSelection').addEventListener('change', saveOptions)
});
