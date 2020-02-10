import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class AddItem extends Component {
  render() {
    return (
      <div className='addItem'>
        <div className='addButton'>
          {this.props.authenticated ? 
          (<a className="waves-effect waves-light btn-large" onClick={this.props.handleAddClick}>
            <i className="material-icons addicon">add_circle_outline</i> Add New Tasks</a>) :
          (<Link to='/login' className="waves-effect waves-light btn-large loginbtn">Log in to add new tasks</Link>)}
        </div>
      </div>
      
    )  
  }
}

const mapStatesToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStatesToProps)(AddItem)