console.log("hi");

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
		tbody.appendChild(td);
	}
}

