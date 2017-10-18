import _ from 'lodash';
import { JOIN_GAME, ADD_ANSWER, INITIAL_ITEMS, UPDATE_GAME } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case JOIN_GAME:
      return {...state};
    case ADD_ANSWER:
      return {...state, [action.payload.data.id]: action.payload.data };
    case UPDATE_GAME:
      return [...state, action.payload];
    case INITIAL_ITEMS:
      return action.payload.data;
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
/*
{answer:'dropdown',id:'4',type:'dropdown',dropdown:[
  'opt1',
  'opt2',
  'opt3',
  'opt4',
]},
*/
