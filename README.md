## 1) What is the difference between var, let, and const?
+ var -> Function-scoped, and it can be re-declared and re-assigned.
+ let -> Block-scoped, it cannot be re-declared but can be re-assigned.
+ const -> Block-scoped, it cannot be re-declared or re-assigned.

## 2) What is the difference between map(), forEach(), and filter()?
- map() -> It creates and returns a new array with transformed values.
- forEach() -> Loop through elements, but doesn't return a new array.
- filter() -> It creates and returns a new array with elements that match a condition.

## 3) What are arrow functions in ES6?
- It's a shorter and cleaner way to write function.
Example:
const sum = (a,b)=>a+b;

## 4) How does destructuring assignment work in ES6?
- Allow extracting values directly from arrays and objects.
Example:
const [x,y] = [5,6];
const {name,age} = {name: "Jahid", age:24};

## 5) Explain template literals in ES6. How are they different from string concatenation?
- Use backticks (`) instead of quotes.
- Support variable interpolation with ${}.
- Allow multi-line strings easily.
Example:
const name = "Mumin";
const age = 21;
console.log(`My name is ${name}, I am ${age} years old.`)