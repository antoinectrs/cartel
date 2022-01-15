function changeStateMachine() {
  // console.log(PARAMS.state.s tateMachine);
  if (PARAMS.state.stateMachine <= 5) {
    PARAMS.state.stateMachine++;
  } else {
    PARAMS.state.stateMachine = 0;
  }
  return PARAMS.state.stateMachine;
}
function sendLastLetterPosition(physicLetter, level) {
  PARAMS.positionWord.p0.LastPosition = [];
  // console.log(PARAMS.wordInterval[level]);
  // console.log("test ",physicLetter[level-1].length );

  for (let i = 0; i < PARAMS.wordInterval[level]; i++) {
    //   // console.log( PARAMS.wordInterval[level]);
    //   PARAMS.positionWord.p0.LastPosition.push(physicLetter[level-1][i].body)
    PARAMS.positionWord.p0.LastPosition.push(physicLetter[0][i].body)
  }

  // console.log(PARAMS.positionWord.p0.LastPosition);
}
function originStartWord(level) {
  let decay=0;
  for (let index = 0; index <= level; index++) {
    decay+=PARAMS.wordInterval[index];
  }
  // console.log(decay);
  // const originStart= decay-PARAMS.wordInterval[level];
  return decay;
}