import React, { Component } from 'react'
import TodoList from './TodoList'

export default class InProgress extends Component {
  render() {
    return (
      <div>
        <TodoList page='progress' handleInputModal={this.props.showInputModal}/>
      </div>
    )
  }
}
