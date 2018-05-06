import {combineReducers} from 'redux';

 import display from './display.js';
 import setup from './setup.js';

export default combineReducers({
  display,
  setup
});
