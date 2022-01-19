function lexical(){
  const wordTest= PARAMS.poeme.split(' ');
    // console.log(wordTest[1]);
    for (let index = 0; index < wordTest.length; index++) {
        if(PARAMS.lexical.etude.includes(index)==true){
            // console.log("etude",index,wordTest[index]);
        }else if(PARAMS.lexical.sante.includes(index)==true){
            // console.log("sante",index,wordTest[index]);
        }
        else if(PARAMS.lexical.art.includes(index)==true){
            // console.log("art",index,wordTest[index]);
        }
    }
    // noLoop();
}
function setUpWord(phrase) {
    PARAMS.separateWords=PARAMS.word[phrase].split(' ');
    for (let index = 0; index <PARAMS.separateWords.length; index++) {
      // PARAMS.wordRetriger.push(PARAMS.separateWords[index].split(''));
      PARAMS.wordInterval.push(PARAMS.separateWords[index].length);
    }
  }