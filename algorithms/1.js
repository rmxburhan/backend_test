const main = (str) => {
  let lastindex = str.length - 1;
  let alpha = str.substring(0, lastindex);
  let num = str[lastindex];
  alpha = alpha.split("").reverse().join("");
  return `${alpha}${num}`;
};

let example = "NEGIE1";
console.log(main(example));
