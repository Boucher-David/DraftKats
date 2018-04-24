let displayState = {
  home: true,
  draft: false,
  profile: false,
  history: false
};

let hideAll = {
  home: false,
  draft: false,
  profile: false,
  history: false
}

export default (state=displayState, action) => {
  if (action.type !== 'TOGGLE') return state;
  let newState = {...hideAll};
  newState[action.payload] = !newState[action.payload];

  return newState;
}