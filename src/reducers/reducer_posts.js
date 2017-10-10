import _ from 'lodash';
import { JOIN_GAME, ADD_ANSWER, INITIAL_ITEMS } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_ANSWER:
      return {...state, [action.payload.data.id]: action.payload.data };
    case INITIAL_ITEMS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
