const main = (str) => {
  const arr_str = str.split(" ");
  let longest = "";
  for (const word of arr_str) {
    if (longest.length < word.length) {
      longest = word;
    }
  }
  return longest;
};

console.log(main("Saya sangat senang mengerjakan soal algoritma"));
