const main = (matrix) => {
  let left = 0;
  let right = 0;
  let col_len = matrix.length;
  let row_len = matrix[0].length;
  let diagonal_n = row_len - col_len + 1;
  if (diagonal_n <= 0) {
    return 0;
  }
  for (let x = 0; x < diagonal_n; x++) {
    for (let i = 0; i < col_len; i++) {
      left += matrix[i][i + x];
      right += matrix[i][row_len - (i + 1 + x)];
    }
  }

  return left - right;
};

let Matrix1 = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

let Matrix2 = [
  [1, 2, 0, 4],
  [4, 5, 6, 2],
  [7, 8, 9, 9],
];

console.log(main(Matrix1));
console.log(main(Matrix2));
