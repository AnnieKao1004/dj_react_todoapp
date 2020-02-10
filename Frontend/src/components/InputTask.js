import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addData, modifyData } from '../store/actions/todoActions'
import DatePicker from "react-datepicker";

class InputTask extends Component {
  constructor(props) {
    super(props);
    if (this.props.data) {
      let data = this.props.data
      if (data.date) {
        data.date = new Date(data.date)
      } else {
        data.date = new Date()
      }
      this.state = data

    } else {
      this.state = {title: '', date: new Date(), comments: '', important: false, complete: false}
    }
  }

  handleChange = (e) => {
    let name = e.target.id;
    let value;
    if (name === 'important' || name === 'complete') {
      value = e.target.checked
    } else {
      value = e.target.value
    }
    this.setState({[name]: value})
  }
  
  handleDateChange = (date) => {
    this.setState({date: date})
  }

  handleSave = () => {
    if (this.state.title === '') {
      alert('請輸入項目名稱')
    } else {
      if (this.props.data) {
        let formValue = {...this.state}
        if (formValue.date) {
          formValue.date = formValue.date.toISOString().slice(0, 10)
        }
        this.props.dispatch(modifyData(this.props.data.id, formValue))
      } else {
        let formValue = {...this.state}
        if (formValue.date) {
          formValue.date = formValue.date.toISOString().slice(0, 10)
        }
        this.props.dispatch(addData(formValue))
        }
      this.props.handleInputModal()    
      }
  }

  render() {
    return (
      <div>
        
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="title" className="active">Task Name</label>
            <input type="text" id="title" placeholder="Enter Task Name" onChange={this.handleChange} value={this.state.title}/>
          </div>
        </div>
   
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="username" className="active">Due Date</label>
            <DatePicker placeholderText="Click to select a date" dateFormat="yyyy-MM-dd" onChange={this.handleDateChange} selected={this.state.date}/>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="comments" className="active">Comments</label>
            <textarea placeholder="Enter Comments..." id="comment" className='materialize-textarea' onChange={this.handleChange} value={this.state.comment}/>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <div>
              <label>
                <input className='filled-in' type='checkbox' id='important' checked={this.state.important} onChange={this.handleChange}/>
                <span className=''>Important</span>
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <div>
              <label>
                <input className='filled-in' type='checkbox' id='complete' checked={this.state.complete} onChange={this.handleChange}/>
                <span className=''>Completed</span>
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <a className="waves-effect waves-light btn light-blue darken-2 inputForm" onClick={this.handleSave}>Save</a>
            <a className="waves-effect waves-light btn pink darken-1 inputForm" onClick={this.props.handleInputModal}>Cancel</a>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(null)(InputTask)