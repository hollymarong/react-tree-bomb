import { HOME_DATE_UPDATE } from '../constants/actionTypes';
import update from 'immutability-helper';
import mock from '../constants/mock';
import { transformMock } from '../utils/'

const data = transformMock(mock)
console.log('data', data);

const initialState = {
  filter: '',
  data,
  origin: [].concat(data),
};

export default function homeReducer (state = initialState, action) {
  if (action.type === HOME_DATE_UPDATE) {
    debugger
    return update(state, action.payload);
  }
  return state;
}
