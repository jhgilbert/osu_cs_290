function calculateArraySum(arr) {
	var sum = 0;
  arr.forEach(function(n) {sum += n});
  return sum;
}

var ints = [1, 2, 3, 4, 5]

console.log(calculateArraySum(ints));

// the given code on the "Donald" problem
// won't run, I think I have to declare
// an object first. 'var Objectname.attribute'
// does not work.

function dialog(name) {
	return function(spokenWords) {
		return name + ' says "' + spokenWords + '"';
	}
}

var Donald = {};

Donald.speak = dialog("Donald Duck");
console.log(Donald.speak("Hello there"));