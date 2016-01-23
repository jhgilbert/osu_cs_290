function haveSamePropCount(obj1, obj2) {
	return Object.keys(obj1).length === Object.keys(obj2).length;
}

function isObject(x) {
	if (x === null) {
		return false;
	}
	return typeof x === 'object';
}

function deepEqual(obj1, obj2) {
	// make sure objects have the same number of properties
	if (!haveSamePropCount(obj1, obj2)) {
    	return false;
	}
    // loop through the properties and compare them
	for (var prop in obj1) {
		var item1 = obj1[prop];
		var item2 = obj2[prop];

		// if both properties are objects, compare recursively
		if ( isObject(item1) && isObject(item2) ) {
			if (deepEqual(item1, item2) === false) {
				return false;
			};
		}

		// otherwise, directly compare properties
		else if (item1 !== item2) {
			return false;
		}
	}
	return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true