function Automobile(year, make, model, type){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

// Prints an automobile object on a single line
Automobile.prototype.logMe = function(includeType) {
    var output = this.year + ' ' + this.make + ' ' + this.model;
    if (includeType) {
        output += ' ';
        output += this.type;
    }
    console.log(output);
};

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

// Merges two sorted arrays in desc order using a comparator function
function merge(comparator, array1, array2) {
    var result = [];
    var array1idx = 0;
    var array2idx = 0;

    // keep adding the "greater" value until one array is used up
    while (array1idx < array1.length && array2idx < array2.length) {
        item1 = array1[array1idx];
        item2 = array2[array2idx];
        if (comparator(item1, item2)) {
            result.push(item1);
            array1idx++;
        } else {
            result.push(item2);
            array2idx++;
        }
    }

    // add any items remaining in one array or the other
    while (array1idx < array1.length) {
        result.push(array1[array1idx++]);
    }

    while (array2idx < array2.length) {
        result.push(array2[array2idx++]);
    }

    return result;
}

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array){
    // base case
    if (array.length < 2) {
        return array;
    }

    // recursive case
    // split the array in half
    var halfIdx = (array.length / 2) - 1;
    var firstHalf = array.slice(0, halfIdx + 1);
    var secondHalf = array.slice(halfIdx + 1, array.length);

    // sort each half
    firstHalf = sortArr(comparator, firstHalf);
    secondHalf = sortArr(comparator, secondHalf);

    // merge sorted halves back together
    return merge(comparator, firstHalf, secondHalf);
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator(int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator(auto1, auto2){
    return (auto1.year > auto2.year);
}

// Checks alphabetical order of two characters
function comesBefore(letter1, letter2) {
    return letter1.toLowerCase() < letter2.toLowerCase();
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator(auto1, auto2){
    /* your code here*/
    // lowercase the letters
    var make1 = auto1.make;
    var make2 = auto2.make;

    var longerWord = make1.length > make2.length ? make1 : make2;
    var shorterWord = longerWord == make1 ? make2 : make1;

    // advance through the letters until a difference is found
    // or until one of the words ends

    for (var i = 0; i < longerWord.length; i++) {
        // shortest word wins if all letters are the same
        if (shorterWord[i] == undefined) {
            return shorterWord == make1;
        }
        // move to next letter if letters match
        if (make1[i] == make2[i]) {
            continue;
        }
        // otherwise, return true if make1 should be
        // alphabetized ahead of make2
        return comesBefore(make1[i], make2[i]);
    }

    // make1 wins if they're exactly the same
    return true;
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator(auto1, auto2){
    var ascHierarchy = ["Wagon", "SUV", "Pickup", "Roadster"]; 

    type1Val = ascHierarchy.indexOf(auto1.type);
    type2Val = ascHierarchy.indexOf(auto2.type);

    if (type1Val == type2Val) {
        return yearComparator(auto1, auto2); 
    }

    return type1Val > type2Val;
}

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.
*/

console.log("*****");

console.log("The cars sorted by year are:");
var sortedByYear = sortArr(yearComparator, automobiles);
// year make model of the greatest -> least
sortedByYear.forEach(function(automobile) {
    automobile.logMe(false);
});

console.log();

console.log("The cars sorted by make are:");
var sortedByMake = sortArr(makeComparator, automobiles);
// year make model of the greatest -> least
sortedByMake.forEach(function(automobile) {
    automobile.logMe(false);
});

console.log("\n");

console.log("The cars sorted by type are:");
var sortedByType = sortArr(typeComparator, automobiles);
// year make model type of the greatest -> least
sortedByType.forEach(function(automobile) {
    automobile.logMe(true);
});

console.log("*****");
