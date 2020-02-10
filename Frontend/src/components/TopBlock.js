import React, { Component } from 'react'
import Bookmark from './Bookmark'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../store/actions/authActions'

class TopBlock extends Component {
  componentDidMount() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {coverTrigger: false, constrainWidth:false})
  }
  
  componentDidUpdate(PrevProps) {
    if (this.props.authenticated !== PrevProps.authenticated) {
      let elems = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elems, {coverTrigger: false, constrainWidth:false});
    }
  }   
  
  handleClick = () => {
    this.props.dispatch(logoutUser())
  }

  render() {
    let navbar;
    if (this.props.authenticated) {
      navbar = (
        <nav>
          <div className='nav-wrapper light-blue darken-1'>
            <div className='brand-logo center'>todos</div>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li>
                <Link className='authbar' to='/'>Home</Link>
              </li>
              <li>
                <a className='authbar' onClick={this.handleClick}>Log out</a>
              </li>
            </ul>
            
            <a className='dropdown-trigger auth-selector' href='#' data-target="dropdown2"><i className="material-icons">arrow_drop_down</i></a>
            <ul className="dropdown-content" id="dropdown2">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <a onClick={this.handleClick}>Log out</a>
              </li>
            </ul>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <Bookmark to='/' name='My Tasks'/>
              <Bookmark to='/inProgress' name='In Progress'/>
              <Bookmark to='/completed' name='Completed'/>
            </ul>

            <a className='dropdown-trigger page-selector' href='#' data-target="dropdown1"><i className="material-icons">menu</i></a>
            <ul className="dropdown-content" id="dropdown1">
              <Bookmark to='/' name='My Tasks'/>
              <Bookmark to='/inProgress' name='In Progress'/>
              <Bookmark to='/completed' name='Completed'/>
            </ul>

          </div>
        </nav>
      )
    } else {
      navbar = (  
        <nav>
          <div className='nav-wrapper light-blue darken-1'>
            <div className='brand-logo center'>todos</div>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li>
                <Link className='authbar' to='/'>Home</Link>
              </li>
              <li>
                <Link className='authbar' to='/signup'>Sign up</Link>
              </li>
              <li>
                <Link className='authbar' to='/login'>Log in</Link>
              </li>
            </ul>
            
            <a className='dropdown-trigger auth-selector' href='#' data-target="dropdown2"><i className="material-icons">arrow_drop_down</i></a>
            <ul className="dropdown-content" id="dropdown2">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/signup'>Sign up</Link>
              </li>
              <li>
                <Link to='/login'>Log in</Link>
              </li>
            </ul>
          </div>
        </nav>
      )}

    return <div className="navbar-fixed">{navbar}</div>              
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(TopBlock)


