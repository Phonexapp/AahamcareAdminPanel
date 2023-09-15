import { combineReducers } from 'redux';
import { userReducer } from './userRdeucer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
