const todoReducer = (state={makingRequest: false, data:[]}, action) => {
  let newData;
  switch (action.type) {
    case 'MAKE_REQUEST':
      return {...state, makingRequest: true}
    case 'RECEIVE_DATA':
      return {...state, makingRequest: false, data: action.data}
    case 'CLEAN_DATA':
      return {...state, data: []}  
    case 'ADD_ITEM':
      return {...state, makingRequest: false, data: [...state.data, action.addedItem]}
    case 'DELETE_ITEM':
      newData = [...state.data].filter(item => item.id !== action.id)
      return {...state, makingRequest: false, data: newData}
    case 'MODIFY_ITEM':
      newData = [...state.data];
      for (let i=0; i<state.data.length; i++) {
        if (newData[i].id === action.id) {
          newData[i] = action.modifiedItem
        }
      }
      return {...state, data: newData};
    default:
      return state;
  }
}

export default todoReducer