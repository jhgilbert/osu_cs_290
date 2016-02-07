var selected = null;

// build table

var table = document.createElement("table");
document.body.appendChild(table);

var thead = document.createElement("thead");
table.appendChild(thead);

var headTr = document.createElement("tr");
thead.appendChild(headTr);

for (var i = 1; i < 5; i++) {
	var td = document.createElement("td");
	td.textContent = "Header " + i;
	headTr.appendChild(td);
}

var tbody = document.createElement("tbody");
table.appendChild(tbody);

for (var i = 1; i < 5; i++) {
	var bodyTr = document.createElement("tr");
	tbody.appendChild(bodyTr);
	for (var n = 1; n < 5; n++) {
		var td = document.createElement("td");
		td.textContent = n + ', ' + i;
		bodyTr.appendChild(td);
	}
}

// select/mark functionality
function select(el) {
	if (selected) {
		selected.style.outline = "none";
	}
	selected = el;
	el.style.outline = "1px solid black";
}

function getIndex(e) {
	var parent = e.parentNode;
	for (var i = 0; i < parent.children.length; i++) {
		if (parent.children[i] === e) {
			return i;
		}
	}
}

function moveSelection(event) {
	var direction = event.target.id;
	switch(direction) {
		case "up":
			var aboveTr = selected.parentNode.previousElementSibling;
		    if (aboveTr) {
		    	prevSelectedIdx = getIndex(selected);
		    	select(aboveTr.children[prevSelectedIdx]);
			}
			break;
		case "down":
			var belowTr = selected.parentNode.nextElementSibling;
			if (belowTr) {
				prevSelectedIdx = getIndex(selected);
		    	select(belowTr.children[prevSelectedIdx]);
			}
			break;
		case "left":
			if (selected.nextElementSibling) {
				select(selected.nextElementSibling);
			}
			break;
		case "right":
			if (selected.previousElementSibling) {
				select(selected.previousElementSibling);
			}
			break;
	}
}

// build directional buttons

labels = ["up", "down", "left", "right"];
for (var i = 0; i < labels.length; i++) {
	var button = document.createElement("button");
	button.setAttribute('id', labels[i]);
	button.textContent = labels[i];
	button.addEventListener("click", moveSelection)
	document.body.appendChild(button);
}

select(tbody.firstElementChild.firstElementChild);