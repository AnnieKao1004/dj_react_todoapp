import React, { Component } from 'react'
import TopBlock from './TopBlock'
import MainContent from './MainContent'
import { connect } from 'react-redux'
import { checkAuthStatus } from '../store/actions/authActions'
import { fetchData } from '../store/actions/todoActions'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(checkAuthStatus())
    this.props.dispatch(fetchData())
  }
  
  render() {
    return (
      <div>
        <TopBlock />
        <MainContent />
      </div>
    )
  }
}

export default connect (null)(App)
