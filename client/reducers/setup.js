let displaySport = {
  baseball: false,
  football: false,
  properfootball: false,
  hockey: false,
  positions: [],
  sports: ['Baseball', 'Football', 'Soccer', 'Hockey'] //change later
}

export default (state=displaySport, action) => {
  console.log(action);
  let bbPositions = {'P': 1, 'SS': 1, 'OF': 3};
  // state.baseball=true;
  state.positions=[];
  state.positions.push(bbPositions);
  let fbPositions = {'QB': 1, 'WR': 3, 'DEF': 1};

  return state;
}
