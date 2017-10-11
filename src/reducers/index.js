import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import GameReducer from './reducer_game.js'

const rootReducer = combineReducers({
  game: GameReducer,
  form: formReducer,
});

export default rootReducer;
