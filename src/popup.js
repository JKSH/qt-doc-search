function loadOptions() {
	var docSubdir = localStorage['docSubdir']
	if (docSubdir == undefined) {
		docSubdir = 'qt-5' // Default to the latest version of Qt 5
	}

	var combobox = document.getElementById('qtSelection')
	for (var i = 0; i < combobox.children.length; i++) {
		var child = combobox.children[i]
		if (child.value == docSubdir) {
			child.selected = 'true'
			break
		}
	}
}

function saveOptions() {
	var combobox = document.getElementById('qtSelection')
	localStorage['docSubdir'] = combobox.children[combobox.selectedIndex].value
}

// Can't use inline event handlers in Chrome extensions
document.addEventListener('DOMContentLoaded', function() {
	loadOptions()
	document.getElementById('qtSelection').addEventListener('change', saveOptions)
});

