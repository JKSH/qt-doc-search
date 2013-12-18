function loadOptions() {
	var version = localStorage['qtver']
	if (version == undefined) {
		version = '5.2'
	}

	var combobox = document.getElementById('qtSelection')
	for (var i = 0; i < combobox.children.length; i++) {
		var child = combobox.children[i]
		if (child.value == version) {
			child.selected = 'true'
			break
		}
	}
}

function saveOptions() {
	var combobox = document.getElementById('qtSelection')
	localStorage['qtver'] = combobox.children[combobox.selectedIndex].value
}

// Can't use inline event handlers in Chrome extensions
document.addEventListener('DOMContentLoaded', function() {
	loadOptions()
	document.getElementById('qtSelection').addEventListener('change', saveOptions)
});

