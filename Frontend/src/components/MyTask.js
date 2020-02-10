import React, { Component } from 'react'
import AddItem from './AddItem'
import TodoList from './TodoList'

export default class MyTask extends Component {
  render() {
    return (
      <div>
        <AddItem handleAddClick={this.props.showInputModal}/>
        <TodoList handleInputModal={this.props.showInputModal}/>
      </div>
    )
  }
}
