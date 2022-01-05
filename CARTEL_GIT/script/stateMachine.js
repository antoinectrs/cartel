function changeStateMachine(){
    if (PARAMS.state.stateMachine <= 1) {
        PARAMS.state.stateMachine++;
      } else {
        PARAMS.state.stateMachine = 0;
      }
      return PARAMS.state.stateMachine;
}
function  sendLastLetterPosition(physicLetter,numberLetter){
  for (let index = 0; index < PARAMS.separateWords.length; index++) {
    console.log(physicLetter[index].length);
    for (let i = 0; i <physicLetter[index].length; i++) {
      PARAMS.positionWord.p0.LastPosition.push(physicLetter[index][i].body)
    }

  }
};
function setUpWord(param) {
  PARAMS.separateWords=PARAMS.word[0].split(' ');
  for (let index = 0; index <PARAMS.separateWords.length; index++) {
    PARAMS.wordRetriger.push(PARAMS.separateWords[index].split(''));
  }
}