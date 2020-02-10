import axios from 'axios'
const apiURL = 'https://djangotodoapi.herokuapp.com/api/todos/'

// sync action creators
const makeRequest = () => {
  return {
    type: 'MAKE_REQUEST',
  }
}

const receiveData = (data) => {
  return {
    type: 'RECEIVE_DATA',
    data: data
  }
}

export const cleanData = () => {
  return {
    type: 'CLEAN_DATA'
  }
}

const addItem = (addedItem) => {
  return {type: 'ADD_ITEM', addedItem: addedItem}
} 

const deleteItem = (id) => {
  return ({type: 'DELETE_ITEM', id: id})
}

const modifyItem = (id, data) => {
  return {type: 'MODIFY_ITEM',  id: id, modifiedItem: data}
}

// async action creators
export const fetchData = () => {
  const token = localStorage.getItem('token')
  return dispatch => {
    dispatch(makeRequest())
    axios({
      method: 'get',
      url: apiURL,
      headers: {Authorization: 'Token ' + token}
    })
    .then(res => res.data)
    .then((data) => dispatch(receiveData(data)))
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(receiveData([]))
      }
    })
  }
}

export const addData = (formValues) => {
  const token = localStorage.getItem('token')
  return dispatch => {
    dispatch(makeRequest())
    axios({
      method: 'post',
      url: apiURL,
      headers: {Authorization: 'Token ' + token},
      data: formValues
    })
      .then(res => {
        dispatch(addItem(res.data))
      })
      .catch(err => alert(err))
  }
}

export const deleteData = (id) => {
  const token = localStorage.getItem('token')
  return dispatch => {
    dispatch(makeRequest())
    axios({
      method: 'delete',
      url: apiURL + id + '/',
      headers: {Authorization: 'Token ' + token}
    })
    .then(() => dispatch(deleteItem(id)))
    .catch(err => alert(err))
  }
}

export const modifyData = (id, modifiedData) => {
  const token = localStorage.getItem('token')
  return dispatch => {
    axios({
      method: 'put',
      url: apiURL + id + '/',
      headers: {Authorization: 'Token ' + token},
      data: modifiedData
    })
    .then((res) => res.data)
    .then((data) => dispatch(modifyItem(data.id, data)))
    .catch(err => alert(err))
  }
} 