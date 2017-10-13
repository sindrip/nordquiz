import _ from 'lodash';
import { JOIN_GAME, ADD_ANSWER, INITIAL_ITEMS } from '../actions/index';

export default function (state = {}, action) {
  console.log(action.type);
  switch (action.type) {
    case JOIN_GAME:
      return {...state};
    case ADD_ANSWER:
      return {...state, [action.payload.data.id]: action.payload.data };
    case INITIAL_ITEMS:
      return [
        {answer:'',id:'1'},
        {answer:'prevAnswer',id:'2'},
        {answer:'image',id:'3',hasImage:true,image:'ugla'},
        {answer:'dropdown',id:'4',type:'dropdown',dropdown:[
          'opt1',
          'opt2',
          'opt3',
          'opt4',
        ]},
      ];
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
