function changeStateMachine(){
    if (PARAMS.state.stateMachine <= 1) {
        PARAMS.state.stateMachine++;
      } else {
        PARAMS.state.stateMachine = 0;
      }
      return    PARAMS.state.stateMachine;
}
function  sendLastLetterPosition(physicLetter,numberLetter){
  for (let index = 0; index < numberLetter; index++) {
   PARAMS.positionWord.p0.LastPosition.push(physicLetter[index][0].body)
  }
  // console.log(PARAMS.positionWord.p0.LastPosition);
};