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


export const findNode = (node, filter) => {
  return matchNode(filter, node) || // i match
  (node.children && // or i have decendents and one of them match
   node.children.length &&
   !!node.children.find(child => findNode(child, filter)));
};



const filterData = (data, filter) => {
  const filterTree = (node, filter) => {
    if(matchNode(filter, node) || !node.children){ return node; }
    // If not then only keep the ones that match or have matching descendants
    const filtered = node.children
          .filter(child => findNode(child, filter))
          .map(child => filterTree(child, filter));
    return Object.assign({}, node, { children: filtered });
  }
  return data.map(node => {
    return filterTree(node, filter)
  })

};

const openData = (data, filter) => {
  const openTree = (node, filter) => {
    let children = node.children;
    if (!children || children.length === 0) {
      return Object.assign({}, node, { isOpen: false })
    }

    const childrenFilter = node.children.filter(child => findNode(child, filter));
    const isChildMatch = childrenFilter.length > 0;

    if (isChildMatch) {
      children = childrenFilter.map(child => {
        return openTree(child, filter);
      })

    }
    return Object.assign({}, node, {
      children,
      isOpen: isChildMatch,
    });
  }
  return data.map(item => openTree(item, filter))
}

export const handleFilterChange = (value) => (dispatch, getState) => {
  console.log('filter')
  const state = getState();
  const { data, origin } = state.home;
  const val = value.trim();
  let result = [];
  if (!val) result = origin;
  if (val) {
    result = filterData(data, val);
    result = openData(result, val);
  }

  dispatch(updateState({
    filter: {
      $set: val,
    },
    data: {
      $set: result,
    },
  }));

};
