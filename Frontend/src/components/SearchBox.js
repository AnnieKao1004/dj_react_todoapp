import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {onComposition: false}
  }
  
  handleComposition = (e) => {
    if (e.type === 'compositionend') {
      this.setState({ onComposition: false }) // 不要在setState之後直接呼叫this.state
      this.props.handleInputChange(e.target.value)
    } else {
      this.setState({ onComposition: true })
    }
  }
  
  handleInputChange = (e) => {
    if (this.state.onComposition) {
      return;
    } else {
      this.props.handleInputChange(e.target.value)
    }
  }
  
  render() {
    return (
      <div className='search-wrapper'>
        <input 
          id='search-input'
          className='browser-default search-field'
          placeholder='Search Title'
          type='text'
          onChange={this.handleInputChange}
          onCompositionStart={this.handleComposition}
          onCompositionUpdate={this.handleComposition}
          onCompositionEnd={this.handleComposition} />
        <label htmlFor='search-input'><i className='material-icons search-icon'>search</i></label>
      </div>  
    )
  }
}
