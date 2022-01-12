function changeStateMachine(){
  // console.log(PARAMS.state.s tateMachine);
    if (PARAMS.state.stateMachine <= 2) {
        PARAMS.state.stateMachine++;
      } else {
        PARAMS.state.stateMachine = 0;
      }
      return PARAMS.state.stateMachine;
}
function  sendLastLetterPosition(physicLetter,level){
  // console.log(physicLetter[level-1].length);
  // for (let index = 0; index < 2; index++) {
    // console.log(PARAMS.positionWord.p0.LastPosition);
    PARAMS.positionWord.p0.LastPosition=[];
    for (let i = 0; i <physicLetter[level-1].length; i++) {
      PARAMS.positionWord.p0.LastPosition.push(physicLetter[level-1][i].body)
    }
 
  }
// };
function setUpWord(param) {
  PARAMS.separateWords=PARAMS.word[0].split(' ');
  for (let index = 0; index <PARAMS.separateWords.length; index++) {
    PARAMS.wordRetriger.push(PARAMS.separateWords[index].split(''));
    PARAMS.wordInterval.push(PARAMS.separateWords[index].length);
  }
}