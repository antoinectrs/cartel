const letter = [
    ["SONSSONSSONSSONSSONSSONSSONSSONSSONSSONSSONSSONS"],
    ["hhhh"],
]
// const letterSplit = letter[0][0].split("");
let levelLetter = [];
letter.forEach((element,index) => {
    levelLetter.push(letter[index][0].split(""));
});
const letterSplit= levelLetter;
console.log(letterSplit);