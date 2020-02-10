import React, { Component } from 'react'
import { Link, Redirect, Prompt } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser, cleanLoginMessage } from '../../store/actions/authActions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''}
  }
  
  handleChange = (e) => {
    let name = e.target.id
    let value = e.target.value
    this.setState({[name]: value})
  }

  handleLogin = () => {
    if (this.state.username === '' || this.state.password === '' ) {
      alert('Please enter both username and password')
    } else {
      this.props.dispatch(loginUser(this.state))
    }
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />
    } else {
      return (
        <div className="container row ">
          <div className="col s12 m8 colcenter">
            <div className="card">
              <div className="card-content">
                <span className="card-title center">LOGIN</span>
    
                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="Enter Username" id="username" type="text" onChange={this.handleChange} value={this.state.username}/>
                    <label htmlFor="username" className="active">Username</label>
                  </div>
                </div>
                
                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="Enter Password" id="password" type="password" onChange={this.handleChange} value={this.state.password}/>
                    <label htmlFor="password" className="active">Password</label>
                  </div>
                </div>
                
                {this.props.message === '' ? '': 
                (<div className="row">
                  <div className="input-field col s12">
                    <p className='red-text text-darken-1'>{this.props.loginMessage}</p>
                  </div>
                </div>)}

                <div className="row">
                  <div className="input-field col s12">
                    <a className="waves-effect waves-light btn" onClick={this.handleLogin}>Log in</a>
                  </div>
                </div>
    
              </div>
              
              <div className="card-action">
                <Link to="/signup">Sign Up Now</Link>
              </div>
            </div>
          </div>
          <Prompt message={() => {
            this.props.dispatch(cleanLoginMessage())
            return;}}/>
        </div> 
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    loginMessage: state.auth.loginMessage
  }
}

export default connect(mapStateToProps)(Login)
