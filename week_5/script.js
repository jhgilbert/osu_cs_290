// mark currently selected node
function markSelectedNode() {
    selectedNode.style.backgroundColor = "yellow";
}

// select a node
function select(el) {
    // remove outline from current selection
    if (selectedNode) {
        selectedNode.style.border = "1px solid white"; 
    }
    // set new selection and outline it
    selectedNode = el;
    el.style.border = "1px solid black";
}

// move selection outline in one of four directions
function moveSelection(event) {
    var direction = event.target.id;
    switch(direction) {

        case "up":
        var aboveTr = selectedNode.parentNode.previousElementSibling;
        if (aboveTr) {
            select(aboveTr.children[selectedNode.cellIndex]);
        }
        break;

        case "down":
        var belowTr = selectedNode.parentNode.nextElementSibling;
        if (belowTr) {
            select(belowTr.children[selectedNode.cellIndex]);
        }
        break;

        case "right":
        var rightSibling = selectedNode.nextElementSibling;
        if (rightSibling) {
            select(rightSibling);
        }
        break;

        case "left":
        var leftSibling = selectedNode.previousElementSibling;
        if (leftSibling) {
            select(leftSibling);
        }
        break;
    }
}

// build table
function buildTable() {
    // create and add table
    var table = document.createElement("table");
    document.body.appendChild(table);

    // create and add header cells
    var thead = document.createElement("thead");
    table.appendChild(thead);

    var headTr = document.createElement("tr");
    thead.appendChild(headTr);

    for (var i = 1; i < 5; i++) {
        var td = document.createElement("td");
        td.textContent = "Header " + i;
        td.style.padding = "5px";
        headTr.appendChild(td);
    }

    // create and add remaining cells
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (var i = 1; i < 5; i++) {
        var bodyTr = document.createElement("tr");
        tbody.appendChild(bodyTr);
        for (var n = 1; n < 5; n++) {
            var td = document.createElement("td");
            td.textContent = n + ', ' + i;
            td.style.padding = "5px";
            td.style.border = "1px solid white";
            bodyTr.appendChild(td);
        }
    }

    // select the cell at 1,1
    select(tbody.firstElementChild.firstElementChild);
}

// build directional buttons
function buildDirectionButtons() {
    var labels = ["up", "down", "left", "right"];
    for (var i = 0; i < labels.length; i++) {
        var button = document.createElement("button");
        button.setAttribute('id', labels[i]);
        button.textContent = labels[i];
        button.style.margin = "5px";
        button.addEventListener("click", moveSelection);
        document.body.appendChild(button);
    }
}

// build button that marks cells
function buildMarkButton() {
    var markButton = document.createElement('button');
    markButton.textContent = "Mark Cell";
    markButton.setAttribute('id', 'cell-marker');
    markButton.style.margin = "5px";
    document.body.appendChild(markButton);
    markButton.addEventListener('click', markSelectedNode);
}

var selectedNode = null;
buildTable();
buildDirectionButtons();
buildMarkButton();






