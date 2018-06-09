let displaySport = {
  positions: [],
  sports: ['Baseball', 'Football', 'Soccer', 'Hockey'],
  selected: null,
  teams: {},
  teamTemplate: {},
  draftPosition: null,
  numTeams: null
}

let positions = {
  Baseball: {'P': [null, 5], 'SS': [null,5], 'OF': [null,5]},
  Football: {'QB': [null, 5], 'RB': [null,5], 'WR': [null,5]},
  Soccer: {'FWD': [null, 5], 'MID': [null,5], 'DEF': [null,5]},
  Hockey: {'GK': [null, 5], 'F': [null,5], 'M': [null,5]}
};



export default (state=displaySport, action) => {
    let newState = {
      ...state
    }
    let {type, payload} = action;

    switch(type) {
        case 'POSITION_UPDATE':
          newState.positions[0][payload.position][0] = payload['number'].toString();
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
          newState.numTeams = payload.toString();
          return newState;
          break;

        case 'DRAFTPOSITION':
          newState.draftPosition = null;
          newState.draftPosition = payload.toString();
          return newState;
          break;

        default:
          return state;
    }
}
