let displaySport = {
  baseball: false,
  football: false,
  properfootball: false,
  hockey: false,
  positions: [],
  sports: ['Baseball', 'Football', 'Soccer', 'Hockey'],
  selected: null,
  teams: {},
  draftPosition: null
}

let positions = {
  Baseball: {'P': 1, 'SS': 1, 'OF': 3},
  Football: {'QB': 1, 'WR': 3, 'DEF': 1},
  Soccer: {'G': 1, 'FW': 3, 'DF': 3},
  Hockey: {'G': 1, 'FW': 3, 'DF': 3}
};



export default (state=displaySport, action) => {
    let newState = {
      ...state
    }
    let {type, payload} = action;

    switch(type) {
        case 'SPORT':
          newState.positions=[];
          newState.positions.push(positions[payload]);
          newState.selected = payload;

          return newState;
          break;

        case 'NUMBEROFTEAMS':

          return newState;
          break;

        default:
          return state;
    }
}
