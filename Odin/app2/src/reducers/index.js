import { combineReducers } from 'redux';
import counterReducer from './counterReducer'; // Example reducer
import stringReducer from './stringReducer';
<<<<<<< HEAD
=======
import xposReducer from './xposReducer';
import yposReducer from './yposReducer';
>>>>>>> d58167a232b2b7437ba0378bca6d8cca208a0db6

const rootReducer = combineReducers({
  counter: counterReducer,
  string: stringReducer,
<<<<<<< HEAD
=======
  xpos: xposReducer,
  ypos: yposReducer,
>>>>>>> d58167a232b2b7437ba0378bca6d8cca208a0db6
});

export default rootReducer;