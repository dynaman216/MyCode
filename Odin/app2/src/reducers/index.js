import { combineReducers } from 'redux';
import counterReducer from './counterReducer'; // Example reducer
import stringReducer from './stringReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  string: stringReducer,
});

export default rootReducer;