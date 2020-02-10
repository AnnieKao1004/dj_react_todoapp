import React, { Component } from 'react'
import TodoItem from './TodoItem'
import { connect } from 'react-redux'

class TodoList extends Component {
  render() {
    let count = 0
    // 篩選出登入使用者的項目
    let todoList = this.props.todoList.filter(todo => todo.owner === this.props.username) 
    // 按照Due Date排序
    todoList.sort((a, b) => {
      return new Date (a.date) < new Date(b.date) ?  -1 : 1 
    })
    // 決定各個頁面要顯示的項目及計算count
    let todos = todoList.map((item, index) => {
      switch (this.props.page) {
        case "progress":
          if (item.complete) {
            return null;
          }
          break;
        case "completed":
          if (!item.complete) {
            return null;
          }        
          break;
      }
      if (this.props.page) {
        count++
      } else if (!item.complete) {
        count++
      }
      return <TodoItem key={item.id} data={item} index={index} handleInputModal={this.props.handleInputModal}/> //key用index的話會有問題...應該是因為不管順序怎麼變key都一樣的關係?
    }) 
    const empty = todos.every((currentValue) => currentValue === null) // 判斷todos array是否每個元素都是null

    return (
      <div className='container'>
        {this.props.makingRequest ? (
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
              <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle">
              </div></div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>) : (
        <div>
          {empty === true ? <div></div> : <ul className='collection'>{todos}</ul>}
          {this.props.authenticated ? (<div className='taskCount'>{count} tasks {this.props.page === 'completed' ? 'completed' : 'left'}
          </div>) : ''}
        </div>
        )}
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todos.data,
    makingRequest: state.todos.makingRequest,
    authenticated: state.auth.authenticated,
    username: state.auth.username

  }
}

export default connect(mapStateToProps)(TodoList)