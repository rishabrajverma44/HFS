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

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr);
