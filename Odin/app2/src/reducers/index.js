import { combineReducers } from 'redux';
import counterReducer from './counterReducer'; // Example reducer
import stringReducer from './stringReducer';
import xposReducer from './xposReducer';
import yposReducer from './yposReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  string: stringReducer,
  xpos: xposReducer,
  ypos: yposReducer,
});

export default rootReducer;