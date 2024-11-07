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

const arr = [3, 6, 2, 9, 1, 7];
let max = arr[0];
for (let i = 1; i <= arr.length; i++) {
  if (max <= arr[i]) {
    max = arr[i];
  }
}
console.log(max);
