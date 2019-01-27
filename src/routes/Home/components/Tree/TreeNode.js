import React, { Component } from 'react';

class TreeNode extends Component {
  constructor(...args) {
    super(...args);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }
  renderChildren() {
    const { node, onToggle } = this.props;
    if (node.loading) {
      return (
        <ul><li>loading</li></ul>
      );
    }
    let children = node.children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    return (
      <ul className="node-children">
        {
          children.map((child, index) => (
            <TreeNode
              onToggle={onToggle}
              key={child.id || index}
              node={child}
              onToggle={onToggle}
            />

          ))
        }
      </ul>
    )
  }
  handleNodeClick(e) {
    const { node, onToggle } = this.props;
    if (onToggle) onToggle(node);

  }
  renderSubContent() {
    let result = null;
    const { node : { isOpen }} = this.props;
    if (isOpen) result  = this.renderChildren();
    return result;
  }
  renderNode() {
    const { node: { isOpen, isLeaf, name, active }, onToggle } = this.props;
    const activeCls = active ? ' active' : '';
    return (
      <div
        className={`node-item ${activeCls}`}
        onClick={this.handleNodeClick}>
        {
          isLeaf ? null : <span>{ isOpen ? '-' : '+'}</span>
        }

        {name}
      </div>
    )
  }
  render() {
    return (
      <li className="node-wrapper">
        {this.renderNode()}
        {this.renderSubContent()}
      </li>
    );
  }

};

export default TreeNode;
