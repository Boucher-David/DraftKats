let displaySport = {
  positions: [],
  sports: ['Baseball', 'Football', 'Soccer', 'Hockey'],
  selected: null,
  teams: {},
  teamTemplate: {},
  draftPosition: 20,
  numTeams: 20
}

let positions = {
  Baseball: {'P': [1, 5], 'SS': [1, 5], 'OF': [1, 5]},
  Football: {'QB': [1, 5], 'RB': [1, 5], 'WR': [1, 5]},
  Soccer: {'FWD': [1, 5], 'MID': [1, 5], 'DEF': [1, 5]},
  Hockey: {'GK': [1, 5], 'F': [1, 5], 'M': [1, 5]}
};



export default (state=displaySport, action) => {
    let newState = {
      ...state
    }
    let {type, payload} = action;
    switch(type) {
        case 'POSITION_UPDATE':

          newState.positions[0][payload.position][0] = payload['number'];
          return newState;
          break;

        case 'SPORT':
          newState.positions=[];
          newState.positions.push(positions[payload]);
          newState.selected = payload;

          return newState;
          break;

        case 'NUMBEROFTEAMS':
          newState.numTeams = null;
          newState.numTeams = payload;
          return newState;
          break;

        case 'DRAFTPOSITION':
          newState.draftPosition = null;
          newState.draftPosition = payload;
          return newState;
          break;

        default:
          return state;
    }
}
