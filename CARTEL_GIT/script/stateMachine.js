function changeStateMachine() {
  if (PARAMS.state.stateMachine <  PARAMS.separateWords.length-1 ) {
    PARAMS.state.stateMachine++;
  } else {
    PARAMS.state.stateMachine = 0;
  }
  return PARAMS.state.stateMachine;
}
function changePhrase(phrase){
  if(phrase<PARAMS.word.length-1){
    phrase++;
   
  }else{
    phrase=0;
  }
  return phrase;
}
function sendLastLetterPosition(physicLetter, level) {
  // console.log(physicLetter);
  PARAMS.positionWord.LastPosition = [];
  for (let i = 0; i < PARAMS.wordInterval[level]; i++) {
    PARAMS.positionWord.LastPosition.push(physicLetter[0][i].body)
  }
}
function originStartWord(level) {
  let decay=0;
  for (let index = 0; index <= level; index++) {
    decay+=PARAMS.wordInterval[index];
  }
  return decay;
}