import React, { Component } from 'react'
import { connect } from 'react-redux'
import { modifyData, deleteData } from '../store/actions/todoActions'
import Modal from 'react-modal'

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false
    }
  }

  handleEdit = (e) => {
    this.props.handleInputModal(e, this.props.data.id)
  }

  handleDeleteModal = () => {
    if (this.state.showDeleteModal) {
      this.setState({showDeleteModal: false})
    } else {
      this.setState({showDeleteModal: true})
    }
  }

  handleDelete = () => {
    this.props.dispatch(deleteData(this.props.data.id))
    this.handleDeleteModal()
  }
  
  changeCompleteState = (e) => {
    let data = this.props.data
    data.complete = e.target.checked
    this.props.dispatch(modifyData(this.props.data.id, data))
  }
  
  changeImportantState = () => {
    let data = this.props.data
    if (data.important) {
      data.important = false
      this.props.dispatch(modifyData(this.props.data.id, data))
    } else {
      data.important = true
      this.props.dispatch(modifyData(this.props.data.id, data))
    }
  }

  render() {
    const deleteModalStyle = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      },
      overlay: {zIndex: 1000}
    }
    const date = new Date(this.props.data.date).toDateString()

    return (
        <li className={this.props.data.important === true ? 'collection-item yellow lighten-3': 'collection-item'}>
          <div className='todoItem'>
            <div>
              <label>
                <input className='filled-in' name='complete' type='checkbox' onChange={this.changeCompleteState} checked={this.props.data.complete}/>
                <span className={this.props.data.complete === true ? 'completedTitle' : ''}>{this.props.data.title}</span>
              </label>
            </div>
            <span className={this.props.data.complete === true ? 'completedTitle' : ''}>{new Date() > new Date(this.props.data.date) ? (<span className="new badge red" data-badge-caption="Overdue"></span>) : ''}</span>
            
            <div className='listIcon'>
              {this.props.data.date !== null ? (<div className="iconinfo"><i className="material-icons list">date_range</i><span>{date}</span></div>) : (<div className="iconinfo"><i className="material-icons list">date_range</i><span>No Due Date</span></div>)}
              {this.props.data.comment !== '' ? (<div className="iconinfo"><i className="material-icons list">comment</i><span>{this.props.data.comment}</span></div>) : (<div className="iconinfo"><i className="material-icons list">comment</i><span>No comment</span></div>)}
            </div>

            <div className='modifyicon'>
              <i name='important' className={this.props.data.important === true ? "material-icons pointer important" : "material-icons pointer"} onClick={this.changeImportantState} >grade</i>
              <i className='material-icons edit pointer' onClick={this.handleEdit}>edit</i>
              <i className='material-icons delete pointer' onClick={this.handleDeleteModal}>delete</i>
            </div>           

          </div>

          <Modal isOpen={this.state.showDeleteModal} style={deleteModalStyle} >
            <p>Are you sure to delete the item?</p>
            <div className='center'>
              <a className='waves-effect waves-light btn-small' onClick={this.handleDelete}>Yes</a>
              <a className='waves-effect waves-light btn-small' onClick={this.handleDeleteModal}>No</a>
            </div>
          </Modal>

        </li>
    )
  }
}

export default connect(null)(TodoItem)

