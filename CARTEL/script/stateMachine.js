function changeStateMachine(){
    if (PARAMS.state.stateMachine <= 1) {
        PARAMS.state.stateMachine++;
      } else {
        PARAMS.state.stateMachine = 0;
      }
      return    PARAMS.state.stateMachine;
}