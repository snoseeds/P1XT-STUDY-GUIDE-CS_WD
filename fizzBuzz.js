const fizzBuzz = function () {
  let x = 1;
	let output = "";
  while (x <= 100) {
    // checking divisibility
    let display = (x % 3) === 0 && (x % 5) !== 0 ? "Fizz \n" :
                  (x % 5) === 0 && (x % 3) !== 0 ? "Buzz \n" :
                  (x % 3) === 0 && (x % 5) === 0 ? "FizzBuzz \n" :
                  String(x) + "\n";               
    // print Fizz, Buzz, or FizzBuzz
    output += display;
    // increment x
    x += 1;
  }
	console.log(output);
	return output;
}();
