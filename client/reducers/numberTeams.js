let displayNumberOfTeams = {
  baseball: 12,
  football: 10,
  properfootball: 15,
  hockey: 8
}

export default (state=displayNumberOfTeams, action) => {
  console.log(action);
  let bbNumbers = {'Team 1', 'Team 2'};
  // state.baseball=true;
  state.numberTeams=[];
  state.positions.push(bbPositions);
  let fbPositions = {'QB': 1, 'WR': 3, 'DEF': 1};

  return state;
}
