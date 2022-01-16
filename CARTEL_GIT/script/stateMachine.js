function changeStateMachine() {
  if (PARAMS.state.stateMachine <=  PARAMS.separateWords.length ) {
    PARAMS.state.stateMachine++;
  } else {
    PARAMS.state.stateMachine = 0;
  }
  return PARAMS.state.stateMachine;
}
function sendLastLetterPosition(physicLetter, level) {
  PARAMS.positionWord.p0.LastPosition = [];
  for (let i = 0; i < PARAMS.wordInterval[level]; i++) {
    PARAMS.positionWord.p0.LastPosition.push(physicLetter[0][i].body)
  }
}
function originStartWord(level) {
  let decay=0;
  for (let index = 0; index <= level; index++) {
    decay+=PARAMS.wordInterval[index];
  }
  return decay;
}