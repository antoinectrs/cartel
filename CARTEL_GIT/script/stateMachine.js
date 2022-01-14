function changeStateMachine(){
  // console.log(PARAMS.state.s tateMachine);
    if (PARAMS.state.stateMachine <= 5) {
        PARAMS.state.stateMachine++;
      } else {
        PARAMS.state.stateMachine = 0;
      }
      return PARAMS.state.stateMachine;
}
function  sendLastLetterPosition(physicLetter,level){  
    PARAMS.positionWord.p0.LastPosition=[];
    for (let i = 0; i <physicLetter[level-1].length; i++) {
      PARAMS.positionWord.p0.LastPosition.push(physicLetter[level-1][i].body)
    }
  }
// };
