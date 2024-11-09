// const end = 10;

// for (let i = 0; i <= end / 2; i++) {
//   let pattren = "";
//   for (let j = 0; j <= end / 2 - i; j++) {
//     pattren += " ";
//   }
//   for (let k = 1; k <= i * 2 - 1; k++) {
//     pattren += "*";
//   }

//   console.log(pattren);
// }

// const arr = [3, 6, 2, 9, 1, 7];
// let max = arr[0];
// for (let i = 1; i <= arr.length; i++) {
//   if (max <= arr[i]) {
//     max = arr[i];
//   }
// }
// console.log(max);

// const str = "hello";
// let reverseStr = "";
// for (let i = str.length - 1; i >= 0; i--) {
//   reverseStr += str.at(i);
// }
// console.log(reverseStr);

// const sentence = "hello i am rishab";
// let sentenceWithoutSpace = "";
// for (let i = 0; i < sentence.length; i++) {
//   if (sentence.at(i) !== " ") {
//     sentenceWithoutSpace += sentence.at(i);
//   }
// }
// console.log(sentenceWithoutSpace);

// const word = "malylam";
// let length = word.length % 2 === 0 ? word.length / 2 : word.length / 2 - 0.5;
// console.log(length);
// let result = function () {
//   for (let i = 0; i <= length; i++) {
//     if (word.at(word.length - i - 1) !== word.at(i)) {
//       return false;
//     }
//   }
//   return true;
// };
// console.log(result() ? "palindrome" : "not palindrome");

// let arr = [
//   [2, 3, 3],
//   [4, 1, 2],
// ];

// let newArr = [];
// for (let i = 0; i < arr.length; i++) {
//   newArr[i] = [];
//   for (let j = 0; j <= arr.length; j++) {
//     newArr[i].push(arr[i][j]);
//   }
// }
// console.log(newArr);

// const arr = [
//   1, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 4, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 6, 7,
// ];
// let maxCount = 0;
// let count = 0;
// let place = 0;
// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] === arr[i + 1]) {
//     count++;
//   } else {
//     count = 0;
//   }
//   if (count > maxCount) {
//     maxCount = count;
//     place = i;
//   }
// }
// console.log("max consecutive number", arr[place]);

// const arr = [1, 2, 3, 7, 8];
// const rotate = 3;
// const rotatedArr = arr.splice(rotate).concat(arr);
// console.log(rotatedArr);

// const fs = require("fs");

// const filePath = "C:/Users/risha/OneDrive/Desktop/HFS/public/text.doc";

// // Read the file
// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err);
//   } else {
//     console.log("File content:", data);

//     fs.appendFile(filePath, "<div>hello i am added <div>", (err) => {
//       console.log(err);
//     });
//   }
// });

// const object = [
//   { nameFirst: "rishab", lastName: "verma", fullName: "rishab raj verma" },
//   {
//     nameFirst: "purushotam",
//     lastName: "ram",
//     fullName: "purushotam shree ram",
//   },
//   { function: () => console.log("hello") },
// ];

// for (const key in object) {
//   if (Object.prototype.hasOwnProperty.call(object, key)) {
//     const element = object[key];
//     console.log(element);
//   }
// }

// for (const element of object) {
//   console.log("2", object);
// }

// object.forEach((element) => {
//   console.log(element);
// });

// const numbers = [10, 15, 20, 25];
// const result = numbers
//   .filter((num) => num > 15)
//   .map((num) => num * 2)
//   .reduce((acc, num) => acc + num, 0);
// console.log(result);
