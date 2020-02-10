import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import MyTask from './MyTask'
import InProgress from './InProgress'
import Completed from './Completed'
import Login from './auth/Login'
import Signup from './auth/Singup'
import Modal from 'react-modal'
import InputTask from './InputTask'

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      showInputModalState: false
    }
    Modal.setAppElement('#root')
  }
  
  showInputModal = (e, id) => {
    if (this.state.showInputModalState) {
      this.setState({showInputModalState: false, data: null})
    } else {
      this.setState({showInputModalState: true})
      if (id) {
        let todo = this.props.todos.filter((todo) => todo.id === id)
        this.setState({data: todo[0]})
      }
    }
  }
  render() {
    const InputModalStyle = {
      content : {
        top: '5%',
        left: '12%',
        right: '12%',
        bottom: '5%',
        border: '2px solid rgb(204, 204, 204)',
      },
        overlay: {zIndex: 1000}
    }
    return (
      <div>
        {this.props.username ? (<div className='greeting blue-text'>Hello, {this.props.username}</div>): (<div className='greeting'></div>)}
        <Switch>
          <Route exact path='/' render={() => <MyTask showInputModal={this.showInputModal} />} />
          <Route exact path='/inProgress' render={() => <InProgress showInputModal={this.showInputModal} />} />
          <Route exact path='/completed' render={() => <Completed showInputModal={this.showInputModal} />} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
        <Modal isOpen={this.state.showInputModalState} style={InputModalStyle}>
          <InputTask data={this.state.data} handleInputModal={this.showInputModal}/>
        </Modal>
      </div>
    )
  }
}

const mapStatesToProps = (state) => {
  return {
    username: state.auth.username,
    todos: state.todos.data
  }
}

export default connect(mapStatesToProps)(MainContent)