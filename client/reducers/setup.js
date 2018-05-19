let displaySport = {
  baseball: false,
  football: false,
  properfootball: false,
  hockey: false,
  positions: [],
  sports: ['Baseball', 'Football', 'Soccer', 'Hockey'] //change later
}

let positions = {
  Baseball: {'P': 1, 'SS': 1, 'OF': 3},
  Football: {'QB': 1, 'WR': 3, 'DEF': 1},
  Soccer: {'G': 1, 'FW': 3, 'DF': 3},
  Hockey: {'G': 1, 'FW': 3, 'DF': 3}
};

export default (state=displaySport, action) => {

  let {type, payload} = action;

        switch(type) {
            case 'SPORT':

            let newState = {
                ...state
            }
            newState.positions=[];
            newState.positions.push(positions[payload]);


            return newState;
            break;
            case 'NUMBEROFTEAMS':

            let newState = {
              ...state
            }

            return newState;
            break;
            default:
                return state;
        }
}
