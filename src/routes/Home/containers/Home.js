import React, { Component } from 'react'
import './home.scss'
import Tree from '../components/Tree/';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { debounce } from '../utils/';

class HomeView extends Component {
  constructor(...args) {
    super(...args);
    this.onToggle = this.onToggle.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.updateFilterData = debounce(this.updateFilterData, 200).bind(this);
    this.state = {
      curNode: null,
    };
  }
  onToggle(node) {
    const { curNode } = this.state;
    if (curNode) curNode.active = false;
    debugger
    node.isOpen = !node.isOpen;
    node.active = true;
    this.setState({
      curNode: node,
    });
  }

  renderUserInfo() {
    const loop = (node) => {
      return (
        <div>
          {node.isLeaf ? (`${node.name}-${node.sex}`) : null}
          {node.children && node.children.map((item, index) => (
            loop(item)
          ))}
        </div>
      )
    }
    const curNode = this.state.curNode;
    if (!curNode) return null;
    return (
      <div>
        {loop(curNode)}
      </div>
    )
  }
  updateFilterData(value) {
    const { handleFilterChange } = this.props;
    handleFilterChange(value);
  }
  onInputChange(e) {
    const value = e.target.value;
    this.updateFilterData(value)
  }

  render() {
    const { data, filter, handleFilterChange } = this.props;
    return (
      <div className="container">
        <div className="menu">
          <div>
            <input
              onChange={this.onInputChange}
              name=""
              type="text"
              placeholder="search"/>
          </div>
          <Tree data={data} onToggle={this.onToggle}/>
        </div>
        <div className="content">
          {this.renderUserInfo()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { home } = state;
  return {
    ...home,
  }
}
const ConnectedView = connect(mapStateToProps, {
  ...actions,
})(HomeView);
export default ConnectedView
