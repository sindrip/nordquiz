import _ from 'lodash';
import { JOIN_GAME, ADD_ANSWER, INITIAL_ITEMS } from '../actions/index';

export default function (state = {}, action) {
  console.log(action);
  switch (action.type) {
    case JOIN_GAME:
      return {...state};
    case ADD_ANSWER:
      return {...state, [action.payload.data.id]: action.payload.data };
    case INITIAL_ITEMS:
      return [{answer:'',id:'1'},{answer:'daa',id:'13'}];
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}