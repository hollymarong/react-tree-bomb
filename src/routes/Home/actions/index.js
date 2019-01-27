import {
  HOME_DATE_UPDATE,
} from '../constants/actionTypes';

import { debounce } from '../utils/';

export const updateState = (payload) => (dispatch) => {
  dispatch({
    type: HOME_DATE_UPDATE,
    payload,
  });
};

const matchNode = (filter, node) => {
  const reg = new RegExp(filter, 'gi');
  const result = reg.test(node.name);
  return result;
}

const filterData = (data, filter, results) => {
  if (!filter) return data;
  data.forEach(item => {
    let childrenMatch;
    let newItem = Object.assign({}, item, {
      isOpen: false,
    });
    if (item.children) {
      childrenMatch = filterData(item.children, filter, []);
      if (childrenMatch.length)  {
        Object.assign(newItem, item, {
          isOpen: true,
          children: childrenMatch,
        });
      }
    }
    const nodeMatch = matchNode(filter, item);
    if(nodeMatch || (childrenMatch && childrenMatch.length)) {
      results.push(newItem);
    }
    console.log('item.name', item.name);
  });
  return results;
};



export const handleFilterChange = (value) => (dispatch, getState) => {
  console.log('filter')
  const state = getState();
  const { data, origin } = state.home;
  const val = value.trim();
  const result = filterData(origin, val, []);
  dispatch(updateState({
    filter: {
      $set: val,
    },
    data: {
      $set: result,
    },
  }));

};
