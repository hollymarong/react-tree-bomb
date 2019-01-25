import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TreeNode from './TreeNode';
import './tree.scss';

class Tree extends Component {
  render() {
    const { data, onToggle } = this.props;
    return (
      <ul>
        {
          !!data && data.map((node, index) => (
            <TreeNode
              key={node.id || index}
              node={node}
              onToggle={onToggle}
            />))
        }

      </ul>
    )
  }
}

const { array, func } = PropTypes;
Tree.proptypes = {
  data: array,
  onToggle: func,
};
export default Tree
