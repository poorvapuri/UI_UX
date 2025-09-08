const num1 = parseFloat(prompt("Enter the first number:"));
const num2 = parseFloat(prompt("Enter the second number:"));

const sum = num1 + num2;
const difference = num1 - num2;
const product = num1 * num2;
const quotient = num1 / num2;
document.write("Sum: " + sum + "<br>");
document.write("Difference: " + difference + "<br>");   
document.write("Product: " + product + "<br>");
document.write("Quotient: " + quotient + "<br>");

document.write("<br>");

let arr=[10,15,28,5,30];
document.write("Original Array: " + arr + "<br>");
arr.sort(function(a, b){return a-b});
document.write("Sorted Array: " + arr + "<br>");
document.write("Smallest Number: " + arr[0] + "<br>");
document.write("Largest Number: " + arr[arr.length - 1] + "<br>");

function validateForm(){
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const age=document.getElementById("age").value;

    if(name==""||email==""||age==""){
        alert("Please fill all fields");
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return false;
      }
      if (isNaN(age) || age < 18 || age > 100) {
        alert("Please enter a valid age");
        return false;
      }
    return true;
}

let student = {
    name: "John ",
    age: 16,
    grades: 85
}
student.class="12th Grade";
student.grades = 90;

document.write("<br>");
document.write("Student Name: " + student.name + "<br>");
document.write("Student Age: " + student.age + "<br>");
document.write("Student Class: " + student.class + "<br>");
document.write("Student Grades: " + student.grades + "<br>");

document.write("<br>");
 function processArray(arr) {
      
      let evens = arr.filter(function(num) {
        return num % 2 === 0;
      });

     
      let doubled = evens.map(function(num) {
        return num * 2;
      });

      
      let sum = doubled.reduce(function(total, num) {
        return total + num;
      }, 0);

      return sum;
    }
    const result = processArray(arr);

    document.getElementById("output").textContent =
      "Original: " + arr + "\n" +
      "Final Sum: " + result;