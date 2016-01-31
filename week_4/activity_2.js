// changed 'alert' to 'console.log' so I could see the result in Node

function buildList(list) {
    var result = [];

    function generateItemLogFunction(index, list) {
        return function() {
            var item = 'item' + index; // I think the previous code was a typo, using list[i] here doesn't make any sense in abstract even if it works with the given array
            console.log(item + ' ' + list[index]);
        }
    }

    for (var i = 0; i < list.length; i++) {
        result.push(generateItemLogFunction(i, list));
    }

    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();