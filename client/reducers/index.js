import {combineReducers} from 'redux';

 import display from './display.js';
 import setup from './setup.js';
 import numberTeams from './numberTeams.js';


export default combineReducers({
  display,
  setup,
  numberTeams
});
