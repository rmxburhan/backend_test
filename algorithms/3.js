const main = (input, query) => {
  let out = [];
  for (const queryData of query) {
    let n = input.filter((x) => x == queryData).length;
    out.push(n);
  }
  return out;
};

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];
console.log(main(INPUT, QUERY));
