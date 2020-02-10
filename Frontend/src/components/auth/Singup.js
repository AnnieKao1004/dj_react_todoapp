import React, { Component } from 'react'
import { Redirect, Prompt } from 'react-router-dom'
import { connect } from 'react-redux'
import { SignupUser, cleanSignupMessage } from '../../store/actions/authActions'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password1: '', password2: ''}
  }
  
  handleChange = (e) => {
    let name = e.target.id
    let value = e.target.value
    this.setState({[name]: value})
  }

  handleSignup = () => {
    if (this.state.username === '' || this.state.password1 === '') {
      alert('Please enter both username and password.')
    } else {
      this.props.dispatch(SignupUser(this.state))
    }
  }  

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />
    } else {
      return (
        <div className="row container">
          <div className="col s12 m8 colcenter">
            <div className="card">
              <div className="card-content">
                <span className="card-title center">SIGN UP</span>
    
                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="Enter Username" id="username" type="text" onChange={this.handleChange} value={this.state.username}/>
                    <label htmlFor="username" className="active">Username</label>
                  </div>
                </div>
                
                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="Enter Password" id="password1" type="password" onChange={this.handleChange} value={this.state.password}/>
                    <label htmlFor="password1" className="active">Password</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="Enter Password Again" id="password2" type="password" onChange={this.handleChange} value={this.state.password}/>
                    <label htmlFor="password2" className="active">Confirm Password</label>
                  </div>
                </div>
    
                <ul>
                  {this.props.SignupMessage.username ? this.props.SignupMessage.username.map((message) => <li className='red-text text-darken-1'>{message}</li>): ''}
                  {this.props.SignupMessage.password ? this.props.SignupMessage.password.map((message) => <li className='red-text text-darken-1'>{message}</li>): ''}
                </ul>
                
                <div className="row">
                  <div className="input-field col s12">
                    <a className="waves-effect waves-light btn" onClick={this.handleSignup}>Sign Up</a>
                  </div>
                </div>

                <Prompt message={() => {
                  this.props.dispatch(cleanSignupMessage())
                  return;}}/>
            </div>
          </div>
        </div>
      </div> 
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    SignupMessage: state.auth.signupMessage
  }
}

export default connect(mapStateToProps)(Signup)
