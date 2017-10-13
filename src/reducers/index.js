import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import GameReducer from './reducer_game.js'
import LoginReducer from './reducer_login.js'

const rootReducer = combineReducers({
  game: GameReducer,
  login: LoginReducer,
  form: formReducer,
});

export default rootReducer;
