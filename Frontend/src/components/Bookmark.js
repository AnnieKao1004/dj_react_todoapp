import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

export default class Bookmark extends Component {
  render() {
    return (
      <Route 
      exact path={this.props.to}
      children={(props) => {
        let className = (props.match) ? 'active' : ''
        return (
          <li className={className}>
            <Link to={this.props.to}>{this.props.name}</Link>
          </li>
        )
      }}
      />
        
      
    )
  }
}
