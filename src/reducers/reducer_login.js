import _ from 'lodash';
import { IS_ADMIN } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case IS_ADMIN:
      return {admin: action.payload};
    default:
      return state;
  }
}
