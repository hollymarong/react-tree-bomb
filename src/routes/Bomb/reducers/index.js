
import { BOOM_DATA_UPDATE } from '../constants/actionTypes';
import update from 'immutability-helper';

const initialState = {
};

export default function homeReducer (state = initialState, action) {
  if (action.type === BOOM_DATA_UPDATE) {
    return update(state, action.payload);
  }
  return state;
}
