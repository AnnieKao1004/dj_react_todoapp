import React, { Component } from 'react'
import TodoList from './TodoList'

export default class Completed extends Component {
  render() {
    return (
      <div>
        <TodoList page='completed' />
      </div>
    )
  }
}
